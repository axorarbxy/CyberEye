import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UrlScanner from "./pages/UrlScanner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function Home() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Cybereye</h1>
      <p>AI-Driven Threat Detection Platform</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "16px" }}>Home</Link>
        <Link to="/url-scanner" style={{ marginRight: "16px" }}>URL Scanner</Link>
        <Link to="/dashboard" style={{ marginRight: "16px" }}>Dashboard</Link>
        <Link to="/login" style={{ marginRight: "16px" }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
