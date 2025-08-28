import React, { useState, useRef, useEffect } from 'react';
import { useMultiplayer } from '../contexts/MultiplayerContext';
import './MultiplayerChat.css';

const MultiplayerChat = () => {
  const { chatMessages, sendMessage, isConnected } = useMultiplayer();
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageClass = (messageType) => {
    switch (messageType) {
      case 'system':
        return 'system-message';
      case 'trade':
        return 'trade-message';
      default:
        return 'chat-message';
    }
  };

  return (
    <div className={`multiplayer-chat ${isOpen ? 'open' : ''}`}>
      <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="chat-title">
          💬 Multiplayer Chat {isConnected ? '🟢' : '🔴'}
        </span>
        <span className="chat-toggle">{isOpen ? '−' : '+'}</span>
      </div>
      
      {isOpen && (
        <div className="chat-content">
          <div className="messages-container">
            {chatMessages.length === 0 ? (
              <div className="no-messages">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className={`message ${getMessageClass(msg.type)}`}>
                  {msg.type === 'system' ? (
                    <div className="system-message-content">
                      <span className="message-time">{formatTime(msg.timestamp)}</span>
                      <span className="message-text">{msg.message}</span>
                    </div>
                  ) : (
                    <>
                      <div className="message-header">
                        <span className="message-username">{msg.username}</span>
                        <span className="message-time">{formatTime(msg.timestamp)}</span>
                      </div>
                      <div className="message-text">{msg.message}</div>
                    </>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="message-input-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isConnected ? "Type your message..." : "Connecting..."}
              disabled={!isConnected}
              className="message-input"
              maxLength={200}
            />
            <button 
              type="submit" 
              disabled={!isConnected || !message.trim()}
              className="send-button"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MultiplayerChat;
