const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:4112", 
      "http://localhost:3000",
      "https://galactic-commodity-exchange.netlify.app",
      "https://*.netlify.app",
      /\.netlify\.app$/,
      /\.onrender\.com$/,
      /\.replit\.app$/,
      /\.repl\.co$/
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  upgradeTimeout: 30000,
  maxHttpBufferSize: 1e6
});

app.use(cors());
app.use(express.json());

// Game state storage
const gameState = {
  players: new Map(),
  globalMarket: {
    commodities: [
      {
        id: 'quantum-crystals',
        name: 'Quantum Crystals',
        icon: '💎',
        lastPrice: 29,
        supply: 30000,
        buyPrice: 28,
        sellPrice: 30,
        buyQuantity: 1068,
        sellQuantity: 1042,
        unit: 'Tons',
        priceHistory: []
      },
      {
        id: 'dark-matter',
        name: 'Dark Matter',
        icon: '⚫',
        lastPrice: 929,
        supply: 30000,
        buyPrice: 910,
        sellPrice: 948,
        buyQuantity: 800,
        sellQuantity: 1200,
        unit: 'Units',
        priceHistory: []
      },
      {
        id: 'neural-processors',
        name: 'Neural Processors',
        icon: '🧠',
        lastPrice: 304,
        supply: 30000,
        buyPrice: 298,
        sellPrice: 310,
        buyQuantity: 1500,
        sellQuantity: 1000,
        unit: 'Units',
        priceHistory: []
      },
      {
        id: 'antimatter-cores',
        name: 'Antimatter Cores',
        icon: '⚛️',
        lastPrice: 1347,
        supply: 30000,
        buyPrice: 1320,
        sellPrice: 1374,
        buyQuantity: 500,
        sellQuantity: 800,
        unit: 'Units',
        priceHistory: []
      },
      {
        id: 'plasma-cells',
        name: 'Plasma Cells',
        icon: '⚡',
        lastPrice: 77,
        supply: 30000,
        buyPrice: 75,
        sellPrice: 79,
        buyQuantity: 2000,
        sellQuantity: 1500,
        unit: 'Units',
        priceHistory: []
      },
      {
        id: 'fusion-reactors',
        name: 'Fusion Reactors',
        icon: '🔋',
        lastPrice: 5235,
        supply: 30000,
        buyPrice: 5130,
        sellPrice: 5340,
        buyQuantity: 100,
        sellQuantity: 300,
        unit: 'Units',
        priceHistory: []
      }
    ],
    tradeFeed: [],
    marketTrends: [
      { name: 'Quantum Crystals', trend: 'Bullish', color: '#00ff88' },
      { name: 'Dark Matter', trend: 'Bearish', color: '#ff4444' },
      { name: 'Neural Processors', trend: 'Bullish', color: '#00ff88' }
    ]
  },
  leaderboard: [],
  chatMessages: []
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New player connected:', socket.id);

  // Player joins the game
  socket.on('playerJoin', (playerData) => {
    const player = {
      id: socket.id,
      username: playerData.username,
      credits: playerData.credits || 100000,
      profit: playerData.profit || 0,
      pnl: playerData.pnl || 0,
      totalMargin: playerData.totalMargin || 0,
      portfolio: playerData.portfolio || {},
      lastSeen: Date.now(),
      isOnline: true
    };

    gameState.players.set(socket.id, player);
    
    // Send current game state to the new player
    socket.emit('gameState', {
      globalMarket: gameState.globalMarket,
      leaderboard: getLeaderboard(),
      chatMessages: gameState.chatMessages.slice(-50), // Last 50 messages
      onlinePlayers: getOnlinePlayers()
    });

    // Notify other players
    socket.broadcast.emit('playerJoined', {
      username: player.username,
      onlinePlayers: getOnlinePlayers()
    });

    // Update leaderboard
    updateLeaderboard();
    io.emit('leaderboardUpdate', getLeaderboard());
  });

  // Player executes a trade
  socket.on('executeTrade', (tradeData) => {
    const player = gameState.players.get(socket.id);
    if (!player) return;

    const { commodityId, action, quantity, price } = tradeData;
    const commodity = gameState.globalMarket.commodities.find(c => c.id === commodityId);
    
    if (!commodity) return;

    // Validate trade
    let canExecute = false;
    if (action === 'BUY') {
      canExecute = commodity.supply >= quantity && player.credits >= (price * quantity);
    } else if (action === 'SELL') {
      const playerHoldings = player.portfolio[commodityId] || 0;
      canExecute = playerHoldings >= quantity;
    }

    if (canExecute) {
      // Execute trade
      if (action === 'BUY') {
        player.credits -= (price * quantity);
        player.portfolio[commodityId] = (player.portfolio[commodityId] || 0) + quantity;
        commodity.supply = Math.max(0, commodity.supply - quantity);
      } else {
        player.credits += (price * quantity);
        player.portfolio[commodityId] = Math.max(0, (player.portfolio[commodityId] || 0) - quantity);
        commodity.supply += quantity;
      }

      // Update commodity prices based on supply
      updateCommodityPrices(commodityId);

      // Add to trade feed
      const trade = {
        id: Date.now() + Math.random(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        commodity: commodity.name.substring(0, 5).toUpperCase(),
        action: action,
        quantity: quantity,
        value: price * quantity,
        trader: player.username,
        isAI: false
      };

      gameState.globalMarket.tradeFeed.unshift(trade);
      if (gameState.globalMarket.tradeFeed.length > 100) {
        gameState.globalMarket.tradeFeed = gameState.globalMarket.tradeFeed.slice(0, 100);
      }

      // Broadcast trade to all players
      io.emit('tradeExecuted', {
        trade,
        updatedMarket: gameState.globalMarket,
        playerUpdate: {
          id: socket.id,
          credits: player.credits,
          portfolio: player.portfolio
        }
      });

      // Update leaderboard
      updateLeaderboard();
      io.emit('leaderboardUpdate', getLeaderboard());
    } else {
      socket.emit('tradeError', {
        message: action === 'BUY' ? 'Insufficient credits or supply' : 'Insufficient holdings'
      });
    }
  });

  // Player sends chat message
  socket.on('sendMessage', (messageData) => {
    const player = gameState.players.get(socket.id);
    if (!player) return;

    const message = {
      id: Date.now() + Math.random(),
      username: player.username,
      message: messageData.message,
      timestamp: new Date().toISOString(),
      type: messageData.type || 'chat'
    };

    gameState.chatMessages.push(message);
    if (gameState.chatMessages.length > 200) {
      gameState.chatMessages = gameState.chatMessages.slice(-200);
    }

    io.emit('newMessage', message);
  });

  // Player requests leaderboard
  socket.on('getLeaderboard', () => {
    socket.emit('leaderboardUpdate', getLeaderboard());
  });

  // Player disconnects
  socket.on('disconnect', () => {
    const player = gameState.players.get(socket.id);
    if (player) {
      player.isOnline = false;
      player.lastSeen = Date.now();
      
      socket.broadcast.emit('playerLeft', {
        username: player.username,
        onlinePlayers: getOnlinePlayers()
      });
    }
    
    console.log('Player disconnected:', socket.id);
  });

  // Player heartbeat
  socket.on('heartbeat', () => {
    const player = gameState.players.get(socket.id);
    if (player) {
      player.lastSeen = Date.now();
    }
  });
});

