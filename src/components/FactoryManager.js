import React, { useState } from 'react';
import './FactoryManager.css';
import Factory from './Factory';

const FactoryManager = ({ 
  factories, 
  commodities, 
  credits, 
  onBuildFactory, 
  onUpgradeFactory, 
  onClose 
}) => {
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState('');

  const factoryTemplates = [
    {
      id: 'basic-factory',
      name: 'Basic Factory',
      cost: 50000,
      productionTime: 20, // 20 seconds
      baseProduction: 10,
      upgradeMultiplier: 1.5,
      costMultiplier: 2.0
    },
    {
      id: 'advanced-factory',
      name: 'Advanced Factory',
      cost: 150000,
      productionTime: 20, // 20 seconds
      baseProduction: 25,
      upgradeMultiplier: 1.8,
      costMultiplier: 2.5
    },
    {
      id: 'premium-factory',
      name: 'Premium Factory',
      cost: 500000,
      productionTime: 20, // 20 seconds
      baseProduction: 50,
      upgradeMultiplier: 2.0,
      costMultiplier: 3.0
    }
  ];

  const handleBuildFactory = (templateId, commodityId) => {
    const template = factoryTemplates.find(t => t.id === templateId);
    const commodity = commodities.find(c => c.id === commodityId);
    
    if (template && commodity && credits >= template.cost) {
      onBuildFactory(template, commodity);
      setShowBuildMenu(false);
      setSelectedCommodity('');
    }
  };

  const canAffordFactory = (cost) => credits >= cost;

  return (
    <div className="factory-manager-overlay">
      <div className="factory-manager-container">
        <div className="factory-manager-header">
          <h2>🏭 Factory Management</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="factory-manager-content">
          <div className="factory-controls">
            <div className="credits-display">
              <span className="credits-label">Available Credits:</span>
              <span className="credits-value">₹{credits.toLocaleString()}</span>
            </div>
            
            <button 
              className="build-factory-button"
              onClick={() => setShowBuildMenu(!showBuildMenu)}
            >
              🏗️ Build New Factory
            </button>
          </div>

          {showBuildMenu && (
            <div className="build-menu">
              <h3>Select Factory Type & Commodity</h3>
              
              <div className="factory-templates">
                {factoryTemplates.map(template => (
                  <div key={template.id} className="factory-template">
                    <div className="template-header">
                      <h4>{template.name}</h4>
                      <span className={`template-cost ${canAffordFactory(template.cost) ? 'affordable' : 'expensive'}`}>
                        ₹{template.cost.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="template-details">
                      <div>Production: {template.baseProduction} units</div>
                      <div>Time: {template.productionTime}s</div>
                      <div>Upgrade Multiplier: {template.upgradeMultiplier}x</div>
                    </div>
                    
                    <div className="commodity-selection">
                      <select 
                        value={selectedCommodity}
                        onChange={(e) => setSelectedCommodity(e.target.value)}
                        className="commodity-select"
                      >
                        <option value="">Select Commodity...</option>
                        {commodities.map(commodity => (
                          <option key={commodity.id} value={commodity.id}>
                            {commodity.icon} {commodity.name}
                          </option>
                        ))}
                      </select>
                      
                      <button 
                        className={`build-button ${!selectedCommodity || !canAffordFactory(template.cost) ? 'disabled' : ''}`}
                        onClick={() => handleBuildFactory(template.id, selectedCommodity)}
                        disabled={!selectedCommodity || !canAffordFactory(template.cost)}
                      >
                        Build {template.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="factories-list">
            <h3>Your Factories ({factories.length})</h3>
            
            {factories.length === 0 ? (
              <div className="no-factories">
                <p>No factories built yet. Build your first factory to start producing commodities!</p>
              </div>
            ) : (
              <div className="factories-grid">
                {factories.map(factory => (
                  <Factory
                    key={factory.id}
                    factory={factory}
                    onUpgrade={onUpgradeFactory}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryManager;
