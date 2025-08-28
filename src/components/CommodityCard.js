import React from 'react';
import './CommodityCard.css';
import PriceChart from './PriceChart';

const CommodityCard = ({ commodity, onQuantityChange, onBuy, onSell, factories = [] }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    onQuantityChange(commodity.id, Math.max(1, newQuantity));
  };

  const handleBuy = () => {
    onBuy(commodity.id);
  };

  const handleSell = () => {
    onSell(commodity.id);
  };

  const handleSellAll = () => {
    onSell(commodity.id, commodity.holdings);
  };

  // Check if there are player factories producing this commodity
  const producingFactories = factories.filter(f => f.commodityId === commodity.id && f.owner === 'player');
  const totalProduction = producingFactories.reduce((sum, f) => sum + f.productionQuantity, 0);
  
  // Calculate ready to collect - factories that have completed production
  const readyToCollect = producingFactories
    .filter(f => f.timeRemaining === 0)
    .reduce((sum, f) => sum + f.productionQuantity, 0);

  return (
    <div className="commodity-card">
      <div className="card-header">
        <span className="commodity-icon">{commodity.icon}</span>
        <h3 className="commodity-name">{commodity.name}</h3>
      </div>
      
      <div className="holdings-section">
        <div className="holdings-indicator">
          <span className="holdings-label">Holdings</span>
          <span className="holdings-value">{commodity.holdings.toLocaleString()} {commodity.unit}</span>
        </div>
        <div className="pnl-indicator">
          {(() => {
            if (commodity.holdings > 0 && commodity.costBasis > 0) {
              // Show actual P&L for holdings
              const currentValue = commodity.holdings * commodity.lastPrice;
              const costValue = commodity.holdings * commodity.costBasis;
              const pnl = currentValue - costValue;
              const pnlPercent = (pnl / costValue) * 100;
              const isProfit = pnl >= 0;
              
              return (
                <>
                  <span className={`pnl-value ${isProfit ? 'profit' : 'loss'}`}>
                    {isProfit ? '+' : ''}₹{pnl.toLocaleString()} ({isProfit ? '+' : ''}{pnlPercent.toFixed(1)}%)
                  </span>
                  <span className="cost-basis">Avg: ₹{commodity.costBasis.toFixed(2)}</span>
                </>
              );
            } else {
              // Show potential P&L based on current price vs buy price
              const potentialPnL = commodity.sellPrice - commodity.buyPrice;
              const potentialPnLPercent = (potentialPnL / commodity.buyPrice) * 100;
              const isPotentialProfit = potentialPnL >= 0;
              
              return (
                <>
                  <span className={`pnl-value ${isPotentialProfit ? 'profit' : 'loss'}`}>
                    Potential: {isPotentialProfit ? '+' : ''}₹{potentialPnL.toLocaleString()} ({isPotentialProfit ? '+' : ''}{potentialPnLPercent.toFixed(1)}%)
                  </span>
                  <span className="cost-basis">Spread: ₹{commodity.buyPrice} → ₹{commodity.sellPrice}</span>
                </>
              );
            }
          })()}
        </div>
        {producingFactories.length > 0 && (
          <div className="factory-production-indicator">
            <span className="production-label">🏭 Production: {totalProduction} {commodity.unit}/cycle</span>
            {readyToCollect > 0 && (
              <span className="ready-to-collect">✨ {readyToCollect} ready to collect!</span>
            )}
            
            {/* Factory Progress Bars */}
            <div className="factory-progress-bars">
              {producingFactories.map(factory => {
                const progressPercentage = factory.productionTime > 0 
                  ? ((factory.productionTime - factory.timeRemaining) / factory.productionTime) * 100 
                  : 0;
                const isProducing = factory.timeRemaining > 0;
                
                return (
                  <div key={factory.id} className="factory-progress-item">
                    <div className="factory-progress-header">
                      <span className="factory-name">{factory.name} (Lv.{factory.level})</span>
                      <span className="factory-time">
                        {isProducing 
                          ? `${Math.floor(factory.timeRemaining / 60)}:${(factory.timeRemaining % 60).toString().padStart(2, '0')}`
                          : 'Complete!'
                        }
                      </span>
                    </div>
                    <div className="factory-progress-bar">
                      <div 
                        className={`factory-progress-fill ${isProducing ? 'producing' : 'complete'}`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="quantity-section">
        <label className="quantity-label">Quantity:</label>
        <div className="quantity-controls">
          <input
            type="number"
            min="1"
            value={commodity.quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
        </div>
      </div>
      
      <div className="price-section">
        <div className="last-price">
          <span className="price-label">Last Price</span>
          <span className="price-value">₹{commodity.lastPrice}</span>
        </div>
      </div>
      
      <PriceChart 
        priceHistory={commodity.priceHistory}
        currentPrice={commodity.lastPrice}
      />
      
      <div className="supply-section">
        <div className={`supply ${commodity.supply < commodity.quantity ? 'low-supply' : ''}`}>
          <span className="supply-label">Supply</span>
          <span className="supply-value">{commodity.supply.toLocaleString()} {commodity.unit}</span>
          {commodity.supply < commodity.quantity && (
            <span className="supply-warning">⚠️ Insufficient for {commodity.quantity}</span>
          )}
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="buy-button" onClick={handleBuy}>
          BUY
        </button>
        <button 
          className={`sell-button ${commodity.holdings < commodity.quantity ? 'disabled' : ''}`} 
          onClick={handleSell}
          disabled={commodity.holdings < commodity.quantity}
        >
          SELL
        </button>
        <button 
          className={`sell-all-button ${commodity.holdings === 0 ? 'disabled' : ''}`} 
          onClick={handleSellAll}
          disabled={commodity.holdings === 0}
        >
          SELL ALL
        </button>
      </div>
      
      <div className="calculation">
        <span className="calculation-label">BUY COST</span>
        <span className="calculation-value">₹{(commodity.buyPrice * commodity.quantity).toLocaleString()}</span>
      </div>
      
      <div className="calculation">
        <span className="calculation-label">SELL REVENUE</span>
        <span className="calculation-value">₹{(commodity.sellPrice * commodity.quantity).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CommodityCard;
