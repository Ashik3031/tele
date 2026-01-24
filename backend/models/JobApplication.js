const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  resume: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  linkedInProfile: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  applicationStatus: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
    default: 'pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
