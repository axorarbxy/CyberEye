const express = require('express');
const router = express.Router();
const ScanResult = require('../models/scanResult.model');

router.post('/url', async (req, res) => {
  try {
    const {url} = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

  const result = await ScanResult.create({
    scanType: 'url',
    input: url,
    riskScore: 0,
    verdict: 'not-implemented',
    details: {}
  });

  router.get('/history', async (req, res) => {
    try {
      const results = await ScanResult.find().sort({ createdAt: -1 }).limit(50);
      res.json(results);
    } catch (err) {
      res.status(500).json({error: err.message });
    }
  });

  module.exports = router;
