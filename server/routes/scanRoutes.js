const express = require('express');
const router = express.Router();
const multer = require('multer');
const ScanResult = require('../models/scanResult.model');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

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

// POST /api/scan/malware
router.post('/malware', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const result = await ScanResult.create({
      scanType: 'malware',
      input: req.file.originalname,
      riskScore: 0,
      verdict: 'not-implemented',
      details: {
        size: req.file.size,
        mimetype: req.file.mimetype,
        storedPath: req.file.path
      },
      scannedBy: req.user._id
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/scan/qr
router.post('/qr', protect, upload.single('qr'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'QR image is required' });
    }

    // TODO: decode QR image (e.g. with 'jsqr' or 'qrcode-reader') and extract URL,
    // then feed that URL into the same phishing risk logic as /url

    const result = await ScanResult.create({
      scanType: 'url',
      input: req.file.originalname,
      riskScore: 0,
      verdict: 'not-implemented',
      details: {
        source: 'qr-upload',
        size: req.file.size
      },
      scannedBy: req.user._id
    });

    res.status(201).json({ ...result.toObject(), decodedUrl: null });
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
