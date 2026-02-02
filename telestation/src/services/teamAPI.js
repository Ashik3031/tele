import { API_BASE } from '../config/api';

const API_URL = `${API_BASE}/team`;

export const uploadTeamImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getAllTeamMembers = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
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

export const createTeamMember = async (memberData) => {
  try {
    const response = await fetch(`${API_URL}`, {
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

export const updateTeamMember = async (memberId, memberData) => {
  try {
    const response = await fetch(`${API_URL}/${memberId}`, {
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

export const deleteTeamMember = async (memberId) => {
  try {
    const response = await fetch(`${API_URL}/${memberId}`, {
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

export const getAdminAllTeamMembers = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/all`, {
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
