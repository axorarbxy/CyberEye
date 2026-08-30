import re
import math
from urllib.parse import urlparse, unquote
from ipaddress import ip_address
from difflib import SequenceMatcher
import tldextract

# ---------------------------------------------------------------------------
# Semantic keyword categories (Doc point #6) — replaces one flat keyword list
# with intent categories, so the model learns combinations of intent rather
# than memorizing individual words an attacker can trivially avoid.
# ---------------------------------------------------------------------------
AUTH_WORDS = ['login', 'signin', 'sign-in', 'authenticate', 'password', 'credential', 'verify']
FINANCIAL_WORDS = ['payment', 'invoice', 'billing', 'refund', 'wallet', 'bank', 'crypto', 'gift', 'reward', 'bonus']
URGENCY_WORDS = ['urgent', 'immediately', 'expire', 'suspend', 'suspended', 'limited', 'alert']
RECOVERY_WORDS = ['reset', 'unlock', 'recover', 'confirm', 'validate', 'restricted']

# Known legitimate brands to check impersonation against (Doc point #7).
# In production this list would be much larger / pulled from a maintained source.
KNOWN_BRANDS = [
    'paypal', 'google', 'microsoft', 'apple', 'amazon', 'facebook',
    'instagram', 'netflix', 'bankofamerica', 'chase', 'wellsfargo',
    'ebay', 'linkedin', 'dropbox', 'adobe'
]

SHORTENER_DOMAINS = {
    'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd',
    'buff.ly', 'adf.ly', 'bl.ink', 'shorte.st', 'cutt.ly',
    'rebrand.ly', 'tiny.cc', 'lnkd.in', 'shorturl.at', 'rb.gy',
    's.id', 'v.gd', 'clck.ru', 'qr.ae', 'x.co', 'soo.gd',
    'db.tt', 'po.st', 'chilp.it', 'ity.im', 'q.gs'
}


def shannon_entropy(s: str) -> float:
    """Doc #4 — measures character randomness. Not a standalone verdict signal,
    but a useful input for distinguishing structured vs. machine-generated strings."""
    if not s:
        return 0.0
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    length = len(s)
    return -sum((count / length) * math.log2(count / length) for count in freq.values())


def is_ip_address(hostname: str) -> bool:
    """Doc #47 — replaces the fragile/malformed regex with Python's real
    IP parser via a narrow, expected exception instead of a bare except."""
    if not hostname:
        return False
    try:
        ip_address(hostname)
        return True
    except ValueError:
        return False


def brand_similarity_score(hostname: str) -> float:
    """Doc #7 — edit-distance based brand-impersonation signal.
    Returns the highest similarity ratio (0-1) between the hostname's
    registered domain and any known brand name. High similarity + brand
    NOT actually matching the real domain is the phishing signal."""
    if not hostname:
        return 0.0
    ext = tldextract.extract(hostname)
    domain_part = ext.domain.lower()
    best = 0.0
    for brand in KNOWN_BRANDS:
        # Skip the legitimate case: domain genuinely IS the brand
        if domain_part == brand:
            return 0.0
        ratio = SequenceMatcher(None, domain_part, brand).ratio()
        best = max(best, ratio)
    return round(best, 3)


def has_punycode(hostname: str) -> int:
    """Doc #8 — punycode (xn--) prefix indicates an internationalized domain,
    a common homoglyph-attack vector (visually deceptive Unicode chars)."""
    return 1 if hostname and 'xn--' in hostname.lower() else 0


def encoding_signals(url: str):
    """Doc #9 — percent-encoding / obfuscation detection."""
    percent_encoded = len(re.findall(r'%[0-9a-fA-F]{2}', url))
    try:
        decoded_once = unquote(url)
        double_encoded = 1 if '%' in decoded_once and percent_encoded > 0 else 0
    except Exception:
        double_encoded = 0
    return percent_encoded, double_encoded


def keyword_category_score(text: str, wordlist: list) -> int:
    text_lower = text.lower()
    return sum(1 for w in wordlist if w in text_lower)


