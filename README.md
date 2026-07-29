# 🛡️ Cybereye

### *Fighting AI-driven attacks with AI-driven defense.*

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Stack](https://img.shields.io/badge/stack-MERN%20%2B%20Python-blueviolet)
![License](https://img.shields.io/badge/license-MIT-green)

> While the rest of the industry is still teaching filters to catch typos and broken grammar, attackers moved on. Cybereye is built for the threats that come *after* that — the ones AI creates, and the ones AI quietly leaks.

---

## 🚨 The Problem

Every major email filter — Gmail, Proofpoint, SpamAssassin — was trained to catch **human** phishing tells: bad grammar, generic urgency, sloppy formatting.

LLM-generated phishing has none of that. It's grammatically flawless, personalized with scraped LinkedIn data, and reacts to real news to manufacture urgency. **The filters have nothing left to catch.**

At the same time, a *second* silent threat is exploding inside organizations:

> 📈 **76%** of organizations now call Shadow AI a definite or probable problem — a 15-point jump in a single year.

Employees are pasting confidential data into unauthorized AI tools every day, and traditional DLP was never built to see it happen.

**Cybereye exists to close both gaps.**

---

## ⚡ What It Does

### 🎯 Engine 1 — AI-Generated Phishing Detector
Doesn't just check if a URL *looks* shady — checks if the *content itself* was likely written by an AI, then fuses that with a trained URL-risk model for one composite verdict.

### 👁️ Engine 2 — Shadow AI Sentinel
A lightweight Chrome extension that quietly watches outbound browser traffic, flags connections to unauthorized AI tools, and catches sensitive data walking out the door — in real time.

---

## 🧩 Architecture

```
cybereye/
├── client/       ⚛️  React dashboard — scans, history, live risk scores
├── server/       🚂  Node/Express API — the backbone connecting everything
├── ml-service/   🧠  Python + FastAPI — where the actual models live
└── extension/    🔌  Chrome extension — Shadow AI detection at the source
```

```
   React App          Chrome Extension
       │                     │
       ▼                     ▼
   ┌─────────────────────────────┐
   │      Express API Server      │
   └────────────┬─────────┬───────┘
                │         │
                ▼         ▼
        FastAPI (ML)   MongoDB
```

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React |
| Backend | Node.js, Express |
| ML Engine | Python, FastAPI, scikit-learn |
| Database | MongoDB |
| Browser Agent | Chrome Extension (Manifest V3) |

---

## 🚀 Status

- [x] Backend skeleton (Express + MongoDB schema + routes)
- [x] URL feature extraction engine
- [x] Chrome extension core detection logic
- [ ] Model training on live dataset
- [ ] React dashboard wired to live API
- [ ] AI-authorship detection model

**This is an actively evolving research-level project — not a template phishing scanner.** Every design decision here traces back to a real, dated 2026 industry problem, not an assumption.

---

## 🧠 Why This Exists

Most student security projects train a classifier on a static Kaggle dataset and call it done. Cybereye is built around the idea that **static models go stale the moment they ship** — so instead of just detecting *known* attack patterns, it's built to detect the *new* class of threats nobody's tooling addresses yet: attacks made *by* AI, and leaks made *through* AI.

---

<p align="center">Built with curiosity, caffeine, and a healthy distrust of static datasets. ☕</p>
