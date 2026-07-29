const express = require('express');
const router = express.Router();
const ScanResult = require('../models/scanResult.model');
const { protect } = require('../middleware/authMiddleware');

// POST /api/scan/url
router.post('/url', protect, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const result = await ScanResult.create({
      scanType: 'url',
      input: url,
      riskScore: 0,
      verdict: 'not-implemented',
      details: {},
      scannedBy: req.user._id
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/scan/shadow-ai
router.post('/shadow-ai', async (req, res) => {
  try {
    const { url, domain, reason, timestamp } = req.body;

    if (!url || !domain) {
      return res.status(400).json({ error: 'url and domain are required' });
    }

    const result = await ScanResult.create({
      scanType: 'shadow-ai',
      input: url,
      riskScore: 1,
      verdict: 'flagged',
      details: { domain, reason, timestamp }
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/scan/history
router.get('/history', protect, async (req, res) => {
  try {
    const results = await ScanResult.find({ scannedBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
