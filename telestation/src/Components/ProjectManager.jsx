import React, { useState, useEffect } from 'react';
import { getAdminAllProjects, createProject, updateProject, deleteProject } from '../services/projectAPI';
import { Trash2, Edit2, Plus, X } from 'lucide-react';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    href: '',
    description: '',
    tags: '',
    featured: true,
    isActive: true
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getAdminAllProjects();
      if (response.success) {
        setProjects(response.data);
      }
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const payload = {
        ...formData,
        tags: tagsArray
      };

      let response;
      if (editingId) {
        response = await updateProject(editingId, payload);
      } else {
        response = await createProject(payload);
      }

      if (response.success) {
        setSuccess(editingId ? 'Project updated successfully!' : 'Project created successfully!');
        setFormData({ title: '', href: '', description: '', tags: '', featured: true, isActive: true });
        setEditingId(null);
        setShowForm(false);
        await fetchProjects();
      }
    } catch (err) {
      setError(err.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      href: project.href,
      description: project.description,
      tags: project.tags?.join(', ') || '',
      featured: project.featured,
      isActive: project.isActive
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await deleteProject(id);
        if (response.success) {
          setSuccess('Project deleted successfully!');
          await fetchProjects();
        }
      } catch (err) {
        setError(err.message || 'Failed to delete project');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', href: '', description: '', tags: '', featured: true, isActive: true });
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} /> Add Project
          </button>
        )}
      </div>

      {/* Messages */}
      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg">{error}</div>}
      {success && <div className="bg-green-900/50 border border-green-500 text-green-200 p-3 rounded-lg">{success}</div>}

      {/* Form */}
      {showForm && (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">{editingId ? 'Edit Project' : 'Create New Project'}</h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Project title"
                required
                className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">URL *</label>
              <input
                type="text"
                name="href"
                value={formData.href}
                onChange={handleInputChange}
                placeholder="https://example.com"
                required
                className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Project description"
                rows="3"
                className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Website, UI/UX, Design"
                className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span>Featured</span>
              </label>

              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span>Active</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition"
              >
                {editingId ? 'Update Project' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No projects yet. Create one to get started!</div>
      ) : (
        <div className="grid gap-4">
          {projects.map(project => (
            <div key={project._id} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-2 break-all">{project.href}</p>
                {project.description && <p className="text-gray-500 text-sm mb-2">{project.description}</p>}
                <div className="flex gap-2 flex-wrap">
                  {project.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {project.featured && <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">Featured</span>}
                  {!project.isActive && <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Inactive</span>}
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-300 rounded transition"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 bg-red-900/50 hover:bg-red-800 text-red-300 rounded transition"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
