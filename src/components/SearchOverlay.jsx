import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Clock, MapPin } from 'lucide-react';
import venues from '../data/venues';
import './SearchOverlay.css';

const NEARBY = [
  { id: 22, name: "Earl's Coffee House",  location: "Canyon Vista",        tags: ["coffee", "latte", "boba", "matcha"] },
  { id: 55, name: "Starbucks",            location: "Price Center West",   tags: ["coffee", "latte", "pastry"] },
  { id: 52, name: "Sixth Market",         location: "Sixth College",       tags: ["grocery", "snack", "espresso"] },
  { id: 40, name: "Panda Express",        location: "Price Center West",   tags: ["chinese", "noodle", "rice"] },
  { id: 47, name: "Scholars Italian",     location: "ERC",                 tags: ["pasta", "pizza", "salad"] },
];

const SearchOverlay = ({ onClose, onVenueSelect, recentSearches = [] }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      inputRef.current?.focus();
    }, 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const matched = [];
    venues.forEach(v => {
      const nameMatch = v.name.toLowerCase().includes(q);
      const tagMatch = v.tags.filter(t => t.toLowerCase().includes(q));
      if (nameMatch || tagMatch.length > 0) matched.push({ ...v, matchedTags: tagMatch });
    });
    setResults(matched.slice(0, 12));
  }, [query]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  const handleSelect = (venue) => {
    handleClose();
    setTimeout(() => onVenueSelect(venue), 260);
  };

  const handleRecentClick = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <div className={`search-overlay ${visible ? 'visible' : ''}`}>
      {/* Top bar */}
      <div className="search-overlay-bar">
        <button className="search-back-btn" onClick={handleClose}>
          <ArrowLeft size={22} />
        </button>
        <div className="search-overlay-input-wrap">
          <Search size={18} className="search-overlay-icon" />
          <input
            ref={inputRef}
            className="search-overlay-input"
            placeholder="Search dining halls, cafés, items…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="search-results-list">
        {/* ── Empty state ── */}
        {query.trim() === '' && (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="search-section">
                <p className="search-section-title">Recent Searches</p>
                <div className="search-recents-row">
                  {recentSearches.map((term, i) => (
                    <button key={i} className="search-recent-pill" onClick={() => handleRecentClick(term)}>
                      <Clock size={13} />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby */}
            <div className="search-section">
              <p className="search-section-title">Nearby</p>
              {NEARBY.map(venue => (
                <button key={venue.id} className="search-result-item" onClick={() => handleSelect(venue)}>
                  <MapPin size={16} className="search-nearby-icon" />
                  <div className="search-result-left">
                    <div className="search-result-name">{venue.name}</div>
                    <div className="search-result-location">{venue.location}</div>
                  </div>
                  <div className="search-result-arrow">›</div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Search results ── */}
        {query.trim() !== '' && results.length === 0 && (
          <p className="search-hint">No results for "{query}"</p>
        )}
        {results.map(venue => (
          <button key={venue.id} className="search-result-item" onClick={() => handleSelect(venue)}>
            <Search size={15} className="search-nearby-icon" />
            <div className="search-result-left">
              <div className="search-result-name">{venue.name}</div>
              <div className="search-result-location">{venue.location}</div>
              {venue.matchedTags?.length > 0 && (
                <div className="search-result-tags">Serves: {venue.matchedTags.slice(0, 3).join(', ')}</div>
              )}
            </div>
            <div className="search-result-arrow">›</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchOverlay;
