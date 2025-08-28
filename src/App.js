import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TradingGrid from './components/TradingGrid';
import Sidebar from './components/Sidebar';
import NotificationContainer from './components/NotificationContainer';
import AITraderPanel from './components/AITraderPanel';
import MarketSentiment from './components/MarketSentiment';
import FactoryManager from './components/FactoryManager';
import AIControlCenter from './components/AIControlCenter';
import Login from './components/Login';
import MultiplayerChat from './components/MultiplayerChat';
import MultiplayerLeaderboard from './components/MultiplayerLeaderboard';
import { MultiplayerProvider, useMultiplayer } from './contexts/MultiplayerContext';
import { 
  generateAITraders, 
  generateTradingDecision, 
  generateFactoryDecision,
  executeTrade, 
  updateTraderPerformance 
} from './aiTraders';

function AppContent() {
  const { joinGame, executeTrade: multiplayerExecuteTrade, globalMarket, isConnected, playerData } = useMultiplayer();
  const [currentUser, setCurrentUser] = useState(null);
  const [gameState, setGameState] = useState({
    credits: 100000,
    profit: 0,
    pnl: 0,
    totalMargin: 0,
    isSimulationPaused: false
  });

  const [commodities, setCommodities] = useState([
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
      quantity: 1,
      holdings: 0,
      costBasis: 0, // Track average purchase price
      priceHistory: [
        { time: '00:00', price: 25 }, { time: '02:00', price: 26 }, { time: '04:00', price: 27 }, 
        { time: '06:00', price: 25 }, { time: '08:00', price: 26 }, { time: '10:00', price: 28 },
        { time: '12:00', price: 28 }, { time: '14:00', price: 29 }, { time: '16:00', price: 30 }, 
        { time: '18:00', price: 31 }, { time: '20:00', price: 29 }, { time: '22:00', price: 30 }
      ]
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
      quantity: 1,
      holdings: 0,
      costBasis: 0,
      priceHistory: [
        { time: '00:00', price: 850 }, { time: '02:00', price: 860 }, { time: '04:00', price: 880 }, 
        { time: '06:00', price: 870 }, { time: '08:00', price: 920 }, { time: '10:00', price: 935 },
        { time: '12:00', price: 950 }, { time: '14:00', price: 945 }, { time: '16:00', price: 940 }, 
        { time: '18:00', price: 935 }, { time: '20:00', price: 929 }, { time: '22:00', price: 925 }
      ]
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
      quantity: 1,
      holdings: 0,
      costBasis: 0,
      priceHistory: [
        { time: '00:00', price: 280 }, { time: '02:00', price: 285 }, { time: '04:00', price: 290 }, 
        { time: '06:00', price: 288 }, { time: '08:00', price: 300 }, { time: '10:00', price: 305 },
        { time: '12:00', price: 310 }, { time: '14:00', price: 308 }, { time: '16:00', price: 305 }, 
        { time: '18:00', price: 302 }, { time: '20:00', price: 304 }, { time: '22:00', price: 306 }
      ]
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
      quantity: 1,
      holdings: 0,
      costBasis: 0,
      priceHistory: [
        { time: '00:00', price: 1300 }, { time: '02:00', price: 1310 }, { time: '04:00', price: 1320 }, 
        { time: '06:00', price: 1315 }, { time: '08:00', price: 1350 }, { time: '10:00', price: 1365 },
        { time: '12:00', price: 1380 }, { time: '14:00', price: 1375 }, { time: '16:00', price: 1360 }, 
        { time: '18:00', price: 1355 }, { time: '20:00', price: 1347 }, { time: '22:00', price: 1350 }
      ]
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
      quantity: 1,
      holdings: 0,
      costBasis: 0,
      priceHistory: [
        { time: '00:00', price: 70 }, { time: '02:00', price: 71 }, { time: '04:00', price: 72 }, 
        { time: '06:00', price: 71 }, { time: '08:00', price: 75 }, { time: '10:00', price: 76 },
        { time: '12:00', price: 78 }, { time: '14:00', price: 77 }, { time: '16:00', price: 76 }, 
        { time: '18:00', price: 75 }, { time: '20:00', price: 77 }, { time: '22:00', price: 78 }
      ]
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
      quantity: 1,
      holdings: 0,
      costBasis: 0,
      priceHistory: [
        { time: '00:00', price: 5000 }, { time: '02:00', price: 5050 }, { time: '04:00', price: 5100 }, 
        { time: '06:00', price: 5080 }, { time: '08:00', price: 5200 }, { time: '10:00', price: 5250 },
        { time: '12:00', price: 5300 }, { time: '14:00', price: 5280 }, { time: '16:00', price: 5250 }, 
        { time: '18:00', price: 5240 }, { time: '20:00', price: 5235 }, { time: '22:00', price: 5240 }
      ]
    }
  ]);

  const [aiPortfolio, setAiPortfolio] = useState({
    'Quantum Crystals': 12345,
    'Dark Matter': 8901,
    'Neural Processors': 15678,
    'Plasma Cells': 4567
  });

  const [marketTrends, setMarketTrends] = useState([
    { name: 'Quantum Crystals', trend: 'Bullish', color: '#00ff88' },
    { name: 'Dark Matter', trend: 'Bearish', color: '#ff4444' },
    { name: 'Neural Processors', trend: 'Bullish', color: '#00ff88' }
  ]);

  const [tradeFeed, setTradeFeed] = useState([
    { time: '19:11', commodity: 'FREAC', action: 'SELL', quantity: 11, value: 56903, trader: 'AlphaBot1', isAI: true },
    { time: '19:10', commodity: 'ACORE', action: 'BUY', quantity: 47, value: 61147, trader: 'You', isAI: false },
    { time: '19:09', commodity: 'QCRYS', action: 'SELL', quantity: 73, value: 2190, trader: 'CyberTrader2', isAI: true },
    { time: '19:08', commodity: 'DMATT', action: 'BUY', quantity: 25, value: 23225, trader: 'You', isAI: false },
    { time: '19:07', commodity: 'NPROC', action: 'SELL', quantity: 15, value: 4560, trader: 'QuantumAI3', isAI: true }
  ]);

  const [notifications, setNotifications] = useState([]);
  
  // AI Trading System
  const [aiTraders, setAiTraders] = useState([]);
  const [aiTradeFeed, setAiTradeFeed] = useState([]);
  const [showAITraders, setShowAITraders] = useState(false);
  const [showMarketSentiment, setShowMarketSentiment] = useState(false);
  const [showFactoryManager, setShowFactoryManager] = useState(false);
  const [showAIControlCenter, setShowAIControlCenter] = useState(false);
  const [factories, setFactories] = useState([]);

  const handleQuantityChange = (commodityId, newQuantity) => {
    setCommodities(prev => prev.map(commodity => 
      commodity.id === commodityId 
        ? { ...commodity, quantity: Math.max(1, newQuantity) }
        : commodity
    ));
  };

  const handleBuy = (commodityId) => {
    const commodity = commodities.find(c => c.id === commodityId);
    const cost = commodity.buyPrice * commodity.quantity;
    
    if (gameState.credits >= cost && commodity.supply >= commodity.quantity) {
      // Execute trade through multiplayer if connected
      if (isConnected) {
        multiplayerExecuteTrade({
          commodityId,
          action: 'BUY',
          quantity: commodity.quantity,
          price: commodity.buyPrice
        });
      }
      
      setGameState(prev => ({
        ...prev,
        credits: prev.credits - cost,
        totalMargin: prev.totalMargin + cost
      }));
      
      // Update holdings, supply, and cost basis
      setCommodities(prev => prev.map(c => 
        c.id === commodityId 
          ? { 
              ...c, 
              holdings: c.holdings + c.quantity,
              supply: Math.max(0, c.supply - c.quantity),
              costBasis: c.holdings === 0 ? c.buyPrice : 
                ((c.costBasis * c.holdings) + (c.buyPrice * c.quantity)) / (c.holdings + c.quantity)
            }
          : c
      ));
      
      // Add to trade feed
      const newTrade = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        commodity: commodity.name.substring(0, 5).toUpperCase(),
        action: 'BUY',
        quantity: commodity.quantity,
        value: cost,
        trader: 'You',
        isAI: false
      };
      
      setTradeFeed(prev => [newTrade, ...prev.slice(0, 14)]); // Keep last 15 trades total
      
      // Show success notification
      showNotification({
        type: 'buy',
        title: 'Trade Successful!',
        message: `Bought ${commodity.quantity} ${commodity.name} for ₹${cost.toLocaleString()}`
      });
    } else if (commodity.supply < commodity.quantity) {
      // Show error notification for insufficient supply
      showNotification({
        type: 'error',
        title: 'Insufficient Supply',
        message: `Only ${commodity.supply} ${commodity.name} available, but trying to buy ${commodity.quantity}`
      });
    } else {
      // Show error notification for insufficient credits
      showNotification({
        type: 'error',
        title: 'Insufficient Credits',
        message: `You need ₹${cost.toLocaleString()} but only have ₹${gameState.credits.toLocaleString()}`
      });
    }
  };

  const handleSell = (commodityId, sellQuantity = null) => {
    const commodity = commodities.find(c => c.id === commodityId);
    const quantityToSell = sellQuantity !== null ? sellQuantity : commodity.quantity;
    const revenue = commodity.sellPrice * quantityToSell;
    
    // Check if user has enough holdings to sell
    if (commodity.holdings >= quantityToSell) {
      // Execute trade through multiplayer if connected
      if (isConnected) {
        multiplayerExecuteTrade({
          commodityId,
          action: 'SELL',
          quantity: quantityToSell,
          price: commodity.sellPrice
        });
      }
      
      setGameState(prev => ({
        ...prev,
        credits: prev.credits + revenue,
        profit: prev.profit + (revenue - commodity.costBasis * quantityToSell)
      }));
      
      // Update holdings, supply, and cost basis
      setCommodities(prev => prev.map(c => 
        c.id === commodityId 
          ? { 
              ...c, 
              holdings: c.holdings - quantityToSell,
              supply: c.supply + quantityToSell,
              costBasis: c.holdings - quantityToSell === 0 ? 0 : c.costBasis // Reset cost basis if all sold
            }
          : c
      ));
    
      // Add to trade feed
      const newTrade = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        commodity: commodity.name.substring(0, 5).toUpperCase(),
        action: 'SELL',
        quantity: quantityToSell,
        value: revenue,
        trader: 'You',
        isAI: false
      };
      
      setTradeFeed(prev => [newTrade, ...prev.slice(0, 14)]); // Keep last 15 trades total
    
      // Show success notification
      showNotification({
        type: 'sell',
        title: 'Trade Successful!',
        message: `Sold ${quantityToSell} ${commodity.name} for ₹${revenue.toLocaleString()}`
      });
    } else {
      // Show error notification for insufficient holdings
      showNotification({
        type: 'error',
        title: 'Insufficient Holdings',
        message: `You only have ${commodity.holdings} ${commodity.name} but trying to sell ${quantityToSell}`
      });
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Load user's game state if it exists
    if (user.gameState) {
      setGameState(prev => ({
        ...prev,
        ...user.gameState
      }));
    }
    
    // Join multiplayer game
    if (isConnected) {
      joinGame(user);
    }
  };

  const handleLogout = () => {
    // Save current game state to user data
    if (currentUser) {
      const existingUsers = JSON.parse(localStorage.getItem('gtc_users') || '[]');
      const updatedUsers = existingUsers.map(user => {
        if (user.username === currentUser.username) {
          return {
            ...user,
            gameState: {
              credits: gameState.credits,
              profit: gameState.profit,
              pnl: gameState.pnl,
              totalMargin: gameState.totalMargin
            }
          };
        }
        return user;
      });
      localStorage.setItem('gtc_users', JSON.stringify(updatedUsers));
    }
    
    setCurrentUser(null);
    setGameState({
      credits: 100000,
      profit: 0,
      pnl: 0,
      totalMargin: 0,
      isSimulationPaused: false
    });
  };

  const toggleSimulation = () => {
    setGameState(prev => ({
      ...prev,
      isSimulationPaused: !prev.isSimulationPaused
    }));
  };

  const showNotification = (notificationData) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      ...notificationData
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Calculate live portfolio P&L
  const calculatePortfolioPnL = (commoditiesList) => {
    let totalPnL = 0;
    let totalPortfolioValue = 0;
    
    commoditiesList.forEach(commodity => {
      if (commodity.holdings > 0) {
        const currentValue = commodity.holdings * commodity.lastPrice;
        const costValue = commodity.holdings * commodity.costBasis;
        const commodityPnL = currentValue - costValue;
        
        totalPnL += commodityPnL;
        totalPortfolioValue += currentValue;
      }
    });
    
    return { totalPnL, totalPortfolioValue };
  };

  // Initialize AI traders
  useEffect(() => {
    if (aiTraders.length === 0) {
      setAiTraders(generateAITraders());
    }
  }, [aiTraders.length]);

  // Update live P&L whenever commodities change
  useEffect(() => {
    const { totalPnL, totalPortfolioValue } = calculatePortfolioPnL(commodities);
    setGameState(prev => ({
      ...prev,
      pnl: totalPnL,
      totalMargin: totalPortfolioValue
    }));
  }, [commodities]);

  // AI Trading simulation - synchronized with price updates
  useEffect(() => {
    if (!gameState.isSimulationPaused && aiTraders.length > 0) {
      const interval = setInterval(() => {
        // Generate trading decisions for all AI traders
        const allTradingDecisions = [];
        const allFactoryDecisions = [];
        
        aiTraders.forEach(trader => {
          // Generate trading decisions
          const tradingDecisions = generateTradingDecision(trader, commodities, { commodities, marketTrends }, aiTradeFeed);
          allTradingDecisions.push(...tradingDecisions);
          
          // Generate factory building decisions (less frequent)
          const factoryDecisions = generateFactoryDecision(trader, commodities, { commodities, marketTrends }, aiTradeFeed);
          allFactoryDecisions.push(...factoryDecisions);
        });
        
        // Execute trades
        if (allTradingDecisions.length > 0) {
          const executedTrades = [];
          const updatedTraders = [...aiTraders];
          
          allTradingDecisions.forEach(decision => {
            const traderIndex = updatedTraders.findIndex(t => t.id === decision.traderId);
            if (traderIndex !== -1) {
              // Find the commodity being traded (use ID for more reliable matching)
              const commodity = commodities.find(c => c.id === decision.commodityId || c.name === decision.commodityName);
              
              // Check if trade is valid (sufficient supply for buy, or sufficient holdings for sell)
              let canExecute = false;
              if (decision.action === 'BUY') {
                canExecute = commodity && commodity.supply >= decision.quantity;
              } else if (decision.action === 'SELL') {
                // Check if AI trader has sufficient holdings to sell
                const trader = updatedTraders[traderIndex];
                const traderHoldings = trader.portfolio[commodity.id] || 0;
                canExecute = traderHoldings >= decision.quantity;
              }
              
              if (canExecute) {
                // Execute the trade
                updatedTraders[traderIndex] = executeTrade(updatedTraders[traderIndex], decision, commodities);
                
                // Update commodity supply
                setCommodities(prev => prev.map(c => {
                  if (c.id === decision.commodityId || c.name === decision.commodityName) {
                    if (decision.action === 'BUY') {
                      return { ...c, supply: Math.max(0, c.supply - decision.quantity) };
                    } else if (decision.action === 'SELL') {
                      return { ...c, supply: c.supply + decision.quantity };
                    }
                  }
                  return c;
                }));
                
                // Add to AI trade feed
                const aiTrade = {
                  time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                  trader: decision.traderName,
                  commodity: decision.commodityName.substring(0, 5).toUpperCase(),
                  action: decision.action,
                  quantity: decision.quantity,
                  value: decision.quantity * decision.price,
                  strategy: decision.strategy,
                  emotionalState: decision.emotionalState
                };
                
                executedTrades.push(aiTrade);
                
                // Debug: Log AI trade execution
                console.log(`AI Trade: ${decision.traderName} ${decision.action} ${decision.quantity} ${decision.commodityName} at ₹${decision.price}. Supply changed from ${commodity.supply} to ${decision.action === 'BUY' ? commodity.supply - decision.quantity : commodity.supply + decision.quantity}`);
              }
            }
          });
          
          // Update AI traders
          setAiTraders(updatedTraders.map(trader => updateTraderPerformance(trader)));
          
          // Update AI trade feed
          setAiTradeFeed(prev => [...executedTrades, ...prev.slice(0, 19)]); // Keep last 20 trades
          
          // Update main trade feed with AI trades
          if (executedTrades.length > 0) {
            // Include more AI trades in the main feed for better visibility
            const selectedTrades = executedTrades.slice(0, Math.min(executedTrades.length, 8)); // Show up to 8 AI trades
            const newTradeFeed = selectedTrades.map(trade => ({
              time: trade.time,
              commodity: trade.commodity,
              action: trade.action,
              quantity: trade.quantity,
              value: trade.value,
              trader: trade.trader, // Include trader name for identification
              isAI: true // Mark as AI trade for styling
            }));
            
            setTradeFeed(prev => [...newTradeFeed, ...prev.slice(0, 7)]); // Keep last 15 trades total
          }
        }
        
        // Execute factory building decisions
        if (allFactoryDecisions.length > 0) {
          const updatedTraders = [...aiTraders];
          
          allFactoryDecisions.forEach(decision => {
            const traderIndex = updatedTraders.findIndex(t => t.id === decision.traderId);
            if (traderIndex !== -1) {
              const trader = updatedTraders[traderIndex];
              
              // Check if trader has enough capital for factory
              const factoryCost = 75000; // Basic factory cost
              if (trader.capital >= factoryCost) {
                // Create factory for the AI trader
                const newFactory = {
                  id: `ai-factory-${trader.id}-${Date.now()}`,
                  name: `${trader.name}'s ${decision.commodityName} Factory`,
                  level: 1,
                  commodityId: decision.commodityId,
                  commodityName: decision.commodityName,
                  productionUnit: 'Units',
                                     productionQuantity: 50, // AI factories produce less
                   productionTime: 20, // 20 seconds
                   timeRemaining: 20,
                  currentProduction: 0,
                  upgradeCost: 150000,
                  upgradeMultiplier: 1.5,
                  costMultiplier: 1.3,
                  lastUpdate: Date.now(),
                  owner: trader.id,
                  ownerName: trader.name
                };
                
                // Add factory to trader's factories
                updatedTraders[traderIndex] = {
                  ...trader,
                  factories: [...trader.factories, newFactory],
                  capital: trader.capital - factoryCost,
                  lastFactoryDecision: Date.now()
                };
                
                // Add factory to global factories list
                setFactories(prev => [...prev, newFactory]);
                
                // Show notification for AI factory building
                showNotification({
                  type: 'info',
                  title: 'AI Factory Built!',
                  message: `${trader.name} built a ${decision.commodityName} factory for ₹${factoryCost.toLocaleString()}`
                });
              }
            }
          });
          
          // Update AI traders
          setAiTraders(updatedTraders);
        }
      }, 2000); // AI traders make decisions every 2 seconds to match price updates

      return () => clearInterval(interval);
    }
  }, [gameState.isSimulationPaused, aiTraders, commodities, marketTrends, aiTradeFeed]);

  const handleTraderSelect = (trader) => {
    console.log('Selected trader:', trader);
  };

  // AI Control Center Functions
  const handleUpdateAITraders = (updatedTraders) => {
    setAiTraders(updatedTraders);
    
    // Show notification
    showNotification({
      type: 'info',
      title: 'AI Settings Updated!',
      message: `Updated settings for ${updatedTraders.length} AI traders`
    });
  };

  // Factory Management Functions
  const handleBuildFactory = (template, commodity) => {
    const newFactory = {
      id: `factory-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${template.name} - ${commodity.name}`,
      level: 1,
      commodityId: commodity.id,
      commodityName: commodity.name,
      productionUnit: commodity.unit,
      productionQuantity: template.baseProduction,
      productionTime: template.productionTime,
      timeRemaining: template.productionTime,
      currentProduction: 0,
      upgradeCost: Math.round(template.cost * template.costMultiplier),
      upgradeMultiplier: template.upgradeMultiplier,
      costMultiplier: template.costMultiplier,
      lastUpdate: Date.now(),
      owner: 'player',
      ownerName: 'Player'
    };

    setFactories(prev => [...prev, newFactory]);
    
    // Deduct credits
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - template.cost
    }));

    // Show success notification
    showNotification({
      type: 'success',
      title: 'Factory Built!',
      message: `Successfully built ${newFactory.name} for ₹${template.cost.toLocaleString()}`
    });
  };

  const handleUpgradeFactory = (factoryId) => {
    const factory = factories.find(f => f.id === factoryId);
    if (!factory || gameState.credits < factory.upgradeCost) {
      showNotification({
        type: 'error',
        title: 'Cannot Upgrade',
        message: `You need ₹${factory?.upgradeCost.toLocaleString()} to upgrade this factory`
      });
      return;
    }

    setFactories(prev => prev.map(f => {
      if (f.id === factoryId) {
        return {
          ...f,
          level: f.level + 1,
          productionQuantity: Math.round(f.productionQuantity * f.upgradeMultiplier),
          upgradeCost: Math.round(f.upgradeCost * f.costMultiplier)
        };
      }
      return f;
    }));

    // Deduct credits
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - factory.upgradeCost
    }));

    // Show success notification
    showNotification({
      type: 'success',
      title: 'Factory Upgraded!',
      message: `Upgraded ${factory.name} to Level ${factory.level + 1} for ₹${factory.upgradeCost.toLocaleString()}`
    });
  };



  // Use multiplayer market data when connected, fallback to local when disconnected
  useEffect(() => {
    if (globalMarket && isConnected) {
      // Update commodities with server data
      setCommodities(prev => prev.map(commodity => {
        const serverCommodity = globalMarket.commodities.find(c => c.id === commodity.id);
        if (serverCommodity) {
          return {
            ...commodity,
            lastPrice: serverCommodity.lastPrice,
            buyPrice: serverCommodity.buyPrice,
            sellPrice: serverCommodity.sellPrice,
            supply: serverCommodity.supply,
            priceHistory: serverCommodity.priceHistory || commodity.priceHistory
          };
        }
        return commodity;
      }));
      
      // Update trade feed with server data
      if (globalMarket.tradeFeed) {
        setTradeFeed(globalMarket.tradeFeed.slice(0, 15));
      }
    }
  }, [globalMarket, isConnected]);

  // Sync player data from multiplayer
  useEffect(() => {
    if (playerData && isConnected) {
      setGameState(prev => ({
        ...prev,
        credits: playerData.credits || prev.credits,
        profit: playerData.profit || prev.profit,
        pnl: playerData.pnl || prev.pnl,
        totalMargin: playerData.totalMargin || prev.totalMargin
      }));

      // Update commodity holdings from player portfolio
      setCommodities(prev => prev.map(commodity => ({
        ...commodity,
        holdings: playerData.portfolio?.[commodity.id] || 0
      })));
    }
  }, [playerData, isConnected]);

  // Auto-join multiplayer game when connected and user is logged in
  useEffect(() => {
    if (isConnected && currentUser && !playerData) {
      console.log('Auto-joining multiplayer game for user:', currentUser.username);
      joinGame(currentUser);
    }
  }, [isConnected, currentUser, playerData, joinGame]);

  // Fallback to local price simulation when disconnected
  useEffect(() => {
    if (!isConnected && !gameState.isSimulationPaused) {
      const interval = setInterval(() => {
        setCommodities(prev => prev.map(commodity => {
          // Calculate price based on supply with target price of 200 at supply of 30000
          const targetSupply = 30000;
          const targetPrice = 200;
          const basePrice = targetPrice * (targetSupply / commodity.supply);
          
          // Add variation for volatile market
          const variation = (Math.random() - 0.5) * 0.6;
          const newLastPrice = Math.max(1, Math.round(basePrice * (1 + variation)));
          
          // Add momentum and volatility effects
          const supplyChange = commodity.supply - (commodity.supply + Math.floor((Math.random() - 0.5) * 200));
          const momentumFactor = supplyChange / 1000 * 0.4;
          
          let trendMomentum = 0;
          if (commodity.priceHistory.length >= 3) {
            const recentPrices = commodity.priceHistory.slice(-3);
            const priceDirection = recentPrices[2].price - recentPrices[0].price;
            const trendStrength = Math.abs(priceDirection) / recentPrices[0].price;
            trendMomentum = (priceDirection > 0 ? 1 : -1) * trendStrength * 0.8;
          }
          
          let volatilityMultiplier = 1;
          if (Math.random() < 0.05) {
            const isSpike = Math.random() < 0.5;
            volatilityMultiplier = isSpike ? 2.5 : 0.4;
          }
          
          const supplyRatio = commodity.supply / 30000;
          if (supplyRatio < 0.3) {
            const scarcityMultiplier = 1 + (0.3 - supplyRatio) * 2;
            volatilityMultiplier *= scarcityMultiplier;
          } else if (supplyRatio > 2) {
            const abundanceMultiplier = 1 - (supplyRatio - 2) * 0.3;
            volatilityMultiplier *= abundanceMultiplier;
          }
          
          const finalPrice = Math.max(1, Math.min(10000, Math.round(newLastPrice * (1 + momentumFactor + trendMomentum) * volatilityMultiplier)));
          
          const spread = Math.floor(Math.random() * 3) + 1;
          const newBuyPrice = Math.max(1, finalPrice - spread);
          const newSellPrice = finalPrice + spread;
          
          const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
          const newPriceHistory = [...commodity.priceHistory, { time: currentTime, price: finalPrice }];
          if (newPriceHistory.length > 50) {
            newPriceHistory.splice(0, newPriceHistory.length - 50);
          }
          
          return {
            ...commodity,
            lastPrice: finalPrice,
            buyPrice: newBuyPrice,
            sellPrice: newSellPrice,
            priceHistory: newPriceHistory
          };
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isConnected, gameState.isSimulationPaused]);

  // Factory Production Timer
  useEffect(() => {
    if (!gameState.isSimulationPaused && factories.length > 0) {
      const interval = setInterval(() => {
        setFactories(prev => prev.map(factory => {
          const now = Date.now();
          const timeDiff = Math.floor((now - factory.lastUpdate) / 1000); // Convert to seconds
          
          if (factory.timeRemaining > 0) {
            const newTimeRemaining = Math.max(0, factory.timeRemaining - timeDiff);
            
                         if (newTimeRemaining === 0 && factory.timeRemaining > 0) {
               // Production cycle completed
               if (factory.owner && factory.owner !== 'player') {
                 // AI-owned factory - add to AI trader's holdings
                 setAiTraders(prevTraders => prevTraders.map(trader => {
                   if (trader.id === factory.owner) {
                     return {
                       ...trader,
                       portfolio: {
                         ...trader.portfolio,
                         [factory.commodityId]: (trader.portfolio[factory.commodityId] || 0) + factory.productionQuantity
                       }
                     };
                   }
                   return trader;
                 }));
                 
                 // Update commodity supply (AI production adds to market supply)
                 setCommodities(prevCommodities => prevCommodities.map(commodity => {
                   if (commodity.id === factory.commodityId) {
                     return {
                       ...commodity,
                       supply: commodity.supply + factory.productionQuantity
                     };
                   }
                   return commodity;
                 }));
                 
                 // Show notification for AI production
                 showNotification({
                   type: 'info',
                   title: 'AI Production Complete!',
                   message: `${factory.ownerName}'s factory produced ${factory.productionQuantity} ${factory.commodityName}`
                 });
               } else {
                 // Player-owned factory - add to player holdings
                 setCommodities(prevCommodities => prevCommodities.map(commodity => {
                   if (commodity.id === factory.commodityId) {
                     return {
                       ...commodity,
                       holdings: commodity.holdings + factory.productionQuantity
                     };
                   }
                   return commodity;
                 }));
                 
                 // Show notification for player production
                 showNotification({
                   type: 'success',
                   title: 'Production Complete!',
                   message: `${factory.name} produced ${factory.productionQuantity} ${factory.commodityName} - automatically added to holdings!`
                 });
               }
              
              // Reset factory for next cycle
              return {
                ...factory,
                timeRemaining: factory.productionTime,
                currentProduction: 0,
                lastUpdate: now
              };
            } else {
              // Still producing
              return {
                ...factory,
                timeRemaining: newTimeRemaining,
                lastUpdate: now
              };
            }
          }
          
          return factory;
        }));
      }, 2000); // Update every 2 seconds

      return () => clearInterval(interval);
    }
  }, [gameState.isSimulationPaused, factories.length]);

  // Show login screen if no user is logged in
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Header 
        gameState={gameState} 
        onToggleSimulation={toggleSimulation}
        currentUser={currentUser}
        onLogout={handleLogout}
        isConnected={isConnected}
      />
      <div className="main-content">
        <TradingGrid 
          commodities={commodities}
          onQuantityChange={handleQuantityChange}
          onBuy={handleBuy}
          onSell={handleSell}
          factories={factories}
        />
        <div className="sidebar-container">
        <Sidebar 
          aiPortfolio={aiPortfolio}
          marketTrends={marketTrends}
          tradeFeed={tradeFeed}
            aiTradeFeed={aiTradeFeed}
          />
          
          {/* AI Trading Controls */}
          <div className="ai-controls">
            <button 
              className={`ai-control-btn ${showAITraders ? 'active' : ''}`}
              onClick={() => setShowAITraders(!showAITraders)}
            >
              🤖 AI Traders ({aiTraders.length})
            </button>
            <button 
              className={`ai-control-btn ${showMarketSentiment ? 'active' : ''}`}
              onClick={() => setShowMarketSentiment(!showMarketSentiment)}
            >
              📊 Market Sentiment
            </button>
            <button 
              className={`ai-control-btn ${showFactoryManager ? 'active' : ''}`}
              onClick={() => setShowFactoryManager(!showFactoryManager)}
            >
              🏭 Factories ({factories.length})
            </button>
            <button 
              className={`ai-control-btn ${showAIControlCenter ? 'active' : ''}`}
              onClick={() => setShowAIControlCenter(!showAIControlCenter)}
            >
              ⚙️ AI Controls
            </button>
          </div>
          
          {/* AI Trader Panel */}
          {showAITraders && (
            <div className="ai-panel-overlay">
              <div className="ai-panel-container">
                <button 
                  className="ai-panel-close-btn"
                  onClick={() => setShowAITraders(false)}
                >
                  ×
                </button>
                <AITraderPanel 
                  aiTraders={aiTraders}
                  onTraderSelect={handleTraderSelect}
                />
              </div>
            </div>
          )}
          
          {/* Market Sentiment Panel */}
          {showMarketSentiment && (
            <div className="ai-panel-overlay">
              <MarketSentiment 
                aiTraders={aiTraders}
                commodities={commodities}
                onClose={() => setShowMarketSentiment(false)}
              />
            </div>
          )}
          
          {/* Factory Manager Panel */}
          {showFactoryManager && (
            <FactoryManager
              factories={factories}
              commodities={commodities}
              credits={gameState.credits}
              onBuildFactory={handleBuildFactory}
              onUpgradeFactory={handleUpgradeFactory}
              onClose={() => setShowFactoryManager(false)}
            />
          )}
          
          {/* AI Control Center */}
          {showAIControlCenter && (
            <AIControlCenter
              aiTraders={aiTraders}
              onUpdateTraders={handleUpdateAITraders}
              onClose={() => setShowAIControlCenter(false)}
            />
          )}
        </div>
      </div>
      
      {/* Multiplayer Components */}
      <MultiplayerChat />
      <MultiplayerLeaderboard />
      
      <NotificationContainer 
        notifications={notifications}
        onRemoveNotification={removeNotification}
      />
    </div>
  );
}

function App() {
  return (
    <MultiplayerProvider>
      <AppContent />
    </MultiplayerProvider>
  );
}

export default App;
