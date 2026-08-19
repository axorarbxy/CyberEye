import { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";

function AndroidScanner() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleScan = async () => {
    if (!file) {
      setError("Please select an APK file to scan");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".apk")) {
      setError("Please select a valid .apk file");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("cybereye_token");
      const formData = new FormData();
      formData.append("apk", file);

      const response = await fetch("http://localhost:5000/api/scan/android", {
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

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 32px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>Android App Scanner</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Upload an APK file to check for malicious behavior and permission risks.
      </p>

      <input
        type="file"
        accept=".apk"
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
          {loading ? "Scanning..." : "Scan APK"}
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
          <p><strong>File:</strong> {result.input}</p>
          <p><strong>Verdict:</strong> {result.verdict}</p>
          <p><strong>Risk Score:</strong> {result.riskScore}</p>
          {result.details?.permissions && (
            <div style={{ marginTop: "10px" }}>
              <strong>Permissions requested:</strong>
              <ul style={{ marginTop: "6px", paddingLeft: "20px" }}>
                {result.details.permissions.map((p, i) => (
                  <li key={i} style={{ fontSize: "13px", color: "var(--text-dim)" }}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AndroidScanner;
