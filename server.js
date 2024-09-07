import express from 'express';
import cors from 'cors';
import axios from 'axios';
import config from './config.js';

const app = express();
const port = 3001;

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

app.post('/generate-outline', async (req, res) => {
    try {
      console.log('Received request:', req.body);
      
      const { theme, style, complexity } = req.body;
      
      console.log('Sending request to Anthropic API');
      
      const response = await axios.post(
        ANTHROPIC_API_URL,
        {
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Create an outline for a zine with the following parameters:
            Theme: ${theme}
            Style: ${style}
            Complexity: ${complexity} (on a scale of 1-10)
            
            Please provide a structured outline with sections and brief descriptions for each page of the zine.`
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          },
        }
      );
  
      console.log('Anthropic API response received:', JSON.stringify(response.data, null, 2));
      
      // Ensure we're sending the correct part of the response
      if (response.data && response.data.content) {
        console.log('Sending content to client:', response.data.content);
        res.json({ content: response.data.content });
      } else {
        console.error('Unexpected Anthropic API response structure:', response.data);
        throw new Error('Unexpected Anthropic API response structure');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      res.status(500).json({ error: 'An error occurred while generating the outline.', details: error.message });
    }
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Configuration loaded:', config.ANTHROPIC_API_KEY ? 'API Key present' : 'API Key missing');
});