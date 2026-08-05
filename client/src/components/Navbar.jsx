 import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("cybereye_token");
  const userStr = localStorage.getItem("cybereye_user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("cybereye_token");
    localStorage.removeItem("cybereye_user");
    navigate("/login");
  };

  const linkStyle = {
    marginRight: "24px",
    color: "var(--text-dim)",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <nav style={{
      padding: "16px 32px",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "var(--bg-panel)",
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{
          color: "var(--accent)",
          fontWeight: 700,
          fontSize: "18px",
          marginRight: "32px",
          letterSpacing: "-0.02em",
        }}>
          🛡 Cybereye
        </span>
        <Link to="/" style={linkStyle}>Home</Link>
        {token && (
          <>
            <Link to="/url-scanner" style={linkStyle}>URL Scanner</Link>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {token ? (
          <>
            <span style={{ marginRight: "16px", color: "var(--text-dim)", fontSize: "14px" }}>
              Hi, {user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text)",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ ...linkStyle, marginRight: "16px" }}>Login</Link>
            <Link
              to="/register"
              style={{
                background: "var(--accent)",
                color: "#0B1220",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
