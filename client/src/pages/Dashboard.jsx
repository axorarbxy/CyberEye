import { useState, useEffect } from "react";
import RiskChart from "../components/RiskChart";
import CountUp from "../components/CountUp";
import HoverCard from "../components/HoverCard";

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
      const token = localStorage.getItem("cybereye_token");
      const response = await fetch("http://localhost:5000/api/scan/history", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
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

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>Dashboard</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Overview of recent scans and flagged threats.
      </p>

      <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
        <HoverCard style={{ padding: "20px", flex: 1 }}>
          <h3 style={{ color: "var(--text-dim)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Total Scans
          </h3>
          <p style={{ fontSize: "32px", margin: "8px 0 0", fontWeight: 700, color: "var(--accent)" }}>
            <CountUp value={totalScans} />
          </p>
        </HoverCard>
        <HoverCard style={{ padding: "20px", flex: 1 }}>
          <h3 style={{ color: "var(--text-dim)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Flagged
          </h3>
          <p style={{ fontSize: "32px", margin: "8px 0 0", fontWeight: 700, color: "var(--danger)" }}>
            <CountUp value={flaggedScans} />
          </p>
        </HoverCard>
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
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Type</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Input</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Verdict</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Risk Score</th>
                  <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {scans.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "16px", color: "var(--text-dim)" }}>
                      No scans yet.
                    </td>
                  </tr>
                ) : (
                  scans.map((scan) => {
                    const isSafe = scan.verdict === "safe";
                    return (
                      <tr key={scan._id} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>{scan.scanType}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "var(--text-dim)" }}>{scan.input}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                          <span style={{
                            padding: "2px 10px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: 600,
                            background: isSafe ? "rgba(74, 222, 128, 0.15)" : "rgba(248, 113, 113, 0.15)",
                            color: isSafe ? "var(--success)" : "var(--danger)",
                          }}>
                            {scan.verdict}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>{scan.riskScore}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "var(--text-dim)" }}>
                          {new Date(scan.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "24px" }}>
            <RiskChart scans={scans} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