// Helper functions
function getOnlinePlayers() {
  return Array.from(gameState.players.values())
    .filter(player => player.isOnline)
    .map(player => ({
      username: player.username,
      credits: player.credits,
      profit: player.profit
    }));
}

function getLeaderboard() {
  return Array.from(gameState.players.values())
    .map(player => ({
      username: player.username,
      credits: player.credits,
      profit: player.profit,
      pnl: player.pnl,
      totalMargin: player.totalMargin,
      isOnline: player.isOnline
    }))
    .sort((a, b) => (b.credits + b.totalMargin) - (a.credits + a.totalMargin))
    .slice(0, 20); // Top 20 players
}

function updateLeaderboard() {
  gameState.leaderboard = getLeaderboard();
}

function updateCommodityPrices(commodityId) {
  const commodity = gameState.globalMarket.commodities.find(c => c.id === commodityId);
  if (!commodity) return;

  // Calculate new price based on supply with more sophisticated algorithm
  const targetSupply = 30000;
  const targetPrice = 200;
  const basePrice = targetPrice * (targetSupply / commodity.supply);
  
  // Add variation based on supply ratio
  const supplyRatio = commodity.supply / targetSupply;
  let variation = (Math.random() - 0.5) * 0.3;
  
  // Add volatility based on supply scarcity/abundance
  if (supplyRatio < 0.3) {
    // Low supply = higher volatility
    variation += (Math.random() - 0.5) * 0.4;
  } else if (supplyRatio > 2) {
    // High supply = lower volatility
    variation *= 0.5;
  }
  
  // Add momentum from recent price history
  if (commodity.priceHistory.length >= 3) {
    const recentPrices = commodity.priceHistory.slice(-3);
    const priceDirection = recentPrices[2].price - recentPrices[0].price;
    const trendStrength = Math.abs(priceDirection) / recentPrices[0].price;
    const momentum = (priceDirection > 0 ? 1 : -1) * trendStrength * 0.2;
    variation += momentum;
  }
  
  const newPrice = Math.max(1, Math.round(basePrice * (1 + variation)));
  
  // Update prices with consistent spread
  commodity.lastPrice = newPrice;
  const spread = Math.floor(Math.random() * 3) + 1;
  commodity.buyPrice = Math.max(1, newPrice - spread);
  commodity.sellPrice = newPrice + spread;
  
  // Update price history
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  commodity.priceHistory.push({ time: currentTime, price: newPrice });
  if (commodity.priceHistory.length > 50) {
    commodity.priceHistory = commodity.priceHistory.slice(-50);
  }
}

// Periodic market updates - synchronized for all players
setInterval(() => {
  // Update all commodity prices
  gameState.globalMarket.commodities.forEach(commodity => {
    updateCommodityPrices(commodity.id);
  });

  // Broadcast market update to all connected players
  if (io.engine.clientsCount > 0) {
    io.emit('marketUpdate', gameState.globalMarket);
  }
}, 2000);

// Clean up inactive players (offline for more than 5 minutes)
setInterval(() => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  
  for (const [playerId, player] of gameState.players.entries()) {
    if (!player.isOnline && (now - player.lastSeen) > fiveMinutes) {
      gameState.players.delete(playerId);
    }
  }
}, 60000); // Check every minute

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    players: io.engine.clientsCount,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Multiplayer server running on port ${PORT}`);
  console.log(`Health check available at: http://0.0.0.0:${PORT}/`);
});
});
