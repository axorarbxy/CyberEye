import { useState, useEffect } from "react";
import RiskChart from "../components/RiskChart";
import StatCard from "../components/StatCard";

function buildTrend(items) {
  const sorted = [...items].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return sorted.map((_, i) => ({ value: i + 1 }));
}

function Dashboard() {
  const [scans, setScans] = useState([]);
  const [shadowAiEvents, setShadowAiEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
    fetchShadowAiHistory();
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

  const fetchShadowAiHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/scan/shadow-ai-history");
      if (!response.ok) return;
      const data = await response.json();
      setShadowAiEvents(data);
    } catch (err) {
      // supplementary section, fail silently
    }
  };

  const totalScans = scans.length;
  const flaggedList = scans.filter((s) => s.verdict !== "safe" && s.verdict !== "not-implemented");
  const flaggedScans = flaggedList.length;

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{
        fontSize: "32px",
        fontWeight: 800,
        marginBottom: "4px",
        background: "linear-gradient(90deg, #4ea8de, #82c49a)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        Dashboard
      </h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Overview of recent scans and flagged threats.
      </p>

      <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
        <StatCard
          icon="📋"
          label="TOTAL SCANS"
          value={totalScans}
          trendData={buildTrend(scans)}
          gradient="linear-gradient(135deg, rgba(99,102,241,0.25), rgba(99,102,241,0.05))"
          accentColor="#818cf8"
          lineColor="#818cf8"
        />
        <StatCard
          icon="🚩"
          label="FLAGGED"
          value={flaggedScans}
          trendData={buildTrend(flaggedList)}
          gradient="linear-gradient(135deg, rgba(52,211,153,0.22), rgba(52,211,153,0.05))"
          accentColor="#f87171"
          lineColor="#34d399"
        />
        <StatCard
          icon="✨"
          label="SHADOW AI EVENTS"
          value={shadowAiEvents.length}
          trendData={buildTrend(shadowAiEvents)}
          gradient="linear-gradient(135deg, rgba(52,211,153,0.22), rgba(52,211,153,0.05))"
          accentColor="#fbbf24"
          lineColor="#34d399"
        />
      </div>

      {loading && <p style={{ color: "var(--text-dim)" }}>Loading scan history...</p>}
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "24px",
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
                    const icon = scan.scanType === "malware" ? "🐛" : scan.scanType === "url" ? "🔗" : "🛡";
                    return (
                      <tr key={scan._id} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>{icon} {scan.scanType}</td>
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

          <div style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "4px" }}>Shadow AI Activity</h2>
            <p style={{ color: "var(--text-dim)", fontSize: "13px", marginBottom: "16px" }}>
              Org-wide events flagged by the Shadow AI Sentinel browser extension, across all devices.
            </p>
            <div style={{
              border: "1px solid var(--border)",
              borderRadius: "10px",
              overflow: "hidden",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", background: "var(--bg-panel)" }}>
                    <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>AI Domain</th>
                    <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Reason</th>
                    <th style={{ padding: "12px 16px", color: "var(--text-dim)", fontSize: "13px", fontWeight: 600 }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {shadowAiEvents.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ padding: "16px", color: "var(--text-dim)" }}>
                        No Shadow AI events detected yet.
                      </td>
                    </tr>
                  ) : (
                    shadowAiEvents.map((event) => (
                      <tr key={event._id} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px 16px", fontSize: "14px" }}>{event.details?.domain || "Unknown"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "var(--text-dim)" }}>{event.details?.reason || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "var(--text-dim)" }}>
                          {new Date(event.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
