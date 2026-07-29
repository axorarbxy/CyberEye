import pandas as pd

df = pd.read_csv("../data/phishing_site_urls.csv")

print("Shape:", df.shape)
print("\nColumns:", df.columns.tolist())
print("\nFirst 5 rows:")
print(df.head())
print("\nLabel value counts:")
print(df[df.columns[-1]].value_counts())
