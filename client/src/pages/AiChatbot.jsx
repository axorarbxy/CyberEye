import { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";

function AiChatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm the Cybereye assistant. Ask me about phishing, password safety, or any security concern." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("cybereye_token");
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage.text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Chatbot request failed");
      }

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ padding: "40px 32px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>AI Security Assistant</h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "24px" }}>
        Ask questions about cybersecurity, threats, and best practices.
      </p>

      <div style={{
        border: "1px solid var(--border)",
        borderRadius: "10px",
        background: "var(--bg-panel)",
        padding: "16px",
        minHeight: "350px",
        maxHeight: "450px",
        overflowY: "auto",
        marginBottom: "16px"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: "12px",
            textAlign: m.role === "user" ? "right" : "left"
          }}>
            <span style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "12px",
              maxWidth: "80%",
              fontSize: "14px",
              background: m.role === "user" ? "var(--accent)" : "var(--bg-elevated, #1e293b)",
              color: m.role === "user" ? "#fff" : "var(--text)"
            }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: "var(--text-dim)", fontSize: "13px" }}>Thinking...</p>}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a security question..."
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            background: "var(--bg-panel)",
            color: "var(--text)"
          }}
        />
        <AnimatedButton onClick={handleSend} disabled={loading}>
          Send
        </AnimatedButton>
      </div>
    </div>
  );
}

export default AiChatbot;
