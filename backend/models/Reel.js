const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  reelUrl: {
    type: String,
    required: true,
  },
  embedUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  views: {
    type: String,
    default: '0',
  },
  username: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reel', reelSchema);
