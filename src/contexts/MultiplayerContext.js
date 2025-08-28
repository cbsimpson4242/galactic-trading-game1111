import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const MultiplayerContext = createContext();

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);
  if (!context) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }
  return context;
};

export const MultiplayerProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [globalMarket, setGlobalMarket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    // Connect to the multiplayer server - use environment variable or fallback to localhost
    const serverUrl = process.env.REACT_APP_MULTIPLAYER_SERVER || 'http://localhost:3001';
    console.log('Connecting to multiplayer server:', serverUrl);
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    // Connection events
    newSocket.on('connect', () => {
      console.log('Connected to multiplayer server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from multiplayer server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    // Game state events
    newSocket.on('gameState', (data) => {
      setGlobalMarket(data.globalMarket);
      setLeaderboard(data.leaderboard);
      setChatMessages(data.chatMessages);
      setOnlinePlayers(data.onlinePlayers);
    });

    newSocket.on('marketUpdate', (market) => {
      setGlobalMarket(market);
      console.log('Received market update from server:', market.commodities.length, 'commodities');
    });

    newSocket.on('leaderboardUpdate', (leaderboardData) => {
      setLeaderboard(leaderboardData);
    });

    newSocket.on('tradeExecuted', (data) => {
      setGlobalMarket(data.updatedMarket);
      // Update player data if it's the current player
      if (data.playerUpdate && data.playerUpdate.id === newSocket.id) {
        setPlayerData(prev => ({
          ...prev,
          credits: data.playerUpdate.credits,
          portfolio: data.playerUpdate.portfolio
        }));
      }
    });

    newSocket.on('tradeError', (error) => {
      console.error('Trade error:', error.message);
      // You can add a notification system here
    });

    // Add connection status logging
    newSocket.on('connect', () => {
      console.log('✅ Connected to multiplayer server');
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from multiplayer server:', reason);
    });

    newSocket.on('connect_error', (error) => {
      console.log('⚠️ Connection error:', error.message);
    });

    // Player events
    newSocket.on('playerJoined', (data) => {
      setOnlinePlayers(data.onlinePlayers);
      // Add system message to chat
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        username: 'System',
        message: `${data.username} joined the game`,
        timestamp: new Date().toISOString(),
        type: 'system'
      }]);
    });

    newSocket.on('playerLeft', (data) => {
      setOnlinePlayers(data.onlinePlayers);
      // Add system message to chat
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        username: 'System',
        message: `${data.username} left the game`,
        timestamp: new Date().toISOString(),
        type: 'system'
      }]);
    });

    // Chat events
    newSocket.on('newMessage', (message) => {
      setChatMessages(prev => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Retry connection if disconnected
  useEffect(() => {
    if (!isConnected && socket) {
      const retryTimeout = setTimeout(() => {
        console.log('Retrying connection to multiplayer server...');
        socket.connect();
      }, 3000);

      return () => clearTimeout(retryTimeout);
    }
  }, [isConnected, socket]);

  // Join the game
  const joinGame = (userData) => {
    if (socket && isConnected) {
      const playerData = {
        username: userData.username,
        credits: userData.gameState?.credits || 100000,
        profit: userData.gameState?.profit || 0,
        pnl: userData.gameState?.pnl || 0,
        totalMargin: userData.gameState?.totalMargin || 0,
        portfolio: userData.gameState?.portfolio || {}
      };
      
      console.log('Joining multiplayer game as:', playerData.username);
      setPlayerData(playerData);
      socket.emit('playerJoin', playerData);
    } else {
      console.log('Cannot join game - socket not connected');
    }
  };

  // Execute a trade
  const executeTrade = (tradeData) => {
    if (socket && isConnected) {
      socket.emit('executeTrade', tradeData);
    }
  };

  // Send a chat message
  const sendMessage = (message, type = 'chat') => {
    if (socket && isConnected) {
      socket.emit('sendMessage', { message, type });
    }
  };

  // Get leaderboard
  const getLeaderboard = () => {
    if (socket && isConnected) {
      socket.emit('getLeaderboard');
    }
  };

  // Send heartbeat
  const sendHeartbeat = () => {
    if (socket && isConnected) {
      socket.emit('heartbeat');
    }
  };

  // Set up heartbeat interval
  useEffect(() => {
    if (isConnected) {
      const heartbeatInterval = setInterval(sendHeartbeat, 30000); // Every 30 seconds
      return () => clearInterval(heartbeatInterval);
    }
  }, [isConnected]);

  const value = {
    socket,
    isConnected,
    onlinePlayers,
    leaderboard,
    globalMarket,
    chatMessages,
    playerData,
    joinGame,
    executeTrade,
    sendMessage,
    getLeaderboard
  };

  return (
    <MultiplayerContext.Provider value={value}>
      {children}
    </MultiplayerContext.Provider>
  );
};
