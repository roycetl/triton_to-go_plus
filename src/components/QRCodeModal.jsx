import React, { useState, useEffect } from 'react';
import { X, QrCode } from 'lucide-react';
import './QRCodeModal.css';

const QRCodeModal = ({ onClose, currentLocation = "Sixth Marketplace" }) => {
  const [paymentMethod, setPaymentMethod] = useState('dining'); // 'dining' or 'triton'
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    // Trigger animation slightly after mount
    requestAnimationFrame(() => {
      setIsAnimatingIn(true);
    });
  }, []);

  const handleClose = () => {
    setIsAnimatingIn(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  return (
    <div className={`qr-modal-overlay ${isAnimatingIn ? 'visible' : ''}`}>
      <div className={`qr-modal-content ${isAnimatingIn ? 'slide-up' : ''}`}>
        <header className="qr-modal-header">
          <h2>Scan to Pay</h2>
          <button className="icon-btn close-btn" onClick={handleClose}>
            <X size={24} color="#121212" />
          </button>
        </header>

        <div className="qr-code-container">
          <div className="qr-code-box">
            <img src="/images/real_qr.png" alt="Your QR Code" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className="qr-scan-line"></div>
          </div>
          <p className="qr-instruction">Current Location: {currentLocation}</p>
        </div>

        <div className="payment-selection">
          <h3>Payment Method</h3>
          
          <div className="payment-toggle-container">
            <div className="payment-toggle-bg">
              <div 
                className={`payment-toggle-slider ${paymentMethod === 'triton' ? 'right' : ''}`}
              ></div>
              <button 
                className={`toggle-btn ${paymentMethod === 'dining' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('dining')}
              >
                Dining Dollars
              </button>
              <button 
                className={`toggle-btn ${paymentMethod === 'triton' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('triton')}
              >
                Triton Cash
              </button>
            </div>
          </div>

          <div className="balance-display">
            <span className="balance-label">Available Balance</span>
            <span className="balance-amount">
              {paymentMethod === 'dining' ? '$124.50' : '$15.00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
