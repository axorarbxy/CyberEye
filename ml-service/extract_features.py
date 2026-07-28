import re
from urllib.parse import urlparse

def extract_features(url: str) -> list:
    features = []
    
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
    features.append(1 if url.startswith('https') else 0)
    
    # 7. Subdomain count
    try:
        domain = urlparse(url).netloc
        features.append(domain.count('.'))
    except:
        features.append(0)
    
    # 8. Suspicious keywords
    suspicious = ['login', 'verify', 'secure', 'account', 'update', 'banking']
    features.append(1 if any(word in url.lower() for word in suspicious) else 0)
    
    # 9. URL shortener
    shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 't.co']
    features.append(1 if any(s in url for s in shorteners) else 0)
    
    return features

if __name__ == "__main__":
    test_url = "http://192.168.1.1/login-verify-account.com"
    print(extract_features(test_url))
