import React, { useState } from 'react';
import { ChevronRight, CreditCard, DollarSign } from 'lucide-react';
import './CartPage.css';

const CartPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('dining');

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Confirm Order</h1>
      </header>

      <main className="cart-content">
        {/* Restaurant Info */}
        <div className="cart-card restaurant-card">
          <div className="restaurant-info">
            <img src="/images/goodys.png" alt="Logo" className="restaurant-logo" />
            <div>
              <h2>Earl's Coffeehouse</h2>
              <p>Canyon Vista</p>
            </div>
          </div>
          <div className="wait-time-block">
            <span className="wait-time-label">Ready in</span>
            <span className="wait-time-value">14 min</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="cart-card items-card">
          <div className="order-item">
            <div className="item-details">
              <h3>Lavender Vanilla Matcha Latte 16oz</h3>
              <p>2 Percent</p>
            </div>
            <span className="item-price">$5.25</span>
          </div>
          <div className="divider"></div>
          <div className="order-item">
            <div className="item-details">
              <h3>Cappuccino</h3>
              <p>12oz • 2 Percent</p>
            </div>
            <span className="item-price">$4.75</span>
          </div>
          
          <div className="divider"></div>
          
          <div className="cost-row">
            <span>Subtotal</span>
            <span>$10.00</span>
          </div>
          <div className="cost-row">
            <span>Tax</span>
            <span>-</span>
          </div>
          <div className="cost-row total-row">
            <span>Total</span>
            <span>$10.00</span>
          </div>
          
          <div className="edit-order-row">
            <button className="edit-order-btn">Edit order</button>
          </div>
        </div>

        {/* Payment Methods */}
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
      </main>

      {/* Pay Button anchored above BottomNav */}
      <div className="pay-action-container">
        <button className="pay-btn">Pay $10.00</button>
      </div>
    </div>
  );
};

export default CartPage;
