import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UrlScanner from "./pages/UrlScanner";

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
        <Link to="/url-scanner">URL Scanner</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/url-scanner" element={<UrlScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
