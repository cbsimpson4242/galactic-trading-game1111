# Multiplayer Server Deployment Guide

## Quick Fix for Multiplayer Issues

The multiplayer functionality is not working because the server is running locally while the React app is deployed to Netlify. Here are the solutions:

## Option 1: Deploy to Render.com (Recommended - Free)

1. **Sign up for Render.com** (free tier available)
2. **Connect your GitHub repository**
3. **Create a new Web Service** with these settings:
   - **Name**: `galactic-commodity-exchange-server`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

4. **Deploy the service**
5. **Update the client URL** in `src/contexts/MultiplayerContext.js`:
   ```javascript
   const serverUrl = 'https://your-render-service-name.onrender.com';
   ```

## Option 2: Deploy to Railway.app (Alternative - Free)

1. **Sign up for Railway.app**
2. **Connect your GitHub repository**
3. **Create a new service** from the `server` directory
4. **Set the start command**: `npm start`
5. **Deploy and get the URL**

## Option 3: Use a Free WebSocket Service

For immediate testing, you can use a free WebSocket service like:
- **Glitch.com** - Import the server code
- **Replit.com** - Create a new Node.js project

## Option 4: Local Development Setup

For local development, run both servers:

```bash
# Terminal 1 - Start the multiplayer server
cd server
npm install
npm start

# Terminal 2 - Start the React app
npm start
```

## Environment Variables

Create a `.env` file in the root directory:
```
REACT_APP_MULTIPLAYER_SERVER=https://your-deployed-server-url.com
```

## Testing the Connection

1. Open browser developer tools
2. Check the console for connection messages
3. Look for "✅ Connected to multiplayer server" message
4. If you see connection errors, check the server URL and CORS settings

## Troubleshooting

- **CORS errors**: Make sure the server CORS settings include your Netlify domain
- **Connection refused**: Check if the server is running and accessible
- **WebSocket errors**: Ensure the hosting service supports WebSockets

## Current Status

- ✅ React app deployed to Netlify
- ❌ Multiplayer server needs deployment
- ✅ CORS settings updated for Netlify domain
- ✅ Client configured for deployed server
