const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const faqRoutes = require('./routes/faqRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/faqs', faqRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});