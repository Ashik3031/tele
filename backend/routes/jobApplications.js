const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/uploadMiddleware');
const JobApplication = require('../models/JobApplication');

// POST - Submit job application
router.post(
  '/apply',
  upload.single('resume'),
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('experience').trim().notEmpty().withMessage('Experience is required'),
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { fullName, email, phone, position, experience, coverLetter, linkedInProfile, portfolio } = req.body;

      // Create new job application
      const newApplication = new JobApplication({
        fullName,
        email,
        phone,
        position,
        experience,
        coverLetter,
        linkedInProfile,
        portfolio,
        resume: req.file
          ? {
              filename: req.file.filename,
              originalName: req.file.originalname,
              mimetype: req.file.mimetype,
              size: req.file.size,
            }
          : null,
      });

      await newApplication.save();

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        applicationId: newApplication._id,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ success: false, message: 'Error submitting application', error: error.message });
    }
  }
);

// GET - Get all applications (Admin)
router.get('/all', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ appliedAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, message: 'Error fetching applications', error: error.message });
  }
});

// GET - Get single application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ success: false, message: 'Error fetching application', error: error.message });
  }
});

// PUT - Update application status (Admin)
router.put('/:id/status', [body('applicationStatus').isIn(['pending', 'reviewed', 'shortlisted', 'rejected'])], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { applicationStatus } = req.body;
    const application = await JobApplication.findByIdAndUpdate(req.params.id, { applicationStatus, updatedAt: Date.now() }, { new: true });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, message: 'Application updated', data: application });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ success: false, message: 'Error updating application', error: error.message });
  }
});

// DELETE - Delete application (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.status(200).json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ success: false, message: 'Error deleting application', error: error.message });
  }
});

// GET - Download resume PDF
router.get('/download/:filename', (req, res) => {
  try {
    const path = require('path');
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    res.download(filePath);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ success: false, message: 'Error downloading file', error: error.message });
  }
});

module.exports = router;
