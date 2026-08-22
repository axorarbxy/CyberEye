import pandas as pd

# Original Kaggle dataset (URL, Label: good/bad)
kaggle = pd.read_csv("../data/phishing_site_urls.csv")
kaggle = kaggle.rename(columns={"URL": "URL", "Label": "raw_label"})
kaggle["Label"] = kaggle["raw_label"].apply(lambda x: "bad" if str(x).lower() == "bad" else "good")
kaggle = kaggle[["URL", "Label"]]

# Tranco top legitimate domains (already merged in v2, re-extract here to keep the merge script self-contained)
tranco = pd.read_csv("../data/top-1m.csv", header=None, names=["rank", "domain"])
top_domains = tranco.head(10000)["domain"].tolist()
tranco_rows = pd.DataFrame({
    "URL": [f"https://{d}" for d in top_domains],
    "Label": ["good"] * len(top_domains)
})

# UCI PhiUSIIL dataset (URL, label: 1=legit, 0=phishing -- opposite convention, map carefully)
uci = pd.read_csv("../data/PhiUSIIL_Phishing_URL_Dataset.csv")
uci_rows = pd.DataFrame({
    "URL": uci["URL"],
    "Label": uci["label"].apply(lambda x: "good" if x == 1 else "bad")
})

# Combine everything
combined = pd.concat([kaggle, tranco_rows, uci_rows], ignore_index=True)
combined = combined.drop_duplicates(subset="URL")
combined = combined.sample(frac=1, random_state=42).reset_index(drop=True)

combined.to_csv("../data/phishing_site_urls_v3.csv", index=False)
print(f"Combined dataset shape: {combined.shape}")
print(combined["Label"].value_counts())
