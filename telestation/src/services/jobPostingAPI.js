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

export const jobPostingAPI = {
  // Get all active job postings (Public - for Career page)
  getAllPostings: async () => {
    try {
      const response = await fetch(`${API_URL}/postings`, {
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
      console.error('Error fetching job postings:', error);
      throw error;
    }
  },

  // Get single job posting by ID
  getPostingById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/postings/${id}`, {
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
      console.error('Error fetching job posting:', error);
      throw error;
    }
  },

  // Create new job posting (Admin)
  createPosting: async (postingData) => {
    try {
      const response = await fetch(`${API_URL}/postings`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postingData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating job posting:', error);
      throw error;
    }
  },

  // Update job posting (Admin)
  updatePosting: async (id, postingData) => {
    try {
      const response = await fetch(`${API_URL}/postings/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postingData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating job posting:', error);
      throw error;
    }
  },

  // Delete job posting (Admin)
  deletePosting: async (id) => {
    try {
      const response = await fetch(`${API_URL}/postings/${id}`, {
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
      console.error('Error deleting job posting:', error);
      throw error;
    }
  },

  // Get all postings including inactive (Admin)
  getAllPostingsAdmin: async () => {
    try {
      const response = await fetch(`${API_URL}/postings/admin/all`, {
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
      console.error('Error fetching all job postings:', error);
      throw error;
    }
  }
};
