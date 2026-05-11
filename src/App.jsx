import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Section from './components/Section';
import BottomNav from './components/BottomNav';
import MarketPage from './components/MarketPage';
import ItemPage from './components/ItemPage';
import QRCodeModal from './components/QRCodeModal';
import NotificationPanel from './components/NotificationPanel';
import SearchOverlay from './components/SearchOverlay';
import MapPage from './components/MapPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import BusynessPage from './components/BusynessPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBusynessOpen, setIsBusynessOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['Earl\'s Coffee House', 'Boba', 'Ramen']);

  const openMarket = (marketItem) => {
    setSelectedMarket(marketItem);
    setCurrentView('market');
  };
  const openItem = (item) => {
    setSelectedItem(item);
    setCurrentView('item');
  };
  const goBack = () => {
    if (currentView === 'item') setCurrentView('market');
    else setCurrentView('home');
  };

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {currentView === 'home' && (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <TopBar onBellPress={() => setIsNotifOpen(true)} onSearchPress={() => setIsSearchOpen(true)} />
          
          <main style={{ flex: 1, overflowY: 'auto', padding: '0 16px 120px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ margin: '0 -16px -20px' }}>
              <div className="pill-row" style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '4px 16px 20px', scrollbarWidth: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, whiteSpace: 'nowrap', padding: '0 16px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(156,213,255,0.15)', color: '#F7F8F0', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid rgba(156,213,255,0.2)' }}>#Refreshments</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, whiteSpace: 'nowrap', padding: '0 16px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(156,213,255,0.15)', color: '#F7F8F0', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid rgba(156,213,255,0.2)' }}>#Halal</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, whiteSpace: 'nowrap', padding: '0 16px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(156,213,255,0.15)', color: '#F7F8F0', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid rgba(156,213,255,0.2)' }}>#Vegetarian</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, whiteSpace: 'nowrap', padding: '0 16px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(156,213,255,0.15)', color: '#F7F8F0', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid rgba(156,213,255,0.2)' }}>#SweetTooth</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, whiteSpace: 'nowrap', padding: '0 16px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(156,213,255,0.15)', color: '#F7F8F0', fontSize: '14px', fontWeight: '500', cursor: 'pointer', border: '1px solid rgba(156,213,255,0.2)' }}>#LateNight</div>
              </div>
            </div>

            <Section 
              title="Dining Halls Near You" 
              type="dining" 
              items={[
                { id: 1, title: "Scholar's Italian", subtitle: "Dining Dollars accepted • 13 min", hours: "Open from 10:00 AM - 9:00 PM", image: "/images/italian.jpg" },
                { id: 2, title: "Scholar's Pizza", subtitle: "Dining Dollars accepted • 20 min", hours: "Open from 10:00 AM - 9:00 PM", image: "/images/pizza.jpg" },
                { id: 3, title: "Spice Catering", subtitle: "Dining Dollars accepted • 5 min", hours: "Open from 11:00 AM - 8:00 PM", image: "/images/food.png" }
              ]} 
              onCardClick={openMarket}
            />

            <Section 
              title="Events & Updates" 
              type="event" 
              items={[
                { id: 1, title: "El Día de Los Muertos", subtitle: "Available Sunday, November 1st", hours: "Eleanor Roosevelt College • Ventanas", image: "/images/muertos.jpg" },
                { id: 2, title: "Crêpes Are Back!", subtitle: "Available Tomorrow: 10:00 AM - 9:00 PM", hours: "Warren College • Canyon Vista", image: "/images/crepes.png" },
                { id: 3, title: "Thanksgiving Feast", subtitle: "Fill out our form!", hours: "Campus-Wide", image: "/images/event.png" }
              ]} 
            />

            <Section 
              title="Markets & Inventory" 
              type="market" 
              items={[
                { id: 1, title: "Goody's MarketPlace", subtitle: "Revelle College", hours: "Open until 1:00 AM", image: "/images/goodys.png" },
                { id: 2, title: "Sixth Market", subtitle: "Sixth College", hours: "Open until 12:00 AM", image: "/images/sixth.png" }
              ]}
              onCardClick={openMarket}
            />
          </main>
        </div>
      )}

      {currentView === 'map' && (
        <div style={{ height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <TopBar variant="map" />
          <MapPage
            onLocationClick={(loc) => {
              openMarket({ title: loc.name, subtitle: 'UCSD Dining', image: '/images/food.png' });
            }}
            onBusynessPress={() => setIsBusynessOpen(true)}
          />
        </div>
      )}

      {currentView === 'cart' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
          <CartPage />
        </div>
      )}

      {currentView === 'menu' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
          <ProfilePage />
        </div>
      )}

      {currentView === 'market' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto', backgroundColor: 'var(--bg-color)', zIndex: 200 }}>
          <MarketPage 
            market={selectedMarket}
            onClose={goBack} 
            onNavigateToItem={openItem} 
          />
        </div>
      )}

      {currentView === 'item' && selectedItem && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto', backgroundColor: 'var(--bg-color)', zIndex: 200 }}>
          <ItemPage 
            item={selectedItem} 
            onClose={goBack} 
          />
        </div>
      )}

      {/* BottomNav persists across main tabs */}
      {['home', 'map', 'cart', 'menu'].includes(currentView) && (
        <BottomNav activeTab={currentView} onTabChange={setCurrentView} onQRPress={() => setIsQROpen(true)} />
      )}

      {isQROpen && <QRCodeModal onClose={() => setIsQROpen(false)} currentLocation={selectedMarket?.title || "Sixth Marketplace"} />}
      {isNotifOpen && <NotificationPanel onClose={() => setIsNotifOpen(false)} />}
      {isBusynessOpen && <BusynessPage onClose={() => setIsBusynessOpen(false)} />}
      {isSearchOpen && (
        <SearchOverlay
          onClose={() => setIsSearchOpen(false)}
          recentSearches={recentSearches}
          onVenueSelect={(venue) => {
            setRecentSearches(prev => [venue.name, ...prev.filter(r => r !== venue.name)].slice(0, 6));
            setIsSearchOpen(false);
            openMarket({ title: venue.name, subtitle: venue.location, image: '/images/food.png' });
          }}
        />
      )}
    </div>
  );
}

export default App;
