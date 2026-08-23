import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

import loginLeftImg from "../assets/login-left.jpg";
import loginRightImg from "../assets/login-right.jpg";

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
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("cybereye_token", data.token);

      localStorage.setItem(
        "cybereye_user",
        JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        height: "calc(100dvh - 70px)",
        minHeight: 0,
        overflow: "hidden",
        background: "var(--bg)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 450px minmax(0, 1fr)",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ================= LEFT IMAGE ================= */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <img
          src={loginLeftImg}
          alt=""
          style={{
            display: "block",
            width: "min(360px, 75%)",
            height: "auto",
            objectFit: "contain",
            opacity: 0.75,
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* ================= LOGIN CARD ================= */}
      <div
        style={{
          width: "450px",
          maxWidth: "calc(100% - 30px)",
          maxHeight: "calc(100dvh - 90px)",
          boxSizing: "border-box",
          padding: "36px 42px",
          borderRadius: "20px",
          background: "rgba(10, 18, 10, 0.78)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(57,255,20,0.25)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 0 35px rgba(57,255,20,0.04)",
          justifySelf: "center",
          alignSelf: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LOCK ICON */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              border: "1px solid rgba(57,255,20,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(57,255,20,0.35)",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#39ff14"
              strokeWidth="1.8"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              <circle cx="12" cy="16" r="1.5" fill="#39ff14" />
            </svg>
          </div>
        </div>

        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            lineHeight: "1.2",
            fontWeight: 800,
            color: "var(--text)",
            margin: 0,
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-dim)",
            fontSize: "14px",
            marginTop: "6px",
            marginBottom: "26px",
          }}
        >
          Login to continue to{" "}
          <span style={{ color: "var(--accent)" }}>Cybereye</span>
        </p>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <label
            style={{
              fontSize: "13px",
              color: "var(--text-dim)",
            }}
          >
            Email
          </label>

          <div
            style={{
              position: "relative",
              marginTop: "6px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#39ff14"
                strokeWidth="2"
              >
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
                boxSizing: "border-box",
                padding: "12px 12px 12px 40px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "rgba(0,0,0,0.3)",
                color: "var(--text)",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* PASSWORD */}
          <label
            style={{
              fontSize: "13px",
              color: "var(--text-dim)",
            }}
          >
            Password
          </label>

          <div
            style={{
              position: "relative",
              marginTop: "6px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#39ff14"
                strokeWidth="2"
              >
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
                boxSizing: "border-box",
                padding: "12px 40px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "rgba(0,0,0,0.3)",
                color: "var(--text)",
                fontSize: "14px",
                outline: "none",
              }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-dim)"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>

          {/* REMEMBER ME */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--text-dim)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  accentColor: "#39ff14",
                }}
              />
              Remember me
            </label>

            <span
              style={{
                fontSize: "13px",
                color: "var(--accent)",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p
              style={{
                color: "var(--danger)",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0a120a"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </AnimatedButton>

          {/* OR */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "18px 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--border)",
              }}
            />

            <span
              style={{
                fontSize: "12px",
                color: "var(--text-dim)",
              }}
            >
              OR
            </span>

            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--border)",
              }}
            />
          </div>

          {/* REGISTER */}
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "var(--text-dim)",
              margin: 0,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--accent)",
                fontWeight: 600,
              }}
            >
              Register now
            </Link>
          </p>
        </form>
      </div>

      {/* ================= RIGHT IMAGE ================= */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <img
          src={loginRightImg}
          alt=""
          style={{
            display: "block",
            width: "min(380px, 85%)",
            height: "auto",
            objectFit: "contain",
            opacity: 0.75,
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* RESPONSIVE */}
      <style>
        {`
          @media (max-width: 1050px) {
            .login-page {
              grid-template-columns: 1fr 430px 1fr !important;
            }

            .login-page img {
              width: 80% !important;
            }
          }

          @media (max-width: 850px) {
            .login-page {
              grid-template-columns: 1fr !important;
              overflow-y: auto !important;
            }

            .login-page > div:first-child,
            .login-page > div:last-child {
              display: none !important;
            }

            .login-page > div:nth-child(2) {
              width: 430px !important;
              max-width: calc(100% - 30px) !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
