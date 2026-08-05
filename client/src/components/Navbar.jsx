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

  return (
    <nav style={{
      padding: "16px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <Link to="/" style={{ marginRight: "16px" }}>Home</Link>
        {token && (
          <>
            <Link to="/url-scanner" style={{ marginRight: "16px" }}>URL Scanner</Link>
            <Link to="/dashboard" style={{ marginRight: "16px" }}>Dashboard</Link>
          </>
        )}
      </div>

      <div>
        {token ? (
          <>
            <span style={{ marginRight: "16px" }}>
              Hi, {user?.name || "User"}
            </span>
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "16px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
