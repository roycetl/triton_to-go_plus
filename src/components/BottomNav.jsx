import React from 'react';
import { Home, Map, ShoppingCart, Menu, QrCode } from 'lucide-react';
import './BottomNav.css';

const BottomNav = ({ activeTab = 'home', onTabChange, onQRPress }) => {
  return (
    <div className="bottom-nav-container">
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange('home')}
        >
          {activeTab === 'home' && <div className="nav-indicator"></div>}
          <Home size={28} />
        </button>
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange('map')}
        >
          {activeTab === 'map' && <div className="nav-indicator"></div>}
          <Map size={28} />
        </button>
        
        <div className="nav-item-center-wrapper">
          <button className="nav-item-center" onClick={onQRPress}>
            <QrCode size={36} strokeWidth={1.5} />
          </button>
        </div>
        
        <button 
          className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange('cart')}
        >
          {activeTab === 'cart' && <div className="nav-indicator"></div>}
          <ShoppingCart size={28} />
        </button>
        <button 
          className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange('menu')}
        >
          {activeTab === 'menu' && <div className="nav-indicator"></div>}
          <Menu size={28} />
        </button>
      </nav>
    </div>
  );
};

export default BottomNav;
