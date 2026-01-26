const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true
    },
    type: {
      type: String,
      enum: ['Onsite', 'Remote', 'Hybrid'],
      default: 'Onsite'
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    department: {
      type: String,
      trim: true,
      default: 'General'
    },
    experience: {
      type: String,
      trim: true,
      default: 'Not specified'
    },
    salary: {
      type: String,
      trim: true,
      default: 'Competitive'
    },
    requirements: [
      {
        type: String,
        trim: true
      }
    ],
    responsibilities: [
      {
        type: String,
        trim: true
      }
    ],
    benefits: [
      {
        type: String,
        trim: true
      }
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'closed'],
      default: 'active'
    },
    postedBy: {
      type: String,
      default: 'Admin'
    },
    applicationCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Add method to increment application count
jobPostingSchema.methods.incrementApplicationCount = function() {
  this.applicationCount = (this.applicationCount || 0) + 1;
  return this.save();
};

module.exports = mongoose.model('JobPosting', jobPostingSchema);
