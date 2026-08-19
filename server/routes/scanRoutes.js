const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Jimp } = require('jimp');
const QrCodeReader = require('qrcode-reader');
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

    const mlResponse = await fetch('http://localhost:8000/predict-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const mlData = await mlResponse.json();

    const result = await ScanResult.create({
      scanType: 'url',
      input: url,
      riskScore: mlData.confidence,
      verdict: mlData.is_phishing ? 'malicious' : 'safe',
      details: { is_phishing: mlData.is_phishing, confidence: mlData.confidence },
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

    // Decode the QR code from the uploaded image
    const image = await Jimp.read(req.file.path);
    const qr = new QrCodeReader();

    const decodedUrl = await new Promise((resolve, reject) => {
      qr.callback = (err, value) => {
        if (err || !value) return reject(new Error('Could not decode QR code'));
        resolve(value.result);
      };
      qr.decode(image.bitmap);
    });

    // Resolve the final URL after following any redirects (e.g. shorteners)
    let finalUrl = decodedUrl;
    try {
      const redirectCheck = await fetch(decodedUrl, { method: 'HEAD', redirect: 'follow' });
      finalUrl = redirectCheck.url;
    } catch (e) {
      finalUrl = decodedUrl;
    }

    // Feed the final resolved URL into the trained phishing model
    const mlResponse = await fetch('http://localhost:8000/predict-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: finalUrl })
    });
    const mlData = await mlResponse.json();

    const result = await ScanResult.create({
      scanType: 'url',
      input: finalUrl,
      riskScore: mlData.confidence,
      verdict: mlData.is_phishing ? 'malicious' : 'safe',
      details: { source: 'qr-upload', decodedUrl, finalUrl, is_phishing: mlData.is_phishing, confidence: mlData.confidence },
      scannedBy: req.user._id
    });

    res.status(201).json({ ...result.toObject(), decodedUrl: finalUrl });
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

// DELETE /api/scan/history
router.delete('/history', protect, async (req, res) => {
  try {
    const result = await ScanResult.deleteMany({ scannedBy: req.user._id });
    res.json({ message: 'Scan history cleared', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
