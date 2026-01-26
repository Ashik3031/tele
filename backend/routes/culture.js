const express = require('express');
const LifeCulture = require('../models/LifeCulture');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/culture');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'culture-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  }
});

// Upload image
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image provided'
      });
    }

    const imageUrl = `/api/culture/image/${req.file.filename}`;
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

// Get all active life/culture items (Public)
router.get('/', async (req, res) => {
  try {
    const items = await LifeCulture.find({ isActive: true })
      .sort({ createdAt: -1 });
    
    const categorized = {
      culture: items.filter(i => i.category === 'culture'),
      event: items.filter(i => i.category === 'event'),
      achievement: items.filter(i => i.category === 'achievement'),
      milestone: items.filter(i => i.category === 'milestone'),
      all: items
    };
    
    res.status(200).json({
      success: true,
      data: categorized,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching culture items',
      error: error.message
    });
  }
});

// Get by category
router.get('/category/:category', async (req, res) => {
  try {
    const items = await LifeCulture.find({ 
      category: req.params.category,
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching culture items',
      error: error.message
    });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await LifeCulture.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message
    });
  }
});

// Create (Admin)
router.post('/', async (req, res) => {
  try {
    const { title, category, description, imageUrl, date, location, tags } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title and category are required'
      });
    }

    const item = new LifeCulture({
      title,
      category,
      description: description || '',
      imageUrl: imageUrl || '',
      date: date || new Date(),
      location: location || '',
      tags: tags || [],
      isActive: true
    });

    const savedItem = await item.save();
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: savedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
});

// Update (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { title, category, description, imageUrl, date, location, tags, isActive } = req.body;

    const item = await LifeCulture.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (title) item.title = title;
    if (category) item.category = category;
    if (description !== undefined) item.description = description;
    if (imageUrl !== undefined) item.imageUrl = imageUrl;
    if (date) item.date = date;
    if (location !== undefined) item.location = location;
    if (tags !== undefined) item.tags = tags;
    if (isActive !== undefined) item.isActive = isActive;

    const updatedItem = await item.save();
    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message
    });
  }
});

// Delete (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const item = await LifeCulture.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
});

// Get all including inactive (Admin)
router.get('/admin/all', async (req, res) => {
  try {
    const items = await LifeCulture.find()
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
});

module.exports = router;
