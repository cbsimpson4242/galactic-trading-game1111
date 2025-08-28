import React, { useState } from 'react';
import { useMultiplayer } from '../contexts/MultiplayerContext';
import './MultiplayerLeaderboard.css';

const MultiplayerLeaderboard = () => {
  const { leaderboard, onlinePlayers, isConnected } = useMultiplayer();
  const [isOpen, setIsOpen] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `₹${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)}K`;
    }
    return `₹${num.toLocaleString()}`;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getTotalValue = (player) => {
    return player.credits + player.totalMargin;
  };

  return (
    <div className={`multiplayer-leaderboard ${isOpen ? 'open' : ''}`}>
      <div className="leaderboard-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="leaderboard-title">
          🏆 Leaderboard {isConnected ? '🟢' : '🔴'}
        </span>
        <span className="online-count">
          {onlinePlayers.length} online
        </span>
        <span className="leaderboard-toggle">{isOpen ? '−' : '+'}</span>
      </div>
      
      {isOpen && (
        <div className="leaderboard-content">
          <div className="leaderboard-tabs">
            <div className="tab active">Top Players</div>
          </div>
          
          <div className="leaderboard-list">
            {leaderboard.length === 0 ? (
              <div className="no-leaderboard">
                <p>No players yet. Be the first to join!</p>
              </div>
            ) : (
              leaderboard.map((player, index) => (
                <div key={player.username} className={`leaderboard-item ${player.isOnline ? 'online' : 'offline'}`}>
                  <div className="rank-info">
                    <span className="rank-icon">{getRankIcon(index + 1)}</span>
                    <span className="player-name">
                      {player.username}
                      {player.isOnline && <span className="online-indicator">🟢</span>}
                    </span>
                  </div>
                  
                  <div className="player-stats">
                    <div className="stat-row">
                      <span className="stat-label">Total Value:</span>
                      <span className="stat-value total-value">
                        {formatNumber(getTotalValue(player))}
                      </span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Credits:</span>
                      <span className="stat-value credits">
                        {formatNumber(player.credits)}
                      </span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Portfolio:</span>
                      <span className="stat-value portfolio">
                        {formatNumber(player.totalMargin)}
                      </span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Profit:</span>
                      <span className={`stat-value profit ${player.profit >= 0 ? 'positive' : 'negative'}`}>
                        {player.profit >= 0 ? '+' : ''}{formatNumber(player.profit)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="leaderboard-footer">
            <div className="connection-status">
              {isConnected ? (
                <span className="connected">🟢 Connected to multiplayer</span>
              ) : (
                <span className="disconnected">🔴 Disconnected</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplayerLeaderboard;
