import React from 'react';
import './MarketSentiment.css';

const MarketSentiment = ({ aiTraders, commodities, onClose }) => {
  // Calculate market sentiment metrics
  const calculateMarketSentiment = () => {
    const totalTraders = aiTraders.length;
    
    // Emotional distribution
    const emotions = aiTraders.reduce((acc, trader) => {
      acc[trader.emotionalState] = (acc[trader.emotionalState] || 0) + 1;
      return acc;
    }, {});
    
    // Strategy distribution
    const strategies = aiTraders.reduce((acc, trader) => {
      acc[trader.strategy] = (acc[trader.strategy] || 0) + 1;
      return acc;
    }, {});
    
    // Average emotional intensity
    const avgEmotionalIntensity = aiTraders.reduce((sum, trader) => sum + trader.emotionalIntensity, 0) / totalTraders;
    
    // FOMO and panic levels
    const fomoCount = emotions.fomo || 0;
    const panicCount = emotions.panic || 0;
    const greedyCount = emotions.greedy || 0;
    const fearfulCount = emotions.fearful || 0;
    
    // Overall sentiment score (-1 to 1, where -1 is very bearish, 1 is very bullish)
    let sentimentScore = 0;
    
    // Positive emotions contribute positively
    sentimentScore += (emotions.excited || 0) * 0.3;
    sentimentScore += (emotions.greedy || 0) * 0.2;
    sentimentScore += (emotions.calm || 0) * 0.1;
    
    // Negative emotions contribute negatively
    sentimentScore -= (emotions.fearful || 0) * 0.2;
    sentimentScore -= (emotions.panic || 0) * 0.4;
    sentimentScore -= (emotions.fomo || 0) * 0.1; // FOMO can be both positive and negative
    
    // Normalize to -1 to 1 range
    sentimentScore = Math.max(-1, Math.min(1, sentimentScore / totalTraders));
    
    return {
      emotions,
      strategies,
      avgEmotionalIntensity,
      fomoCount,
      panicCount,
      greedyCount,
      fearfulCount,
      sentimentScore,
      totalTraders
    };
  };

  const sentiment = calculateMarketSentiment();
  
  const getSentimentColor = (score) => {
    if (score > 0.3) return '#00ff88';
    if (score > 0) return '#ffaa00';
    if (score > -0.3) return '#ffaa00';
    return '#ff4444';
  };

  const getSentimentLabel = (score) => {
    if (score > 0.5) return 'Very Bullish';
    if (score > 0.2) return 'Bullish';
    if (score > -0.2) return 'Neutral';
    if (score > -0.5) return 'Bearish';
    return 'Very Bearish';
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

  return (
    <div className="market-sentiment">
      <div className="sentiment-header">
        <h3>📊 Market Sentiment</h3>
        {onClose && (
          <button 
            className="sentiment-close-btn"
            onClick={onClose}
            title="Close Market Sentiment"
          >
            ×
          </button>
        )}
        <div className="sentiment-score">
          <div 
            className="sentiment-indicator"
            style={{ 
              backgroundColor: getSentimentColor(sentiment.sentimentScore),
              transform: `scale(${1 + Math.abs(sentiment.sentimentScore) * 0.3})`
            }}
          />
          <span className="sentiment-label">{getSentimentLabel(sentiment.sentimentScore)}</span>
        </div>
      </div>

      <div className="sentiment-metrics">
        <div className="metric-row">
          <div className="metric-item">
            <span className="metric-label">Emotional Intensity</span>
            <span className="metric-value">{(sentiment.avgEmotionalIntensity * 100).toFixed(1)}%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Active Traders</span>
            <span className="metric-value">{sentiment.totalTraders}</span>
          </div>
        </div>
      </div>

      <div className="sentiment-charts">
        <div className="chart-section">
          <h4>Emotional Distribution</h4>
          <div className="emotion-chart">
            {Object.entries(sentiment.emotions).map(([emotion, count]) => (
              <div key={emotion} className="emotion-bar">
                <div className="emotion-label">
                  <span className="emotion-icon">
                    {emotion === 'calm' && '😐'}
                    {emotion === 'excited' && '🤩'}
                    {emotion === 'fearful' && '😨'}
                    {emotion === 'greedy' && '😈'}
                    {emotion === 'panic' && '😱'}
                    {emotion === 'fomo' && '😰'}
                  </span>
                  <span className="emotion-name">{emotion}</span>
                </div>
                <div className="emotion-progress">
                  <div 
                    className="emotion-fill"
                    style={{ 
                      width: `${(count / sentiment.totalTraders) * 100}%`,
                      backgroundColor: getEmotionColor(emotion)
                    }}
                  />
                </div>
                <span className="emotion-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h4>Strategy Distribution</h4>
          <div className="strategy-chart">
            {Object.entries(sentiment.strategies).map(([strategy, count]) => (
              <div key={strategy} className="strategy-bar">
                <div className="strategy-label">
                  <span className="strategy-icon">
                    {strategy === 'momentum' && '📈'}
                    {strategy === 'mean_reversion' && '🔄'}
                    {strategy === 'arbitrage' && '⚖️'}
                    {strategy === 'scalping' && '⚡'}
                    {strategy === 'swing' && '🎯'}
                    {strategy === 'value' && '💰'}
                    {strategy === 'growth' && '🌱'}
                    {strategy === 'contrarian' && '🔄'}
                    {strategy === 'trend_following' && '📊'}
                    {strategy === 'breakout' && '🚀'}
                  </span>
                  <span className="strategy-name">{strategy.replace('_', ' ')}</span>
                </div>
                <div className="strategy-progress">
                  <div 
                    className="strategy-fill"
                    style={{ 
                      width: `${(count / sentiment.totalTraders) * 100}%`,
                      backgroundColor: getStrategyColor(strategy)
                    }}
                  />
                </div>
                <span className="strategy-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sentiment-alerts">
        {sentiment.fomoCount > sentiment.totalTraders * 0.3 && (
          <div className="alert alert-fomo">
            🚨 FOMO Alert: {sentiment.fomoCount} traders experiencing FOMO
          </div>
        )}
        {sentiment.panicCount > sentiment.totalTraders * 0.2 && (
          <div className="alert alert-panic">
            ⚠️ Panic Alert: {sentiment.panicCount} traders in panic mode
          </div>
        )}
        {sentiment.greedyCount > sentiment.totalTraders * 0.25 && (
          <div className="alert alert-greed">
            💰 Greed Alert: {sentiment.greedyCount} traders showing greed
          </div>
        )}
        {sentiment.fearfulCount > sentiment.totalTraders * 0.25 && (
          <div className="alert alert-fear">
            😨 Fear Alert: {sentiment.fearfulCount} traders fearful
          </div>
        )}
      </div>

      <div className="market-mood">
        <h4>Current Market Mood</h4>
        <div className="mood-indicators">
          <div className="mood-item">
            <span className="mood-icon">📈</span>
            <span className="mood-label">Momentum</span>
            <span className="mood-value">
              {sentiment.strategies.momentum || 0} traders
            </span>
          </div>
          <div className="mood-item">
            <span className="mood-icon">🔄</span>
            <span className="mood-label">Contrarian</span>
            <span className="mood-value">
              {sentiment.strategies.contrarian || 0} traders
            </span>
          </div>
          <div className="mood-item">
            <span className="mood-icon">⚡</span>
            <span className="mood-label">Active</span>
            <span className="mood-value">
              {aiTraders.filter(t => t.isActive).length} traders
            </span>
          </div>
          <div className="mood-item">
            <span className="mood-icon">💰</span>
            <span className="mood-label">Profitable</span>
            <span className="mood-value">
              {aiTraders.filter(t => t.profitLoss > 0).length} traders
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSentiment;
