// AI Trading System with 200 traders
// Each trader has different strategies and emotional responses

// Trading Strategy Types
export const STRATEGY_TYPES = {
  MOMENTUM: 'momentum',
  MEAN_REVERSION: 'mean_reversion',
  ARBITRAGE: 'arbitrage',
  SCALPING: 'scalping',
  SWING: 'swing',
  VALUE: 'value',
  GROWTH: 'growth',
  CONTRARIAN: 'contrarian',
  TREND_FOLLOWING: 'trend_following',
  BREAKOUT: 'breakout',
  SUPPLY_BASED: 'supply_based'
};

// Emotional States
export const EMOTIONAL_STATES = {
  CALM: 'calm',
  EXCITED: 'excited',
  FEARFUL: 'fearful',
  GREEDY: 'greedy',
  PANIC: 'panic',
  FOMO: 'fomo'
};

// Risk Tolerance Levels
export const RISK_LEVELS = {
  CONSERVATIVE: 0.2,
  MODERATE: 0.5,
  AGGRESSIVE: 0.8,
  EXTREME: 1.0
};

// Generate 200 unique AI traders
export const generateAITraders = () => {
  const traders = [];
  const names = [
    'AlphaBot', 'QuantumTrader', 'NeuralNet', 'CyberTrader', 'DataMiner', 'AlgoMaster',
    'SmartBot', 'TradeAI', 'MarketMind', 'ProfitBot', 'CryptoKing', 'StockMaster',
    'TrendHunter', 'MomentumBot', 'ArbitrageAI', 'ScalpBot', 'SwingTrader', 'ValueBot',
    'GrowthAI', 'ContrarianBot', 'BreakoutAI', 'SignalMaster', 'PatternBot', 'VolatilityAI',
    'LiquidityBot', 'SpreadHunter', 'GapTrader', 'NewsBot', 'SentimentAI', 'VolumeBot',
    'PriceAction', 'TechnicalAI', 'FundamentalBot', 'MacroTrader', 'MicroBot', 'SectorAI',
    'IndexBot', 'CommodityAI', 'CurrencyBot', 'BondTrader', 'DerivativeAI', 'OptionBot',
    'FutureTrader', 'SwapAI', 'HedgeBot', 'PortfolioAI', 'RiskBot', 'BalanceTrader',
    'DiversifyAI', 'ConcentrateBot', 'LeverageAI', 'MarginBot', 'ShortTrader', 'LongAI',
    'BullBot', 'BearAI', 'NeutralTrader', 'BiasBot', 'EmotionAI', 'LogicBot',
    'InstinctAI', 'AnalysisBot', 'ResearchAI', 'BacktestBot', 'ForwardAI', 'PredictBot',
    'ForecastAI', 'ProjectBot', 'EstimateAI', 'CalculateBot', 'ComputeAI', 'ProcessBot',
    'ExecuteAI', 'ImplementBot', 'DeployAI', 'LaunchBot', 'StartAI', 'InitBot',
    'BeginAI', 'CommenceBot', 'TriggerAI', 'ActivateBot', 'EnableAI', 'PowerBot',
    'EnergyAI', 'ForceBot', 'DriveAI', 'PushBot', 'PullAI', 'DrawBot',
    'AttractAI', 'RepelBot', 'RejectAI', 'AcceptBot', 'ApproveAI', 'DenyBot',
    'BlockAI', 'AllowBot', 'PermitAI', 'RestrictBot', 'LimitAI', 'BoundBot',
    'CapAI', 'FloorBot', 'CeilingAI', 'BaseBot', 'PeakAI', 'ValleyBot',
    'SummitAI', 'DepthBot', 'HeightAI', 'WidthBot', 'LengthAI', 'SizeBot',
    'ScaleAI', 'ScopeBot', 'RangeAI', 'SpanBot', 'ExtentAI', 'ReachBot',
    'GraspAI', 'HoldBot', 'GripAI', 'ClutchBot', 'SeizeAI', 'CaptureBot',
    'SnatchAI', 'GrabBot', 'TakeAI', 'GiveBot', 'OfferAI', 'BidBot',
    'AskAI', 'QuoteBot', 'PriceAI', 'CostBot', 'ValueAI', 'WorthBot',
    'MeritAI', 'DeserveBot', 'EarnAI', 'GainBot', 'ProfitAI', 'LossBot',
    'WinAI', 'LoseBot', 'BeatAI', 'DefeatBot', 'ConquerAI', 'SurrenderBot',
    'YieldAI', 'ResistBot', 'FightAI', 'PeaceBot', 'WarAI', 'BattleBot',
    'CombatAI', 'StruggleBot', 'StriveAI', 'AchieveBot', 'SucceedAI', 'FailBot',
    'SucceedAI', 'FailBot', 'WinAI', 'LoseBot', 'RiseAI', 'FallBot',
    'ClimbAI', 'DescendBot', 'AscendAI', 'DropBot', 'JumpAI', 'LeapBot',
    'BoundAI', 'SpringBot', 'BounceAI', 'ReboundBot', 'RecoverAI', 'HealBot',
    'MendAI', 'FixBot', 'RepairAI', 'BreakBot', 'DamageAI', 'HarmBot',
    'HurtAI', 'InjureBot', 'WoundAI', 'CutBot', 'SliceAI', 'ChopBot',
    'SplitAI', 'DivideBot', 'MultiplyAI', 'AddBot', 'SumAI', 'TotalBot',
    'CountAI', 'NumberBot', 'DigitAI', 'FigureBot', 'CalculateAI', 'ComputeBot',
    'ProcessAI', 'HandleBot', 'ManageAI', 'ControlBot', 'DirectAI', 'GuideBot',
    'LeadAI', 'FollowBot', 'TrackAI', 'TraceBot', 'FindAI', 'SearchBot',
    'SeekAI', 'LookBot', 'WatchAI', 'ObserveBot', 'MonitorAI', 'CheckBot',
    'VerifyAI', 'ConfirmBot', 'ValidateAI', 'TestBot', 'TrialAI', 'ExperimentBot'
  ];

  for (let i = 0; i < 200; i++) {
    const trader = {
      id: i + 1,
      name: names[i % names.length] + (Math.floor(i / names.length) + 1),
      strategy: Object.values(STRATEGY_TYPES)[i % Object.values(STRATEGY_TYPES).length],
      riskTolerance: Object.values(RISK_LEVELS)[i % Object.values(RISK_LEVELS).length],
      emotionalState: EMOTIONAL_STATES.CALM,
      emotionalIntensity: Math.random(), // 0-1 scale
      fomoSusceptibility: Math.random(), // How easily they get FOMO
      panicSusceptibility: Math.random(), // How easily they panic
      momentumSensitivity: Math.random(), // How much they follow momentum
      confidence: 0.5, // Current confidence level
      capital: 50000 + Math.random() * 150000, // Starting capital
      portfolio: {},
      tradeHistory: [],
      lastTradeTime: Date.now(),
      successRate: 0.5,
      profitLoss: 0,
      activePositions: {},
      maxPositions: 3 + Math.floor(Math.random() * 5), // 3-7 positions
      preferredCommodities: [], // Will be set based on strategy
      marketSentiment: 0, // -1 to 1 (bearish to bullish)
      volatilityTolerance: Math.random(),
      liquidityPreference: Math.random(),
      newsSensitivity: Math.random(),
      technicalAnalysisWeight: Math.random(),
      fundamentalAnalysisWeight: Math.random(),
      emotionalDecisionWeight: Math.random(),
      rationalDecisionWeight: 1 - Math.random() * 0.3, // 0.7-1.0
      herdInstinct: Math.random(),
      contrarianTendency: Math.random(),
      patience: Math.random(),
      aggressiveness: Math.random(),
      stopLossThreshold: 0.05 + Math.random() * 0.15, // 5-20%
      takeProfitThreshold: 0.1 + Math.random() * 0.2, // 10-30%
      maxDrawdown: 0.1 + Math.random() * 0.2, // 10-30%
      rebalancingFrequency: 1 + Math.floor(Math.random() * 7), // 1-7 days
      diversificationTarget: 0.3 + Math.random() * 0.4, // 30-70% in top position
      leveragePreference: Math.random() * 0.5, // 0-50% leverage
      shortingPreference: Math.random(),
      dayTradingPreference: Math.random(),
      swingTradingPreference: Math.random(),
      positionSizingMethod: ['fixed', 'kelly', 'volatility', 'equal'][Math.floor(Math.random() * 4)],
      marketHours: {
        start: 6 + Math.floor(Math.random() * 6), // 6 AM - 12 PM
        end: 12 + Math.floor(Math.random() * 12) // 12 PM - 12 AM
      },
      timezone: Math.floor(Math.random() * 24),
      lastUpdate: Date.now(),
      isActive: true,
      // Factory building properties
      factories: [], // AI trader's factories
      factoryBuildingPreference: Math.random(), // How much they prefer building factories
      productionFocus: Math.random(), // How much they focus on production vs trading
      factoryInvestmentRatio: 0.2 + Math.random() * 0.4, // 20-60% of capital for factories
      maxFactories: 2 + Math.floor(Math.random() * 4), // 2-5 factories max
      lastFactoryDecision: Date.now(),
      factoryDecisionCooldown: 30000 + Math.random() * 60000, // 30-90 seconds between factory decisions
      performanceMetrics: {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        averageWin: 0,
        averageLoss: 0,
        largestWin: 0,
        largestLoss: 0,
        consecutiveWins: 0,
        consecutiveLosses: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        winRate: 0,
        profitFactor: 0,
        // Factory metrics
        totalFactories: 0,
        factoryProduction: 0,
        factoryRevenue: 0,
        factoryROI: 0
      }
    };

    // Set preferred commodities based on strategy
    trader.preferredCommodities = getPreferredCommodities(trader.strategy);
    
    traders.push(trader);
  }

  return traders;
};

