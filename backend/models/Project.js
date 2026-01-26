const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    href: {
      type: String,
      required: [true, 'Project URL is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    featured: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
