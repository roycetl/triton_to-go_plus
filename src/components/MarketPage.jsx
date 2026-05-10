import React, { useState } from 'react';
import { X, Search, Star, Leaf, Plus } from 'lucide-react';
import MarketCard from './MarketCard';
import { marketInventory, MARKET_NAMES } from '../data/marketInventory';
import './MarketPage.css';

/* ─── Inventory card (for grocery markets) ─── */
const InventoryCard = ({ item, onAdd }) => (
  <div className="inv-card">
    <div className="inv-card-img" style={{ backgroundColor: item.bg }}>
      <span className="inv-card-emoji">{item.emoji}</span>
      <button
        className="inv-card-add"
        onClick={e => { e.stopPropagation(); onAdd && onAdd(item); }}
      >
        <Plus size={14} strokeWidth={3} />
      </button>
    </div>
    <div className="inv-card-body">
      <p className="inv-card-name">{item.name}</p>
      <div className="inv-card-meta">
        <span className="inv-card-price">{item.price}</span>
        <span className="inv-card-stock">{item.stock} left</span>
      </div>
    </div>
  </div>
);

/* ─── Main component ─── */
const MarketPage = ({ market, onClose, onNavigateToItem }) => {
  const title = market?.title ?? "Goody's MarketPlace";

  // Detect whether this is a grocery market or a dining hall
  const isGroceryMarket = MARKET_NAMES.some(n => title.toLowerCase().includes(n.toLowerCase().replace("'s", "").split(' ')[0]));

  // Pick inventory data — fall back to Goody's if no exact match
  const inventoryKey = Object.keys(marketInventory).find(k => title.toLowerCase().includes(k.toLowerCase().split(' ')[0]))
    ?? Object.keys(marketInventory)[0];
  const inventory = marketInventory[inventoryKey];

  const [activeCategory, setActiveCategory] = useState('All');

  // Dining hall data (unchanged from before)
  const exploreMenu = [
    { id: 'm1', title: "Goodys Chicken Sandwich", price: "$9.00", cals: "453 cals", rank: "#1 most liked", rankColor: "green" },
    { id: 'm2', title: "Grilled Chicken Sandwich", price: "$9.75", cals: "433 cals", rank: "#2 most liked", rankColor: "green" },
    { id: 'm3', title: "Which Came First Sandwich", price: "$8.75", cals: "753 cals", rank: "#3 most liked", rankColor: "green" },
  ];
  const sandwiches = [
    { id: 's1', title: "Goodys Chicken Sandwich", price: "$9.00", cals: "453 cals" },
    { id: 's2', title: "Plant Based Chickn Sandwich", price: "$9.00", cals: "435 cals" },
    { id: 's3', title: "Classic Beef Burger", price: "$10.50", cals: "600 cals" },
  ];
  const tenders = [
    { id: 't1', title: "Goodys Chicken Tenders", price: "$9.00", cals: "350 cals" },
    { id: 't2', title: "Grilled Chicken Tenders", price: "$9.00", cals: "313 cals" },
    { id: 't3', title: "Spicy Tenders", price: "$9.50", cals: "380 cals" },
  ];
  const sides = [
    { id: 'sd1', title: "Potato Wedges", price: "$4.00", cals: "250 cals" },
    { id: 'sd2', title: "Onion Rings", price: "$4.50", cals: "300 cals" },
  ];

  // Filter inventory sections by category
  const visibleSections = activeCategory === 'All'
    ? inventory?.sections
    : inventory?.sections?.map(s => ({
        ...s,
        items: s.items.filter(() => s.title.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory === 'All'),
      })).filter(s => s.items.length > 0 || s.title === 'Most Popular');

  return (
    <div className="market-page">
      <header className="market-header">
        <button className="icon-btn" onClick={onClose}><X size={24} /></button>
        <h1 className="market-title">{title}</h1>
        <button className="icon-btn"><Search size={24} /></button>
      </header>

      {/* ── GROCERY MARKET VIEW ── */}
      {isGroceryMarket && inventory && (
        <div className="market-content">
          {/* Category filter pills */}
          <div className="inv-filter-row">
            {inventory.categories.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Inventory sections */}
          {inventory.sections.map(section => {
            const items = activeCategory === 'All'
              ? section.items
              : section.title.toLowerCase().includes(activeCategory.toLowerCase())
                ? section.items
                : section.title === 'Most Popular' && activeCategory !== 'All'
                  ? section.items.filter(item => {
                      const matchSection = inventory.sections.find(s => s.title.toLowerCase().includes(activeCategory.toLowerCase()));
                      return matchSection?.items.some(i => i.id === item.id);
                    })
                  : [];
            if (items.length === 0) return null;

            return (
              <section className="market-section" key={section.title}>
                <h2 className="market-section-title">{section.title}</h2>
                <div className="market-scroll">
                  <div className="market-scroll-inner">
                    {items.map(item => (
                      <InventoryCard key={item.id} item={item} />
                    ))}
                    <div className="scroll-spacer" />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* ── DINING HALL VIEW (original) ── */}
      {!isGroceryMarket && (
        <div className="market-content">
          <section className="market-section">
            <h2 className="market-section-title">Explore menu</h2>
            <div className="filter-pills">
              <button className="filter-pill active"><Star size={12} className="pill-icon" fill="currentColor" /> Popular</button>
              <button className="filter-pill"><Leaf size={12} className="pill-icon" /> Vegetarian</button>
            </div>
            <div className="market-scroll">
              <div className="market-scroll-inner">
                {exploreMenu.map(item => <MarketCard key={item.id} item={item} onClick={() => onNavigateToItem(item)} />)}
                <div className="scroll-spacer" />
              </div>
            </div>
          </section>
          <hr className="market-divider" />
          <section className="market-section">
            <h2 className="market-section-title">Sandwiches</h2>
            <div className="market-scroll"><div className="market-scroll-inner">{sandwiches.map(item => <MarketCard key={item.id} item={item} onClick={() => onNavigateToItem(item)} />)}<div className="scroll-spacer" /></div></div>
          </section>
          <section className="market-section">
            <h2 className="market-section-title">Tenders</h2>
            <div className="market-scroll"><div className="market-scroll-inner">{tenders.map(item => <MarketCard key={item.id} item={item} onClick={() => onNavigateToItem(item)} />)}<div className="scroll-spacer" /></div></div>
          </section>
          <section className="market-section">
            <h2 className="market-section-title">Sides</h2>
            <div className="market-scroll"><div className="market-scroll-inner">{sides.map(item => <MarketCard key={item.id} item={item} onClick={() => onNavigateToItem(item)} />)}<div className="scroll-spacer" /></div></div>
          </section>
        </div>
      )}
    </div>
  );
};

export default MarketPage;
