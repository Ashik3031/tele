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
const CULTURE_ENDPOINT = `${BASE_URL}/api/culture`;

// Upload culture image
export const uploadCultureImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${CULTURE_ENDPOINT}/upload`, {
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

// Fetch all culture items
export const getAllCultureItems = async () => {
  try {
    const response = await fetch(`${CULTURE_ENDPOINT}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch culture items: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      const convertUrls = (items) => {
        if (Array.isArray(items)) {
          return items.map(item => ({
            ...item,
            imageUrl: item.imageUrl && !item.imageUrl.startsWith('http') 
              ? `${BASE_URL}${item.imageUrl}` 
              : item.imageUrl
          }));
        }
        return items;
      };

      if (data.data.culture) data.data.culture = convertUrls(data.data.culture);
      if (data.data.event) data.data.event = convertUrls(data.data.event);
      if (data.data.achievement) data.data.achievement = convertUrls(data.data.achievement);
      if (data.data.milestone) data.data.milestone = convertUrls(data.data.milestone);
      if (data.data.all) data.data.all = convertUrls(data.data.all);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching culture items:', error);
    throw error;
  }
};

// Fetch by category
export const getCultureByCategory = async (category) => {
  try {
    const response = await fetch(`${CULTURE_ENDPOINT}/category/${category}`, {
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

// Create culture item
export const createCultureItem = async (itemData) => {
  try {
    const response = await fetch(`${CULTURE_ENDPOINT}`, {
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

// Update culture item
export const updateCultureItem = async (itemId, itemData) => {
  try {
    const response = await fetch(`${CULTURE_ENDPOINT}/${itemId}`, {
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

// Delete culture item
export const deleteCultureItem = async (itemId) => {
  try {
    const response = await fetch(`${CULTURE_ENDPOINT}/${itemId}`, {
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

// Get all culture items (Admin - including inactive)
export const getAdminAllCultureItems = async () => {
  try {
    const response = await fetch(`${CULTURE_ENDPOINT}/admin/all`, {
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
