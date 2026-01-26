// Helper to get the correct API URL
const getApiUrl = () => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // Production IP
  if (hostname === '72.61.238.90' || hostname.startsWith('72.61.238.90')) {
    return 'http://72.61.238.90:5000';
  }

  // Production domain
  if (hostname === 'www.tspl-corp.com' || hostname === 'tspl-corp.com' || hostname.includes('tspl-corp.com')) {
    return 'https://api.tspl-corp.com';
  }

  // Development
  return 'http://localhost:5000';
};

const BASE_URL = getApiUrl();
const AWARDS_ENDPOINT = `${BASE_URL}/api/awards`;

// Upload award image
export const uploadAwardImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${AWARDS_ENDPOINT}/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Convert relative path to full URL
    if (data.success && data.data && data.data.imageUrl) {
      data.data.imageUrl = `${BASE_URL}${data.data.imageUrl}`;
    }
    
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Fetch all awards
export const getAllAwards = async () => {
  try {
    const response = await fetch(`${AWARDS_ENDPOINT}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch awards: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Convert relative image URLs to absolute
    if (data.success && data.data) {
      const convertImageUrls = (awards) => {
        return awards.map(award => ({
          ...award,
          imageUrl: award.imageUrl && !award.imageUrl.startsWith('http') 
            ? `${BASE_URL}${award.imageUrl}` 
            : award.imageUrl
        }));
      };
      
      if (data.data.employeeOfMonth) {
        data.data.employeeOfMonth = convertImageUrls(data.data.employeeOfMonth);
      }
      if (data.data.targetAchieved) {
        data.data.targetAchieved = convertImageUrls(data.data.targetAchieved);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
};

// Fetch awards by category
export const getAwardsByCategory = async (category) => {
  try {
    const response = await fetch(`${AWARDS_ENDPOINT}/category/${category}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch awards: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
};

// Create new award (Admin)
export const createAward = async (awardData) => {
  try {
    const response = await fetch(`${AWARDS_ENDPOINT}`, {
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating award:', error);
    throw error;
  }
};

// Update award (Admin)
export const updateAward = async (awardId, awardData) => {
  try {
    const response = await fetch(`${AWARDS_ENDPOINT}/${awardId}`, {
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating award:', error);
    throw error;
  }
};

// Delete award (Admin)
export const deleteAward = async (awardId) => {
  try {
    const response = await fetch(`${AWARDS_ENDPOINT}/${awardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete award: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting award:', error);
    throw error;
  }
};

// Fetch all awards (Admin - including inactive)
export const getAdminAllAwards = async () => {
  try {
    const response = await fetch(`${AWARDS_ENDPOINT}/admin/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch awards: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
};
