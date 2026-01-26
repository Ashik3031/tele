// Helper to get the correct API URL
const getApiUrl = () => {
  const hostname = window.location.hostname;

  if (hostname === '72.61.238.90' || hostname.startsWith('72.61.238.90')) {
    return 'http://72.61.238.90:5000';
  }

  if (hostname === 'www.tspl-corp.com' || hostname === 'tspl-corp.com' || hostname.includes('tspl-corp.com')) {
    return 'https://api.tspl-corp.com';
  }

  return 'http://localhost:5000';
};

const BASE_URL = getApiUrl();
const PROJECTS_ENDPOINT = `${BASE_URL}/api/projects`;

// Fetch all featured projects
export const getAllFeaturedProjects = async () => {
  try {
    const response = await fetch(`${PROJECTS_ENDPOINT}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Fetch all projects (admin)
export const getAdminAllProjects = async () => {
  try {
    const response = await fetch(`${PROJECTS_ENDPOINT}/admin/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get single project
export const getProjectById = async (id) => {
  try {
    const response = await fetch(`${PROJECTS_ENDPOINT}/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Create project
export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${PROJECTS_ENDPOINT}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (id, projectData) => {
  try {
    const response = await fetch(`${PROJECTS_ENDPOINT}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update project: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${PROJECTS_ENDPOINT}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
