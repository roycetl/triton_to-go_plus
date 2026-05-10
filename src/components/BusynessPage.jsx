import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import './BusynessPage.css';

const venues = [
  { name: 'OceanView Terrace',   busyness: 62 },
  { name: 'Ventanas',            busyness: 34 },
  { name: '64 Degrees',          busyness: 96 },
  { name: 'Bistro',              busyness: 57 },
  { name: 'Canyon Vista',        busyness: 7  },
  { name: "Goody's Marketplace", busyness: 44 },
  { name: 'Price Center',        busyness: 81 },
  { name: 'Sixth Market',        busyness: 29 },
  { name: "Earl's Coffee House", busyness: 73 },
  { name: "Scholar's Italian",   busyness: 51 },
  { name: 'Triton Grill',        busyness: 68 },
  { name: 'Panda Express',       busyness: 88 },
];

const getBusynessColor = (pct) => {
  if (pct >= 71) return '#FF453A'; // red
  if (pct >= 41) return '#FFD60A'; // amber
  return '#32D74B';                 // green
};

const getFilter = (pct) => {
  if (pct >= 71) return 'Full';
  if (pct >= 41) return 'Half';
  return 'Empty';
};

const FILTERS = ['All', 'Full', 'Half', 'Empty'];

const BusynessPage = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const visible = activeFilter === 'All'
    ? venues
    : venues.filter(v => getFilter(v.busyness) === activeFilter);

  return (
    <div className="busy-page">
      {/* Header */}
      <header className="busy-header">
        <button className="icon-btn" onClick={onClose}><X size={22} /></button>
        <h1 className="busy-title">Dining Hall Activity</h1>
        <button className="icon-btn"><Search size={20} /></button>
      </header>

      {/* Filter pills */}
      <div className="busy-filter-row">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`busy-filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Venue list */}
      <div className="busy-list">
        {visible.map(v => (
          <div key={v.name} className="busy-card">
            <div className="busy-card-top">
              <span className="busy-venue-name">{v.name}</span>
              <span className="busy-pct">
                {v.busyness}%
              </span>
            </div>
            <div className="busy-bar-track">
              <div
                className="busy-bar-fill"
                style={{
                  width: `${v.busyness}%`,
                  backgroundColor: getBusynessColor(v.busyness),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusynessPage;
