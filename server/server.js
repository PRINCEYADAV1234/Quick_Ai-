import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to load .env from server folder first, then root directory
const envPathServer = path.resolve(__dirname, '.env');
const envPathRoot = path.resolve(__dirname, '../.env');

let envPath = null;

// Check if .env exists in server folder first
if (fs.existsSync(envPathServer)) {
  envPath = envPathServer;
  dotenv.config({ path: envPath });
  console.log('Loading .env from server folder:', envPath);
} else if (fs.existsSync(envPathRoot)) {
  envPath = envPathRoot;
  dotenv.config({ path: envPath });
  console.log(' Loading .env from root directory:', envPath);
} else {
  // Try both locations anyway (in case fs check has issues)
  dotenv.config({ path: envPathServer });
  dotenv.config({ path: envPathRoot });
  console.log('⚠️  .env file not found at expected locations, tried:', envPathServer, 'and', envPathRoot);
}

// Verify Cloudinary env vars are loaded
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('WARNING: Cloudinary environment variables are missing!');
  console.error('   Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  console.error('   Make sure your .env file is in either:');
  console.error('   - Server folder:', envPathServer);
  console.error('   - Root directory:', envPathRoot);
}

const app = express()

// Initialize Cloudinary connection
let cloudinaryInitialized = false;
async function initializeCloudinary() {
  if (!cloudinaryInitialized) {
    await connectCloudinary();
    cloudinaryInitialized = true;
  }
}

// Middleware to ensure Cloudinary is initialized
app.use(async (req, res, next) => {
  if (!cloudinaryInitialized) {
    await initializeCloudinary();
  }
  next();
});

app.use(cors({
  origin: process.env.VERCEL_ENV 
    ? ['https://your-frontend-domain.vercel.app'] // Add your Vercel frontend URL
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use(clerkMiddleware())

app.get('/' ,(req,res) => res.send("server is live with message hello"))

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

app.use(requireAuth());
app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)

// Export handler for Vercel serverless functions
export default app;

// Only start server if running locally (not in Vercel)
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ()=>{
    console.log("server is live on the port", PORT)
  })
}


