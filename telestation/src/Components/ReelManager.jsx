import React, { useState, useEffect } from 'react';
import { getAdminAllReels, createReel, updateReel, deleteReel } from '../services/reelAPI';
import { Trash2, Edit2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReelManager() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    reelUrl: '',
    embedUrl: '',
    title: '',
    views: '',
    username: '',
    featured: true,
    isActive: true,
  });

  // Fetch reels
  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const response = await getAdminAllReels();
      if (response.success) {
        setReels(response.data);
      }
    } catch (error) {
      setErrorMessage('Failed to fetch reels');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reelUrl || !formData.embedUrl || !formData.title || !formData.username) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await updateReel(editingId, formData);
      } else {
        response = await createReel(formData);
      }

      if (response.success) {
        setSuccessMessage(editingId ? 'Reel updated successfully' : 'Reel created successfully');
        setFormData({
          reelUrl: '',
          embedUrl: '',
          title: '',
          views: '',
          username: '',
          featured: true,
          isActive: true,
        });
        setEditingId(null);
        setShowForm(false);
        fetchReels();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(response.message || 'Failed to save reel');
      }
    } catch (error) {
      setErrorMessage('Error saving reel: ' + error.message);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reel?')) {
      try {
        const response = await deleteReel(id);
        if (response.success) {
          setSuccessMessage('Reel deleted successfully');
          fetchReels();
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setErrorMessage(response.message || 'Failed to delete reel');
        }
      } catch (error) {
        setErrorMessage('Error deleting reel: ' + error.message);
      }
    }
  };

  // Handle edit
  const handleEdit = (reel) => {
    setFormData(reel);
    setEditingId(reel._id);
    setShowForm(true);
  };

  // Reset form
  const handleCancel = () => {
    setFormData({
      reelUrl: '',
      embedUrl: '',
      title: '',
      views: '',
      username: '',
      featured: true,
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
    setErrorMessage('');
  };

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Reels</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Add New Reel
          </button>
        )}
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-4 flex items-center gap-2 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 flex items-center gap-2 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-700 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Reel URL *</label>
              <input
                type="text"
                name="reelUrl"
                value={formData.reelUrl}
                onChange={handleInputChange}
                placeholder="https://www.instagram.com/reel/..."
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Embed URL *</label>
              <input
                type="text"
                name="embedUrl"
                value={formData.embedUrl}
                onChange={handleInputChange}
                placeholder="https://www.instagram.com/reel/.../embed/captioned"
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Reel title"
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="@username"
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Views</label>
              <input
                type="text"
                name="views"
                value={formData.views}
                onChange={handleInputChange}
                placeholder="125K"
                className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                Active
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              {editingId ? 'Update Reel' : 'Create Reel'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-400 py-8">Loading reels...</div>
      )}

      {/* Reels List */}
      {!loading && (
        <div className="space-y-4">
          {reels.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No reels yet</p>
          ) : (
            reels.map(reel => (
              <div
                key={reel._id}
                className="p-4 bg-gray-700 rounded-lg flex justify-between items-start hover:bg-gray-600 transition"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{reel.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{reel.username}</p>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>{reel.views} views</span>
                    <span>{reel.featured ? '✓ Featured' : 'Not Featured'}</span>
                    <span>{reel.isActive ? '✓ Active' : 'Inactive'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(reel)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(reel._id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
