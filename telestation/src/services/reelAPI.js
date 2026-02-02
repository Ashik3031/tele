import { API_BASE } from '../config/api';

const API_BASE_URL = `${API_BASE}/reels`;

export const getAllFeaturedReels = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch featured reels:', error);
    return { success: false, data: [] };
  }
};

export const getAdminAllReels = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch all reels:', error);
    return { success: false, data: [] };
  }
};

export const getReelById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch reel:', error);
    return { success: false };
  }
};

export const createReel = async (reelData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reelData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to create reel:', error);
    return { success: false, message: error.message };
  }
};

export const updateReel = async (id, reelData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reelData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to update reel:', error);
    return { success: false, message: error.message };
  }
};

export const deleteReel = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to delete reel:', error);
    return { success: false, message: error.message };
  }
};