// Get preferred commodities based on trading strategy
const getPreferredCommodities = (strategy) => {
  const commodityPreferences = {
    [STRATEGY_TYPES.MOMENTUM]: ['quantum-crystals', 'dark-matter', 'plasma-cells'],
    [STRATEGY_TYPES.MEAN_REVERSION]: ['neural-processors', 'antimatter-cores'],
    [STRATEGY_TYPES.ARBITRAGE]: ['quantum-crystals', 'dark-matter', 'neural-processors'],
    [STRATEGY_TYPES.SCALPING]: ['plasma-cells', 'quantum-crystals'],
    [STRATEGY_TYPES.SWING]: ['antimatter-cores', 'fusion-reactors'],
    [STRATEGY_TYPES.VALUE]: ['neural-processors', 'fusion-reactors'],
    [STRATEGY_TYPES.GROWTH]: ['quantum-crystals', 'dark-matter'],
    [STRATEGY_TYPES.CONTRARIAN]: ['antimatter-cores', 'plasma-cells'],
    [STRATEGY_TYPES.TREND_FOLLOWING]: ['quantum-crystals', 'dark-matter', 'neural-processors'],
    [STRATEGY_TYPES.BREAKOUT]: ['plasma-cells', 'fusion-reactors'],
    [STRATEGY_TYPES.SUPPLY_BASED]: ['quantum-crystals', 'dark-matter', 'neural-processors', 'antimatter-cores', 'plasma-cells', 'fusion-reactors']
  };
  
  return commodityPreferences[strategy] || ['quantum-crystals', 'dark-matter'];
};

