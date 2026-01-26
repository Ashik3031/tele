const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const jobApplicationRoutes = require('./routes/jobApplications');
const jobPostingRoutes = require('./routes/jobPostings');
const awardRoutes = require('./routes/awards');
const teamRoutes = require('./routes/team');
const cultureRoutes = require('./routes/culture');
const projectRoutes = require('./routes/projects');
const reelRoutes = require('./routes/reels');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://72.61.238.90',
    'https://www.tspl-corp.com',
    'https://tspl-corp.com',
    'https://admin.tspl-corp.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/awards/image', express.static('uploads/awards'));
app.use('/api/team/image', express.static('uploads/team'));
app.use('/api/culture/image', express.static('uploads/culture'));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/jobs', jobApplicationRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/postings', jobPostingRoutes);
app.use('/api/awards', awardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running', timestamp: new Date() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File size exceeds 5MB limit' });
    }
  }
  res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
