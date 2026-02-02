import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { getAllCultureItems, createCultureItem, updateCultureItem, deleteCultureItem, uploadCultureImage } from '../services/cultureAPI';
import { resolveAsset } from '../utils/assetResolver';

export default function CultureManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'culture',
    description: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    tags: '',
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await getAllCultureItems();
      console.log('Culture items response:', response);
      if (response.success && response.data.all) {
        setItems(response.data.all);
      }
    } catch (err) {
      setError(`Failed to fetch culture items: ${err.message}`);
      console.error(err);
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

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    try {
      setUploadingImage(true);
      setError('');
      const response = await uploadCultureImage(file);
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          imageUrl: response.data.imageUrl
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

    if (!formData.title || !formData.category) {
      setError('Title and Category are required');
      return;
    }

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        date: new Date(formData.date)
      };

      if (editingId) {
        await updateCultureItem(editingId, submitData);
        setSuccess('Culture item updated successfully');
      } else {
        await createCultureItem(submitData);
        setSuccess('Culture item created successfully');
      }
      resetForm();
      fetchItems();
    } catch (err) {
      setError(err.message || 'Failed to save item');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      location: item.location,
      tags: (item.tags || []).join(', '),
      isActive: item.isActive,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteCultureItem(id);
        setSuccess('Culture item deleted successfully');
        fetchItems();
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'culture',
      description: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      tags: '',
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Life at TSPL</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

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

      {showForm && (
        <div className="bg-slate-900/50 border border-cyan-500/30 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              {editingId ? 'Edit Culture Item' : 'Add New Culture Item'}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title *"
                className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
              >
                <option value="culture">Culture</option>
                <option value="event">Event</option>
                <option value="achievement">Achievement</option>
                <option value="milestone">Milestone</option>
              </select>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Culture Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploadingImage}
                  className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded file:mr-4 file:px-4 file:py-2 file:rounded file:border-0 file:bg-cyan-600 file:text-white file:cursor-pointer disabled:opacity-50"
                />
                {uploadingImage && <p className="text-sm text-cyan-400 mt-2">Uploading...</p>}
                {formData.imageUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={resolveAsset(formData.imageUrl)} alt="Preview" className="h-12 w-12 rounded object-cover" />
                    <p className="text-sm text-green-400">✓ Image uploaded</p>
                  </div>
                )}
              </div>
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              rows="3"
              className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
            />

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Tags (comma separated)"
              className="w-full bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
            />

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

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition"
              >
                {editingId ? 'Update Item' : 'Add Item'}
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

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="bg-slate-900/30 border border-dashed border-slate-600 p-8 rounded-lg text-center">
            <p className="text-gray-400 mb-2">No culture items yet.</p>
            <p className="text-gray-500 text-sm">Click "Add Item" to create your first entry.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="bg-slate-900/30 border border-slate-700 p-4 rounded-lg flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {item.imageUrl && (
                    <img src={resolveAsset(item.imageUrl)} alt={item.title} className="h-12 w-12 rounded object-cover" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-cyan-400">{item.category}</p>
                  </div>
                </div>
                {item.location && (
                  <p className="text-sm text-gray-400">Location: {item.location}</p>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded transition"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded transition"
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