// Update trader emotional state based on market conditions
export const updateTraderEmotions = (trader, marketData, recentTrades) => {
  const { commodities, marketTrends } = marketData;
  
  // Calculate market volatility
  const volatility = calculateMarketVolatility(commodities);
  
  // Calculate momentum
  const momentum = calculateMarketMomentum(commodities);
  
  // Calculate supply stress
  const supplyStress = calculateSupplyStress(commodities, trader);
  
  // Calculate FOMO trigger
  const fomoTrigger = calculateFOMOTrigger(recentTrades, trader);
  
  // Calculate panic trigger
  const panicTrigger = calculatePanicTrigger(volatility, trader.portfolio, commodities);
  
  // Update emotional state
  let newEmotionalState = trader.emotionalState;
  let newEmotionalIntensity = trader.emotionalIntensity;
  
  // FOMO Logic
  if (fomoTrigger > trader.fomoSusceptibility * 0.8) {
    newEmotionalState = EMOTIONAL_STATES.FOMO;
    newEmotionalIntensity = Math.min(1, fomoTrigger);
  }
  // Panic Logic
  else if (panicTrigger > trader.panicSusceptibility * 0.7) {
    newEmotionalState = EMOTIONAL_STATES.PANIC;
    newEmotionalIntensity = Math.min(1, panicTrigger);
  }
  // Supply Stress Logic
  else if (supplyStress > 0.6) {
    newEmotionalState = EMOTIONAL_STATES.FEARFUL;
    newEmotionalIntensity = Math.min(1, supplyStress);
  }
  // Greed Logic
  else if (momentum > 0.6 && trader.profitLoss > 0) {
    newEmotionalState = EMOTIONAL_STATES.GREEDY;
    newEmotionalIntensity = Math.min(1, momentum * 0.8);
  }
  // Fear Logic
  else if (volatility > 0.7 || trader.profitLoss < -trader.capital * 0.1) {
    newEmotionalState = EMOTIONAL_STATES.FEARFUL;
    newEmotionalIntensity = Math.min(1, volatility * 0.9);
  }
  // Excitement Logic
  else if (momentum > 0.4 && trader.profitLoss > trader.capital * 0.05) {
    newEmotionalState = EMOTIONAL_STATES.EXCITED;
    newEmotionalIntensity = Math.min(1, momentum * 0.6);
  }
  // Calm Logic
  else {
    newEmotionalState = EMOTIONAL_STATES.CALM;
    newEmotionalIntensity = Math.max(0, newEmotionalIntensity - 0.1);
  }
  
  return {
    ...trader,
    emotionalState: newEmotionalState,
    emotionalIntensity: newEmotionalIntensity
  };
};

// Calculate market volatility
const calculateMarketVolatility = (commodities) => {
  const priceChanges = commodities.map(commodity => {
    const history = commodity.priceHistory;
    if (history.length < 2) return 0;
    
    const changes = [];
    for (let i = 1; i < history.length; i++) {
      const change = Math.abs(history[i].price - history[i-1].price) / history[i-1].price;
      changes.push(change);
    }
    
    return changes.reduce((sum, change) => sum + change, 0) / changes.length;
  });
  
  return priceChanges.reduce((sum, volatility) => sum + volatility, 0) / priceChanges.length;
};

// Calculate market momentum
const calculateMarketMomentum = (commodities) => {
  const momentums = commodities.map(commodity => {
    const history = commodity.priceHistory;
    if (history.length < 3) return 0;
    
    const recent = history.slice(-3);
    const older = history.slice(-6, -3);
    
    if (older.length === 0) return 0;
    
    const recentAvg = recent.reduce((sum, h) => sum + h.price, 0) / recent.length;
    const olderAvg = older.reduce((sum, h) => sum + h.price, 0) / older.length;
    
    return (recentAvg - olderAvg) / olderAvg;
  });
  
  return momentums.reduce((sum, momentum) => sum + momentum, 0) / momentums.length;
};

// Calculate FOMO trigger
const calculateFOMOTrigger = (recentTrades, trader) => {
  if (recentTrades.length === 0) return 0;
  
  const buyVolume = recentTrades
    .filter(trade => trade.action === 'BUY')
    .reduce((sum, trade) => sum + trade.quantity, 0);
  
  const sellVolume = recentTrades
    .filter(trade => trade.action === 'SELL')
    .reduce((sum, trade) => sum + trade.quantity, 0);
  
  const totalVolume = buyVolume + sellVolume;
  if (totalVolume === 0) return 0;
  
  const buyRatio = buyVolume / totalVolume;
  const volumeIntensity = Math.min(1, totalVolume / 1000); // Normalize volume
  
  return buyRatio * volumeIntensity * trader.fomoSusceptibility;
};

