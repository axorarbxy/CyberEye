import { useState, useEffect } from "react";
import RiskChart from "../components/RiskChart";

function Dashboard() {
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
      const response = await fetch("http://localhost:5000/api/scan/history");
      if (!response.ok) {
        throw new Error("Failed to fetch scan history");
      }
      const data = await response.json();
      setScans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalScans = scans.length;
  const flaggedScans = scans.filter(
    (s) => s.verdict !== "safe" && s.verdict !== "not-implemented"
  ).length;

  const cardStyle = {
    padding: "20px",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    flex: 1,
    background: "var(--bg-panel)",
  };

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>Dashboard</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Overview of recent scans and flagged threats.
      </p>

      <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
        <div style={cardStyle}>
          <h3 style={{ color: "var(--text-dim)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Total Scans
          </h3>
          <p style={{ fontSize: "32px", margin: "8px 0 0", fontWeight: 700, color: "var(--accent)" }}>
            {totalScans}
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={{ color: "var(--text-dim)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Flagged
          </h3>
          <p style={{ fontSize: "32px", margin: "8px 0 0", fontWeight: 700, color: "var(--danger)" }}>
            {flaggedScans}
          </p>
        </div>
      </div>

      {loading && <p style={{ color: "var(--text-dim)" }}>Loading scan history...</p>}
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "8px",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", background: "var(--bg-panel)" }}>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Time</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Input</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Verdict</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)",
