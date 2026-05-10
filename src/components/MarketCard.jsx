import React from 'react';
import { Plus } from 'lucide-react';
import './MarketCard.css';

const MarketCard = ({ item, onClick, onAdd }) => {
  return (
    <div className="market-card" onClick={onClick}>
      <div className="market-card-image-container">
        {item.rank && (
          <div className={`market-card-rank ${item.rankColor || 'default'}`}>
            {item.rank}
          </div>
        )}
        {/* Placeholder image background since we aren't generating images for this phase */}
        <div className="market-card-image-placeholder" style={{ backgroundColor: '#E5E5EA' }}>
          {item.image && <img src={item.image} alt={item.title} className="market-card-image" />}
        </div>
        
        <button 
          className="market-card-add" 
          onClick={(e) => {
            e.stopPropagation();
            if (onAdd) onAdd(item);
          }}
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
      
      <div className="market-card-content">
        <h3 className="market-card-title">{item.title}</h3>
        <div className="market-card-meta">
          <span className="market-card-price">{item.price}</span>
          <span className="market-card-cals">{item.cals}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
