import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlScanner from "./pages/UrlScanner";
import MalwareScanner from "./pages/MalwareScanner";
import QrScanner from "./pages/QrScanner";
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
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "32px" }}>
        <BlurText text="Cybereye" />
      </h1>
      <p>
        <BlurText text="AI-Driven Threat Detection Platform" delay={0.04} />
      </p>
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
