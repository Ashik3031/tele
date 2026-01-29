const API_URL = '/api/awards';

export const uploadAwardImage = async (file) => {
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

export const getAllAwards = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch awards: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
};

export const getAwardsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/category/${category}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch awards: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
};

export const createAward = async (awardData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(awardData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create award: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating award:', error);
    throw error;
  }
};

export const updateAward = async (awardId, awardData) => {
  try {
    const response = await fetch(`${API_URL}/${awardId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(awardData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update award: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating award:', error);
    throw error;
  }
};

export const deleteAward = async (awardId) => {
  try {
    const response = await fetch(`${API_URL}/${awardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete award: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting award:', error);
    throw error;
  }
};

export const getAdminAllAwards = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch awards: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
};
