import React from 'react';
import './Card.css';

const Card = ({ item, type, onClick }) => {
  return (
    <div className={`card ${type}-card`} onClick={onClick}>
      <div className="card-image-container">
        <img src={item.image} alt={item.title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-subtitle">{item.subtitle}</p>
        <p className="card-hours">{item.hours}</p>
      </div>
    </div>
  );
};

export default Card;
