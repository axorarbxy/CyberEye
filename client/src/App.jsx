import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlScanner from "./pages/UrlScanner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

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
      <Navbar />

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
