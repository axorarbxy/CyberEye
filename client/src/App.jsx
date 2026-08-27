import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import UrlScanner from "./pages/UrlScanner";
import MalwareScanner from "./pages/MalwareScanner";
import QrScanner from "./pages/QrScanner";
import AndroidScanner from "./pages/AndroidScanner";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordChecker from "./pages/PasswordChecker";
import AiChatbot from "./pages/AiChatbot";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";

import homeLeftImg from "./assets/home-left.jpg";
import homeRightImg from "./assets/home-right.jpg";


/* =========================================================
   HOME
========================================================= */

function Home() {
  return (
    <main className="home-page">

      {/* LEFT IMAGE */}
      <div className="home-side home-side-left">
        <img
          src={homeLeftImg}
          alt=""
          aria-hidden="true"
        />
      </div>


      {/* CENTER CONTENT */}
      <section className="home-content">

        <h1 className="home-title">
          Cybereye
        </h1>


        <p className="home-tagline">
          AI-Driven{" "}
          <span>Threat Detection</span>{" "}
          Platform
        </p>


        <div className="home-divider" />


        <p className="home-description">
          Advanced AI technology to detect, analyze, and
          neutralize cyber threats in real-time.
        </p>


        <div className="home-buttons">

          {/* GET STARTED */}
          <Link
            to="/register"
            className="home-button home-button-primary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a120a"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 2 L20 6 L20 12 Q20 19 12 22 Q4 19 4 12 L4 6 Z" />
            </svg>

            <span>
              Get Started
            </span>
          </Link>


          {/* LEARN MORE */}
          <Link
            to="/url-scanner"
            className="home-button home-button-secondary"
          >
            <span>
              Learn More
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="section-heading">Why Cybereye?</h2>
        <div className="features-grid">
          {[
            { icon: "🔗", title: "URL Scanner", desc: "Detect phishing and malicious URLs using AI-powered analysis.", to: "/url-scanner" },
            { icon: "🔐", title: "Password Checker", desc: "Evaluate password strength and identify common security weaknesses.", to: "/password-checker" },
            { icon: "🤖", title: "AI Chatbot", desc: "Ask questions and get real-time cybersecurity guidance.", to: "/ai-chatbot" },
            { icon: "🛡", title: "Malware & Android Scanner", desc: "Scan files and APKs for malicious behavior before you open them.", to: "/malware-scanner" },
          ].map((f) => (
            <Link to={f.to} key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works-section">
        <h2 className="section-heading">How Cybereye Works</h2>
        <div className="steps-grid">
          {[
            { n: "01", label: "Scan", desc: "Submit a URL, file, or QR code" },
            { n: "02", label: "Analyze", desc: "AI examines the content for threat signals" },
            { n: "03", label: "Detect", desc: "The threat is classified and scored" },
            { n: "04", label: "Protect", desc: "You get an actionable, explained result" },
          ].map((s) => (
            <div className="step-card" key={s.n}>
              <span className="step-number">{s.n}</span>
              <h3>{s.label}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* RIGHT IMAGE */}
      <div className="home-side home-side-right">
        <img
          src={homeRightImg}
          alt=""
          aria-hidden="true"
        />
      </div>


      {/* ===================================================
          STYLES
      =================================================== */}

      <style>
        {`

          /* =================================================
             HOME CONTAINER
          ================================================= */

          .home-page {
            position: relative;

            width: 100%;

            box-sizing: border-box;

            display: grid;

            grid-template-columns:
              minmax(0, 1fr)
              minmax(440px, 640px)
              minmax(0, 1fr);

            grid-template-rows: auto auto auto;

            align-items: start;

            background: var(--bg);

            padding: 20px 28px;
          }

          .home-content {
            grid-column: 2;
            grid-row: 1;
          }

          .home-side-left {
            grid-column: 1;
            grid-row: 1;
          }

          .home-side-right {
            grid-column: 3;
            grid-row: 1;
          }

          .features-section,
          .how-it-works-section {
            grid-column: 1 / -1;
          }


          /* =================================================
             SIDE IMAGE CONTAINERS
          ================================================= */

          .home-side {
            position: relative;

            min-width: 0;

            display: flex;

            align-items: center;

            justify-content: center;

            overflow: hidden;

            background: transparent;

            pointer-events: none;
          }


          .home-side img {
            display: block;

            width: min(380px, 25vw);

            max-width: 380px;

            height: auto;

            object-fit: contain;

            opacity: 0.9;

            mix-blend-mode: screen;

            filter: none;

            -webkit-mask-image:
              radial-gradient(
                ellipse 75% 75% at center,
                black 45%,
                rgba(0, 0, 0, 0.85) 65%,
                transparent 100%
              );

            mask-image:
              radial-gradient(
                ellipse 75% 75% at center,
                black 45%,
                rgba(0, 0, 0, 0.85) 65%,
                transparent 100%
              );

            user-select: none;

            pointer-events: none;

            transition:
              opacity 0.3s ease,
              transform 0.3s ease;
          }


          /* =================================================
             CENTER CONTENT
          ================================================= */

          .home-content {
            position: relative;

            z-index: 5;

            width: 100%;

            max-width: 640px;

            justify-self: center;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

            text-align: center;

            box-sizing: border-box;

            padding-top: 40px;
          }


          .home-title {
            margin: 0;

            font-size:
              clamp(42px, 5vw, 64px);

            line-height: 1.05;

            font-weight: 800;

            letter-spacing: -1.5px;

            background:
              linear-gradient(
                90deg,
                #39ff14,
                #adff2f
              );

            -webkit-background-clip: text;

            background-clip: text;

            -webkit-text-fill-color: transparent;
          }


          .home-tagline {
            margin: 12px 0 0;

            color: var(--text);

            font-size: 22px;

            line-height: 1.3;

            font-weight: 600;
          }


          .home-tagline span {
            color: var(--accent);
          }


          .home-divider {
            width: 140px;

            height: 3px;

            margin: 16px auto;

            border-radius: 2px;

            background:
              linear-gradient(
                90deg,
                transparent,
                #39ff14,
                transparent
              );

            box-shadow:
              0 0 10px
              rgba(57, 255, 20, 0.25);
          }


          .home-description {
            max-width: 480px;

            margin: 8px auto 0;

            color: var(--text-dim);

            font-size: 15px;

            line-height: 1.6;
          }


          .home-buttons {
            display: flex;

            align-items: center;

            justify-content: center;

            gap: 16px;

            margin-top: 32px;

            flex-wrap: wrap;
          }


          .home-button {
            min-width: 190px;

            height: 58px;

            padding: 0 26px;

            box-sizing: border-box;

            display: inline-flex;

            align-items: center;

            justify-content: center;

            gap: 8px;

            border-radius: 11px;

            font-size: 15px;

            font-weight: 700;

            text-decoration: none;

            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease,
              background 0.2s ease;
          }


          .home-button-primary {
            color: #0a120a;

            background:
              linear-gradient(
                90deg,
                #39ff14,
                #00cc33
              );

            border: 1px solid transparent;
          }


          .home-button-primary:hover {
            transform: translateY(-2px);

            box-shadow:
              0 8px 28px
              rgba(57, 255, 20, 0.16);
          }


          .home-button-secondary {
            color: var(--accent);

            background:
              transparent;

            border:
              1px solid var(--accent);
          }


          .home-button-secondary:hover {
            transform: translateY(-2px);

            background:
              rgba(57, 255, 20, 0.04);

            box-shadow:
              0 0 20px
              rgba(57, 255, 20, 0.07);
          }


          /* =================================================
             FEATURES + HOW IT WORKS
          ================================================= */

          .features-section,
          .how-it-works-section {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 60px 24px;
            text-align: center;
          }

          .section-heading {
            font-size: 32px;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 40px;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
          }

          .feature-card {
            padding: 28px 20px;
            border-radius: 14px;
            background: var(--bg-panel);
            border: 1px solid var(--border);
            text-decoration: none;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 28px rgba(57,255,20,0.15);
          }

          .feature-icon {
            font-size: 32px;
            display: block;
            margin-bottom: 12px;
          }

          .feature-card h3 {
            color: var(--accent);
            font-size: 17px;
            margin-bottom: 8px;
          }

          .feature-card p {
            color: var(--text-dim);
            font-size: 13.5px;
            line-height: 1.5;
            margin: 0;
          }

          .steps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
          }

          .step-card {
            padding: 24px 16px;
            border-radius: 14px;
            border: 1px solid var(--border);
          }

          .step-number {
            font-size: 28px;
            font-weight: 800;
            color: var(--accent);
            opacity: 0.5;
          }

          .step-card h3 {
            color: var(--text);
            font-size: 16px;
            margin: 8px 0 6px;
          }

          .step-card p {
            color: var(--text-dim);
            font-size: 13px;
            margin: 0;
          }


          /* =================================================
             TABLET
          ================================================= */

          @media (max-width: 1150px) {

            .home-page {
              grid-template-columns:
                minmax(0, 1fr)
                minmax(400px, 560px)
                minmax(0, 1fr);

              padding: 20px;
            }

            .home-side img {
              width: min(300px, 23vw);
            }

            .home-tagline {
              font-size: 20px;
            }
          }


          @media (max-width: 900px) {

            .home-page {
              grid-template-columns:
                minmax(0, 1fr)
                minmax(380px, 520px)
                minmax(0, 1fr);

              padding: 18px;
            }

            .home-side img {
              width: min(240px, 22vw);
            }

            .home-description {
              max-width: 430px;
            }
          }


          /* =================================================
             MOBILE
          ================================================= */

          @media (max-width: 760px) {

            .home-page {
              display: flex;

              flex-direction: column;

              align-items: center;

              padding: 20px;
            }

            .home-side {
              display: none;
            }

            .home-content {
              width: 100%;

              max-width: 520px;

              padding-top: 20px;
            }

            .home-title {
              font-size: clamp(40px, 12vw, 56px);
            }

            .home-tagline {
              font-size: 19px;
            }

            .home-description {
              max-width: 420px;

              font-size: 14px;
            }

            .home-buttons {
              width: 100%;

              gap: 12px;

              margin-top: 26px;
            }

            .home-button {
              min-width: 180px;

              height: 52px;
            }

            .features-section,
            .how-it-works-section {
              padding: 40px 16px;
            }

            .section-heading {
              font-size: 24px;
              margin-bottom: 24px;
            }
          }


          @media (max-width: 450px) {

            .home-page {
              padding: 16px;
            }

            .home-tagline {
              font-size: 17px;
            }

            .home-description {
              font-size: 13px;

              line-height: 1.5;
            }

            .home-buttons {
              flex-direction: column;

              width: 100%;
            }

            .home-button {
              width: 100%;

              max-width: 300px;
            }
          }


          @media (prefers-reduced-motion: reduce) {

            .home-button,
            .home-side img,
            .feature-card {
              transition: none;
            }
          }

        `}
      </style>

    </main>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <BrowserRouter>

      <div
        style={{
          width: "100%",
          height: "100dvh",
          minHeight: "100dvh",

          display: "flex",
          flexDirection: "column",

          overflow: "hidden",

          background: "var(--bg)",
        }}
      >

        {/* NAVBAR */}

        <Navbar />


        {/* PAGE AREA */}

        <div
          style={{
            flex: "1 1 auto",

            minHeight: 0,

            width: "100%",

            position: "relative",

            overflow: "auto",
          }}
        >

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/password-checker"
              element={<PasswordChecker />}
            />

            <Route
              path="/url-scanner"
              element={
                <ProtectedRoute>
                  <UrlScanner />
                </ProtectedRoute>
              }
            />

            <Route
              path="/malware-scanner"
              element={
                <ProtectedRoute>
                  <MalwareScanner />
                </ProtectedRoute>
              }
            />

            <Route
              path="/qr-scanner"
              element={
                <ProtectedRoute>
                  <QrScanner />
                </ProtectedRoute>
              }
            />

            <Route
              path="/android-scanner"
              element={
                <ProtectedRoute>
                  <AndroidScanner />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ai-chatbot"
              element={
                <ProtectedRoute>
                  <AiChatbot />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}


export default App;
