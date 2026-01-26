const mongoose = require('mongoose');

const lifeCultureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    category: {
      type: String,
      enum: ['culture', 'event', 'achievement', 'milestone'],
      required: [true, 'Category is required']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    image: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    location: {
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
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

lifeCultureSchema.index({ category: 1, isActive: 1, createdAt: -1 });

module.exports = mongoose.model('LifeCulture', lifeCultureSchema);
