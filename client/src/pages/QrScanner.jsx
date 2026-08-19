import { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";

function QrScanner() {
  const [file, setFile] = useState(null);
  const [decodedUrl, setDecodedUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setDecodedUrl("");
    setError("");
  };

  const handleScan = async () => {
    if (!file) {
      setError("Please select a QR code image to scan");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("cybereye_token");
      const formData = new FormData();
      formData.append("qr", file);

      const response = await fetch("http://localhost:5000/api/scan/qr", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Scan request failed");
      }

      setDecodedUrl(data.decodedUrl || "");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 32px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>QR Code Scanner</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Upload a QR code image — we decode it and check the URL for safety.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          background: "var(--bg-panel)",
          color: "var(--text)"
        }}
      />

      <div style={{ marginTop: "16px" }}>
        <AnimatedButton onClick={handleScan} disabled={loading}>
          {loading ? "Scanning..." : "Scan QR Code"}
        </AnimatedButton>
      </div>

      {error && <p style={{ color: "var(--danger)", marginTop: "12px" }}>{error}</p>}

      {result && (
        <div style={{
          marginTop: "20px",
          padding: "16px",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          background: "var(--bg-panel)"
        }}>
          {decodedUrl && <p><strong>Decoded URL:</strong> {decodedUrl}</p>}
          <p><strong>Verdict:</strong> {result.verdict}</p>
          <p><strong>Risk Score:</strong> {result.riskScore}</p>
        </div>
      )}
    </div>
  );
}

export default QrScanner;
