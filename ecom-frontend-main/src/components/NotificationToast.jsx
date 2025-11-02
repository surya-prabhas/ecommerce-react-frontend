import React, { useState, useEffect } from 'react';

const NotificationToast = ({ message, type = 'success', show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff';

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '20px',
      background: bgColor,
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 10000,
      animation: 'slideInRight 0.3s ease-out',
      minWidth: '300px'
    }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <i className={`bi ${type === 'success' ? 'bi-check-circle' : type === 'error' ? 'bi-x-circle' : 'bi-info-circle'} me-2`}></i>
          <span>{message}</span>
        </div>
        <button 
          onClick={onClose}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: 0,
            marginLeft: '1rem'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;