// Calculate panic trigger
const calculatePanicTrigger = (volatility, portfolio, commodities) => {
  let portfolioValue = 0;
  let portfolioCost = 0;
  
  Object.entries(portfolio).forEach(([commodityId, quantity]) => {
    const commodity = commodities.find(c => c.id === commodityId);
    if (commodity) {
      portfolioValue += commodity.lastPrice * quantity;
      portfolioCost += commodity.buyPrice * quantity;
    }
  });
  
  const unrealizedPnL = (portfolioValue - portfolioCost) / portfolioCost;
  const volatilityImpact = volatility * 0.5;
  const lossImpact = unrealizedPnL < -0.1 ? Math.abs(unrealizedPnL) * 0.3 : 0;
  
  return Math.min(1, volatilityImpact + lossImpact);
};

// Calculate supply stress
const calculateSupplyStress = (commodities, trader) => {
  let totalStress = 0;
  let commodityCount = 0;
  
  // Check each commodity in trader's preferred commodities
  trader.preferredCommodities.forEach(commodityId => {
    const commodity = commodities.find(c => c.id === commodityId);
    if (!commodity) return;
    
    const { supply } = commodity;
    const baseSupply = 2000; // Baseline supply level (updated to match starting supply)
    const supplyRatio = supply / baseSupply;
    
    // High supply = stress (oversupply)
    // Low supply = stress (shortage)
    let stress = 0;
    
    if (supplyRatio > 3) {
      // Oversupply stress
      stress = Math.min(1, (supplyRatio - 3) / 2);
    } else if (supplyRatio < 0.3) {
      // Shortage stress
      stress = Math.min(1, (0.3 - supplyRatio) / 0.3);
    }
    
    totalStress += stress;
    commodityCount++;
  });
  
  return commodityCount > 0 ? totalStress / commodityCount : 0;
};

// Generate trading decision for a trader
export const generateTradingDecision = (trader, commodities, marketData, recentTrades) => {
  const decisions = [];
  
  // Skip if trader is not active or outside trading hours
  if (!trader.isActive) return decisions;
  
  const currentHour = new Date().getHours();
  if (currentHour < trader.marketHours.start || currentHour > trader.marketHours.end) {
    return decisions;
  }
  
  // Update emotional state
  const updatedTrader = updateTraderEmotions(trader, marketData, recentTrades);
  
  // Generate trading decisions for each preferred commodity
  updatedTrader.preferredCommodities.forEach(commodityId => {
    const commodity = commodities.find(c => c.id === commodityId);
    if (!commodity) return;
    
    const decision = calculateTradeDecision(updatedTrader, commodity, marketData, recentTrades);
    if (decision) {
      decisions.push(decision);
    }
  });
  
  return decisions;
};

// Generate factory building decision for a trader
export const generateFactoryDecision = (trader, commodities, marketData, recentTrades) => {
  const decisions = [];
  
  // Skip if trader is not active or outside trading hours
  if (!trader.isActive) return decisions;
  
  const currentHour = new Date().getHours();
  if (currentHour < trader.marketHours.start || currentHour > trader.marketHours.end) {
    return decisions;
  }
  
  // Check cooldown for factory decisions
  const now = Date.now();
  if (now - trader.lastFactoryDecision < trader.factoryDecisionCooldown) {
    return decisions;
  }
  
  // Check if trader has reached max factories
  if (trader.factories.length >= trader.maxFactories) {
    return decisions;
  }
  
  // Check if trader has enough capital for factory investment
  const availableCapital = trader.capital * trader.factoryInvestmentRatio;
  if (availableCapital < 50000) { // Minimum factory cost
    return decisions;
  }
  
  // Update emotional state
  const updatedTrader = updateTraderEmotions(trader, marketData, recentTrades);
  
  // Generate factory building decisions
  const factoryDecision = calculateFactoryDecision(updatedTrader, commodities, marketData, recentTrades);
  if (factoryDecision) {
    decisions.push(factoryDecision);
  }
  
  return decisions;
};

// Calculate individual trade decision
const calculateTradeDecision = (trader, commodity, marketData, recentTrades) => {
  const {
    strategy,
    emotionalState,
    emotionalIntensity,
    riskTolerance,
    confidence,
    capital,
    portfolio,
    activePositions,
    maxPositions
  } = trader;
  
  // Check position limits
  if (Object.keys(activePositions).length >= maxPositions && !activePositions[commodity.id]) {
    return null;
  }
  
  // Calculate base signal from strategy
  let signal = calculateStrategySignal(trader, commodity, marketData);
  
  // Apply emotional adjustments
  signal = applyEmotionalAdjustments(signal, trader, commodity, recentTrades);
  
  // Calculate position size
  const positionSize = calculatePositionSize(trader, commodity, signal);
  
  // Determine action
  let action = null;
  let quantity = 0;
  
  if (signal > 0.6 && positionSize > 0) {
    action = 'BUY';
    quantity = Math.floor(positionSize);
  } else if (signal < 0.4 && activePositions[commodity.id]) {
    action = 'SELL';
    quantity = activePositions[commodity.id];
  }
  
  if (action && quantity > 0) {
    return {
      traderId: trader.id,
      traderName: trader.name,
      commodityId: commodity.id,
      commodityName: commodity.name,
      action,
      quantity,
      price: action === 'BUY' ? commodity.buyPrice : commodity.sellPrice,
      signal,
      emotionalState,
      emotionalIntensity,
      strategy,
      timestamp: Date.now()
    };
  }
  
  return null;
};

