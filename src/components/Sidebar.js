import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ aiPortfolio, marketTrends, tradeFeed, aiTradeFeed = [] }) => {
  const [activeTab, setActiveTab] = useState('LOADS');

  const tabs = ['LOADS', 'MOVES', 'ANALYTICS', 'HISTORY'];

  return (
    <div className="sidebar">
      {/* AI LoadBoard */}
      <div className="sidebar-panel">
        <div className="panel-header">
          <span className="panel-icon">🧠</span>
          <h3 className="panel-title">AI LoadBoard</h3>
        </div>
        <button className="manage-portfolio-btn">Manage Portfolio</button>
        
        <div className="portfolio-items">
          {Object.entries(aiPortfolio).map(([commodity, value]) => (
            <div key={commodity} className="portfolio-item">
              <span className="portfolio-commodity">{commodity}</span>
              <span className="portfolio-value">₹{value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        
        <div className="ai-tip">
          <span className="tip-label">AI Tip:</span>
          <span className="tip-text">High demand movements detected in Neural Processors sector</span>
        </div>
      </div>

      {/* Market Radar */}
      <div className="sidebar-panel">
        <div className="panel-header">
          <span className="panel-icon">🔍</span>
          <h3 className="panel-title">Market Radar</h3>
        </div>
        
        <div className="market-trends">
          {marketTrends.map((trend, index) => (
            <div key={index} className="trend-item">
              <span className="trend-commodity">{trend.name}</span>
              <span className="trend-indicator" style={{ color: trend.color }}>
                {trend.trend === 'Bullish' ? '> Bullish' : '➤ Bearish'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Trade Feed */}
      <div className="sidebar-panel">
        <div className="panel-header">
          <span className="panel-icon">📊</span>
          <h3 className="panel-title">Live Trade Feed</h3>
        </div>
        
        <div className="trade-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`trade-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="trade-feed">
          <div className="trade-feed-header">
            <span className="feed-header-time">TIME</span>
            <span className="feed-header-commodity">COMM</span>
            <span className="feed-header-action">ACTION</span>
            <span className="feed-header-qty">QTY</span>
            <span className="feed-header-value">VALUE</span>
            <span className="feed-header-trader">TRADER</span>
          </div>
          
          <div className="trade-feed-body">
            {activeTab === 'LOADS' && tradeFeed.map((trade, index) => (
              <div key={index} className={`trade-feed-row ${trade.isAI ? 'ai-trade' : 'player-trade'}`}>
                <span className="feed-time">{trade.time}</span>
                <span className="feed-commodity">{trade.commodity}</span>
                <span className={`feed-action ${trade.action.toLowerCase()}`}>
                  {trade.action}
                </span>
                <span className="feed-quantity">{trade.quantity}</span>
                <span className="feed-value">₹{trade.value.toLocaleString()}</span>
                <span className={`feed-trader ${trade.isAI ? 'ai-trader-name' : 'player-trader-name'}`}>
                  {trade.isAI ? '🤖' : '👤'} {trade.trader || 'Unknown'}
                </span>
              </div>
            ))}
            {activeTab === 'MOVES' && aiTradeFeed.map((trade, index) => (
              <div key={index} className="trade-feed-row ai-trade">
                <span className="feed-time">{trade.time}</span>
                <span className="feed-commodity">{trade.commodity}</span>
                <span className={`feed-action ${trade.action.toLowerCase()}`}>
                  {trade.action}
                </span>
                <span className="feed-quantity">{trade.quantity}</span>
                <span className="feed-value">₹{trade.value.toLocaleString()}</span>
                <span className="feed-trader">🤖 {trade.trader}</span>
              </div>
            ))}
            {activeTab === 'ANALYTICS' && (
              <div className="analytics-content">
                <div className="analytics-item">
                  <span className="analytics-label">AI Traders Active:</span>
                  <span className="analytics-value">200</span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">Total AI Trades:</span>
                  <span className="analytics-value">{aiTradeFeed.length}</span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">Market Sentiment:</span>
                  <span className="analytics-value">Bullish</span>
                </div>
              </div>
            )}
            {activeTab === 'HISTORY' && (
              <div className="history-content">
                <div className="history-item">
                  <span className="history-label">Last 24h Volume:</span>
                  <span className="history-value">₹2.4M</span>
                </div>
                <div className="history-item">
                  <span className="history-label">Peak Activity:</span>
                  <span className="history-value">14:30</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
