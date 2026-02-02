import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Eye, EyeOff, Star, StarOff, Save, X } from "lucide-react";
import { getAdminAllReels, createReel, updateReel, deleteReel } from "../services/reelAPI";
import { resolveAsset } from "../utils/assetResolver";

export default function ReelAdminPanel() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    reelUrl: "",
    embedUrl: "",
    title: "",
    username: "",
    thumbnailUrl: "",
    featured: true,
    isActive: true,
  });

  // Fetch all reels
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
      console.error("Failed to fetch reels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = editingId
        ? await updateReel(editingId, formData)
        : await createReel(formData);

      if (response.success) {
        alert(response.message || "Saved successfully");
        resetForm();
        fetchReels();
      } else {
        alert("Error: " + response.message);
      }
    } catch (error) {
      console.error("Error saving reel:", error);
      alert("Failed to save reel");
    }
  };

  const handleEdit = (reel) => {
    setFormData({
      reelUrl: reel.reelUrl,
      embedUrl: reel.embedUrl || "",
      title: reel.title,
      username: reel.username,
      thumbnailUrl: reel.thumbnailUrl || "",
      featured: reel.featured,
      isActive: reel.isActive,
    });
    setEditingId(reel._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this reel?")) return;

    try {
      const response = await deleteReel(id);

      if (response.success) {
        alert("Reel deleted successfully");
        fetchReels();
      }
    } catch (error) {
      console.error("Error deleting reel:", error);
      alert("Failed to delete reel");
    }
  };

  const toggleFeatured = async (reel) => {
    try {
      const response = await updateReel(reel._id, { ...reel, featured: !reel.featured });
      if (response.success) {
        fetchReels();
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  const toggleActive = async (reel) => {
    try {
      const response = await updateReel(reel._id, { ...reel, isActive: !reel.isActive });
      if (response.success) {
        fetchReels();
      }
    } catch (error) {
      console.error("Error toggling active:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      reelUrl: "",
      embedUrl: "",
      title: "",
      username: "",
      thumbnailUrl: "",
      featured: true,
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading reels...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Reel Management</h1>
            <p className="text-gray-400 mt-1">Manage your featured Instagram reels</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Reel
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-cyan-400">{reels.length}</div>
            <div className="text-gray-400 mt-1">Total Reels</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-green-400">
              {reels.filter(r => r.featured).length}
            </div>
            <div className="text-gray-400 mt-1">Featured</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-3xl font-bold text-blue-400">
              {reels.filter(r => r.isActive).length}
            </div>
            <div className="text-gray-400 mt-1">Active</div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl max-w-2xl w-full p-6 border border-gray-800 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">
                  {editingId ? "Edit Reel" : "Add New Reel"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instagram Reel URL *
                  </label>
                  <input
                    type="url"
                    value={formData.reelUrl}
                    onChange={(e) => setFormData({ ...formData, reelUrl: e.target.value })}
                    placeholder="https://www.instagram.com/reel/..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Featured Reel"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="@username"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Thumbnail URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    placeholder="https://your-cdn.com/thumbnail.jpg"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: Upload to Cloudinary or your CDN for best performance
                  </p>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500"
                    />
                    <span className="text-gray-300">Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500"
                    />
                    <span className="text-gray-300">Active</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? "Update" : "Create"} Reel
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reels List */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Preview</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {reels.map((reel) => (
                  <tr key={reel._id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                        {reel.thumbnailUrl ? (
                          <img
                            src={resolveAsset(reel.thumbnailUrl)}
                            alt={reel.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <Eye className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{reel.title}</div>
                      <div className="text-sm text-cyan-400">{reel.username}</div>
                      <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                        {reel.reelUrl}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleFeatured(reel)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${reel.featured
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-gray-800 text-gray-400 border border-gray-700"
                            }`}
                        >
                          {reel.featured ? <Star className="w-3 h-3" /> : <StarOff className="w-3 h-3" />}
                          {reel.featured ? "Featured" : "Not Featured"}
                        </button>
                        <button
                          onClick={() => toggleActive(reel)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${reel.isActive
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-gray-800 text-gray-400 border border-gray-700"
                            }`}
                        >
                          {reel.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {reel.isActive ? "Active" : "Inactive"}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(reel)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-cyan-400"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(reel._id)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No reels found. Add your first reel to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}