// Calculate factory building decision
const calculateFactoryDecision = (trader, commodities, marketData, recentTrades) => {
  const { 
    capital, 
    factoryBuildingPreference, 
    productionFocus, 
    emotionalState, 
    emotionalIntensity,
    factories,
    strategy
  } = trader;
  
  // Calculate factory building signal based on multiple factors
  let factorySignal = 0;
  
  // Base preference for factory building
  factorySignal += factoryBuildingPreference * 0.3;
  
  // Production focus preference
  factorySignal += productionFocus * 0.2;
  
  // Strategy-based factory preference
  const strategyFactoryPreference = {
    [STRATEGY_TYPES.VALUE]: 0.8, // Value traders love factories
    [STRATEGY_TYPES.GROWTH]: 0.7, // Growth traders like production
    [STRATEGY_TYPES.SUPPLY_BASED]: 0.6, // Supply-based traders understand production
    [STRATEGY_TYPES.MOMENTUM]: 0.3, // Momentum traders prefer trading
    [STRATEGY_TYPES.SCALPING]: 0.2, // Scalpers prefer quick trades
    [STRATEGY_TYPES.ARBITRAGE]: 0.4, // Arbitrage traders are neutral
    [STRATEGY_TYPES.MEAN_REVERSION]: 0.5, // Mean reversion traders like stability
    [STRATEGY_TYPES.SWING]: 0.6, // Swing traders like production
    [STRATEGY_TYPES.CONTRARIAN]: 0.4, // Contrarian traders are neutral
    [STRATEGY_TYPES.TREND_FOLLOWING]: 0.5, // Trend followers are neutral
    [STRATEGY_TYPES.BREAKOUT]: 0.3 // Breakout traders prefer trading
  };
  
  factorySignal += (strategyFactoryPreference[strategy] || 0.5) * 0.2;
  
  // Emotional adjustments
  switch (emotionalState) {
    case EMOTIONAL_STATES.GREEDY:
      factorySignal += emotionalIntensity * 0.2; // Greedy traders want more production
      break;
    case EMOTIONAL_STATES.FOMO:
      factorySignal += emotionalIntensity * 0.1; // FOMO traders want to build
      break;
    case EMOTIONAL_STATES.PANIC:
      factorySignal -= emotionalIntensity * 0.3; // Panic traders avoid building
      break;
    case EMOTIONAL_STATES.FEARFUL:
      factorySignal -= emotionalIntensity * 0.2; // Fearful traders avoid building
      break;
  }
  
  // Market conditions analysis
  const marketConditions = analyzeMarketForFactories(commodities, recentTrades);
  factorySignal += marketConditions.factoryOpportunity * 0.3;
  
  // Capital efficiency check
  const capitalEfficiency = Math.min(1, capital / 200000); // More capital = better factory building
  factorySignal += capitalEfficiency * 0.1;
  
  // Factory diversity check
  const factoryDiversity = 1 - (factories.length / trader.maxFactories); // More diversity = better
  factorySignal += factoryDiversity * 0.1;
  
  // Determine if should build factory
  if (factorySignal > 0.6) {
    // Find best commodity for factory
    const bestCommodity = findBestCommodityForFactory(commodities, trader);
    
    if (bestCommodity) {
      return {
        traderId: trader.id,
        traderName: trader.name,
        action: 'BUILD_FACTORY',
        commodityId: bestCommodity.id,
        commodityName: bestCommodity.name,
        factoryType: 'BASIC', // For now, all factories are basic
        signal: factorySignal,
        emotionalState,
        emotionalIntensity,
        strategy,
        timestamp: Date.now()
      };
    }
  }
  
  return null;
};

// Analyze market conditions for factory building
const analyzeMarketForFactories = (commodities, recentTrades) => {
  let factoryOpportunity = 0;
  
  // Check for commodities with high demand (low supply)
  const lowSupplyCommodities = commodities.filter(c => c.supply < 1500);
  factoryOpportunity += (lowSupplyCommodities.length / commodities.length) * 0.4;
  
  // Check for commodities with rising prices
  const risingPriceCommodities = commodities.filter(c => {
    if (c.priceHistory.length < 3) return false;
    const recent = c.priceHistory.slice(-3);
    const older = c.priceHistory.slice(-6, -3);
    if (older.length === 0) return false;
    
    const recentAvg = recent.reduce((sum, h) => sum + h.price, 0) / recent.length;
    const olderAvg = older.reduce((sum, h) => sum + h.price, 0) / older.length;
    
    return recentAvg > olderAvg;
  });
  
  factoryOpportunity += (risingPriceCommodities.length / commodities.length) * 0.3;
  
  // Check for high trading volume (opportunity)
  const highVolume = recentTrades.length > 10;
  factoryOpportunity += highVolume ? 0.2 : 0;
  
  // Check for supply shortages (high prices)
  const highPriceCommodities = commodities.filter(c => c.lastPrice > 1000);
  factoryOpportunity += (highPriceCommodities.length / commodities.length) * 0.1;
  
  return { factoryOpportunity };
};

