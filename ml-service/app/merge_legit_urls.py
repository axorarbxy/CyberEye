import pandas as pd

# Load Tranco top sites (no header: rank, domain)
tranco = pd.read_csv("../data/top-1m.csv", header=None, names=["rank", "domain"])

# Take top 10,000 most popular legitimate domains
top_domains = tranco.head(10000)["domain"].tolist()

# Format as full URLs, label as 'good'
legit_rows = pd.DataFrame({
    "URL": [f"https://{d}" for d in top_domains],
    "Label": ["good"] * len(top_domains)
})

# Load original dataset
original = pd.read_csv("../data/phishing_site_urls.csv")

# Combine and shuffle
combined = pd.concat([original, legit_rows], ignore_index=True)
combined = combined.sample(frac=1, random_state=42).reset_index(drop=True)

combined.to_csv("../data/phishing_site_urls_v2.csv", index=False)
print(f"Combined dataset shape: {combined.shape}")
print(combined["Label"].value_counts())
