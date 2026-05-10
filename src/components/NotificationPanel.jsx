import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './NotificationPanel.css';

const notifications = [
  {
    id: 1,
    location: "Earl's Coffeehouse",
    sublocation: "Canyon Vista",
    orderLastFour: "4829",
    status: "Ready Now",
    itemName: "Lavender Vanilla Matcha Latte 16oz",
  },
  {
    id: 2,
    location: "Goody's MarketPlace",
    sublocation: "Revelle College",
    orderLastFour: "3174",
    status: "Ready Now",
    itemName: "Cappuccino 12oz",
  },
];

const NotificationPanel = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`notif-overlay ${visible ? 'visible' : ''}`} onClick={handleClose}>
      <div
        className={`notif-sheet ${visible ? 'slide-up' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="notif-header">
          <span className="notif-title">Notifications</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="notif-count-badge">{notifications.length}</span>
            <button className="notif-close-btn" onClick={handleClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Notification cards */}
        <div className="notif-list">
          {notifications.map((n) => (
            <div className="notif-card" key={n.id}>
              <div className="notif-card-left">
                <div className="notif-location">{n.location}</div>
                <div className="notif-sublocation">{n.sublocation}</div>
                <div className="notif-item-name">{n.itemName}</div>
              </div>
              <div className="notif-card-right">
                <span className="notif-order-num">Order #{n.orderLastFour}</span>
                <span className="notif-status-value">{n.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