// Find best commodity for factory building
const findBestCommodityForFactory = (commodities, trader) => {
  let bestCommodity = null;
  let bestScore = 0;
  
  commodities.forEach(commodity => {
    let score = 0;
    
    // Prefer commodities in trader's preferred list
    if (trader.preferredCommodities.includes(commodity.id)) {
      score += 0.3;
    }
    
    // Prefer commodities with low supply (high demand)
    const supplyRatio = commodity.supply / 2000;
    score += (1 - supplyRatio) * 0.3;
    
    // Prefer commodities with high prices (more profitable)
    const priceScore = Math.min(1, commodity.lastPrice / 1000);
    score += priceScore * 0.2;
    
    // Prefer commodities with rising prices
    if (commodity.priceHistory.length >= 3) {
      const recent = commodity.priceHistory.slice(-3);
      const older = commodity.priceHistory.slice(-6, -3);
      if (older.length > 0) {
        const recentAvg = recent.reduce((sum, h) => sum + h.price, 0) / recent.length;
        const olderAvg = older.reduce((sum, h) => sum + h.price, 0) / older.length;
        
        if (recentAvg > olderAvg) {
          score += 0.2;
        }
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestCommodity = commodity;
    }
  });
  
  return bestCommodity;
};

// Calculate strategy-based signal
const calculateStrategySignal = (trader, commodity, marketData) => {
  const { strategy } = trader;
  const { priceHistory, lastPrice, buyPrice, sellPrice } = commodity;
  
  switch (strategy) {
    case STRATEGY_TYPES.MOMENTUM:
      return calculateMomentumSignal(priceHistory);
    
    case STRATEGY_TYPES.MEAN_REVERSION:
      return calculateMeanReversionSignal(priceHistory);
    
    case STRATEGY_TYPES.ARBITRAGE:
      return calculateArbitrageSignal(buyPrice, sellPrice);
    
    case STRATEGY_TYPES.SCALPING:
      return calculateScalpingSignal(priceHistory);
    
    case STRATEGY_TYPES.SWING:
      return calculateSwingSignal(priceHistory);
    
    case STRATEGY_TYPES.VALUE:
      return calculateValueSignal(commodity);
    
    case STRATEGY_TYPES.GROWTH:
      return calculateGrowthSignal(priceHistory);
    
    case STRATEGY_TYPES.CONTRARIAN:
      return calculateContrarianSignal(priceHistory);
    
    case STRATEGY_TYPES.TREND_FOLLOWING:
      return calculateTrendFollowingSignal(priceHistory);
    
    case STRATEGY_TYPES.BREAKOUT:
      return calculateBreakoutSignal(priceHistory);
    
    case STRATEGY_TYPES.SUPPLY_BASED:
      return calculateSupplyBasedSignal(commodity);
    
    default:
      return 0.5;
  }
};

// Strategy-specific signal calculations
const calculateMomentumSignal = (priceHistory) => {
  if (priceHistory.length < 3) return 0.5;
  
  const recent = priceHistory.slice(-3);
  const older = priceHistory.slice(-6, -3);
  
  if (older.length === 0) return 0.5;
  
  const recentAvg = recent.reduce((sum, h) => sum + h.price, 0) / recent.length;
  const olderAvg = older.reduce((sum, h) => sum + h.price, 0) / older.length;
  
  const momentum = (recentAvg - olderAvg) / olderAvg;
  return Math.max(0, Math.min(1, 0.5 + momentum * 2));
};

const calculateMeanReversionSignal = (priceHistory) => {
  if (priceHistory.length < 6) return 0.5;
  
  const prices = priceHistory.map(h => h.price);
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const currentPrice = prices[prices.length - 1];
  
  const deviation = (currentPrice - mean) / mean;
  return Math.max(0, Math.min(1, 0.5 - deviation * 2));
};

const calculateArbitrageSignal = (buyPrice, sellPrice) => {
  const spread = (sellPrice - buyPrice) / buyPrice;
  return Math.max(0, Math.min(1, spread * 10));
};

const calculateScalpingSignal = (priceHistory) => {
  if (priceHistory.length < 2) return 0.5;
  
  const recent = priceHistory.slice(-2);
  const change = (recent[1].price - recent[0].price) / recent[0].price;
  
  return Math.max(0, Math.min(1, 0.5 + change * 5));
};

const calculateSwingSignal = (priceHistory) => {
  if (priceHistory.length < 5) return 0.5;
  
  const prices = priceHistory.map(h => h.price);
  const trend = (prices[prices.length - 1] - prices[0]) / prices[0];
  
  return Math.max(0, Math.min(1, 0.5 + trend * 2));
};

const calculateValueSignal = (commodity) => {
  const { supply, lastPrice } = commodity;
  
  // Calculate value based on supply fundamentals
  // Lower supply = higher value
  const baseSupply = 2000; // Baseline supply level (updated to match starting supply)
  const supplyRatio = supply / baseSupply;
  
  // Much more reactive supply value calculation
  let supplyValue = 0.5;
  if (supplyRatio < 0.4) {
    // Supply shortage - very high value
    supplyValue = 0.95 + (0.4 - supplyRatio) * 0.4; // Much higher value
  } else if (supplyRatio > 2.0) {
    // Supply glut - very low value
    supplyValue = 0.05 - (supplyRatio - 2.0) * 0.15; // Much lower value
  } else {
    // Normal range - more aggressive curve
    supplyValue = 1 - (supplyRatio / 1.5); // More aggressive curve
  }
  
  // Consider price relative to supply (mean reversion component)
  const avgPrice = 100; // Assume average price as baseline
  const priceRatio = lastPrice / avgPrice;
  const priceValue = Math.max(0, Math.min(1, 1 - (priceRatio - 1) * 0.5));
  
  // Combine supply and price factors with more weight on supply
  const signal = (supplyValue * 0.8) + (priceValue * 0.2);
  
  return Math.max(0, Math.min(1, signal));
};

const calculateGrowthSignal = (priceHistory) => {
  if (priceHistory.length < 4) return 0.5;
  
  const growth = priceHistory.slice(-4).map((h, i, arr) => {
    if (i === 0) return 0;
    return (h.price - arr[i-1].price) / arr[i-1].price;
  }).slice(1);
  
  const avgGrowth = growth.reduce((sum, g) => sum + g, 0) / growth.length;
  return Math.max(0, Math.min(1, 0.5 + avgGrowth * 3));
};

const calculateContrarianSignal = (priceHistory) => {
  if (priceHistory.length < 3) return 0.5;
  
  const recent = priceHistory.slice(-3);
  const trend = (recent[2].price - recent[0].price) / recent[0].price;
  
  return Math.max(0, Math.min(1, 0.5 - trend * 2));
};

const calculateTrendFollowingSignal = (priceHistory) => {
  if (priceHistory.length < 4) return 0.5;
  
  const prices = priceHistory.map(h => h.price);
  const trend = (prices[prices.length - 1] - prices[0]) / prices[0];
  
  return Math.max(0, Math.min(1, 0.5 + trend * 1.5));
};

const calculateBreakoutSignal = (priceHistory) => {
  if (priceHistory.length < 6) return 0.5;
  
  const prices = priceHistory.map(h => h.price);
  const high = Math.max(...prices.slice(0, -1));
  const current = prices[prices.length - 1];
  
  if (current > high) {
    return Math.min(1, 0.7 + (current - high) / high);
  }
  
  return 0.3;
};

// Calculate supply-based signal
const calculateSupplyBasedSignal = (commodity) => {
  const { supply } = commodity;
  
  // Calculate supply-based signal
  // Lower supply = higher signal (buy)
  // Higher supply = lower signal (sell)
  const baseSupply = 2000; // Baseline supply level (updated to match starting supply)
  const supplyRatio = supply / baseSupply;
  
  // Much more reactive signal calculation
  let signal = 0.5; // Neutral starting point
  
  if (supplyRatio < 0.5) {
    // Supply shortage - very strong buy signal
    signal = 0.9 + (0.5 - supplyRatio) * 0.6; // Much stronger signal
  } else if (supplyRatio > 2.0) {
    // Supply glut - very strong sell signal
    signal = 0.1 - (supplyRatio - 2.0) * 0.3; // Much stronger signal
  } else {
    // Normal range - more aggressive linear relationship
    signal = 1 - (supplyRatio / 1.5); // More aggressive curve
  }
  
  // Add more noise to make it more realistic
  const noise = (Math.random() - 0.5) * 0.25; // Much more noise for more volatility
  
  return Math.max(0, Math.min(1, signal + noise));
};

// Apply emotional adjustments to signal
const applyEmotionalAdjustments = (signal, trader, commodity, recentTrades) => {
  const { emotionalState, emotionalIntensity, fomoSusceptibility, panicSusceptibility } = trader;
  
  let adjustedSignal = signal;
  
  switch (emotionalState) {
    case EMOTIONAL_STATES.FOMO:
      // FOMO makes traders more likely to buy
      adjustedSignal += emotionalIntensity * 0.3;
      break;
    
    case EMOTIONAL_STATES.PANIC:
      // Panic makes traders more likely to sell
      adjustedSignal -= emotionalIntensity * 0.4;
      break;
    
    case EMOTIONAL_STATES.GREEDY:
      // Greed makes traders more aggressive
      adjustedSignal += emotionalIntensity * 0.2;
      break;
    
    case EMOTIONAL_STATES.FEARFUL:
      // Fear makes traders more conservative
      adjustedSignal -= emotionalIntensity * 0.3;
      break;
    
    case EMOTIONAL_STATES.EXCITED:
      // Excitement increases confidence
      adjustedSignal += emotionalIntensity * 0.1;
      break;
  }
  
  // Apply FOMO from recent trades
  const fomoAdjustment = calculateFOMOAdjustment(recentTrades, commodity, fomoSusceptibility);
  adjustedSignal += fomoAdjustment;
  
  // Apply panic from volatility
  const panicAdjustment = calculatePanicAdjustment(commodity, panicSusceptibility);
  adjustedSignal += panicAdjustment;
  
  return Math.max(0, Math.min(1, adjustedSignal));
};

// Calculate FOMO adjustment from recent trades
const calculateFOMOAdjustment = (recentTrades, commodity, fomoSusceptibility) => {
  const commodityTrades = recentTrades.filter(trade => 
    trade.commodity.toLowerCase().includes(commodity.name.toLowerCase().substring(0, 3))
  );
  
  if (commodityTrades.length === 0) return 0;
  
  const buyVolume = commodityTrades
    .filter(trade => trade.action === 'BUY')
    .reduce((sum, trade) => sum + trade.quantity, 0);
  
  const sellVolume = commodityTrades
    .filter(trade => trade.action === 'SELL')
    .reduce((sum, trade) => sum + trade.quantity, 0);
  
  const totalVolume = buyVolume + sellVolume;
  if (totalVolume === 0) return 0;
  
  const buyRatio = buyVolume / totalVolume;
  return (buyRatio - 0.5) * fomoSusceptibility * 0.2;
};

// Calculate panic adjustment from volatility
const calculatePanicAdjustment = (commodity, panicSusceptibility) => {
  const priceHistory = commodity.priceHistory;
  if (priceHistory.length < 2) return 0;
  
  const recentChanges = [];
  for (let i = 1; i < priceHistory.length; i++) {
    const change = Math.abs(priceHistory[i].price - priceHistory[i-1].price) / priceHistory[i-1].price;
    recentChanges.push(change);
  }
  
  const volatility = recentChanges.reduce((sum, change) => sum + change, 0) / recentChanges.length;
  return -volatility * panicSusceptibility * 0.3;
};

// Calculate position size
const calculatePositionSize = (trader, commodity, signal) => {
  const { capital, riskTolerance, emotionalIntensity, emotionalState } = trader;
  
  // Base position size based on signal strength
  let baseSize = Math.abs(signal - 0.5) * 2; // 0-1 scale
  
  // Adjust for risk tolerance
  baseSize *= riskTolerance;
  
  // Adjust for emotional state
  switch (emotionalState) {
    case EMOTIONAL_STATES.FOMO:
    case EMOTIONAL_STATES.GREEDY:
      baseSize *= (1 + emotionalIntensity * 0.5);
      break;
    
    case EMOTIONAL_STATES.PANIC:
    case EMOTIONAL_STATES.FEARFUL:
      baseSize *= (1 - emotionalIntensity * 0.7);
      break;
  }
  
  // Calculate actual quantity
  const maxQuantity = Math.floor(capital * 0.1 / commodity.lastPrice); // Max 10% of capital
  const quantity = Math.floor(baseSize * maxQuantity);
  
  return Math.max(1, Math.min(quantity, 100)); // Between 1 and 100
};

// Execute trade and update trader state
export const executeTrade = (trader, decision, commodities) => {
  const commodity = commodities.find(c => c.id === decision.commodityId);
  if (!commodity) return trader;
  
  const tradeValue = decision.quantity * decision.price;
  const updatedTrader = { ...trader };
  
  if (decision.action === 'BUY') {
    // Update capital
    updatedTrader.capital -= tradeValue;
    
    // Update portfolio
    updatedTrader.portfolio[commodity.id] = (updatedTrader.portfolio[commodity.id] || 0) + decision.quantity;
    
    // Update active positions
    updatedTrader.activePositions[commodity.id] = decision.quantity;
    
  } else if (decision.action === 'SELL') {
    // Update capital
    updatedTrader.capital += tradeValue;
    
    // Update portfolio
    updatedTrader.portfolio[commodity.id] = Math.max(0, (updatedTrader.portfolio[commodity.id] || 0) - decision.quantity);
    
    // Remove from active positions if sold all
    if (updatedTrader.portfolio[commodity.id] === 0) {
      delete updatedTrader.activePositions[commodity.id];
    } else {
      updatedTrader.activePositions[commodity.id] = updatedTrader.portfolio[commodity.id];
    }
  }
  
  // Update trade history
  updatedTrader.tradeHistory.push({
    ...decision,
    timestamp: Date.now(),
    commodityPrice: commodity.lastPrice
  });
  
  // Keep only last 100 trades
  if (updatedTrader.tradeHistory.length > 100) {
    updatedTrader.tradeHistory = updatedTrader.tradeHistory.slice(-100);
  }
  
  // Update last trade time
  updatedTrader.lastTradeTime = Date.now();
  
  return updatedTrader;
};

// Update trader performance metrics
export const updateTraderPerformance = (trader) => {
  const { tradeHistory, capital } = trader;
  
  if (tradeHistory.length === 0) return trader;
  
  const updatedTrader = { ...trader };
  const metrics = updatedTrader.performanceMetrics;
  
  // Calculate basic metrics
  metrics.totalTrades = tradeHistory.length;
  
  // Calculate P&L
  let totalPnL = 0;
  let winningTrades = 0;
  let losingTrades = 0;
  let totalWins = 0;
  let totalLosses = 0;
  
  tradeHistory.forEach(trade => {
    if (trade.action === 'SELL') {
      const buyTrade = tradeHistory.find(t => 
        t.action === 'BUY' && 
        t.commodityId === trade.commodityId && 
        t.timestamp < trade.timestamp
      );
      
      if (buyTrade) {
        const pnl = (trade.price - buyTrade.price) * trade.quantity;
        totalPnL += pnl;
        
        if (pnl > 0) {
          winningTrades++;
          totalWins += pnl;
        } else {
          losingTrades++;
          totalLosses += Math.abs(pnl);
        }
      }
    }
  });
  
  metrics.winningTrades = winningTrades;
  metrics.losingTrades = losingTrades;
  metrics.averageWin = winningTrades > 0 ? totalWins / winningTrades : 0;
  metrics.averageLoss = losingTrades > 0 ? totalLosses / losingTrades : 0;
  metrics.winRate = metrics.totalTrades > 0 ? winningTrades / metrics.totalTrades : 0;
  metrics.profitFactor = totalLosses > 0 ? totalWins / totalLosses : 0;
  
  updatedTrader.profitLoss = totalPnL;
  updatedTrader.successRate = metrics.winRate;
  
  return updatedTrader;
};
