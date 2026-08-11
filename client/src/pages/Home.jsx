import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#CBA35C";
const GOLD_DIM = "#8B6F3D";
const BG = "#0A0A0C";
const PANEL = "#131316";
const BORDER = "#2A2A2E";
const TEXT_DIM = "#9B9B A1".replace(" ", "");

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2 4 5v6c0 5 3.4 8.6 8 9 4.6-.4 8-4 8-9V5l-8-3z" />
    </svg>
  );
}
function BrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3.5 3.5 0 0 0 2 6 3 3 0 0 0 3 3" />
      <path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3.5 3.5 0 0 1-2 6 3 3 0 0 1-3 3" />
      <path d="M9 3v17M15 3v17" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

const FEATURES = [
  { icon: <ShieldIcon />, title: "Real-time Protection", desc: "24/7 threat monitoring and protection" },
  { icon: <BrainIcon />, title: "AI-Powered", desc: "Advanced machine learning threat detection" },
  { icon: <ChartIcon />, title: "Detailed Reports", desc: "Comprehensive analysis and insights" },
  { icon: <BoltIcon />, title: "Instant Response", desc: "Quick threat response and mitigation" },
];

const STATS = [
  { value: "99.9%", label: "Success Rate", sub: "Threats Detected" },
  { value: "9.7K", label: "Total Scans", sub: "This Month" },
  { value: "24/7", label: "Monitoring", sub: "Always Active" },
  { value: "98.5%", label: "Accuracy", sub: "AI Detection Rate" },
];

const PARTNERS = ["SecureBank", "NexaTech", "Fortress Corp", "Vertex Systems", "Aegis Group"];

function Home() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleScan = () => {
    navigate("/url-scanner");
  };

  return (
    <div className="cy-home">
      <section className="cy-hero">
        <div className="cy-hero-copy">
          <span className="cy-eyebrow">AI-Powered Threat Detection</span>
          <h1 className="cy-headline">
            AI-Driven Threat<br />
            <span className="cy-gold">Detection Platform</span>
          </h1>
          <p className="cy-subtext">
            Detect, analyze, and respond to cyber threats in real-time with advanced AI technology.
          </p>

          <div className="cy-scan-box">
            <input
              className="cy-scan-input"
              type="text"
              placeholder="Enter a URL to scan..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="cy-scan-btn" onClick={handleScan}>
              Scan Now
            </button>
          </div>

          <div className="cy-features">
            {FEATURES.map((f, i) => (
              <div className="cy-feature" key={i}>
                <div className="cy-feature-icon">{f.icon}</div>
                <div className="cy-feature-title">{f.title}</div>
                <div className="cy-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cy-hero-art" aria-hidden="true">
          <div className="cy-glow" />
          <div className="cy-diamond cy-diamond-1" />
          <div className="cy-diamond cy-diamond-2">
            <ShieldIcon />
          </div>
          <div className="cy-diamond cy-diamond-3" />
        </div>
      </section>

      <section className="cy-bottom">
        <div className="cy-stats">
          {STATS.map((s, i) => (
            <div className="cy-stat" key={i}>
              <div className="cy-stat-value">{s.value}</div>
              <div className="cy-stat-label">{s.label}</div>
              <div className="cy-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="cy-trusted">
          <h3>Trusted by Security Professionals</h3>
          <p>Join thousands of security professionals who trust Cybereye for their threat detection needs.</p>
          <div className="cy-partners">
            {PARTNERS.map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .cy-home {
          background: ${BG};
          color: #F5F3EE;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 64px 48px 80px;
        }
        .cy-hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .cy-hero-copy { max-width: 640px; }
        .cy-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid ${BORDER};
          color: ${GOLD};
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.03em;
          margin-bottom: 24px;
        }
        .cy-headline {
          font-size: 52px;
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -0.01em;
          margin: 0 0 20px;
        }
        .cy-gold { color: ${GOLD}; }
        .cy-subtext {
          font-size: 17px;
          line-height: 1.6;
          color: #B8B5AD;
          max-width: 480px;
          margin: 0 0 32px;
        }
        .cy-scan-box {
          display: flex;
          gap: 10px;
          margin-bottom: 44px;
          max-width: 520px;
        }
        .cy-scan-input {
          flex: 1;
          padding: 13px 16px;
          border-radius: 8px;
          border: 1px solid ${BORDER};
          background: ${PANEL};
          color: #F5F3EE;
          font-size: 14px;
        }
        .cy-scan-input:focus {
          outline: 2px solid ${GOLD};
          outline-offset: 1px;
        }
        .cy-scan-btn {
          padding: 13px 22px;
          border-radius: 8px;
          border: none;
          background: ${GOLD};
          color: #1A1408;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
        }
        .cy-scan-btn:hover { background: #DBB56D; }
        .cy-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .cy-feature-icon {
          width: 44px; height: 44px;
          border-radius: 999px;
          background: ${PANEL};
          border: 1px solid ${BORDER};
          display: flex; align-items: center; justify-content: center;
          color: ${GOLD};
          margin-bottom: 12px;
        }
        .cy-feature-title { font-size: 13.5px; font-weight: 700; margin-bottom: 4px; }
        .cy-feature-desc { font-size: 11.5px; color: #8A8780; line-height: 1.4; }

        .cy-hero-art {
          position: relative;
          width: 420px; height: 420px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .cy-glow {
          position: absolute;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(203,163,92,0.35) 0%, rgba(203,163,92,0) 70%);
          filter: blur(10px);
        }
        .cy-diamond {
          position: absolute;
          width: 140px; height: 140px;
          border: 1.5px solid ${BORDER};
          transform: rotate(45deg);
          border-radius: 12px;
        }
        .cy-diamond-1 { left: 20px; opacity: 0.6; }
        .cy-diamond-3 { right: 20px; opacity: 0.6; }
        .cy-diamond-2 {
          background: linear-gradient(135deg, ${GOLD}, ${GOLD_DIM});
          border: none;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 60px rgba(203,163,92,0.5);
        }
        .cy-diamond-2 svg { transform: rotate(-45deg); color: #1A1408; }

        .cy-bottom {
          max-width: 1280px;
          margin: 72px auto 0;
        }
        .cy-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: ${BORDER};
          border: 1px solid ${BORDER};
          border-radius: 12px 12px 0 0;
          overflow: hidden;
        }
        .cy-stat {
          background: ${PANEL};
          padding: 24px;
        }
        .cy-stat-value { font-size: 28px; font-weight: 800; color: ${GOLD}; }
        .cy-stat-label { font-size: 13px; font-weight: 600; margin-top: 4px; }
        .cy-stat-sub { font-size: 11.5px; color: #8A8780; margin-top: 2px; }

        .cy-trusted {
          background: ${PANEL};
          border: 1px solid ${BORDER};
          border-top: none;
          border-radius: 0 0 12px 12px;
          padding: 28px 24px;
        }
        .cy-trusted h3 { margin: 0 0 6px; font-size: 16px; }
        .cy-trusted p { margin: 0 0 18px; font-size: 13px; color: #8A8780; max-width: 520px; }
        .cy-partners {
          display: flex; flex-wrap: wrap; gap: 28px;
        }
        .cy-partners span {
          font-size: 13.5px; font-weight: 600; color: #6E6C66;
        }

        @media (max-width: 980px) {
          .cy-hero { flex-direction: column; }
          .cy-hero-art { display: none; }
          .cy-features { grid-template-columns: repeat(2, 1fr); }
          .cy-stats { grid-template-columns: repeat(2, 1fr); }
          .cy-headline { font-size: 38px; }
        }
      `}</style>
    </div>
  );
}

export default Home;
