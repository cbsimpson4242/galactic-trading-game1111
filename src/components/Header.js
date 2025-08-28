import React from 'react';
import './Header.css';

const Header = ({ gameState, onToggleSimulation, currentUser, onLogout, isSaving, onManualSave, isConnected }) => {
  // Calculate percentage change based on total portfolio value
  const calculatePercentageChange = () => {
    const totalValue = gameState.credits + gameState.totalMargin;
    const initialValue = 100000; // Starting credits
    const percentageChange = ((totalValue - initialValue) / initialValue) * 100;
    return percentageChange;
  };

  const percentageChange = calculatePercentageChange();

  return (
    <div className="header">
      <div className="header-content">
        <h1 className="game-title">Galactic Commodity Exchange</h1>
        
        <div className="financial-metrics">
          <div className="metric">
            <span className="metric-icon">💰</span>
            <span className="metric-label">Credits:</span>
            <span className="metric-value">₹{gameState.credits.toLocaleString()}</span>
          </div>
          
          <div className="metric">
            <span className="metric-icon">📈</span>
            <span className="metric-label">Profit:</span>
            <span className="metric-value">₹{gameState.profit.toLocaleString()}</span>
          </div>
          
          <div className="metric">
            <span className="metric-icon">📊</span>
            <span className="metric-label">P&L:</span>
            <span className={`metric-value ${gameState.pnl >= 0 ? 'positive' : 'negative'}`}>
              {gameState.pnl >= 0 ? '+' : ''}₹{gameState.pnl.toLocaleString()}
            </span>
          </div>
          
          <div className="metric">
            <span className="metric-label">Portfolio Value:</span>
            <span className="metric-value">₹{(gameState.credits + gameState.totalMargin).toLocaleString()}</span>
          </div>
          
          <div className="metric">
            <span className="metric-icon">📈</span>
            <span className="metric-label">Change:</span>
            <span className={`metric-value ${percentageChange >= 0 ? 'positive' : 'negative'}`}>
              {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="user-controls">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="username">{currentUser?.username}</span>
            <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? '🟢 Multiplayer' : '🔴 Offline'}
            </span>
          </div>
          {isSaving && (
            <div className="save-indicator">
              <span className="save-icon">💾</span>
              <span className="save-text">Saving...</span>
            </div>
          )}
          <button 
            className="save-button"
            onClick={onManualSave}
            disabled={isSaving}
          >
            💾 Save
          </button>
          <button 
            className="logout-button"
            onClick={onLogout}
          >
            🚪 Logout
          </button>
          <button 
            className={`pause-button ${gameState.isSimulationPaused ? 'paused' : ''}`}
            onClick={onToggleSimulation}
          >
            {gameState.isSimulationPaused ? 'RESUME SIMULATION' : 'PAUSE SIMULATION'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
