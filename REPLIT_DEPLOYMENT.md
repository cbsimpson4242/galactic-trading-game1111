# Replit Deployment Guide

## Quick Deploy to Replit

### Step 1: Create a New Replit Project

1. Go to [replit.com](https://replit.com) and sign in
2. Click "Create Repl"
3. Choose "Import from GitHub"
4. Paste your repository URL: `https://github.com/your-username/your-repo-name`
5. Select "Node.js" as the language
6. Click "Import from GitHub"

### Step 2: Configure the Project

The project is already configured with:
- ✅ `.replit` file with correct settings
- ✅ `server/package.json` with all dependencies
- ✅ CORS configured for Replit domains
- ✅ Server configured to run on port 3005

### Step 3: Deploy

1. **Install Dependencies**: The `.replit` file will automatically run `cd server && npm install`
2. **Start the Server**: Click the "Run" button or the server will auto-start
3. **Get Your URL**: Your server will be available at `https://your-repl-name.your-username.repl.co`

### Step 4: Update Client Configuration

Update your React app's multiplayer server URL in `src/contexts/MultiplayerContext.js`:

```javascript
const serverUrl = 'https://your-repl-name.your-username.repl.co';
```

### Step 5: Test the Connection

1. Open your React app
2. Open browser developer tools
3. Look for "✅ Connected to multiplayer server" message
4. Test with multiple browser tabs to see multiplayer in action

## Troubleshooting

### Common Issues:

1. **Port Issues**: The server is configured to use port 3005, which Replit will map to port 80
2. **CORS Errors**: The server includes all Replit domains in CORS configuration
3. **Connection Timeout**: Replit may have cold starts - wait a few seconds for the first connection

### Environment Variables:

If you need to set environment variables in Replit:
1. Go to "Tools" → "Secrets"
2. Add any environment variables you need
3. They will be available as `process.env.VARIABLE_NAME`

### Monitoring:

- Check the Replit console for server logs
- Use the health check endpoint: `https://your-repl-name.your-username.repl.co/`
- Monitor the "Always On" status in your Replit dashboard

## Server Features

✅ **Multiplayer Trading**: Real-time commodity trading
✅ **Chat System**: In-game chat with other players  
✅ **Leaderboard**: Live player rankings
✅ **Market Updates**: Dynamic price changes every 2 seconds
✅ **Player Management**: Online/offline status tracking
✅ **Trade Feed**: Real-time trade notifications

## Next Steps

After deployment:
1. Test the multiplayer functionality
2. Share the Replit URL with other players
3. Monitor server performance
4. Consider upgrading to "Always On" for better reliability

Your Galactic Commodity Exchange server is now ready for multiplayer trading! 🚀
