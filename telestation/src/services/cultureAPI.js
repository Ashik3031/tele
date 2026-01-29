const API_URL = '/api/culture';

export const uploadCultureImage = async (file) => {
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

export const getAllCultureItems = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch culture items: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching culture items:', error);
    throw error;
  }
};

export const getCultureByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/category/${category}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch culture items: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching culture items:', error);
    throw error;
  }
};

export const createCultureItem = async (itemData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create item: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const updateCultureItem = async (itemId, itemData) => {
  try {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update item: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteCultureItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const getAdminAllCultureItems = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
