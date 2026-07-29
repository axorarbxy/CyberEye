import { useState } from "react";

function UrlScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/scan/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Scan request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>URL Scanner</h1>
      <p>Check if a URL is likely phishing or safe.</p>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL to scan"
        style={{ width: "100%", padding: "10px", fontSize: "14px" }}
      />

      <button
        onClick={handleScan}
        disabled={loading}
        style={{ marginTop: "12px", padding: "10px 20px", cursor: "pointer" }}
      >
        {loading ? "Scanning..." : "Scan URL"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <p><strong>URL:</strong> {result.input}</p>
          <p><strong>Verdict:</strong> {result.verdict}</p>
          <p><strong>Risk Score:</strong> {result.riskScore}</p>
        </div>
      )}
    </div>
  );
}

export default UrlScanner;
