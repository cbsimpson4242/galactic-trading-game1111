import React from 'react';
import './Factory.css';

const Factory = ({ factory, onUpgrade }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (factory.productionTime === 0) return 0;
    return ((factory.productionTime - factory.timeRemaining) / factory.productionTime) * 100;
  };

  const isProducing = factory.timeRemaining > 0;

  return (
    <div className="factory-card">
      <div className="factory-header">
        <span className="factory-icon">🏭</span>
        <h3 className="factory-name">{factory.name}</h3>
        <span className="factory-level">Level {factory.level}</span>
      </div>
      
      <div className="factory-details">
        <div className="production-info">
          <span className="production-label">Produces:</span>
          <span className="production-value">
            {factory.productionQuantity} {factory.commodityName} {factory.productionUnit}
          </span>
        </div>
        
        <div className="production-time">
          <span className="time-label">Production Time:</span>
          <span className="time-value">{formatTime(factory.productionTime)}</span>
        </div>
        
        <div className="upgrade-cost">
          <span className="cost-label">Upgrade Cost:</span>
          <span className="cost-value">₹{factory.upgradeCost.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="production-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <span className="progress-text">
          {isProducing 
            ? `Time remaining: ${formatTime(factory.timeRemaining)}`
            : 'Production complete!'
          }
        </span>
      </div>
      
      <div className="factory-actions">
        <button 
          className="upgrade-button"
          onClick={() => onUpgrade(factory.id)}
        >
          Upgrade Factory
        </button>
      </div>
    </div>
  );
};

export default Factory;
