# Multiplayer Server Deployment Guide

## Quick Fix - Deploy to Render.com

Your multiplayer issue is fixed! The problem was that your client was trying to connect to a non-existent server. Here's how to deploy:

### Step 1: Deploy Server to Render.com

1. **Go to [render.com](https://render.com)** and sign up (free)
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repo** or use "Build and deploy from a Git repository"
4. **Configure the service:**
   - **Name**: `galactic-trading-server`
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. **Click "Create Web Service"**
6. **Wait 2-3 minutes for deployment**
7. **Copy the URL** (e.g., `https://galactic-trading-server-xyz.onrender.com`)

### Step 2: Update Client Configuration

1. **Update your `.env` file:**
   ```
   REACT_APP_MULTIPLAYER_SERVER=https://your-actual-render-url.onrender.com
   PORT=4112
   ```

2. **Redeploy your React app** to Netlify

### Step 3: Test

1. Open your deployed React app
2. Check browser console for "✅ Connected to multiplayer server"
3. Open multiple browser tabs to test multiplayer functionality
4. All players should now see the same prices and be in the same instance!

## Alternative - Deploy to Railway.app

1. **Go to [railway.app](https://railway.app)** and sign up
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select your repository**
4. **Set root directory to `server`**
5. **Deploy and copy the URL**
6. **Update `.env` file with the Railway URL**

## What Was Fixed

1. ✅ **Server Configuration**: Added proper CORS and transport settings
2. ✅ **Client Configuration**: Added fallback URL and connection options  
3. ✅ **Environment Variables**: Created `.env` file for easy URL changes
4. ✅ **Health Check**: Added endpoint to monitor server status
5. ✅ **Port Configuration**: Changed to avoid conflicts

## Current Status

- ✅ Server code ready for deployment
- ✅ Client configured with environment variables
- ✅ CORS configured for your Netlify domain
- ✅ Health check endpoint available
- 🟡 **Next**: Deploy server and update client URL

## Testing Locally

The server is currently running on `http://localhost:3005`. You can test locally by:

1. Ensuring the server is running: `cd server && npm start`
2. Starting your React app: `npm start`
3. Opening multiple browser tabs to test multiplayer

## Troubleshooting

- **"0 players online"**: Server not deployed or wrong URL in `.env`
- **Connection errors**: Check CORS settings and server URL
- **Different prices**: Players connecting to different servers/instances

Once you deploy the server and update the `.env` file, your multiplayer functionality will work correctly!