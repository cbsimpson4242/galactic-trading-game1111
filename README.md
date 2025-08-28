# Galactic Trading Commodities (GTC) - Multiplayer Trading Game

A real-time multiplayer commodity trading game built with React and Socket.IO.

## Features

### Multiplayer Features
- **Real-time Trading**: Trade commodities with other players in real-time
- **Global Market**: All players affect the same market supply and demand
- **Live Chat**: Communicate with other traders
- **Leaderboard**: See how you rank against other players
- **Player Presence**: See who's online and active

### Trading Features
- **6 Unique Commodities**: Quantum Crystals, Dark Matter, Neural Processors, Antimatter Cores, Plasma Cells, Fusion Reactors
- **Dynamic Pricing**: Prices change based on supply and demand
- **Portfolio Management**: Track your holdings and profits
- **Real-time Charts**: Visualize price movements
- **AI Traders**: Compete against intelligent AI opponents

### Factory System
- **Build Factories**: Produce commodities automatically
- **Upgrade System**: Improve factory efficiency
- **Resource Management**: Balance production and trading

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the multiplayer server:
   ```bash
   npm run server
   ```

4. In a new terminal, start the React app:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:4112`

### Multiplayer Setup

The game runs on two servers:
- **Frontend**: React app on port 4112
- **Backend**: Socket.IO server on port 3001

Make sure both servers are running for multiplayer functionality.

### Deployment Configuration

For deployment, you need to:

1. **Set the multiplayer server URL** by creating a `.env` file:
   ```
   REACT_APP_MULTIPLAYER_SERVER=https://your-server-domain.com
   ```

2. **Update CORS settings** in `server/index.js` to include your domain:
   ```javascript
   origin: ["http://localhost:4112", "https://your-app-domain.com"]
   ```

3. **Deploy the server** to a hosting service that supports WebSockets (like Heroku, Railway, or DigitalOcean)

4. **Deploy the React app** to a static hosting service (like Netlify, Vercel, or GitHub Pages)

## How to Play

1. **Register/Login**: Create an account or login with existing credentials
2. **Start Trading**: Use your initial ₹100,000 credits to buy and sell commodities
3. **Watch the Market**: Monitor price movements and supply levels
4. **Build Factories**: Invest in production facilities for passive income
5. **Compete**: Climb the leaderboard and become the top trader

## Multiplayer Features

### Real-time Trading
- All trades are synchronized across all connected players
- Market supply and demand are shared globally
- See other players' trades in real-time

### Chat System
- Communicate with other traders
- System messages for player join/leave events
- Trade notifications

### Leaderboard
- Real-time rankings based on total portfolio value
- Online/offline status indicators
- Profit/loss tracking

### Connection Status
- Visual indicators show multiplayer connection status
- Automatic reconnection handling
- Heartbeat system for player presence

## Game Mechanics

### Price Dynamics
- Prices are influenced by global supply and demand
- All players' trades affect market conditions
- Volatility increases with low supply

### Trading Strategy
- Buy low, sell high
- Monitor supply levels for price opportunities
- Consider building factories for steady income
- Watch other players' trading patterns

## Technical Details

### Frontend
- React 18 with hooks
- Socket.IO client for real-time communication
- Responsive design for mobile and desktop

### Backend
- Node.js with Express
- Socket.IO for real-time bidirectional communication
- In-memory game state management

### Data Persistence
- Player data stored in localStorage
- Game state synchronized via WebSocket
- Automatic cleanup of inactive players

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
