import { useState, useEffect } from "react";

function Settings() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("cybereye_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleClearHistory = () => {
    setMessage("This would clear your scan history (not yet connected to backend).");
  };

  const handleLogoutAllDevices = () => {
    localStorage.removeItem("cybereye_token");
    localStorage.removeItem("cybereye_user");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "40px 32px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>Settings</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Manage your account and preferences.
      </p>

      <div style={{
        padding: "20px",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        background: "var(--bg-panel)",
        marginBottom: "20px"
      }}>
        <h3 style={{ fontSize: "14px", color: "var(--text-dim)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Account
        </h3>
        {user ? (
          <>
            <p style={{ marginBottom: "6px" }}><strong>Name:</strong> {user.name}</p>
            <p style={{ marginBottom: "6px" }}><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        ) : (
          <p style={{ color: "var(--text-dim)" }}>Not logged in.</p>
        )}
      </div>

      <div style={{
        padding: "20px",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        background: "var(--bg-panel)",
        marginBottom: "20px"
      }}>
        <h3 style={{ fontSize: "14px", color: "var(--text-dim)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Data
        </h3>
        <button
          onClick={handleClearHistory}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text)"
          }}
        >
          Clear Scan History
        </button>
      </div>

      <div style={{
        padding: "20px",
        border: "1px solid var(--danger)",
        borderRadius: "10px",
        background: "var(--bg-panel)"
      }}>
        <h3 style={{ fontSize: "14px", color: "var(--danger)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Danger Zone
        </h3>
        <button
          onClick={handleLogoutAllDevices}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            background: "var(--danger)",
            color: "#fff",
            fontWeight: 600
          }}
        >
          Logout
        </button>
      </div>

      {message && <p style={{ marginTop: "16px", color: "var(--text-dim)" }}>{message}</p>}
    </div>
  );
}

export default Settings;
