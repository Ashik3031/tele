const express = require('express');
const TeamMember = require('../models/TeamMember');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/team');
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
    cb(null, 'team-' + uniqueSuffix + path.extname(file.originalname));
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

    const imageUrl = `/api/team/image/${req.file.filename}`;
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

// Get all active team members (Public)
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: members,
      count: members.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message
    });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
      error: error.message
    });
  }
});

// Create team member (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, position, department, bio, imageUrl, email, phone, linkedIn, specialization, order } = req.body;

    if (!name || !position) {
      return res.status(400).json({
        success: false,
        message: 'Name and position are required'
      });
    }

    const member = new TeamMember({
      name,
      position,
      department: department || '',
      bio: bio || '',
      imageUrl: imageUrl || '',
      email: email || '',
      phone: phone || '',
      linkedIn: linkedIn || '',
      specialization: specialization || '',
      order: order || 0,
      isActive: true
    });

    const savedMember = await member.save();
    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: savedMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating team member',
      error: error.message
    });
  }
});

// Update team member (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { name, position, department, bio, imageUrl, email, phone, linkedIn, specialization, order, isActive } = req.body;

    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    if (name) member.name = name;
    if (position) member.position = position;
    if (department !== undefined) member.department = department;
    if (bio !== undefined) member.bio = bio;
    if (imageUrl !== undefined) member.imageUrl = imageUrl;
    if (email !== undefined) member.email = email;
    if (phone !== undefined) member.phone = phone;
    if (linkedIn !== undefined) member.linkedIn = linkedIn;
    if (specialization !== undefined) member.specialization = specialization;
    if (order !== undefined) member.order = order;
    if (isActive !== undefined) member.isActive = isActive;

    const updatedMember = await member.save();
    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating team member',
      error: error.message
    });
  }
});

// Delete team member (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team member',
      error: error.message
    });
  }
});

// Get all team members including inactive (Admin)
router.get('/admin/all', async (req, res) => {
  try {
    const members = await TeamMember.find()
      .sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      data: members,
      count: members.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message
    });
  }
});

module.exports = router;
