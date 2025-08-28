import React from 'react';
import './TradingGrid.css';
import CommodityCard from './CommodityCard';

const TradingGrid = ({ commodities, onQuantityChange, onBuy, onSell, factories = [] }) => {
  return (
    <div className="trading-grid">
      {commodities.map((commodity) => (
        <CommodityCard
          key={commodity.id}
          commodity={commodity}
          onQuantityChange={onQuantityChange}
          onBuy={onBuy}
          onSell={onSell}
          factories={factories}
        />
      ))}
    </div>
  );
};

export default TradingGrid;
