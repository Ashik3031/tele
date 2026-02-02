import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { getAllAwards, createAward, updateAward, deleteAward, uploadAwardImage } from '../services/awardAPI';
import { resolveAsset } from '../utils/assetResolver';

export default function AwardsManager() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'employee_of_month',
    month: '',
    year: new Date().getFullYear(),
    image: '',
    imageUrl: '',
    note: '',
    description: '',
    achievement: '',
    isActive: true,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      setLoading(true);
      const response = await getAllAwards();
      console.log('Awards response:', response);
      if (response.success && response.data) {
        const allAwards = [
          ...(response.data.employeeOfMonth || []),
          ...(response.data.targetAchieved || []),
        ];
        setAwards(allAwards);
      } else if (response.success) {
        // Handle case where data might be an array directly
        setAwards(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      setError(`Failed to fetch awards: ${err.message || err}`);
      console.error('Full error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    try {
      setUploadingImage(true);
      setError('');
      const response = await uploadAwardImage(file);
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          imageUrl: response.data.imageUrl,
          image: response.data.filename
        }));
        setSuccess('Image uploaded successfully');
      }
    } catch (err) {
      setError(`Failed to upload image: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.month) {
      setError('Name and Month are required');
      return;
    }

    try {
      if (editingId) {
        await updateAward(editingId, formData);
        setSuccess('Award updated successfully');
      } else {
        await createAward(formData);
        setSuccess('Award created successfully');
      }
      resetForm();
      fetchAwards();
    } catch (err) {
      setError(err.message || 'Failed to save award');
      console.error(err);
    }
  };

  const handleEdit = (award) => {
    setFormData(award);
    setEditingId(award._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      try {
        await deleteAward(id);
        setSuccess('Award deleted successfully');
        fetchAwards();
      } catch (err) {
        setError('Failed to delete award');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'employee_of_month',
      month: '',
      year: new Date().getFullYear(),
      image: '',
      imageUrl: '',
      note: '',
      description: '',
      achievement: '',
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Awards</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Add Award
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-lg">
          {success}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-slate-900/50 border border-cyan-500/30 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              {editingId ? 'Edit Award' : 'Create New Award'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Award recipient name"
                  className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                >
                  <option value="employee_of_month">Employee of the Month</option>
                  <option value="target_achieved">Target Achieved</option>
                </select>
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Month *
                </label>
                <input
                  type="text"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  placeholder="e.g., January"
                  className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                  required
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Award Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploadingImage}
                    className="flex-1 bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded file:mr-4 file:px-4 file:py-2 file:rounded file:border-0 file:bg-cyan-600 file:text-white file:cursor-pointer hover:file:bg-cyan-700 disabled:opacity-50"
                  />
                </div>
                {uploadingImage && (
                  <p className="text-sm text-cyan-400 mt-2">Uploading image...</p>
                )}
                {formData.imageUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={resolveAsset(formData.imageUrl)} alt="Preview" className="h-12 w-12 rounded object-cover" />
                    <p className="text-sm text-green-400">✓ Image uploaded</p>
                  </div>
                )}
              </div>

              {/* Note (for Target Achieved) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Note / Achievement Note
                </label>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="e.g., 110% Achieved"
                  className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Award description"
                rows="3"
                className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
              />
            </div>

            {/* Active Status */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-300">Active</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition"
              >
                {editingId ? 'Update Award' : 'Create Award'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Awards List */}
      <div className="space-y-3">
        {awards.length === 0 ? (
          <div className="bg-slate-900/30 border border-dashed border-slate-600 p-8 rounded-lg text-center">
            <p className="text-gray-400 mb-2">No awards created yet.</p>
            <p className="text-gray-500 text-sm">Click "Add Award" above to create your first award entry.</p>
          </div>
        ) : (
          awards.map((award) => (
            <div
              key={award._id}
              className="bg-slate-900/30 border border-slate-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{award.name}</h3>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                    {award.category === 'employee_of_month' ? 'Employee of Month' : 'Target Achieved'}
                  </span>
                  {!award.isActive && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {award.month} {award.year}
                </p>
                {award.note && (
                  <p className="text-sm text-cyan-400">{award.note}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(award)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded transition"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(award._id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded transition"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
