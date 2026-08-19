const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Keyword-based rules: each entry checks if the message contains any of these keywords
const RULES = [
  {
    keywords: ['phishing', 'phish', 'fake email', 'suspicious email'],
    reply: "Phishing emails often use urgency, fake sender addresses, and links that don't match the real domain. Before clicking any link, hover over it to check the real URL, and never enter passwords on a page you reached via email. You can paste suspicious URLs into our URL Scanner to check them."
  },
  {
    keywords: ['password', 'strong password', 'weak password'],
    reply: "A strong password is at least 12 characters, mixes upper/lowercase, numbers, and symbols, and avoids common words or patterns. Try our Password Checker tool to see how yours scores, and consider using a password manager so you don't reuse passwords across sites."
  },
  {
    keywords: ['malware', 'virus', 'trojan', 'infected'],
    reply: "Malware often spreads through untrusted downloads, email attachments, or fake software updates. Only download files from official sources, keep your antivirus updated, and use our Malware Scanner to check suspicious files before opening them."
  },
  {
    keywords: ['qr', 'qr code', 'quishing'],
    reply: "Malicious QR codes ('quishing') can redirect you to fake login pages. Be cautious of QR codes in public places or unsolicited emails. You can upload a QR code to our QR Scanner to check the destination URL before visiting it."
  },
  {
    keywords: ['shadow ai', 'chatgpt', 'ai tool', 'data leak'],
    reply: "Shadow AI refers to employees using unauthorized AI tools (like public chatbots) with sensitive company data, often without IT's knowledge. This can leak confidential information outside your organization's control. Our Shadow AI Sentinel extension helps flag this kind of activity."
  },
  {
    keywords: ['2fa', 'two factor', 'mfa', 'multi factor'],
    reply: "Two-factor authentication (2FA) adds a second verification step beyond your password — usually a code from an app like Google Authenticator. Enable it wherever possible; it blocks most account takeover attempts even if your password is stolen."
  },
  {
    keywords: ['vpn'],
    reply: "A VPN encrypts your internet traffic and hides your IP address, which is useful on public Wi-Fi or to protect your privacy. It doesn't make you immune to phishing or malware though — it's one layer of protection, not a complete solution."
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    reply: "Hi! I'm the Cybereye assistant. Ask me about phishing, passwords, malware, QR codes, or general cybersecurity best practices."
  }
];

const DEFAULT_REPLY = "I'm not sure about that specific question, but I can help with phishing, password safety, malware, QR code risks, Shadow AI, 2FA, and VPNs. Try asking about one of those topics.";

router.post('/', protect, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const lowerMessage = message.toLowerCase();
    const matchedRule = RULES.find((rule) =>
      rule.keywords.some((keyword) => lowerMessage.includes(keyword))
    );

    const reply = matchedRule ? matchedRule.reply : DEFAULT_REPLY;

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
