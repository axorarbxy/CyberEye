import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlScanner from "./pages/UrlScanner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordChecker from "./pages/PasswordChecker";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div style={{
      padding: "80px 32px",
      textAlign: "center",
      maxWidth: "700px",
      margin: "0 auto",
    }}>
      <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>Cybereye</h1>
      <p style={{ color: "var(--text-dim)", fontSize: "18px" }}>
        AI-Driven Threat Detection Platform
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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
