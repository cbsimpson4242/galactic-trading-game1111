const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for quick testing
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Simple game state
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
      chatMessages: gameState.chatMessages.slice(-50),
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

      // Update commodity prices
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
    .slice(0, 20);
}

function updateLeaderboard() {
  gameState.leaderboard = getLeaderboard();
}

function updateCommodityPrices(commodityId) {
  const commodity = gameState.globalMarket.commodities.find(c => c.id === commodityId);
  if (!commodity) return;

  const targetSupply = 30000;
  const targetPrice = 200;
  const basePrice = targetPrice * (targetSupply / commodity.supply);
  
  const supplyRatio = commodity.supply / targetSupply;
  let variation = (Math.random() - 0.5) * 0.3;
  
  if (supplyRatio < 0.3) {
    variation += (Math.random() - 0.5) * 0.4;
  } else if (supplyRatio > 2) {
    variation *= 0.5;
  }
  
  const newPrice = Math.max(1, Math.round(basePrice * (1 + variation)));
  
  commodity.lastPrice = newPrice;
  const spread = Math.floor(Math.random() * 3) + 1;
  commodity.buyPrice = Math.max(1, newPrice - spread);
  commodity.sellPrice = newPrice + spread;
  
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  commodity.priceHistory.push({ time: currentTime, price: newPrice });
  if (commodity.priceHistory.length > 50) {
    commodity.priceHistory = commodity.priceHistory.slice(-50);
  }
}

// Periodic market updates
setInterval(() => {
  gameState.globalMarket.commodities.forEach(commodity => {
    updateCommodityPrices(commodity.id);
  });

  if (io.engine.clientsCount > 0) {
    io.emit('marketUpdate', gameState.globalMarket);
  }
}, 2000);

// Clean up inactive players
setInterval(() => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  
  for (const [playerId, player] of gameState.players.entries()) {
    if (!player.isOnline && (now - player.lastSeen) > fiveMinutes) {
      gameState.players.delete(playerId);
    }
  }
}, 60000);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    players: io.engine.clientsCount,
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Multiplayer server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
});
