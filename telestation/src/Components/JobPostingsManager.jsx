import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { jobPostingAPI } from '../services/jobPostingAPI';

const JobPostingsManager = () => {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Onsite',
    location: 'Calicut, Kerala',
    department: 'General',
    experience: 'Not specified',
    salary: 'Competitive',
    requirements: [],
    responsibilities: [],
    benefits: [],
    status: 'active'
  });

  // Fetch postings on mount
  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    try {
      setLoading(true);
      const response = await jobPostingAPI.getAllPostingsAdmin();
      if (response.success) {
        setPostings(response.data);
      }
    } catch (error) {
      console.error('Error fetching postings:', error);
      alert('Failed to load job postings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'Onsite',
      location: 'Calicut, Kerala',
      department: 'General',
      experience: 'Not specified',
      salary: 'Competitive',
      requirements: [],
      responsibilities: [],
      benefits: [],
      status: 'active'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description) {
        alert('Title and description are required');
        return;
      }

      setLoading(true);
      let response;

      if (editingId) {
        response = await jobPostingAPI.updatePosting(editingId, formData);
      } else {
        response = await jobPostingAPI.createPosting(formData);
      }

      if (response.success) {
        alert(editingId ? 'Job posting updated successfully' : 'Job posting created successfully');
        resetForm();
        fetchPostings();
      }
    } catch (error) {
      console.error('Error saving posting:', error);
      alert('Failed to save job posting');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (posting) => {
    setFormData({
      title: posting.title,
      description: posting.description,
      type: posting.type,
      location: posting.location,
      department: posting.department,
      experience: posting.experience,
      salary: posting.salary,
      requirements: posting.requirements || [],
      responsibilities: posting.responsibilities || [],
      benefits: posting.benefits || [],
      status: posting.status
    });
    setEditingId(posting._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        setLoading(true);
        const response = await jobPostingAPI.deletePosting(id);
        if (response.success) {
          alert('Job posting deleted successfully');
          fetchPostings();
        }
      } catch (error) {
        console.error('Error deleting posting:', error);
        alert('Failed to delete job posting');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'inactive':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'closed':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Job Postings Manager</h2>
            <p className="text-gray-400 mt-1">Manage and publish job openings</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 text-cyan-400 px-6 py-2 rounded-lg font-medium transition"
            >
              <Plus className="w-5 h-5" />
              New Job Posting
            </button>
          )}
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editingId ? 'Edit Job Posting' : 'New Job Posting'}</h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="e.g., Business Development Executive"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="e.g., Sales"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Describe the role and responsibilities"
                />
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236EF1F7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="Onsite" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Onsite</option>
                    <option value="Remote" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Remote</option>
                    <option value="Hybrid" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="e.g., Calicut, Kerala"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="e.g., 2-3 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="e.g., Competitive or 5-8 LPA"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236EF1F7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="active" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Active</option>
                  <option value="inactive" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Inactive</option>
                  <option value="closed" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Closed</option>
                </select>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium mb-2">Requirements</label>
                {formData.requirements.map((req, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayInputChange('requirements', idx, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      placeholder="Add a requirement"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', idx)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  + Add Requirement
                </button>
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-medium mb-2">Responsibilities</label>
                {formData.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleArrayInputChange('responsibilities', idx, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      placeholder="Add a responsibility"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('responsibilities', idx)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('responsibilities')}
                  className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  + Add Responsibility
                </button>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium mb-2">Benefits</label>
                {formData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayInputChange('benefits', idx, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      placeholder="Add a benefit"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('benefits', idx)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('benefits')}
                  className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  + Add Benefit
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 disabled:opacity-50 text-cyan-400 px-6 py-2 rounded-lg font-medium transition"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : editingId ? 'Update Posting' : 'Create Posting'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Postings List */}
        <div className="space-y-4">
          {loading && !showForm && (
            <div className="text-center py-10">
              <p className="text-white/60">Loading job postings...</p>
            </div>
          )}

          {!loading && postings.length === 0 && (
            <div className="text-center py-10">
              <p className="text-white/60">No job postings yet. Create your first posting!</p>
            </div>
          )}

          {postings.map((posting) => (
            <div key={posting._id} className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{posting.title}</h3>
                    <span className={`text-xs font-semibold rounded-full border px-3 py-1 ${getStatusColor(posting.status)}`}>
                      {posting.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{posting.department} • {posting.type} • {posting.location}</p>
                  <p className="text-gray-300 text-sm mb-3">{posting.description.substring(0, 150)}...</p>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>Experience: {posting.experience}</span>
                    <span>Salary: {posting.salary}</span>
                    <span>Applications: {posting.applicationCount}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(posting)}
                    className="p-2 bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 text-blue-400 rounded-lg transition"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(posting._id)}
                    className="p-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-400 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobPostingsManager;
