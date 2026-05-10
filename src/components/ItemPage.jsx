import React, { useState } from 'react';
import { X, Share, Circle } from 'lucide-react';
import './ItemPage.css';

const ItemPage = ({ item, onClose }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="item-page">
      <header className="item-header">
        <button className="icon-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <h1 className="item-header-title">Goody's MarketPlace</h1>
        <button className="icon-btn">
          <Share size={18} />
        </button>
      </header>

      <div className="item-content">
        <h2 className="item-title">{item.title}</h2>
        
        <div className="item-hero-image-container">
          {item.image ? (
            <img src={item.image} alt={item.title} className="item-hero-image" />
          ) : (
            <div className="item-hero-placeholder" style={{ backgroundColor: '#E5E5EA' }}></div>
          )}
        </div>

        <div className="item-price">{item.price}</div>
        
        <p className="item-description">
          Hand breaded fried chicken tossed in Goody's dry rub topped with pickle chips served on a brioche bun.
        </p>

        <div className="item-dietary">
          <div className="dietary-icon">M</div>
          <div className="dietary-icon">E</div>
          <div className="dietary-icon">W</div>
          <div className="dietary-icon">G</div>
          <div className="dietary-icon">S</div>
        </div>

        <a href="#" className="nutrition-link">Nutrition Facts</a>

        <div className="item-extras-section">
          <h3 className="extras-title">Extras (Select multiple)</h3>
          
          <div className="extra-option">
            <span className="extra-name">Add Lettuce and Tomato (+$1.00)</span>
            <button className="extra-checkbox"><Circle size={20} color="#666" /></button>
          </div>
          <div className="extra-option">
            <span className="extra-name">Add Pepper Jack Cheese (+$1.00)</span>
            <button className="extra-checkbox"><Circle size={20} color="#666" /></button>
          </div>
          <div className="extra-option">
            <span className="extra-name">Add American Cheese (+$1.00)</span>
            <button className="extra-checkbox"><Circle size={20} color="#666" /></button>
          </div>
        </div>
      </div>

      <div className="item-action-bar">
        <button 
          className={`add-to-order-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? 'Added to Order!' : 'Add To Order'}
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
