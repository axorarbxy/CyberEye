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
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

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
        throw new Error(data.error || "Invalid email or password.");
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
      if (err.message === "Failed to fetch") {
        setError(
          "Unable to connect. Please check your connection and try again."
        );
      } else {
        setError(
          err.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    height: "50px",
    boxSizing: "border-box",
    padding: "12px 42px",
    borderRadius: "10px",
    border: `1px solid ${
      hasError ? "var(--danger)" : "var(--border)"
    }`,
    background: "rgba(0, 0, 0, 0.3)",
    color: "var(--text)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  });

  return (
    <>
      {/* =========================
          RESPONSIVE LOGIN STYLES
      ========================== */}
      <style>
        {`
          .login-page {
            width: 100%;
            height: calc(100dvh - 77px);
            min-height: 0;
            overflow: hidden;
            box-sizing: border-box;

            display: grid;
            grid-template-columns:
              minmax(0, 1fr)
              minmax(420px, 500px)
              minmax(0, 1fr);

            align-items: center;

            padding: 24px 32px;

            background: var(--bg);
          }

          .login-side {
            height: 100%;
            min-width: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            overflow: hidden;
            pointer-events: none;
          }

          .login-side img {
            display: block;
            width: min(380px, 26vw);
            max-width: 380px;
            height: auto;

            opacity: 0.7;
            mix-blend-mode: screen;

            user-select: none;
            pointer-events: none;
          }

          .login-card {
            position: relative;
            z-index: 2;

            width: 100%;
            max-width: 500px;

            box-sizing: border-box;

            padding: 30px 40px;

            border-radius: 20px;

            background: rgba(10, 18, 10, 0.75);

            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);

            border: 1px solid rgba(57, 255, 20, 0.25);

            box-shadow:
              0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 30px rgba(57, 255, 20, 0.04);

            justify-self: center;
          }

          .login-icon-wrapper {
            width: 64px;
            height: 64px;

            border-radius: 50%;

            border: 1px solid rgba(57, 255, 20, 0.4);

            display: flex;
            align-items: center;
            justify-content: center;

            box-shadow:
              0 0 30px rgba(57, 255, 20, 0.25),
              inset 0 0 20px rgba(57, 255, 20, 0.04);

            margin: 0 auto 16px;
          }

          .login-title {
            text-align: center;

            font-size: 27px;
            line-height: 1.2;
            font-weight: 800;

            color: var(--text);

            margin: 0;
          }

          .login-subtitle {
            text-align: center;

            color: var(--text-dim);

            font-size: 14px;
            line-height: 1.4;

            margin: 6px 0 24px;
          }

          .login-field {
            margin-bottom: 15px;
          }

          .login-label {
            display: block;

            font-size: 13px;
            font-weight: 500;

            color: var(--text-dim);

            margin-bottom: 6px;
          }

          .login-input-wrapper {
            position: relative;
            width: 100%;
          }

          .login-input-wrapper input::placeholder {
            color: #777;
          }

          .login-input-wrapper input:focus {
            border-color: rgba(57, 255, 20, 0.7) !important;

            box-shadow:
              0 0 0 3px rgba(57, 255, 20, 0.08),
              0 0 18px rgba(57, 255, 20, 0.06);
          }

          .login-input-icon {
            position: absolute;

            left: 14px;
            top: 50%;

            transform: translateY(-50%);

            display: flex;
            align-items: center;

            pointer-events: none;
          }

          .password-toggle {
            position: absolute;

            right: 8px;
            top: 50%;

            transform: translateY(-50%);

            width: 34px;
            height: 34px;

            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;

            background: transparent;
            border: none;

            border-radius: 7px;

            padding: 0;

            transition:
              background 0.2s ease,
              color 0.2s ease;
          }

          .password-toggle:hover {
            background: rgba(57, 255, 20, 0.08);
          }

          .login-error {
            color: var(--danger);

            font-size: 12px;

            margin: -8px 0 12px;
          }

          .login-options {
            display: flex;

            align-items: center;
            justify-content: space-between;

            gap: 12px;

            margin: 2px 0 18px;
          }

          .remember-label {
            display: flex;

            align-items: center;

            gap: 7px;

            font-size: 13px;

            color: var(--text-dim);

            cursor: pointer;

            user-select: none;
          }

          .remember-label input {
            width: 15px;
            height: 15px;

            margin: 0;

            accent-color: #39ff14;

            cursor: pointer;
          }

          .forgot-password {
            font-size: 13px;

            color: var(--accent);

            text-decoration: none;

            cursor: pointer;

            transition: opacity 0.2s ease;
          }

          .forgot-password:hover {
            opacity: 0.8;
          }

          .login-error-global {
            color: var(--danger);

            font-size: 13px;

            text-align: center;

            margin: -4px 0 12px;

            line-height: 1.4;
          }

          .login-divider {
            display: flex;

            align-items: center;

            gap: 12px;

            margin: 17px 0;
          }

          .login-divider-line {
            flex: 1;

            height: 1px;

            background: var(--border);
          }

          .login-divider-text {
            font-size: 12px;

            color: var(--text-dim);

            flex-shrink: 0;
          }

          .register-text {
            text-align: center;

            font-size: 13px;

            color: var(--text-dim);

            margin: 0;
          }

          .register-link {
            color: var(--accent);

            font-weight: 600;

            text-decoration: none;

            transition: opacity 0.2s ease;
          }

          .register-link:hover {
            opacity: 0.8;
          }

          /* ==================================
             TABLET / SMALL LAPTOP
          ================================== */

          @media (max-width: 1150px) {
            .login-page {
              grid-template-columns:
                minmax(0, 1fr)
                minmax(400px, 480px)
                minmax(0, 1fr);

              padding-left: 20px;
              padding-right: 20px;
            }

            .login-side img {
              width: min(300px, 24vw);
            }

            .login-card {
              padding-left: 32px;
              padding-right: 32px;
            }
          }

          /* ==================================
             MOBILE / NARROW SCREEN
          ================================== */

          @media (max-width: 850px) {
            .login-page {
              display: flex;

              align-items: center;
              justify-content: center;

              height: calc(100dvh - 77px);

              padding: 20px;

              overflow-y: auto;
            }

            .login-side {
              display: none;
            }

            .login-card {
              width: min(100%, 460px);

              padding: 28px 24px;

              border-radius: 18px;
            }
          }

          /* ==================================
             VERY SMALL MOBILE
          ================================== */

          @media (max-width: 420px) {
            .login-page {
              padding: 14px;
            }

            .login-card {
              padding: 24px 18px;

              border-radius: 16px;
            }

            .login-title {
              font-size: 24px;
            }

            .login-subtitle {
              margin-bottom: 20px;
            }

            .login-options {
              align-items: flex-start;
            }
          }

          /* ==================================
             REDUCED MOTION
          ================================== */

          @media (prefers-reduced-motion: reduce) {
            .login-input-wrapper input,
            .password-toggle,
            .forgot-password,
            .register-link {
              transition: none !important;
            }
          }
        `}
      </style>

      {/* =========================
          LOGIN PAGE
      ========================== */}

      <main className="login-page">

        {/* =========================
            LEFT IMAGE
        ========================== */}

        <div className="login-side">
          <img
            src={loginLeftImg}
            alt=""
            aria-hidden="true"
          />
        </div>

        {/* =========================
            LOGIN CARD
        ========================== */}

        <div className="login-card">

          {/* LOCK ICON */}

          <div className="login-icon-wrapper">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#39ff14"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="11"
                width="14"
                height="10"
                rx="2"
              />

              <path d="M8 11V7a4 4 0 0 1 8 0v4" />

              <circle
                cx="12"
                cy="16"
                r="1.5"
                fill="#39ff14"
              />
            </svg>
          </div>

          {/* TITLE */}

          <h1 className="login-title">
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Login to continue to{" "}
            <span style={{ color: "var(--accent)" }}>
              Cybereye
            </span>
          </p>

          {/* =========================
              FORM
          ========================== */}

          <form
            onSubmit={handleLogin}
            noValidate
          >

            {/* EMAIL */}

            <div className="login-field">

              <label
                htmlFor="login-email"
                className="login-label"
              >
                Email
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#39ff14"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="2"
                    />

                    <path d="M2 7l10 6 10-6" />
                  </svg>
                </span>

                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        email: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter your email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={
                    fieldErrors.email
                      ? "email-error"
                      : undefined
                  }
                  style={inputStyle(fieldErrors.email)}
                />

              </div>

              {fieldErrors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="login-error"
                  style={{
                    marginTop: "7px",
                  }}
                >
                  {fieldErrors.email}
                </p>
              )}

            </div>

            {/* PASSWORD */}

            <div
              className="login-field"
              style={{
                marginBottom: fieldErrors.password
                  ? "8px"
                  : "14px",
              }}
            >

              <label
                htmlFor="login-password"
                className="login-label"
              >
                Password
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#39ff14"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect
                      x="5"
                      y="11"
                      width="14"
                      height="10"
                      rx="2"
                    />

                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </span>

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        password: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter your password"
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={
                    fieldErrors.password
                      ? "password-error"
                      : undefined
                  }
                  style={inputStyle(fieldErrors.password)}
                />

                {/* SHOW / HIDE PASSWORD */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="password-toggle"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--text-dim)"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                    />
                  </svg>
                </button>

              </div>

              {fieldErrors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="login-error"
                  style={{
                    marginTop: "7px",
                  }}
                >
                  {fieldErrors.password}
                </p>
              )}

            </div>

            {/* REMEMBER + FORGOT */}

            <div className="login-options">

              <label className="remember-label">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

              <span className="forgot-password">
                Forgot password?
              </span>

            </div>

            {/* SERVER ERROR */}

            {error && (
              <p
                role="alert"
                className="login-error-global"
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
                height: "50px",
                padding: "0 13px",
                fontSize: "15px",

                background:
                  "linear-gradient(90deg, #39ff14, #00cc33)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                gap: "8px",
              }}
            >

              {loading
                ? "Signing in..."
                : "Login"}

              {!loading && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0a120a"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />

                  <path d="M13 6l6 6-6 6" />
                </svg>
              )}

            </AnimatedButton>

            {/* DIVIDER */}

            <div className="login-divider">

              <div className="login-divider-line" />

              <span className="login-divider-text">
                OR
              </span>

              <div className="login-divider-line" />

            </div>

            {/* REGISTER */}

            <p className="register-text">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="register-link"
              >
                Register now
              </Link>

            </p>

          </form>

        </div>

        {/* =========================
            RIGHT IMAGE
        ========================== */}

        <div className="login-side">
          <img
            src={loginRightImg}
            alt=""
            aria-hidden="true"
          />
        </div>

      </main>
    </>
  );
}

export default Login;
