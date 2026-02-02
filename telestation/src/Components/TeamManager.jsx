import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { getAllTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, uploadTeamImage } from '../services/teamAPI';
import { resolveAsset } from '../utils/assetResolver';

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    imageUrl: '',
    isActive: true,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await getAllTeamMembers();
      console.log('Team members response:', response);
      if (response.success) {
        setMembers(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      setError(`Failed to fetch team members: ${err.message}`);
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
      const response = await uploadTeamImage(file);
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

    if (!formData.name || !formData.position) {
      setError('Name and Position are required');
      return;
    }

    try {
      if (editingId) {
        await updateTeamMember(editingId, formData);
        setSuccess('Team member updated successfully');
      } else {
        await createTeamMember(formData);
        setSuccess('Team member created successfully');
      }
      resetForm();
      fetchMembers();
    } catch (err) {
      setError(err.message || 'Failed to save team member');
    }
  };

  const handleEdit = (member) => {
    setFormData(member);
    setEditingId(member._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(id);
        setSuccess('Team member deleted successfully');
        fetchMembers();
      } catch (err) {
        setError('Failed to delete team member');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      imageUrl: '',
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
        <h2 className="text-2xl font-bold text-white">Manage Team Members</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} />
          Add Member
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
              {editingId ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name *"
                className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Position *"
                className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded"
                required
              />


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Team Member Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploadingImage}
                  className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded file:mr-4 file:px-4 file:py-2 file:rounded file:border-0 file:bg-cyan-600 file:text-white file:cursor-pointer disabled:opacity-50"
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
                {editingId ? 'Update Member' : 'Add Member'}
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
        {members.length === 0 ? (
          <div className="bg-slate-900/30 border border-dashed border-slate-600 p-8 rounded-lg text-center">
            <p className="text-gray-400 mb-2">No team members yet.</p>
            <p className="text-gray-500 text-sm">Click "Add Member" to add your first team member.</p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member._id} className="bg-slate-900/30 border border-slate-700 p-4 rounded-lg flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {member.imageUrl && (
                    <img src={resolveAsset(member.imageUrl)} alt={member.name} className="h-12 w-12 rounded-full object-cover" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-sm text-cyan-400">{member.position}</p>
                  </div>
                </div>

              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded transition"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
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
