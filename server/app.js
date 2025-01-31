const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');
const faqRoutes = require('./routes/faqRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => 
  console.error('Redis connection error:', err));

// Database connection
(async () => {
  try {
    await connectDB();
    await redisClient.connect();
    console.log('Connected to MongoDB and Redis');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/faqs', faqRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Listening on port ${PORT}`);
});