def extract_features(url: str) -> list:
    """
    Returns a fixed-length numeric feature vector for a given URL.
    NOTE: feature count changed from the previous version (9 -> 27+).
    The model MUST be retrained (train_model.py) after this change —
    a model trained on the old feature shape will silently misinterpret
    the new vector.
    """
    url = url.strip()
    url_lower = url.lower()

    try:
        parsed = urlparse(url if '://' in url else f'http://{url}')
        hostname = parsed.hostname or ''
        path = parsed.path or ''
        query = parsed.query or ''
    except ValueError:
        hostname, path, query = '', '', ''

    ext = tldextract.extract(hostname) if hostname else tldextract.extract('')
    registered_domain = f"{ext.domain}.{ext.suffix}" if ext.suffix else ext.domain
    subdomain = ext.subdomain or ''
    subdomain_count = len([s for s in subdomain.split('.') if s]) if subdomain else 0

    percent_encoded, double_encoded = encoding_signals(url)

    features = []

    # --- Layer A: basic lexical / structural (Doc #3) ---
    features.append(len(url))                                   # 0 url_length
    features.append(len(hostname))                               # 1 hostname_length
    features.append(len(path))                                   # 2 path_length
    features.append(len(query))                                  # 3 query_length
    features.append(url.count('.'))                               # 4 dot_count
    features.append(url.count('-'))                               # 5 hyphen_count
    features.append(url.count('_'))                               # 6 underscore_count
    features.append(url.count('/'))                               # 7 slash_count
    features.append(sum(c.isdigit() for c in url))                 # 8 digit_count
    features.append(round(sum(c.isdigit() for c in url) / max(len(url), 1), 3))  # 9 digit_ratio
    special_count = len(re.findall(r'[^a-zA-Z0-9./:\-_]', url))
    features.append(special_count)                                 # 10 special_char_count
    features.append(round(special_count / max(len(url), 1), 3))    # 11 special_char_ratio
    features.append(1 if '@' in url else 0)                        # 12 has_at_symbol

    # --- IP-as-domain (fixed per Doc #47) ---
    features.append(1 if is_ip_address(hostname) else 0)           # 13 has_ip

    # --- HTTPS (kept, but per Doc #11 this carries low model weight in practice) ---
    features.append(1 if url_lower.startswith('https') else 0)     # 14 has_https

    # --- Subdomain structure (Doc #10) ---
    features.append(subdomain_count)                               # 15 subdomain_count
    features.append(len(registered_domain))                        # 16 registered_domain_length

    # --- Entropy (Doc #4) ---
    features.append(round(shannon_entropy(hostname), 3))           # 17 hostname_entropy
    features.append(round(shannon_entropy(path), 3))               # 18 path_entropy

    # --- Encoding / obfuscation (Doc #9) ---
    features.append(percent_encoded)                               # 19 percent_encoded_count
    features.append(double_encoded)                                # 20 double_encoded_flag

    # --- Punycode / homoglyph proxy (Doc #8) ---
    features.append(has_punycode(hostname))                        # 21 has_punycode

    # --- Brand impersonation (Doc #7) ---
    features.append(brand_similarity_score(hostname))               # 22 brand_similarity_score

    # --- Semantic keyword categories (Doc #6), replacing flat keyword list ---
    full_text = url_lower
    features.append(keyword_category_score(full_text, AUTH_WORDS))       # 23 auth_score
    features.append(keyword_category_score(full_text, FINANCIAL_WORDS))  # 24 financial_score
    features.append(keyword_category_score(full_text, URGENCY_WORDS))    # 25 urgency_score
    features.append(keyword_category_score(full_text, RECOVERY_WORDS))   # 26 recovery_score

    # --- Domain-aware shortener check (fixed per Doc #49) ---
    features.append(1 if registered_domain.lower() in SHORTENER_DOMAINS else 0)  # 27 is_shortener

    return features


FEATURE_NAMES = [
    "url_length", "hostname_length", "path_length", "query_length",
    "dot_count", "hyphen_count", "underscore_count", "slash_count",
    "digit_count", "digit_ratio", "special_char_count", "special_char_ratio",
    "has_at_symbol", "has_ip", "has_https", "subdomain_count",
    "registered_domain_length", "hostname_entropy", "path_entropy",
    "percent_encoded_count", "double_encoded_flag", "has_punycode",
    "brand_similarity_score", "auth_score", "financial_score",
    "urgency_score", "recovery_score", "is_shortener",
]


if __name__ == "__main__":
    test_urls = [
        "http://192.168.1.1/LOGIN-VERIFY-account.com",
        "https://www.google.com",
        "https://paypa1-secure-login.com/verify?redirect=%2Faccount",
        "https://xn--pypal-4ve.com/reset-password",
    ]
    for u in test_urls:
        feats = extract_features(u)
        print(f"\nURL: {u}")
        for name, val in zip(FEATURE_NAMES, feats):
            print(f"  {name}: {val}")
