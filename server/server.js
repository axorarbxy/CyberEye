const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const scanRoutes = require('./routes/scanRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cybereye';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({status: 'Cybereye API running' });
});

app.use('/api/scan', scanRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log('Server running on port ${PORT} ');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed', err.message);
  });
