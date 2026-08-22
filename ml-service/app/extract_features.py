import re
from urllib.parse import urlparse

def extract_features(url: str) -> list:
    features = []
    url_lower = url.lower()

    # 1. URL length
    features.append(len(url))

    # 2. Has IP address instead of domain
    ip_pattern = re.compile(r'^(?:http[s]?://)?(\d{1,3}\.){3}\d{1,3}')
    features.append(1 if ip_pattern.match(url) else 0)

    # 3. Has '@' symbol
    features.append(1 if '@' in url else 0)

    # 4. Number of dots
    features.append(url.count('.'))

    # 5. Number of hyphens
    features.append(url.count('-'))

    # 6. HTTPS present
    features.append(1 if url_lower.startswith('https') else 0)

    # 7. Subdomain count
    try:
        domain = urlparse(url).netloc
        features.append(domain.count('.'))
    except:
        features.append(0)

    # 8. Suspicious keywords (expanded, case-insensitive)
    suspicious = [
        'login', 'verify', 'secure', 'account', 'update', 'banking',
        'signin', 'sign-in', 'confirm', 'password', 'credential',
        'webscr', 'ebayisapi', 'suspend', 'unlock', 'limited',
        'security', 'alert', 'validate', 'authenticate', 'billing',
        'invoice', 'payment', 'refund', 'gift', 'reward', 'bonus',
        'urgent', 'expire', 'restricted', 'support', 'helpdesk',
        'wallet', 'crypto', 'reset'
    ]
    features.append(1 if any(word in url_lower for word in suspicious) else 0)

    # 9. URL shortener (expanded, case-insensitive)
    shorteners = [
        'bit.ly', 'tinyurl', 'goo.gl', 't.co', 'ow.ly', 'is.gd',
        'buff.ly', 'adf.ly', 'bl.ink', 'shorte.st', 'cutt.ly',
        'rebrand.ly', 'tiny.cc', 'lnkd.in', 'shorturl.at', 'rb.gy',
        's.id', 'v.gd', 'clck.ru', 'qr.ae', 'x.co', 'soo.gd',
        'db.tt', 'po.st', 'chilp.it', 'ity.im', 'q.gs'
    ]
    features.append(1 if any(s in url_lower for s in shorteners) else 0)

    return features

if __name__ == "__main__":
    test_url = "http://192.168.1.1/LOGIN-VERIFY-account.com"
    print(extract_features(test_url))
