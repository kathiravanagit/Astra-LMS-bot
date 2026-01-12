# Deployment Guide

## Backend Deployment on Railway

### Steps:

1. **Push your code to GitHub** (if not already done)

2. **Go to Railway** (https://railway.app)
   - Sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your LMS-Chatbot repository
   - Set root directory to `LMS-Backend`

3. **Add Environment Variables in Railway**
   - Go to your project settings
   - Add the following variable:
     - `API_KEY` = your Google GenAI API key
   - Railway automatically sets the `PORT` variable

4. **Deploy**
   - Railway will automatically detect the Procfile and deploy
   - Wait for deployment to complete
   - Copy your Railway app URL (e.g., `https://your-app.up.railway.app`)

### What's Already Configured:

✅ **Procfile** - Tells Railway to use Gunicorn
✅ **requirements.txt** - Contains all dependencies including gunicorn
✅ **CORS** - Allows requests from your Vercel frontend (https://astrabot12.vercel.app)
✅ **Port Configuration** - Uses Railway's PORT environment variable
✅ **API Key** - Loaded from environment variables

---

## Frontend Update on Vercel

After deploying to Railway:

1. **Get your Railway Backend URL**
   - Example: `https://your-app.up.railway.app`

2. **Update Vercel Environment Variables**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-app.up.railway.app/bot`
   - Redeploy your frontend

3. **Alternatively, update locally and push**
   - Create `.env` file in LMS-Frontend folder:
     ```
     VITE_API_URL=https://your-app.up.railway.app/bot
     ```
   - Commit and push to trigger Vercel deployment

---

## Testing

1. **Test Backend Health**
   ```
   curl https://your-app.up.railway.app/
   ```
   Should return: `{"status": "Astra LMS Bot is running", ...}`

2. **Test Frontend**
   - Visit https://astrabot12.vercel.app/
   - Send a message
   - Should receive a response from the bot

---

## Important Notes

- Make sure your `.env` file (with actual API key) is in `.gitignore`
- Never commit real API keys to GitHub
- The frontend will use localhost:8080 for local development if `VITE_API_URL` is not set
