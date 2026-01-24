const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const jobApplicationAPI = {
  // Submit job application with resume
  submitApplication: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/jobs/apply`, {
        method: 'POST',
        body: formData, // FormData handles multipart/form-data automatically
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  // Get all applications (Admin)
  getAllApplications: async () => {
    try {
      const response = await fetch(`${API_URL}/jobs/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get single application by ID
  getApplication: async (id) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  // Update application status (Admin)
  updateApplicationStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicationStatus: status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  // Delete application (Admin)
  deleteApplication: async (id) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  },
};
