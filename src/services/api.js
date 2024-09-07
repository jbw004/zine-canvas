// src/services/api.js
import axios from 'axios';

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/completions';

export const generateZineOutline = async (theme, style, complexity) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "claude-3-opus-20240229",
        max_tokens_to_sample: 1000,
        prompt: `Create an outline for a zine with the following parameters:
        Theme: ${theme}
        Style: ${style}
        Complexity: ${complexity} (on a scale of 1-10)
        
        Please provide a structured outline with sections and brief descriptions for each page of the zine.`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': ANTHROPIC_API_KEY,
        },
      }
    );

    return response.data.completion;
  } catch (error) {
    console.error('Error generating zine outline:', error);
    throw error;
  }
};