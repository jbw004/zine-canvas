import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const config = {
  ANTHROPIC_API_KEY: process.env.VITE_ANTHROPIC_API_KEY,
};

// Verify that all required environment variables are set
Object.entries(config).forEach(([key, value]) => {
  if (value === undefined) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

export default config;