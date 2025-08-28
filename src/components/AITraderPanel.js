import React, { useState } from 'react';
import './AITraderPanel.css';

const AITraderPanel = ({ aiTraders, onTraderSelect }) => {
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [filterStrategy, setFilterStrategy] = useState('all');
  const [filterEmotion, setFilterEmotion] = useState('all');
  const [sortBy, setSortBy] = useState('profitLoss');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleTraderClick = (trader) => {
    setSelectedTrader(trader);
    if (onTraderSelect) {
      onTraderSelect(trader);
    }
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      calm: '#4CAF50',
      excited: '#FF9800',
      fearful: '#9C27B0',
      greedy: '#FF5722',
      panic: '#F44336',
      fomo: '#E91E63'
    };
    return colors[emotion] || '#757575';
  };

  const getStrategyColor = (strategy) => {
    const colors = {
      momentum: '#2196F3',
      mean_reversion: '#4CAF50',
      arbitrage: '#FF9800',
      scalping: '#9C27B0',
      swing: '#607D8B',
      value: '#795548',
      growth: '#00BCD4',
      contrarian: '#FF5722',
      trend_following: '#3F51B5',
      breakout: '#E91E63'
    };
    return colors[strategy] || '#757575';
  };

  const filteredTraders = aiTraders
    .filter(trader => {
      if (filterStrategy !== 'all' && trader.strategy !== filterStrategy) return false;
      if (filterEmotion !== 'all' && trader.emotionalState !== filterEmotion) return false;
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'profitLoss':
          aValue = a.profitLoss;
          bValue = b.profitLoss;
          break;
        case 'successRate':
          aValue = a.successRate;
          bValue = b.successRate;
          break;
        case 'capital':
          aValue = a.capital;
          bValue = b.capital;
          break;
        case 'emotionalIntensity':
          aValue = a.emotionalIntensity;
          bValue = b.emotionalIntensity;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          aValue = a.profitLoss;
          bValue = b.profitLoss;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const getEmotionIcon = (emotion) => {
    const icons = {
      calm: '😐',
      excited: '🤩',
      fearful: '😨',
      greedy: '😈',
      panic: '😱',
      fomo: '😰'
    };
    return icons[emotion] || '😐';
  };

  const getStrategyIcon = (strategy) => {
    const icons = {
      momentum: '📈',
      mean_reversion: '🔄',
      arbitrage: '⚖️',
      scalping: '⚡',
      swing: '🎯',
      value: '💰',
      growth: '🌱',
      contrarian: '🔄',
      trend_following: '📊',
      breakout: '🚀'
    };
    return icons[strategy] || '📊';
  };

  return (
    <div className="ai-trader-panel">
      <div className="ai-trader-header">
        <h3>🤖 AI Traders ({aiTraders.length})</h3>
        <div className="ai-trader-controls">
          <select 
            value={filterStrategy} 
            onChange={(e) => setFilterStrategy(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Strategies</option>
            <option value="momentum">Momentum</option>
            <option value="mean_reversion">Mean Reversion</option>
            <option value="arbitrage">Arbitrage</option>
            <option value="scalping">Scalping</option>
            <option value="swing">Swing</option>
            <option value="value">Value</option>
            <option value="growth">Growth</option>
            <option value="contrarian">Contrarian</option>
            <option value="trend_following">Trend Following</option>
            <option value="breakout">Breakout</option>
          </select>
          
          <select 
            value={filterEmotion} 
            onChange={(e) => setFilterEmotion(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Emotions</option>
            <option value="calm">Calm</option>
            <option value="excited">Excited</option>
            <option value="fearful">Fearful</option>
            <option value="greedy">Greedy</option>
            <option value="panic">Panic</option>
            <option value="fomo">FOMO</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="profitLoss">P&L</option>
            <option value="successRate">Success Rate</option>
            <option value="capital">Capital</option>
            <option value="emotionalIntensity">Emotional Intensity</option>
            <option value="name">Name</option>
          </select>
          
          <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-button"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="ai-trader-stats">
        <div className="stat-card">
          <div className="stat-value">{aiTraders.filter(t => t.profitLoss > 0).length}</div>
          <div className="stat-label">Profitable</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{aiTraders.filter(t => t.emotionalState === 'fomo').length}</div>
          <div className="stat-label">FOMO</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{aiTraders.filter(t => t.emotionalState === 'panic').length}</div>
          <div className="stat-label">Panic</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            ₹{aiTraders.reduce((sum, t) => sum + t.profitLoss, 0).toLocaleString()}
          </div>
          <div className="stat-label">Total P&L</div>
        </div>
      </div>

      <div className="ai-trader-list">
        {filteredTraders.map(trader => (
          <div 
            key={trader.id}
            className={`ai-trader-card ${selectedTrader?.id === trader.id ? 'selected' : ''}`}
            onClick={() => handleTraderClick(trader)}
          >
            <div className="trader-header">
              <div className="trader-name">
                {getStrategyIcon(trader.strategy)} {trader.name}
              </div>
              <div className="trader-emotion">
                {getEmotionIcon(trader.emotionalState)}
              </div>
            </div>
            
            <div className="trader-details">
              <div className="trader-strategy">
                <span 
                  className="strategy-badge"
                  style={{ backgroundColor: getStrategyColor(trader.strategy) }}
                >
                  {trader.strategy.replace('_', ' ')}
                </span>
              </div>
              
              <div className="trader-metrics">
                <div className="metric">
                  <span className="metric-label">P&L:</span>
                  <span className={`metric-value ${trader.profitLoss >= 0 ? 'positive' : 'negative'}`}>
                    ₹{trader.profitLoss.toLocaleString()}
                  </span>
                </div>
                
                <div className="metric">
                  <span className="metric-label">Capital:</span>
                  <span className="metric-value">₹{trader.capital.toLocaleString()}</span>
                </div>
                
                <div className="metric">
                  <span className="metric-label">Success:</span>
                  <span className="metric-value">{(trader.successRate * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="trader-emotional-bar">
                <div 
                  className="emotional-intensity"
                  style={{ 
                    width: `${trader.emotionalIntensity * 100}%`,
                    backgroundColor: getEmotionColor(trader.emotionalState)
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTrader && (
        <div className="trader-detail-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>{selectedTrader.name}</h4>
              <button onClick={() => setSelectedTrader(null)}>×</button>
            </div>
            
            <div className="trader-detail-content">
              <div className="detail-section">
                <h5>Strategy & Performance</h5>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Strategy:</span>
                    <span className="detail-value">{selectedTrader.strategy}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Risk Tolerance:</span>
                    <span className="detail-value">{(selectedTrader.riskTolerance * 100).toFixed(0)}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Success Rate:</span>
                    <span className="detail-value">{(selectedTrader.successRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Trades:</span>
                    <span className="detail-value">{selectedTrader.performanceMetrics.totalTrades}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h5>Emotional Profile</h5>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Current State:</span>
                    <span className="detail-value">{selectedTrader.emotionalState}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Intensity:</span>
                    <span className="detail-value">{(selectedTrader.emotionalIntensity * 100).toFixed(0)}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">FOMO Susceptibility:</span>
                    <span className="detail-value">{(selectedTrader.fomoSusceptibility * 100).toFixed(0)}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Panic Susceptibility:</span>
                    <span className="detail-value">{(selectedTrader.panicSusceptibility * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h5>Portfolio</h5>
                <div className="portfolio-items">
                  {Object.entries(selectedTrader.portfolio).map(([commodityId, quantity]) => (
                    <div key={commodityId} className="portfolio-item">
                      <span className="commodity-name">{commodityId}</span>
                      <span className="commodity-quantity">{quantity}</span>
                    </div>
                  ))}
                  {Object.keys(selectedTrader.portfolio).length === 0 && (
                    <div className="no-positions">No active positions</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITraderPanel;
