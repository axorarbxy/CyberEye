from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from extract_features import extract_features

app = FastAPI()
model = joblib.load("phishing_model.pkl")

class URLRequest(BaseModel):
    url: str

@app.get("/")
def health_check():
    return {"status": "Cybereye ML service running"}

@app.post("/predict-url")
def predict_url(request: URLRequest):
    features = extract_features(request.url)
    prediction = model.predict([features])[0]
    probability = model.predict_proba([features])[0].max()
    return {
        "url": request.url,
        "is_phishing": bool(prediction),
        "confidence": round(float(probability), 3)
    }
