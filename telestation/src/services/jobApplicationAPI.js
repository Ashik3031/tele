// Determine API URL based on environment
let API_URL = 'http://localhost:5000/api'; // Default for local development

if (import.meta.env.VITE_API_URL) {
  API_URL = import.meta.env.VITE_API_URL;
} else if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Production with domain
  if (hostname === 'www.tspl-corp.com' || hostname === 'tspl-corp.com') {
    API_URL = `${protocol}//api.tspl-corp.com/api`;
  }
  // Production with server IP
  else if (hostname === '72.61.238.90' || hostname.includes('72.61.238.90')) {
    API_URL = 'http://72.61.238.90:5000/api';
  }
  // Local development
  else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    API_URL = 'http://localhost:5000/api';
  }
}

export const jobApplicationAPI = {
  // Submit job application with resume
  submitApplication: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/jobs/apply`, {
        method: 'POST',
        credentials: 'include',
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
      const response = await fetch(`${API_URL}/jobs/all`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
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
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
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
        credentials: 'include',
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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
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
