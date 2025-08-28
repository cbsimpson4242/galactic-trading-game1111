# Galactic Trading Server

Multiplayer server for the Galactic Commodity Exchange game.

## Deploy to Render.com

1. Go to [render.com](https://render.com)
2. Sign up for free account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Use these settings:
   - **Name**: `galactic-trading-server`
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

## Health Check

The server includes a health check endpoint at `/` that returns:
```json
{
  "status": "online",
  "players": 0,
  "uptime": 123.456,
  "timestamp": "2025-08-28T00:00:00.000Z"
}
```

## Environment Variables

No additional environment variables needed for basic deployment.

## Features

- Socket.IO multiplayer support
- Real-time market updates
- Player synchronization
- Chat system
- Leaderboard
- CORS configured for Netlify domains