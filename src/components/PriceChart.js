import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import './PriceChart.css';

const PriceChart = ({ priceHistory, currentPrice }) => {
  // Determine if price is trending up or down
  const isTrendingUp = priceHistory.length >= 2 && 
    priceHistory[priceHistory.length - 1].price > priceHistory[priceHistory.length - 2].price;

  // Add smooth animation key for chart updates
  const chartKey = priceHistory.length > 0 ? priceHistory[priceHistory.length - 1].time : 'initial';

  return (
    <div className="price-chart">
      <div className="chart-header">
        <span className="chart-label">Price Trend ({priceHistory.length} points)</span>
        <span className={`trend-indicator ${isTrendingUp ? 'up' : 'down'}`}>
          {isTrendingUp ? '↗' : '↘'}
        </span>
      </div>
      
      <ResponsiveContainer width="100%" height={80}>
        <LineChart 
          key={chartKey}
          data={priceHistory} 
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isTrendingUp ? "#00ff88" : "#ff4444"} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={isTrendingUp ? "#00ff88" : "#ff4444"} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          
          <Line
            type="monotone"
            dataKey="price"
            stroke={isTrendingUp ? "#00ff88" : "#ff4444"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: isTrendingUp ? "#00ff88" : "#ff4444" }}
            fill="url(#priceGradient)"
            animationDuration={300}
            animationBegin={0}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e2e',
              border: '1px solid #3a3a4e',
              borderRadius: '8px',
              color: '#ffffff'
            }}
            labelStyle={{ color: '#b0b0b0' }}
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Price']}
            labelFormatter={(label) => `Time: ${label}`}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="chart-footer">
        <span 
          className="current-price" 
          key={`price-${currentPrice}`}
        >
          ₹{currentPrice}
        </span>
        {priceHistory.length >= 2 && (
          <span 
            className="price-change"
            key={`change-${priceHistory[priceHistory.length - 1].price}`}
          >
            {isTrendingUp ? '+' : '-'}₹{Math.abs(priceHistory[priceHistory.length - 1].price - priceHistory[priceHistory.length - 2].price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
