import React, { useEffect } from 'react';
import './TradeNotification.css';

const TradeNotification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Auto-dismiss after 2 seconds

    return () => clearTimeout(timer);
  }, [notification.id]); // Use notification.id as dependency instead of onClose

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'buy':
        return '📈';
      case 'sell':
        return '📉';
      case 'error':
        return '⚠️';
      default:
        return '💰';
    }
  };

  const getNotificationClass = () => {
    switch (notification.type) {
      case 'buy':
        return 'notification-buy';
      case 'sell':
        return 'notification-sell';
      case 'error':
        return 'notification-error';
      default:
        return 'notification-info';
    }
  };

  return (
    <div className={`trade-notification ${getNotificationClass()}`}>
      <div className="notification-content">
        <span className="notification-icon">{getNotificationIcon()}</span>
        <div className="notification-text">
          <div className="notification-title">{notification.title}</div>
          <div className="notification-message">{notification.message}</div>
        </div>
        <button className="notification-close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="notification-progress"></div>
    </div>
  );
};

export default TradeNotification;
