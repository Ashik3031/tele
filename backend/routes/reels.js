const express = require('express');
const router = express.Router();
const Reel = require('../models/Reel');

// Get all featured reels
router.get('/', async (req, res) => {
  try {
    const reels = await Reel.find({ featured: true, isActive: true });
    res.json({ success: true, data: reels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all reels for admin
router.get('/admin/all', async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get reel by ID
router.get('/:id', async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ success: false, message: 'Reel not found' });
    }
    res.json({ success: true, data: reel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new reel
router.post('/', async (req, res) => {
  try {
    const { reelUrl, embedUrl, title, views, username, featured, isActive } = req.body;

    if (!reelUrl || !embedUrl || !title || !username) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: reelUrl, embedUrl, title, username'
      });
    }

    const reel = new Reel({
      reelUrl,
      embedUrl,
      title,
      views: views || '0',
      username,
      featured: featured !== undefined ? featured : true,
      isActive: isActive !== undefined ? isActive : true,
    });

    await reel.save();
    res.status(201).json({ success: true, data: reel, message: 'Reel created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update reel
router.put('/:id', async (req, res) => {
  try {
    const { reelUrl, embedUrl, title, views, username, featured, isActive } = req.body;

    const reel = await Reel.findByIdAndUpdate(
      req.params.id,
      {
        reelUrl,
        embedUrl,
        title,
        views,
        username,
        featured,
        isActive,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!reel) {
      return res.status(404).json({ success: false, message: 'Reel not found' });
    }

    res.json({ success: true, data: reel, message: 'Reel updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete reel
router.delete('/:id', async (req, res) => {
  try {
    const reel = await Reel.findByIdAndDelete(req.params.id);

    if (!reel) {
      return res.status(404).json({ success: false, message: 'Reel not found' });
    }

    res.json({ success: true, data: reel, message: 'Reel deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
