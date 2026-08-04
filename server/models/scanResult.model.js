const mongoose = require('mongoose');

const scanResultSchema = new mongoose.Schema({
  scanType: {
    type: String,
    enum: ['url', 'ai-text', 'shadow-ai', 'malware', 'network'],
    required: true
  },
  input: {
    type: String,
    required: true
  },
  riskScore: {
    type: Number,
    required: true
  },
  verdict: {
    type: String,
    required: true
  },
  details: {
    type: Object
  },
  scannedBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ScanResult', scanResultSchema);
