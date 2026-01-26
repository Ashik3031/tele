const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Get all featured projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true, featured: true })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get all projects (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// Create project
router.post('/', async (req, res) => {
  try {
    const { title, href, description, tags, featured } = req.body;
    
    if (!title || !href) {
      return res.status(400).json({
        success: false,
        message: 'Title and href are required'
      });
    }
    
    const project = new Project({
      title,
      href,
      description,
      tags: tags || [],
      featured: featured !== undefined ? featured : true
    });
    
    const savedProject = await project.save();
    
    res.status(201).json({
      success: true,
      data: savedProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { title, href, description, tags, featured, isActive } = req.body;
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (href !== undefined) updateData.href = href;
    if (description !== undefined) updateData.description = description;
    if (tags !== undefined) updateData.tags = tags;
    if (featured !== undefined) updateData.featured = featured;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

module.exports = router;
