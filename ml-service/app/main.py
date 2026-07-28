from fastapi import FastAPI
from pydantic import BaseModel
from extract_features import extract_features

app = FastAPI()

class URLRequest(BaseModel):
  url: str

@app.get("/")
def health_check():
  return {"status":"Cybereye ML service running"}

@app.post("/predict-url")
def predict_url(request: URL Request):
  features = extract_features(request.url)

  return{
    "url": request.url,
    "features": features,
    "status": "model not trained yet"
  }
