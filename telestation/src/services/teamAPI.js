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
const TEAM_ENDPOINT = `${BASE_URL}/api/team`;

// Upload team member image
export const uploadTeamImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${TEAM_ENDPOINT}/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success && data.data && data.data.imageUrl) {
      data.data.imageUrl = `${BASE_URL}${data.data.imageUrl}`;
    }
    
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Fetch all team members
export const getAllTeamMembers = async () => {
  try {
    const response = await fetch(`${TEAM_ENDPOINT}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      data.data = data.data.map(member => ({
        ...member,
        imageUrl: member.imageUrl && !member.imageUrl.startsWith('http') 
          ? `${BASE_URL}${member.imageUrl}` 
          : member.imageUrl
      }));
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Create team member
export const createTeamMember = async (memberData) => {
  try {
    const response = await fetch(`${TEAM_ENDPOINT}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create team member: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
};

// Update team member
export const updateTeamMember = async (memberId, memberData) => {
  try {
    const response = await fetch(`${TEAM_ENDPOINT}/${memberId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update team member: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
};

// Delete team member
export const deleteTeamMember = async (memberId) => {
  try {
    const response = await fetch(`${TEAM_ENDPOINT}/${memberId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete team member: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};

// Get all team members (Admin - including inactive)
export const getAdminAllTeamMembers = async () => {
  try {
    const response = await fetch(`${TEAM_ENDPOINT}/admin/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};
