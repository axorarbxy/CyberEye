const AI_DOMAINS = [
  "chatgpt.com",
  "chat.openai.com",
  "api.openai.com",
  "claude.ai",
  "api.anthropic.com",
  "gemini.google.com",
  "aistudio.google.com",
  "perplexity.ai"
];

const SENSITIVE_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  /\b(?:\d[ -]*?){13,16}\b/,
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

function reportFlaggedEvent(url, domain, reason) {
  fetch("http://localhost:5000/api/scan/shadow-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, domain, reason, timestamp: Date.now() })
  }).then((res) => {
    console.log("Reported to backend, status:", res.status);
  }).catch((err) => {
    console.error("Failed to report shadow AI event:", err);
  });

  chrome.storage.local.get(['flaggedEvents'], (result) => {
    const events = result.flaggedEvents || [];
    events.push({ url, domain, reason, timestamp: Date.now() });
    chrome.storage.local.set({ flaggedEvents: events });
  });
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (isAiDomain(details.url)) {
      console.log("AI domain request detected:", details.url);
      console.log("Has requestBody:", !!details.requestBody);
      console.log("Has raw:", !!(details.requestBody && details.requestBody.raw));

      let bodyText = "";
      if (details.requestBody && details.requestBody.raw) {
        try {
          bodyText = decodeURIComponent(
            String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))
          );
          console.log("Decoded body:", bodyText.substring(0, 200));
        } catch (e) {
          console.log("Decode failed:", e.message);
          bodyText = "";
        }
      } else {
        console.log("No raw body available for this request");
      }

      if (containsSensitiveData(bodyText)) {
        const hostname = new URL(details.url).hostname;
        console.log("Shadow AI flagged:", details.url);
        reportFlaggedEvent(details.url, hostname, "Sensitive data pattern detected");
      } else {
        console.log("No sensitive pattern matched in this request");
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);
