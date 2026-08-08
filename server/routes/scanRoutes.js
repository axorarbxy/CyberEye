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
