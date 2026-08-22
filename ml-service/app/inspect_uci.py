import pandas as pd

df = pd.read_csv("../data/PhiUSIIL_Phishing_URL_Dataset.csv")
print("Shape:", df.shape)
print("\nColumns:", df.columns.tolist())
print("\nFirst 3 rows:")
print(df.head(3))
print("\nLabel column value counts (guessing 'label'):")
if 'label' in df.columns:
    print(df['label'].value_counts())
