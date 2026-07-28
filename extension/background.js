```
// List of known AI service domains to watch for
const AI_DOMAINS = [
  "chat.openai.com",
  "api.openai.com",
  "claude.ai",
  "api.anthropic.com",
  "bard.google.com",
  "gemini.google.com",
  "perplexity.ai"
];

// Patterns that suggest sensitive data
const SENSITIVE_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, // email
  /\b(?:\d[ -]*?){13,16}\b/,                         // card-like number
  /api[_-]?key/i,
  /confidential/i,
  /internal[_-]?use[_-]?only/i
];

function isAiDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return AI_DOMAINS.some(domain => hostname.includes(domain));
  } catch (e) {
    return false;
  }
}

function containsSensitiveData(bodyText) {
  if (!bodyText) return false;
  return SENSITIVE_PATTERNS.some(pattern => pattern.test(bodyText));
}

// Listen for outgoing requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (isAiDomain(details.url)) {
      let bodyText = "";
      if (details.requestBody && details.requestBody.raw) {
        try {
          bodyText = decodeURIComponent(
            String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))
          );
        } catch (e) {
          bodyText = "";
        }
      }

      if (containsSensitiveData(bodyText)) {
        console.log("Shadow AI flagged:", details.url);

        // TODO: send this event to backend API
        // fetch("http://localhost:5000/api/scan/shadow-ai", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ url: details.url, timestamp: Date.now() })
        // });
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);```
