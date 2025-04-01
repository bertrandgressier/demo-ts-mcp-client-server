import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createVertex } from '@ai-sdk/google-vertex';
import path from 'node:path';
import { config } from 'dotenv';

// Load environment variables from .env file first
config();

// --- Environment Variable Reading & Validation ---

// Read raw values from environment
const rawGoogleApiKey = process.env.GOOGLE_API_KEY;
const rawVertexProjectId = process.env.VERTEX_PROJECT_ID;
const rawVertexLocation = process.env.VERTEX_LOCATION;
const rawVertexKeyFile = process.env.VERTEX_KEY_FILE;

// Warn if required variables are missing
if (!rawGoogleApiKey) {
  console.warn('WARNING: Missing GOOGLE_API_KEY environment variable. Google Studio models may fail to initialize.');
}
if (!rawVertexProjectId) {
  console.warn('WARNING: Missing VERTEX_PROJECT_ID environment variable. Vertex AI models may fail to initialize.');
}

// Warn for optional variables if not explicitly set (using defaults)
if (rawVertexLocation === undefined) {
  console.warn('Optional: VERTEX_LOCATION environment variable is not set. Using default: "us-central1".');
}
if (rawVertexKeyFile === undefined) {
  console.warn('Optional: VERTEX_KEY_FILE environment variable is not set. Using default: "vertex-key.json".');
}

// Assign final values for use in the application, applying defaults
const GOOGLE_API_KEY = rawGoogleApiKey; // Will be undefined if missing (warning issued above)
const VERTEX_PROJECT_ID = rawVertexProjectId; // Will be undefined if missing (warning issued above)
const VERTEX_LOCATION = rawVertexLocation || 'us-central1';
const VERTEX_KEY_FILE = rawVertexKeyFile || 'vertex-key.json';

// --- End Validation ---

export enum GoogleModel {
  Gemini15Flash = 'models/gemini-1.5-flash-001',
  Gemini20FlashLite = 'models/gemini-2.0-flash-lite',
}

// Note: Original validation block is now replaced by the comprehensive checks above.

export const googleStudioModel = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY, // Use the key from process.env
});

export const vertexModel = createVertex({
  project: VERTEX_PROJECT_ID,
  location: VERTEX_LOCATION,
  googleAuthOptions: {
    keyFile: path.resolve(VERTEX_KEY_FILE),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  },
});
