import { useState, useEffect } from "react";
import AnimatedButton from "../components/AnimatedButton";

function Reports() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("cybereye_token");
      const response = await fetch("http://localhost:5000/api/scan/history", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch scan history");
      const data = await response.json();
      setScans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const byType = scans.reduce((acc, s) => {
    acc[s.scanType] = (acc[s.scanType] || 0) + 1;
    return acc;
  }, {});

  const maliciousCount = scans.filter((s) => s.verdict === "malicious" || s.verdict === "flagged").length;
  const safeCount = scans.filter((s) => s.verdict === "safe").length;

  const handleExportCSV = () => {
    const headers = ["Type", "Input", "Verdict", "Risk Score", "Timestamp"];
    const rows = scans.map((s) => [
      s.scanType,
      `"${s.input}"`,
      s.verdict,
      s.riskScore,
      new Date(s.createdAt).toISOString()
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `cybereye-report-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <h1 style={{ fontSize: "28px" }}>Reports</h1>
        {scans.length > 0 && (
          <AnimatedButton onClick={handleExportCSV}>
            Export CSV
          </AnimatedButton>
        )}
      </div>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Summary of all your scan activity.
      </p>

      {loading && <p style={{ color: "var(--text-dim)" }}>Loading report data...</p>}
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <div style={{ flex: 1, padding: "20px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--bg-panel)" }}>
              <h3 style={{ fontSize: "13px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Scans</h3>
              <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--accent)", margin: "8px 0 0" }}>{scans.length}</p>
            </div>
            <div style={{ flex: 1, padding: "20px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--bg-panel)" }}>
              <h3 style={{ fontSize: "13px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Flagged / Malicious</h3>
              <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--danger)", margin: "8px 0 0" }}>{maliciousCount}</p>
            </div>
            <div style={{ flex: 1, padding: "20px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--bg-panel)" }}>
              <h3 style={{ fontSize: "13px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Safe</h3>
              <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--success, #4ade80)", margin: "8px 0 0" }}>{safeCount}</p>
            </div>
          </div>

          <div style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--bg-panel)", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "14px", color: "var(--text-dim)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Scans by Type
            </h3>
            {Object.keys(byType).length === 0 ? (
              <p style={{ color: "var(--text-dim)" }}>No scans yet.</p>
            ) : (
              Object.entries(byType).map(([type, count]) => (
                <div key={type} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ textTransform: "capitalize" }}>{type}</span>
                  <span style={{ fontWeight: 600 }}>{count}</span>
                </div>
              ))
            )}
          </div>

          {scans.length === 0 && (
            <p style={{ color: "var(--text-dim)" }}>Run some scans first — reports will populate automatically.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Reports;
