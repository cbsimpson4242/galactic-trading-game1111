import React from 'react';
import TradeNotification from './TradeNotification';
import './NotificationContainer.css';

const NotificationContainer = ({ notifications, onRemoveNotification }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="notification-wrapper"
          style={{ top: `${100 + (index * 90)}px` }}
        >
          <TradeNotification
            notification={notification}
            onClose={() => onRemoveNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
