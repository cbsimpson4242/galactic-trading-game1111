# Quick Multiplayer Server Deployment

## Option 1: Deploy to Render.com (5 minutes)

1. **Go to [Render.com](https://render.com)** and sign up (free)
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository** (if you have one) or use "Build and deploy from a Git repository"
4. **Configure the service:**
   - **Name**: `galactic-trading-server`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free
5. **Click "Create Web Service"**
6. **Wait for deployment** (2-3 minutes)
7. **Copy the URL** (e.g., `https://galactic-trading-server.onrender.com`)
8. **Update the client URL** in `src/contexts/MultiplayerContext.js`:
   ```javascript
   const serverUrl = 'https://your-actual-render-url.onrender.com';
   ```
9. **Redeploy the React app**

## Option 2: Deploy to Railway.app (5 minutes)

1. **Go to [Railway.app](https://railway.app)** and sign up (free)
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select your repository**
4. **Railway will auto-detect it's a Node.js app**
5. **Set the root directory to `server`**
6. **Deploy and get the URL**
7. **Update the client URL and redeploy**

## Option 3: Use Glitch.com (3 minutes)

1. **Go to [Glitch.com](https://glitch.com)**
2. **Click "New Project" → "Import from GitHub"**
3. **Paste this URL**: `https://github.com/your-username/your-repo`
4. **Or create a new Node.js project and copy the server files**
5. **Copy the contents of `server/glitch-server.js` into `server.js`**
6. **Copy the contents of `server/package.json`**
7. **Glitch will auto-deploy**
8. **Copy the URL** (e.g., `https://your-project.glitch.me`)
9. **Update the client URL and redeploy**

## Option 4: Local Testing

If you want to test locally:

```bash
# Terminal 1 - Start server
cd server
npm install
npm start

# Terminal 2 - Start React app
npm start
```

## Current Status

- ✅ React app deployed to Netlify
- ❌ Multiplayer server needs deployment
- ✅ All server files ready
- ✅ Client configured for deployed server

## Test the Connection

1. Deploy the server using one of the options above
2. Update the client URL in `src/contexts/MultiplayerContext.js`
3. Redeploy the React app
4. Open browser dev tools and check for "✅ Connected to multiplayer server"
5. Test with multiple browser tabs to see multiplayer in action

## Troubleshooting

- **Connection errors**: Make sure the server URL is correct and the server is running
- **CORS errors**: The server is configured to accept connections from any origin
- **WebSocket errors**: Ensure the hosting service supports WebSockets (Render, Railway, and Glitch all do)
