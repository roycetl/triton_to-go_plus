import React from 'react';
import { Search, Bell } from 'lucide-react';
import './TopBar.css';

const TopBar = ({ variant = 'default', onBellPress, onSearchPress }) => {
  return (
    <header className={`topbar ${variant === 'map' ? 'topbar-map' : ''}`}>
      <div className="topbar-row">
        <div className="search-container" onClick={onSearchPress} style={{ cursor: 'text' }}>
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search dining, cafés, items…"
            readOnly
            style={{ cursor: 'text', pointerEvents: 'none' }}
          />
        </div>
        <button className="icon-btn bell-btn" onClick={onBellPress}>
          <Bell size={24} />
          <div className="notification-dot"></div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
