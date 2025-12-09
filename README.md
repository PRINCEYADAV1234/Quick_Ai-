# Quick AI SaaS

A comprehensive AI-powered SaaS platform that empowers users to generate content, manipulate images, and enhance their productivity using cutting-edge AI tools. Built with React (Vite), Node.js/Express, and deployed on Vercel.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Key Functions](#key-functions)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Project Overview

**Quick AI SaaS** is a full-stack MERN application that provides a suite of AI-driven tools:

- **Content Generation**: Write articles and generate blog titles using Google Gemini AI
- **Image Generation**: Create stunning images from text prompts using ClipDrop API
- **Image Manipulation**: Remove backgrounds and objects from images
- **Resume Review**: Analyze resumes and provide detailed feedback
- **User Authentication**: Secure authentication via Clerk
- **Premium Plans**: Free and Premium tier support with usage limits
- **Dashboard**: Personal creation history and plan management

---

## Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4 with Vite integration
- **UI Components**: Lucide React Icons
- **State Management & Routing**: React Router v7
- **Authentication**: Clerk React SDK
- **HTTP Client**: Axios
- **Markdown**: React Markdown
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Type Writer Effect**: React Simple Typewriter

### Backend
- **Runtime**: Node.js with ES Modules
- **Server**: Express.js
- **Database**: Neon PostgreSQL (Serverless)
- **File Upload**: Multer with local storage
- **Image Storage**: Cloudinary CDN
- **Authentication**: Clerk Express SDK
- **AI Integrations**:
  - Google Gemini 2.0 Flash (article & blog title generation)
  - ClipDrop API (image generation, background/object removal)
- **PDF Processing**: pdf-parse
- **Environment**: dotenv

### DevOps & Deployment
- **Client Deployment**: Vercel
- **Server Deployment**: Vercel (Serverless Functions)
- **Database**: Neon Serverless PostgreSQL

---

## Features

### 1. **AI Article Writer** 📝
- Generate high-quality articles on any topic
- Powered by Google Gemini 2.0 Flash
- Customizable word count (short: 500-800, medium: 800-1200, long: 1200+)
- Free tier: 10 articles/month | Premium: Unlimited

### 2. **Blog Title Generator** 🏷️
- Generate catchy, SEO-friendly blog titles
- Multiple category options (General, Technology, Business, Health, etc.)
- Batch title suggestions
- Free tier: 10 generations/month | Premium: Unlimited

### 3. **AI Image Generation** 🖼️
- Create custom images from text prompts
- Multiple style options (Realistic, Ghibli, Anime, Cartoon, Fancy, 3D, Portrait)
- Publish/share generated images
- Premium feature only

### 4. **Background Removal** 🎨
- Remove image backgrounds seamlessly
- Supports JPG, PNG, and other formats
- ClipDrop-powered technology
- Premium feature only

### 5. **Object Removal** ✂️
- Remove unwanted objects from images
- Single object name input
- Cloudinary generative AI transformation
- Premium feature only

### 6. **Resume Reviewer** 📄
- Upload PDF resumes for analysis
- Get detailed feedback using Google Gemini AI
- Identify strengths and improvement areas
- Up to 5MB file size support
- Premium feature only

### 7. **User Dashboard** 📊
- View creation history
- Check active plan status
- Track free tier usage
- Display recent creations with creation type and date

### 8. **Community Gallery** (Commented Out)
- View published creations
- Like/unlike public creations
- User ratings and interactions

---

## API Endpoints

### AI Routes (`/api/ai`)

| Method | Endpoint | Auth | Features |
|--------|----------|------|----------|
| POST | `/generate-article` | Required | Generate articles, tracks free usage |
| POST | `/generate-blog-title` | Required | Generate blog titles, tracks free usage |
| POST | `/generate-image` | Required | Generate images (Premium only) |
| POST | `/remove-image-background` | Required | Remove backgrounds (Premium only) |
| POST | `/remove-image-object` | Required | Remove objects (Premium only) |
| POST | `/resume-review` | Required | Review resumes (Premium only) |

### User Routes (`/api/user`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/get-user-creations` | Required | Fetch user's creations |
| GET | `/get-published-creations` | Required | Fetch public creations |
| POST | `/toggle-like-creations` | Required | Like/unlike creations |

### Health Check

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/health` | No |

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Clerk account (authentication)
- Cloudinary account (image storage)
- Neon PostgreSQL account (database)
- Google Gemini API key
- ClipDrop API key

### Clone Repository

```powershell
git clone https://github.com/PRINCEYADAV1234/Quick_Ai-.git
cd "Quick AI Saas"
```

### Install Dependencies

```powershell
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## Environment Variables

### Server Configuration (`.env` in `server/` folder)

```env
# Database
DATABASE_URL=postgresql://user:password@ep-xxxx.neon.tech/dbname

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Clerk (Authentication)
CLERK_SECRET_KEY=your_clerk_secret

# AI APIs
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key

# Server Port (optional, defaults to 5000)
PORT=5000

# Node Environment
NODE_ENV=development
```

### Client Configuration (`.env` in `client/` folder)

```env
# Backend API URL
VITE_BASE_URL=http://localhost:5000

# Clerk Frontend Key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Getting API Keys

1. **Clerk**: Visit [clerk.com](https://clerk.com) → Create account → Get keys from dashboard
2. **Google Gemini**: Visit [ai.google.dev](https://ai.google.dev) → Get API key
3. **ClipDrop**: Visit [clipdrop.co](https://clipdrop.co) → Get API key
4. **Cloudinary**: Visit [cloudinary.com](https://cloudinary.com) → Create account → Get credentials
5. **Neon PostgreSQL**: Visit [neon.tech](https://neon.tech) → Create project → Get connection string

---

## Running the Project

### Development Mode (Two Terminal Windows)

**Terminal 1 - Start Backend Server:**

```powershell
cd server
npm run server
```

Server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server:**

```powershell
cd client
npm run dev
```

Client will run on `http://localhost:5173`

### Production Build

**Build Frontend:**

```powershell
cd client
npm run build
```

**Build Backend:**

```powershell
cd server
npm start
```

---

## Project Structure

```
Quick AI Saas/
│
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WriteArticle.jsx
│   │   │   ├── BlogTitles.jsx
│   │   │   ├── GenerateImages.jsx
│   │   │   ├── RemoveBackground.jsx
│   │   │   ├── RemoveObject.jsx
│   │   │   ├── ReviewResume.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Community.jsx
│   │   ├── component/               # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── AiTools.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Plans.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── CTA.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── CreationItem.jsx
│   │   ├── assets/
│   │   │   └── assets.js            # Images and constants
│   │   ├── App.jsx                  # Main app routing
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── eslint.config.js
│
├── server/                          # Express Backend
│   ├── controller/
│   │   ├── aiController.js          # AI operations
│   │   └── userController.js        # User operations
│   ├── routes/
│   │   ├── aiRoutes.js              # /api/ai endpoints
│   │   └── userRoutes.js            # /api/user endpoints
│   ├── middleware/
│   │   └── auth.js                  # Auth & plan checking
│   ├── configs/
│   │   ├── db.js                    # Neon PostgreSQL setup
│   │   ├── cloudinary.js            # Cloudinary configuration
│   │   └── multer.js                # File upload config
│   ├── uploads/                     # Local file storage
│   ├── server.js                    # Express app entry
│   ├── package.json
│   ├── vercel.json
│   └── .env                         # Environment variables
│
├── .gitignore
└── README.md
```

---

## Key Functions

### Backend Controllers

#### `aiController.js`

| Function | Purpose | Auth | Rate Limit |
|----------|---------|------|-----------|
| `generateArticle()` | Generate articles using Gemini | ✓ | Free: 10/mo, Premium: Unlimited |
| `generateBlogTitle()` | Generate blog titles | ✓ | Free: 10/mo, Premium: Unlimited |
| `generateImage()` | Generate images from prompts | ✓ | Premium only |
| `removeBackground()` | Remove image backgrounds | ✓ | Premium only |
| `removeImageObject()` | Remove objects from images | ✓ | Premium only |
| `resumeReview()` | Analyze and review resumes | ✓ | Premium only |

#### `userController.js`

| Function | Purpose | Auth |
|----------|---------|------|
| `getUserCreations()` | Fetch user's creations | ✓ |
| `getPublishedCreations()` | Fetch public creations | ✓ |
| `toggleLikeCreation()` | Like/unlike creations | ✓ |

### Middleware

#### `auth.js`
- Validates user authentication via Clerk
- Checks premium plan status
- Tracks free tier usage (max 10/month for free users)
- Sets `req.plan` and `req.free_usage` properties

---

## Deployment

### Deploy to Vercel

#### Frontend Deployment

1. Connect GitHub repository to Vercel
2. Set environment variable:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_BASE_URL` (your backend URL)
3. Deploy from `client` folder

#### Backend Deployment

1. Create Vercel project for backend
2. Set environment variables:
   - `DATABASE_URL`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `CLERK_SECRET_KEY`
   - `GEMINI_API_KEY`
   - `CLIPDROP_API_KEY`
3. Deploy from `server` folder as serverless function

#### Environment Variables on Vercel

Go to **Settings → Environment Variables** and add all required keys from `.env` files.

---

## Troubleshooting

### Database Connection Issues

**Error**: `DATABASE_URL is required but not found`

**Solution**:
1. Verify `.env` file exists in `server/` folder
2. Check Neon connection string is correct
3. Ensure network access is enabled in Neon dashboard

### Cloudinary Errors

**Error**: `Cloudinary environment variables are missing`

**Solution**:
1. Verify cloud name, API key, and secret in `.env`
2. Test credentials on Cloudinary dashboard
3. Check for extra spaces in `.env` values

### API Not Responding

**Error**: `Cannot connect to server`

**Solution**:
```powershell
# Check if server is running
Get-Process | Where-Object {$_.Name -like "*node*"}

# Verify port 5000 is listening
netstat -an | findstr ":5000"

# Restart server
cd server
npm run server
```

### CORS Issues

**Solution**: Server CORS is pre-configured for:
- `http://localhost:5173` (dev client)
- `http://localhost:3000` (alternative port)
- `http://127.0.0.1:5173`

Add more origins in `server.js` if needed.

### PDF Parsing Fails

**Error**: `Failed to parse PDF`

**Solution**:
- Ensure resume is text-based (not scanned image)
- File size < 5MB
- PDF is not password-protected
- Export scanned PDFs as text-based

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Standards
- Use Prettier for code formatting
- Follow ESLint rules
- Write meaningful commit messages
- Test features locally before PR

---

## License

This project is licensed under the ISC License. See `LICENSE` file for details.

---

## Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Contact: [Your contact info]
- Email: support@quickai.com

---

## Acknowledgments

- **Google Gemini** for AI text generation
- **ClipDrop** for image generation and manipulation
- **Clerk** for authentication
- **Cloudinary** for image hosting
- **Neon** for serverless PostgreSQL
- **Vercel** for deployment platform

---

## Changelog

### Version 1.0.0 (Current)
- ✅ AI article generation
- ✅ Blog title generation
- ✅ Image generation
- ✅ Background removal
- ✅ Object removal
- ✅ Resume review
- ✅ User dashboard
- ✅ Premium/Free tier system
- ✅ Clerk authentication

---

**Last Updated**: December 8, 2025

**Project Status**:  Active Development

---

Made with  by the Quick AI Team
