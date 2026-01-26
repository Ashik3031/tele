const express = require('express');
const JobPosting = require('../models/JobPosting');
const router = express.Router();

// Get all active job postings (Public)
router.get('/', async (req, res) => {
  try {
    const postings = await JobPosting.find({ status: 'active' })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: postings,
      count: postings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job postings',
      error: error.message
    });
  }
});

// Get single job posting by ID
router.get('/:id', async (req, res) => {
  try {
    const posting = await JobPosting.findById(req.params.id);
    if (!posting) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found'
      });
    }
    res.status(200).json({
      success: true,
      data: posting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job posting',
      error: error.message
    });
  }
});

// Create new job posting (Admin)
router.post('/', async (req, res) => {
  try {
    const { title, description, type, location, department, experience, salary, requirements, responsibilities, benefits } = req.body;

    // Validate required fields
    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and location are required'
      });
    }

    const newPosting = new JobPosting({
      title,
      description,
      type: type || 'Onsite',
      location,
      department: department || 'General',
      experience: experience || 'Not specified',
      salary: salary || 'Competitive',
      requirements: Array.isArray(requirements) ? requirements : [],
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      status: 'active'
    });

    const savedPosting = await newPosting.save();
    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      data: savedPosting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating job posting',
      error: error.message
    });
  }
});

// Update job posting (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { title, description, type, location, department, experience, salary, requirements, responsibilities, benefits, status } = req.body;

    const posting = await JobPosting.findById(req.params.id);
    if (!posting) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found'
      });
    }

    // Update fields
    if (title) posting.title = title;
    if (description) posting.description = description;
    if (type) posting.type = type;
    if (location) posting.location = location;
    if (department) posting.department = department;
    if (experience) posting.experience = experience;
    if (salary) posting.salary = salary;
    if (requirements) posting.requirements = requirements;
    if (responsibilities) posting.responsibilities = responsibilities;
    if (benefits) posting.benefits = benefits;
    if (status) posting.status = status;

    const updatedPosting = await posting.save();
    res.status(200).json({
      success: true,
      message: 'Job posting updated successfully',
      data: updatedPosting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating job posting',
      error: error.message
    });
  }
});

// Delete job posting (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const posting = await JobPosting.findByIdAndDelete(req.params.id);
    if (!posting) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Job posting deleted successfully',
      data: posting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting job posting',
      error: error.message
    });
  }
});

// Get all job postings with all statuses (Admin)
router.get('/admin/all', async (req, res) => {
  try {
    const postings = await JobPosting.find()
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: postings,
      count: postings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job postings',
      error: error.message
    });
  }
});

module.exports = router;
