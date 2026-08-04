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
      const token = localStorage.getItem("cybereye_token");

      const response = await fetch("http://localhost:5000/api/scan/history", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch scan history");
      }

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
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <p>Overview of recent scans and flagged threats.</p>

      <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
        <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px", flex: 1 }}>
          <h3>Total Scans</h3>
          <p style={{ fontSize: "28px", margin: 0 }}>{totalScans}</p>
        </div>
        <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px", flex: 1 }}>
          <h3>Flagged</h3>
          <p style={{ fontSize: "28px", margin: 0, color: "red" }}>{flaggedScans}</p>
        </div>
      </div>

      {loading && <p>Loading scan history...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #333" }}>
                <th style={{ padding: "8px" }}>Type</th>
                <th style={{ padding: "8px" }}>Input</th>
                <th style={{ padding: "8px" }}>Verdict</th>
                <th style={{ padding: "8px" }}>Risk Score</th>
                <th style={{ padding: "8px" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {scans.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: "8px" }}>No scans yet.</td>
                </tr>
              ) : (
                scans.map((scan) => (
                  <tr key={scan._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px" }}>{scan.scanType}</td>
                    <td style={{ padding: "8px" }}>{scan.input}</td>
                    <td style={{ padding: "8px" }}>{scan.verdict}</td>
                    <td style={{ padding: "8px" }}>{scan.riskScore}</td>
                    <td style={{ padding: "8px" }}>
                      {new Date(scan.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <RiskChart scans={scans} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
