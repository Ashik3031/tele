import React, { useState, useEffect } from 'react';
import { Download, Trash2, CheckCircle, Clock, XCircle, Eye, Briefcase, Award, Users, Zap, Film } from 'lucide-react';
import { jobApplicationAPI } from '../services/jobApplicationAPI';
import JobPostingsManager from './JobPostingsManager';
import AwardsManager from './AwardsManager';
import TeamManager from './TeamManager';
import CultureManager from './CultureManager';
import ProjectManager from './ProjectManager';
import ReelManager from './ReelManager';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('applications'); // 'applications', 'postings', 'awards', 'team', 'culture', 'projects', 'reels'

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await jobApplicationAPI.getAllApplications();
      if (response.success) {
        setApplications(response.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      alert('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await jobApplicationAPI.updateApplicationStatus(id, newStatus);
      if (response.success) {
        setApplications(applications.map(app => 
          app._id === id ? { ...app, applicationStatus: newStatus } : app
        ));
        alert('Application status updated');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await jobApplicationAPI.deleteApplication(id);
        if (response.success) {
          setApplications(applications.filter(app => app._id !== id));
          setSelectedApp(null);
          alert('Application deleted');
        }
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'reviewed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'shortlisted':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <Eye className="w-4 h-4" />;
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredApplications = applications.filter(app => {
    const statusMatch = filterStatus === 'all' || app.applicationStatus === filterStatus;
    const searchMatch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage job applications and postings</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 px-4 font-medium transition whitespace-nowrap ${
              activeTab === 'applications'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="inline-block w-4 h-4 mr-2" />
            Applications
          </button>
          <button
            onClick={() => setActiveTab('postings')}
            className={`pb-3 px-4 font-medium transition whitespace-nowrap ${
              activeTab === 'postings'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Briefcase className="inline-block w-4 h-4 mr-2" />
            Job Postings
          </button>
          <button
            onClick={() => setActiveTab('awards')}
            className={`pb-3 px-4 font-medium transition whitespace-nowrap ${
              activeTab === 'awards'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="inline-block w-4 h-4 mr-2" />
            Awards
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`pb-3 px-4 font-medium transition whitespace-nowrap ${
              activeTab === 'team'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="inline-block w-4 h-4 mr-2" />
            Team
          </button>
          <button
            onClick={() => setActiveTab('culture')}
            className={`pb-3 px-4 font-medium transition whitespace-nowrap ${
              activeTab === 'culture'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Zap className="inline-block w-4 h-4 mr-2" />
            Life at TSPL
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 px-4 font-medium transition whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Briefcase className="inline-block w-4 h-4 mr-2" />
            Featured Projects
          </button>
          <button
            onClick={() => setActiveTab('reels')}
            className={`pb-3 px-4 font-medium transition whitespace-nowrap ${
              activeTab === 'reels'
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Film className="inline-block w-4 h-4 mr-2" />
            Featured Reels
          </button>
        </div>

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Total Applications</p>
                <p className="text-2xl font-bold">{applications.length}</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-500 text-sm mb-1">Pending</p>
                <p className="text-2xl font-bold">{applications.filter(a => a.applicationStatus === 'pending').length}</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-500 text-sm mb-1">Shortlisted</p>
                <p className="text-2xl font-bold">{applications.filter(a => a.applicationStatus === 'shortlisted').length}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-500 text-sm mb-1">Rejected</p>
                <p className="text-2xl font-bold">{applications.filter(a => a.applicationStatus === 'rejected').length}</p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search by name, email, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236EF1F7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="all" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>All Status</option>
                <option value="pending" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Pending</option>
                <option value="reviewed" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Reviewed</option>
                <option value="shortlisted" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Shortlisted</option>
                <option value="rejected" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Rejected</option>
              </select>
              <button
                onClick={fetchApplications}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-black px-6 py-2 rounded-lg font-semibold transition"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Applications List */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Position</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Applied</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                              No applications found
                            </td>
                          </tr>
                        ) : (
                          filteredApplications.map(app => (
                            <tr 
                              key={app._id}
                              onClick={() => setSelectedApp(app)}
                              className={`border-b border-white/10 cursor-pointer transition ${
                                selectedApp?._id === app._id ? 'bg-white/10' : 'hover:bg-white/5'
                              }`}
                            >
                              <td className="px-4 py-3 text-sm">{app.fullName}</td>
                              <td className="px-4 py-3 text-sm text-gray-400">{app.position}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(app.applicationStatus)}`}>
                                  {getStatusIcon(app.applicationStatus)}
                                  {app.applicationStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-400">
                                {new Date(app.appliedAt).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedApp(app);
                                  }}
                                  className="text-cyan-500 hover:text-cyan-400 text-sm font-medium"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Details Panel */}
              <div className="lg:col-span-1">
                {selectedApp ? (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-6">
                    <h3 className="text-xl font-bold mb-4">Application Details</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Full Name</p>
                        <p className="font-medium">{selectedApp.fullName}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <a href={`mailto:${selectedApp.email}`} className="text-cyan-400 hover:text-cyan-300">
                          {selectedApp.email}
                        </a>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-1">Phone</p>
                        <p className="font-medium">{selectedApp.phone}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-1">Position</p>
                        <p className="font-medium">{selectedApp.position}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-1">Experience</p>
                        <p className="font-medium">{selectedApp.experience}</p>
                      </div>

                      {selectedApp.linkedInProfile && (
                        <div>
                          <p className="text-gray-400 text-sm mb-1">LinkedIn</p>
                          <a href={selectedApp.linkedInProfile} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 break-all text-sm">
                            {selectedApp.linkedInProfile}
                          </a>
                        </div>
                      )}

                      {selectedApp.portfolio && (
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Portfolio</p>
                          <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 break-all text-sm">
                            {selectedApp.portfolio}
                          </a>
                        </div>
                      )}

                      {selectedApp.coverLetter && (
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Cover Letter</p>
                          <p className="text-sm bg-white/5 p-3 rounded border border-white/10">{selectedApp.coverLetter}</p>
                        </div>
                      )}

                      {selectedApp.resume && (
                        <div>
                          <p className="text-gray-400 text-sm mb-2">Resume</p>
                          <a
                            href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/jobs/download/${selectedApp.resume.filename}`}
                            download={selectedApp.resume.originalName}
                            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-3 py-2 rounded text-sm font-medium transition"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </a>
                          <p className="text-xs text-gray-500 mt-2">{(selectedApp.resume.size / 1024).toFixed(2)} KB</p>
                        </div>
                      )}
                    </div>

                    {/* Status Update */}
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <p className="text-gray-400 text-sm mb-3">Update Status</p>
                      <div className="space-y-2">
                        {['pending', 'reviewed', 'shortlisted', 'rejected'].map(status => (
                          <button
                            key={status}
                            onClick={() => handleUpdateStatus(selectedApp._id, status)}
                            className={`w-full px-3 py-2 rounded text-sm font-medium transition capitalize ${
                              selectedApp.applicationStatus === status
                                ? 'bg-cyan-500 text-black'
                                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(selectedApp._id)}
                      className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-500 px-3 py-2 rounded font-medium transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Application
                    </button>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center text-gray-400">
                    <p>Select an application to view details</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Job Postings Tab */}
        {activeTab === 'postings' && (
          <JobPostingsManager />
        )}

        {/* Awards Tab */}
        {activeTab === 'awards' && (
          <AwardsManager />
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <TeamManager />
        )}

        {/* Culture Tab */}
        {activeTab === 'culture' && (
          <CultureManager />
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <ProjectManager />
        )}

        {/* Reels Tab */}
        {activeTab === 'reels' && (
          <ReelManager />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
