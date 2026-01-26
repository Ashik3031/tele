const express = require('express');
const Award = require('../models/Award');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/awards');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for awards images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'award-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  }
});

// Upload image endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image provided'
      });
    }

    const imageUrl = `/api/awards/image/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        imageUrl: imageUrl,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
});

// Note: Images are served via express.static middleware in server.js at /api/awards/image

// Get all active awards (Public)
router.get('/', async (req, res) => {
  try {
    const awards = await Award.find({ isActive: true })
      .sort({ createdAt: -1 });
    
    const employeeOfMonth = awards.filter(a => a.category === 'employee_of_month');
    const targetAchieved = awards.filter(a => a.category === 'target_achieved');
    
    res.status(200).json({
      success: true,
      data: {
        employeeOfMonth,
        targetAchieved
      },
      count: awards.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching awards',
      error: error.message
    });
  }
});

// Get awards by category (Public)
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ['employee_of_month', 'target_achieved'];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }
    
    const awards = await Award.find({ 
      category, 
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: awards,
      count: awards.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching awards',
      error: error.message
    });
  }
});

// Get single award by ID
router.get('/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found'
      });
    }
    res.status(200).json({
      success: true,
      data: award
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching award',
      error: error.message
    });
  }
});

// Create new award (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, category, month, year, image, imageUrl, note, description, achievement } = req.body;

    if (!name || !category || !month || !year) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, month, and year are required'
      });
    }

    const newAward = new Award({
      name,
      category,
      month,
      year,
      image: image || '',
      imageUrl: imageUrl || '',
      note: note || '',
      description: description || '',
      achievement: achievement || '',
      isActive: true
    });

    const savedAward = await newAward.save();
    res.status(201).json({
      success: true,
      message: 'Award created successfully',
      data: savedAward
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating award',
      error: error.message
    });
  }
});

// Update award (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { name, category, month, year, image, imageUrl, note, description, achievement, isActive } = req.body;

    const award = await Award.findById(req.params.id);
    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found'
      });
    }

    if (name) award.name = name;
    if (category) award.category = category;
    if (month) award.month = month;
    if (year) award.year = year;
    if (image !== undefined) award.image = image;
    if (imageUrl !== undefined) award.imageUrl = imageUrl;
    if (note !== undefined) award.note = note;
    if (description !== undefined) award.description = description;
    if (achievement !== undefined) award.achievement = achievement;
    if (isActive !== undefined) award.isActive = isActive;

    const updatedAward = await award.save();
    res.status(200).json({
      success: true,
      message: 'Award updated successfully',
      data: updatedAward
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating award',
      error: error.message
    });
  }
});

// Delete award (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id);
    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Award deleted successfully',
      data: award
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting award',
      error: error.message
    });
  }
});

// Get all awards including inactive (Admin)
router.get('/admin/all', async (req, res) => {
  try {
    const awards = await Award.find()
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: awards,
      count: awards.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching awards',
      error: error.message
    });
  }
});

module.exports = router;
