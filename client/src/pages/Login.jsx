import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("cybereye_token", data.token);
      localStorage.setItem("cybereye_user", JSON.stringify({
        name: data.name,
        email: data.email,
        role: data.role
      }));

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "relative",
      minHeight: "700px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
    }}>
      {/* Left decorative dot-grid world map */}
      <svg width="500" height="500" viewBox="0 0 500 500" style={{ position: "absolute", left: "-40px", top: "50%", transform: "translateY(-50%)", opacity: 0.35, pointerEvents: "none" }}>
        {Array.from({ length: 400 }).map((_, i) => {
          const x = (i % 20) * 24 + 20;
          const y = Math.floor(i / 20) * 24 + 20;
          const show = Math.sin(x * 0.05) + Math.cos(y * 0.07) > 0.3;
          return show ? (
            <circle key={i} cx={x} cy={y} r="1.4" fill="#39ff14" />
          ) : null;
        })}
      </svg>

      {/* Right decorative network + shield */}
      <svg width="500" height="500" viewBox="0 0 500 500" style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", opacity: 0.5, pointerEvents: "none" }}>
        <g stroke="#39ff14" strokeWidth="1" opacity="0.4">
          <line x1="40" y1="60" x2="140" y2="120" />
          <line x1="140" y1="120" x2="90" y2="220" />
          <line x1="140" y1="120" x2="250" y2="90" />
          <line x1="250" y1="90" x2="380" y2="60" />
          <line x1="90" y1="220" x2="60" y2="340" />
          <line x1="90" y1="220" x2="200" y2="300" />
          <line x1="200" y1="300" x2="150" y2="420" />
        </g>
        <g fill="#39ff14">
          <circle cx="40" cy="60" r="4" />
          <circle cx="140" cy="120" r="5" />
          <circle cx="90" cy="220" r="4" />
          <circle cx="250" cy="90" r="5" />
          <circle cx="380" cy="60" r="4" />
          <circle cx="60" cy="340" r="4" />
          <circle cx="200" cy="300" r="5" />
          <circle cx="150" cy="420" r="4" />
        </g>
        <g transform="translate(230, 180)" stroke="#39ff14" strokeWidth="2" fill="rgba(57,255,20,0.06)">
          <path d="M90 20 L150 45 L150 110 Q150 170 90 200 Q30 170 30 110 L30 45 Z" />
          <rect x="65" y="95" width="50" height="45" rx="4" fill="rgba(57,255,20,0.15)" />
          <path d="M75 95 L75 78 Q75 60 90 60 Q105 60 105 78 L105 95" fill="none" />
          <circle cx="90" cy="115" r="6" fill="#39ff14" />
        </g>
      </svg>

      {/* Glassmorphic login card */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "420px",
        padding: "40px",
        borderRadius: "20px",
        background: "rgba(10, 18, 10, 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(57,255,20,0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            border: "1px solid rgba(57,255,20,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(57,255,20,0.35)",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="1.8">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              <circle cx="12" cy="16" r="1.5" fill="#39ff14" />
            </svg>
          </div>
        </div>

        <h1 style={{ textAlign: "center", fontSize: "28px", fontWeight: 800, color: "var(--text)", margin: 0 }}>
          Welcome Back
        </h1>
        <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "14px", marginTop: "6px", marginBottom: "28px" }}>
          Login to continue to <span style={{ color: "var(--accent)" }}>Cybereye</span>
        </p>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: "13px", color: "var(--text-dim)" }}>Email</label>
          <div style={{ position: "relative", marginTop: "6px", marginBottom: "16px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 6 10-6" />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "rgba(0,0,0,0.3)",
                color: "var(--text)",
                fontSize: "14px",
              }}
            />
          </div>

          <label style={{ fontSize: "13px", color: "var(--text-dim)" }}>Password</label>
          <div style={{ position: "relative", marginTop: "6px", marginBottom: "12px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "12px 40px 12px 40px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "rgba(0,0,0,0.3)",
                color: "var(--text)",
                fontSize: "14px",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-dim)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: "#39ff14" }}
              />
              Remember me
            </label>
            <span style={{ fontSize: "13px", color: "var(--accent)", cursor: "pointer" }}>Forgot password?</span>
          </div>

          {error && <p style={{ color: "var(--danger)", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}

          <AnimatedButton
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              fontSize: "15px",
              background: "linear-gradient(90deg, #39ff14, #00cc33)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a120a" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </AnimatedButton>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-dim)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--accent)", fontWeight: 600 }}>Register now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
