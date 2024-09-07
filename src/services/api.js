import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const generateZineOutline = async (theme, style, complexity) => {
  try {
    const response = await axios.post('/generate-outline', { theme, style, complexity });
    console.log('Raw API response:', response);
    
    if (response.data && response.data.content) {
      return response.data; // Return the entire response data
    } else {
      console.error('Unexpected response structure:', response.data);
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('Error in generateZineOutline:', error);
    throw error;
  }
};