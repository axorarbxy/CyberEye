const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const SYSTEM_PROMPT = `You are the Cybereye Security Assistant. You help users understand phishing, malware, password safety, and general cybersecurity best practices. Keep answers concise, practical, and beginner-friendly. If asked about something outside cybersecurity, politely redirect to security topics.`;

router.post('/', protect, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Chatbot API request failed');
    }

    const reply = data.content?.[0]?.text || "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
