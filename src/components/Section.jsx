import React from 'react';
import { ArrowRight } from 'lucide-react';
import Card from './Card';
import './Section.css';

const Section = ({ title, type, items, onCardClick }) => {
  return (
    <section className="content-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <button className="section-action">
          <ArrowRight size={24} />
        </button>
      </div>
      
      <div className="section-scroll">
        <div className="section-scroll-inner">
          {items.map((item) => (
            <Card key={item.id} item={item} type={type} onClick={() => onCardClick && onCardClick(item)} />
          ))}
          <div className="scroll-spacer"></div>
        </div>
      </div>
    </section>
  );
};

export default Section;
