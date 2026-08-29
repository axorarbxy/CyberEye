import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";
import registerLeftImg from "../assets/register-left.jpg";
import registerRightImg from "../assets/register-right.jpg";

function getPasswordStrength(password) {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = ["#ff3b3b", "#ff3b3b", "#ffae42", "#ffae42", "#39ff14", "#39ff14"];
  return { checks, score, label: labels[score], color: colors[score] };
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!agreedToTerms) errors.terms = "You must agree to the Terms and Privacy Policy";
    return errors;
  };

  const handleBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess(false);

    const errors = validate();
    setFieldErrors(errors);
    setTouched({ name: true, email: true, password: true, terms: true });
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong while creating your account. Please try again.");
      }

      localStorage.setItem("cybereye_token", data.token);
      localStorage.setItem("cybereye_user", JSON.stringify({
        name: data.name,
        email: data.email,
        role: data.role
      }));

      setSuccess(true);
      window.location.href = "/dashboard";
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("Unable to connect to Cybereye. Please check your connection and try again.");
      } else if (/exist/i.test(err.message)) {
        setError("This email is already registered. Try logging in instead.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "10px 40px 10px 40px",
    borderRadius: "10px",
    border: `1px solid ${hasError ? "var(--danger)" : "var(--border)"}`,
    background: "rgba(0,0,0,0.3)",
    color: "var(--text)",
    fontSize: "14px",
    outline: "none",
  });

  const showError = (field) => touched[field] && fieldErrors[field];

  return (
    <div className="register-page" style={{
      position: "fixed",
      top: "72px",
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      padding: "12px",
      boxSizing: "border-box",
      zIndex: 5,
    }}>
      <img
        src={registerLeftImg}
        alt=""
        aria-hidden="true"
        className="register-decor register-decor-left"
        style={{
          position: "absolute",
          left: "calc((100% - 440px) / 4)",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(280px, 18vw)",
          opacity: 0.7,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      <img
        src={registerRightImg}
        alt=""
        aria-hidden="true"
        className="register-decor register-decor-right"
        style={{
          position: "absolute",
          right: "calc((100% - 440px) / 4)",
          top: "50%",
          transform: "translate(50%, -50%)",
          width: "min(280px, 18vw)",
          opacity: 0.7,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      <div className="register-card" style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: "440px",
        maxHeight: "100%",
        overflowY: "auto",
        padding: "24px 32px",
        borderRadius: "20px",
        background: "rgba(10, 18, 10, 0.75)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(57,255,20,0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <div style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "1px solid rgba(57,255,20,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(57,255,20,0.35)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="1.8">
              <path d="M12 2 L20 6 L20 12 Q20 19 12 22 Q4 19 4 12 L4 6 Z" />
              <circle cx="12" cy="10" r="3" />
              <path d="M8 16c0-2 1.8-3 4-3s4 1 4 3" />
            </svg>
          </div>
        </div>

        <h1 style={{ textAlign: "center", fontSize: "22px", fontWeight: 800, color: "var(--text)", margin: 0 }}>
          Create <span style={{ color: "var(--accent)" }}>Account</span>
        </h1>
        <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "12.5px", marginTop: "4px", marginBottom: "10px" }}>
          Scan, analyze, and protect your digital assets from one secure dashboard.
        </p>

        <ul style={{
          listStyle: "none",
          padding: "8px 12px",
          margin: "0 0 14px",
          background: "rgba(57,255,20,0.06)",
          border: "1px solid rgba(57,255,20,0.15)",
          borderRadius: "8px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2px",
        }}>
          {["URL threat scanning", "Malware & QR analysis", "Full scan history", "Personalized dashboard"].map((item) => (
            <li key={item} style={{ fontSize: "10.5px", color: "var(--text-dim)" }}>
              <span style={{ color: "var(--accent)" }}>✓</span> {item}
            </li>
          ))}
        </ul>

        <form onSubmit={handleRegister} noValidate>
          <label htmlFor="reg-name" style={{ fontSize: "12.5px", color: "var(--text-dim)" }}>Name</label>
          <div style={{ position: "relative", marginTop: "4px", marginBottom: showError("name") ? "2px" : "10px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
              </svg>
            </span>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="Enter your full name"
              aria-invalid={!!showError("name")}
              aria-describedby={showError("name") ? "name-error" : undefined}
              style={inputStyle(showError("name"))}
            />
          </div>
          {showError("name") && <p id="name-error" role="alert" style={{ color: "var(--danger)", fontSize: "11px", marginBottom: "8px" }}>{fieldErrors.name}</p>}

          <label htmlFor="reg-email" style={{ fontSize: "12.5px", color: "var(--text-dim)" }}>Email</label>
          <div style={{ position: "relative", marginTop: "4px", marginBottom: showError("email") ? "2px" : "10px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 6 10-6" />
              </svg>
            </span>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="Enter your email address"
              aria-invalid={!!showError("email")}
              aria-describedby={showError("email") ? "email-error" : undefined}
              style={inputStyle(showError("email"))}
            />
          </div>
          {showError("email") && <p id="email-error" role="alert" style={{ color: "var(--danger)", fontSize: "11px", marginBottom: "8px" }}>{fieldErrors.email}</p>}

          <label htmlFor="reg-password" style={{ fontSize: "12.5px", color: "var(--text-dim)" }}>Password</label>
          <div style={{ position: "relative", marginTop: "4px", marginBottom: "6px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </span>
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="Create a strong password"
              aria-invalid={!!showError("password")}
              aria-describedby="password-strength"
              style={inputStyle(showError("password"))}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", background: "none", border: "none", padding: "6px" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>

          {password && (
            <div id="password-strength" style={{ marginBottom: "8px" }}>
              <div style={{ height: "4px", borderRadius: "3px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${(strength.score / 5) * 100}%`,
                  background: strength.color,
                  transition: "width 0.2s ease",
                }} />
              </div>
              <p style={{ fontSize: "10.5px", color: strength.color, margin: "3px 0 4px", fontWeight: 600 }}>
                {strength.label}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px" }}>
                {[
                  ["length", "8+ characters"],
                  ["upper", "Uppercase letter"],
                  ["lower", "Lowercase letter"],
                  ["number", "Number"],
                  ["special", "Special character"],
                ].map(([key, label]) => (
                  <li key={key} style={{ fontSize: "10px", color: strength.checks[key] ? "var(--accent)" : "var(--text-dim)" }}>
                    {strength.checks[key] ? "✓" : "○"} {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showError("password") && <p role="alert" style={{ color: "var(--danger)", fontSize: "11px", marginBottom: "8px" }}>{fieldErrors.password}</p>}

          <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "11px", color: "var(--text-dim)", marginTop: "6px", marginBottom: "4px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              onBlur={() => handleBlur("terms")}
              style={{ accentColor: "#39ff14", marginTop: "2px" }}
            />
            <span>
              I agree to Cybereye's{" "}
              <Link to="/terms" style={{ color: "var(--accent)", textDecoration: "underline" }}>Terms of Service</Link> and{" "}
              <Link to="/privacy" style={{ color: "var(--accent)", textDecoration: "underline" }}>Privacy Policy</Link>
            </span>
          </label>
          {showError("terms") && <p role="alert" style={{ color: "var(--danger)", fontSize: "11px", marginBottom: "8px" }}>{fieldErrors.terms}</p>}

          {error && <p role="alert" style={{ color: "var(--danger)", fontSize: "12px", margin: "6px 0" }}>{error}</p>}
          {success && <p style={{ color: "var(--success)", fontSize: "12px", margin: "6px 0" }}>✓ Account created</p>}

          <AnimatedButton
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              fontSize: "14px",
              marginTop: "6px",
              background: "linear-gradient(90deg, #39ff14, #00cc33)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0a120a" strokeWidth="2">
              <path d="M12 2 L20 6 L20 12 Q20 19 12 22 Q4 19 4 12 L4 6 Z" />
            </svg>
            {loading ? "Creating account..." : "Create Account"}
          </AnimatedButton>

          <p style={{ textAlign: "center", fontSize: "10px", color: "var(--text-dim)", marginTop: "8px" }}>
            🔒 Secure registration • Your password is encrypted
          </p>

          <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-dim)", marginTop: "10px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Login</Link>
          </p>
        </form>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .register-decor { display: none; }
        }
        @media (max-width: 500px) {
          .register-page { padding: 8px !important; }
          .register-card { padding: 18px 20px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .register-page * { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

export default Register;
