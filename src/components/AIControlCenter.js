import React, { useState } from 'react';
import './AIControlCenter.css';
import { STRATEGY_TYPES, EMOTIONAL_STATES, RISK_LEVELS } from '../aiTraders';

const AIControlCenter = ({ aiTraders, onUpdateTraders, onClose }) => {
  const [globalSettings, setGlobalSettings] = useState({
    // Trading Behavior
    tradingThresholds: {
      buyThreshold: 0.6,
      sellThreshold: 0.4
    },
    
    // Emotional Sensitivity
    emotionalSensitivity: {
      fomoTrigger: 0.8,
      panicTrigger: 0.7,
      supplyStressTrigger: 0.6,
      greedTrigger: 0.6,
      fearTrigger: 0.7,
      excitementTrigger: 0.4
    },
    
    // Emotional Intensity
    emotionalIntensity: {
      fomoMultiplier: 1.0,
      panicMultiplier: 1.0,
      greedMultiplier: 0.8,
      fearMultiplier: 0.9,
      excitementMultiplier: 0.6,
      emotionalRecovery: 0.1
    },
    
    // Signal Amplification
    signalAmplification: {
      momentumMultiplier: 2,
      scalpingMultiplier: 5,
      volatilityWeight: 1.0,
      priceReactionWeight: 0.0
    },
    
    // Trading Activity
    tradingActivity: {
      maxPositions: 5,
      positionSizeMultiplier: 1.0,
      riskToleranceMultiplier: 1.0,
      tradingFrequency: 1.0
    },
    
    // Market Behavior
    marketBehavior: {
      herdInstinctMultiplier: 1.0,
      contrarianMultiplier: 1.0,
      momentumSensitivity: 1.0,
      volatilityTolerance: 1.0
    }
  });

  const [activeTab, setActiveTab] = useState('trading');
  const [selectedTraders, setSelectedTraders] = useState([]);

  const handleGlobalSettingChange = (category, setting, value) => {
    setGlobalSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: parseFloat(value)
      }
    }));
  };

  const applyGlobalSettings = () => {
    const updatedTraders = aiTraders.map(trader => ({
      ...trader,
      // Update trading thresholds (these will be used in the trading logic)
      tradingThresholds: globalSettings.tradingThresholds,
      
      // Update emotional sensitivity
      emotionalSensitivity: globalSettings.emotionalSensitivity,
      
      // Update emotional intensity
      emotionalIntensity: globalSettings.emotionalIntensity,
      
      // Update signal amplification
      signalAmplification: globalSettings.signalAmplification,
      
      // Update trading activity settings
      maxPositions: Math.round(globalSettings.tradingActivity.maxPositions * (1 + (Math.random() - 0.5) * 0.2)),
      riskTolerance: Math.min(1, trader.riskTolerance * globalSettings.tradingActivity.riskToleranceMultiplier),
      
      // Update market behavior
      herdInstinct: Math.min(1, trader.herdInstinct * globalSettings.marketBehavior.herdInstinctMultiplier),
      contrarianTendency: Math.min(1, trader.contrarianTendency * globalSettings.marketBehavior.contrarianMultiplier),
      momentumSensitivity: Math.min(1, trader.momentumSensitivity * globalSettings.marketBehavior.momentumSensitivity),
      volatilityTolerance: Math.min(1, trader.volatilityTolerance * globalSettings.marketBehavior.volatilityTolerance),
      
      // Store global settings reference
      globalSettings: globalSettings
    }));

    onUpdateTraders(updatedTraders);
  };

  const resetToDefaults = () => {
    setGlobalSettings({
      tradingThresholds: {
        buyThreshold: 0.6,
        sellThreshold: 0.4
      },
      emotionalSensitivity: {
        fomoTrigger: 0.8,
        panicTrigger: 0.7,
        supplyStressTrigger: 0.6,
        greedTrigger: 0.6,
        fearTrigger: 0.7,
        excitementTrigger: 0.4
      },
      emotionalIntensity: {
        fomoMultiplier: 1.0,
        panicMultiplier: 1.0,
        greedMultiplier: 0.8,
        fearMultiplier: 0.9,
        excitementMultiplier: 0.6,
        emotionalRecovery: 0.1
      },
      signalAmplification: {
        momentumMultiplier: 2,
        scalpingMultiplier: 5,
        volatilityWeight: 1.0,
        priceReactionWeight: 0.0
      },
      tradingActivity: {
        maxPositions: 5,
        positionSizeMultiplier: 1.0,
        riskToleranceMultiplier: 1.0,
        tradingFrequency: 1.0
      },
      marketBehavior: {
        herdInstinctMultiplier: 1.0,
        contrarianMultiplier: 1.0,
        momentumSensitivity: 1.0,
        volatilityTolerance: 1.0
      }
    });
  };

  const createAggressiveProfile = () => {
    setGlobalSettings({
      tradingThresholds: {
        buyThreshold: 0.55,
        sellThreshold: 0.45
      },
      emotionalSensitivity: {
        fomoTrigger: 0.6,
        panicTrigger: 0.5,
        supplyStressTrigger: 0.4,
        greedTrigger: 0.4,
        fearTrigger: 0.5,
        excitementTrigger: 0.3
      },
      emotionalIntensity: {
        fomoMultiplier: 1.3,
        panicMultiplier: 1.4,
        greedMultiplier: 1.2,
        fearMultiplier: 1.1,
        excitementMultiplier: 1.0,
        emotionalRecovery: 0.05
      },
      signalAmplification: {
        momentumMultiplier: 3,
        scalpingMultiplier: 8,
        volatilityWeight: 1.5,
        priceReactionWeight: 0.4
      },
      tradingActivity: {
        maxPositions: 7,
        positionSizeMultiplier: 1.3,
        riskToleranceMultiplier: 1.2,
        tradingFrequency: 1.5
      },
      marketBehavior: {
        herdInstinctMultiplier: 1.3,
        contrarianMultiplier: 0.8,
        momentumSensitivity: 1.4,
        volatilityTolerance: 1.2
      }
    });
  };

  const createConservativeProfile = () => {
    setGlobalSettings({
      tradingThresholds: {
        buyThreshold: 0.7,
        sellThreshold: 0.3
      },
      emotionalSensitivity: {
        fomoTrigger: 0.9,
        panicTrigger: 0.8,
        supplyStressTrigger: 0.8,
        greedTrigger: 0.8,
        fearTrigger: 0.6,
        excitementTrigger: 0.6
      },
      emotionalIntensity: {
        fomoMultiplier: 0.7,
        panicMultiplier: 0.8,
        greedMultiplier: 0.6,
        fearMultiplier: 0.8,
        excitementMultiplier: 0.5,
        emotionalRecovery: 0.15
      },
      signalAmplification: {
        momentumMultiplier: 1.5,
        scalpingMultiplier: 3,
        volatilityWeight: 0.7,
        priceReactionWeight: 0.1
      },
      tradingActivity: {
        maxPositions: 3,
        positionSizeMultiplier: 0.7,
        riskToleranceMultiplier: 0.8,
        tradingFrequency: 0.7
      },
      marketBehavior: {
        herdInstinctMultiplier: 0.8,
        contrarianMultiplier: 1.2,
        momentumSensitivity: 0.8,
        volatilityTolerance: 0.7
      }
    });
  };

  const renderSlider = (label, value, min, max, step, onChange, description) => (
    <div className="control-item">
      <div className="control-header">
        <label className="control-label">{label}</label>
        <span className="control-value">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="control-slider"
      />
      {description && <div className="control-description">{description}</div>}
    </div>
  );

  const renderTab = (tabName, title) => (
    <button
      className={`tab-button ${activeTab === tabName ? 'active' : ''}`}
      onClick={() => setActiveTab(tabName)}
    >
      {title}
    </button>
  );

  return (
    <div className="ai-control-center-overlay">
      <div className="ai-control-center">
        <div className="control-header-bar">
          <h2>🤖 AI Control Center</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="control-tabs">
          {renderTab('trading', 'Trading')}
          {renderTab('emotional', 'Emotions')}
          {renderTab('signals', 'Signals')}
          {renderTab('activity', 'Activity')}
          {renderTab('behavior', 'Behavior')}
          {renderTab('presets', 'Presets')}
        </div>

        <div className="control-content">
          {activeTab === 'trading' && (
            <div className="control-section">
              <h3>Trading Thresholds</h3>
              {renderSlider(
                'Buy Threshold',
                globalSettings.tradingThresholds.buyThreshold,
                0.5, 0.8, 0.01,
                (value) => handleGlobalSettingChange('tradingThresholds', 'buyThreshold', value),
                'Higher = more selective buying'
              )}
              {renderSlider(
                'Sell Threshold',
                globalSettings.tradingThresholds.sellThreshold,
                0.2, 0.5, 0.01,
                (value) => handleGlobalSettingChange('tradingThresholds', 'sellThreshold', value),
                'Lower = more selective selling'
              )}
            </div>
          )}

          {activeTab === 'emotional' && (
            <div className="control-section">
              <h3>Emotional Sensitivity</h3>
              {renderSlider(
                'FOMO Trigger',
                globalSettings.emotionalSensitivity.fomoTrigger,
                0.3, 1.0, 0.05,
                (value) => handleGlobalSettingChange('emotionalSensitivity', 'fomoTrigger', value),
                'Lower = easier to trigger FOMO'
              )}
              {renderSlider(
                'Panic Trigger',
                globalSettings.emotionalSensitivity.panicTrigger,
                0.3, 1.0, 0.05,
                (value) => handleGlobalSettingChange('emotionalSensitivity', 'panicTrigger', value),
                'Lower = easier to trigger panic'
              )}
              {renderSlider(
                'Greed Trigger',
                globalSettings.emotionalSensitivity.greedTrigger,
                0.2, 0.8, 0.05,
                (value) => handleGlobalSettingChange('emotionalSensitivity', 'greedTrigger', value),
                'Lower = easier to trigger greed'
              )}
              {renderSlider(
                'Fear Trigger',
                globalSettings.emotionalSensitivity.fearTrigger,
                0.3, 1.0, 0.05,
                (value) => handleGlobalSettingChange('emotionalSensitivity', 'fearTrigger', value),
                'Lower = easier to trigger fear'
              )}
              
              <h3>Emotional Intensity</h3>
              {renderSlider(
                'FOMO Intensity',
                globalSettings.emotionalIntensity.fomoMultiplier,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('emotionalIntensity', 'fomoMultiplier', value),
                'Higher = stronger FOMO reactions'
              )}
              {renderSlider(
                'Panic Intensity',
                globalSettings.emotionalIntensity.panicMultiplier,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('emotionalIntensity', 'panicMultiplier', value),
                'Higher = stronger panic reactions'
              )}
              {renderSlider(
                'Emotional Recovery',
                globalSettings.emotionalIntensity.emotionalRecovery,
                0.01, 0.2, 0.01,
                (value) => handleGlobalSettingChange('emotionalIntensity', 'emotionalRecovery', value),
                'Higher = faster emotional recovery'
              )}
            </div>
          )}

          {activeTab === 'signals' && (
            <div className="control-section">
              <h3>Signal Amplification</h3>
              {renderSlider(
                'Momentum Sensitivity',
                globalSettings.signalAmplification.momentumMultiplier,
                1, 5, 0.1,
                (value) => handleGlobalSettingChange('signalAmplification', 'momentumMultiplier', value),
                'Higher = more reactive to trends'
              )}
              {renderSlider(
                'Scalping Sensitivity',
                globalSettings.signalAmplification.scalpingMultiplier,
                2, 10, 0.5,
                (value) => handleGlobalSettingChange('signalAmplification', 'scalpingMultiplier', value),
                'Higher = more reactive to short-term moves'
              )}
              {renderSlider(
                'Price Reaction Weight',
                globalSettings.signalAmplification.priceReactionWeight,
                0.0, 0.5, 0.05,
                (value) => handleGlobalSettingChange('signalAmplification', 'priceReactionWeight', value),
                'Higher = more immediate price reaction'
              )}
              {renderSlider(
                'Volatility Weight',
                globalSettings.signalAmplification.volatilityWeight,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('signalAmplification', 'volatilityWeight', value),
                'Higher = stronger volatility reactions'
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="control-section">
              <h3>Trading Activity</h3>
              {renderSlider(
                'Max Positions',
                globalSettings.tradingActivity.maxPositions,
                2, 10, 1,
                (value) => handleGlobalSettingChange('tradingActivity', 'maxPositions', value),
                'Higher = more concurrent trades'
              )}
              {renderSlider(
                'Position Size Multiplier',
                globalSettings.tradingActivity.positionSizeMultiplier,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('tradingActivity', 'positionSizeMultiplier', value),
                'Higher = larger trade sizes'
              )}
              {renderSlider(
                'Risk Tolerance Multiplier',
                globalSettings.tradingActivity.riskToleranceMultiplier,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('tradingActivity', 'riskToleranceMultiplier', value),
                'Higher = more risk taking'
              )}
              {renderSlider(
                'Trading Frequency',
                globalSettings.tradingActivity.tradingFrequency,
                0.3, 2.0, 0.1,
                (value) => handleGlobalSettingChange('tradingActivity', 'tradingFrequency', value),
                'Higher = more frequent trading'
              )}
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="control-section">
              <h3>Market Behavior</h3>
              {renderSlider(
                'Herd Instinct',
                globalSettings.marketBehavior.herdInstinctMultiplier,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('marketBehavior', 'herdInstinctMultiplier', value),
                'Higher = more following behavior'
              )}
              {renderSlider(
                'Contrarian Tendency',
                globalSettings.marketBehavior.contrarianMultiplier,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('marketBehavior', 'contrarianMultiplier', value),
                'Higher = more opposing behavior'
              )}
              {renderSlider(
                'Momentum Sensitivity',
                globalSettings.marketBehavior.momentumSensitivity,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('marketBehavior', 'momentumSensitivity', value),
                'Higher = more momentum following'
              )}
              {renderSlider(
                'Volatility Tolerance',
                globalSettings.marketBehavior.volatilityTolerance,
                0.5, 2.0, 0.1,
                (value) => handleGlobalSettingChange('marketBehavior', 'volatilityTolerance', value),
                'Higher = less affected by volatility'
              )}
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="control-section">
              <h3>Quick Presets</h3>
              <div className="preset-buttons">
                <button className="preset-button aggressive" onClick={createAggressiveProfile}>
                  🔥 Aggressive Trading
                  <div className="preset-description">
                    High reactivity, frequent trading, strong emotions
                  </div>
                </button>
                <button className="preset-button conservative" onClick={createConservativeProfile}>
                  🛡️ Conservative Trading
                  <div className="preset-description">
                    Low reactivity, careful trading, mild emotions
                  </div>
                </button>
                <button className="preset-button default" onClick={resetToDefaults}>
                  ⚖️ Default Settings
                  <div className="preset-description">
                    Balanced approach, moderate reactivity
                  </div>
                </button>
              </div>
              
              <div className="trader-stats">
                <h4>Current AI Trader Stats</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Total Traders:</span>
                    <span className="stat-value">{aiTraders.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Active Traders:</span>
                    <span className="stat-value">{aiTraders.filter(t => t.isActive).length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Avg Capital:</span>
                    <span className="stat-value">₹{Math.round(aiTraders.reduce((sum, t) => sum + t.capital, 0) / aiTraders.length).toLocaleString()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Factories:</span>
                    <span className="stat-value">{aiTraders.reduce((sum, t) => sum + t.factories.length, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="control-actions">
          <button className="apply-button" onClick={applyGlobalSettings}>
            Apply Settings
          </button>
          <button className="reset-button" onClick={resetToDefaults}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIControlCenter;
