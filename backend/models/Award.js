const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Award recipient name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    category: {
      type: String,
      enum: ['employee_of_month', 'target_achieved'],
      required: [true, 'Award category is required']
    },
    month: {
      type: String,
      required: [true, 'Month is required'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 2000,
      max: 2099
    },
    image: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    note: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    achievement: {
      type: String,
      trim: true,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: String,
      default: 'Admin'
    }
  },
  {
    timestamps: true
  }
);

// Add index for queries
awardSchema.index({ category: 1, isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Award', awardSchema);
