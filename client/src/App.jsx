import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import BlurText from "./components/BlurText";

function Home() {
  return (
    <div style={{
      position: "relative",
      minHeight: "600px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "radial-gradient(circle at 50% 100%, rgba(52,211,153,0.08), transparent 50%), var(--bg, #0B1220)",
    }}>
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{
          fontSize: "56px",
          fontWeight: 800,
          margin: 0,
          background: "linear-gradient(90deg, #4ea8de, #34d399)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          <BlurText text="Cybereye" />
        </h1>
        <p style={{ fontSize: "20px", marginTop: "12px", color: "var(--text, #fff)" }}>
          AI-Driven{" "}
          <span style={{ color: "#22d3ee", fontWeight: 600 }}>Threat Detection</span>{" "}
          Platform
        </p>
        <div style={{
          width: "160px",
          height: "3px",
          borderRadius: "2px",
          background: "linear-gradient(90deg, transparent, #34d399, transparent)",
          margin: "16px auto 0",
        }} />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-checker" element={<PasswordChecker />} />
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
    </BrowserRouter>
  );
}

export default App;
