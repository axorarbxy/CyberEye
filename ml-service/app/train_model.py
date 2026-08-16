import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
from extract_features import extract_features

df = pd.read_csv("../data/phishing_site_urls.csv")

print("Columns found:", df.columns.tolist())
print("Shape:", df.shape)
print(df.head())

URL_COLUMN = "URL"
LABEL_COLUMN = "Label"

print("Extracting features... this may take a few minutes for large datasets")
X = df[URL_COLUMN].apply(extract_features).tolist()

y = df[LABEL_COLUMN].apply(lambda x: 1 if str(x).lower() in ["bad", "phishing", "1"] else 0)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

joblib.dump(model, "phishing_model.pkl")
print("Model saved as phishing_model.pkl")
