import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, CreditCard, Banknote, Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: 'VIC', zip: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const gst = cartTotal * 0.1;
  const grandTotal = cartTotal + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="container section page-transition" style={{ textAlign: 'center', padding: '8rem 2rem' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Add products to your cart before checking out.</p>
        <Link to="/shop" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page section page-transition">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <h1 style={{ marginBottom: '0.5rem' }}>Secure Checkout</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '0' }}>
            <Shield size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Your information is encrypted and secure
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="checkout-layout">

          <div className="checkout-form">
            <motion.section
              className="form-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3><span className="step-num">1</span> Customer Details</h3>
              <div className="form-grid">
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
              </div>
            </motion.section>

            <motion.section
              className="form-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3><span className="step-num">2</span> Delivery Address</h3>
              <input type="text" name="address" placeholder="Street Address" required value={formData.address} onChange={handleChange} className="full-width" />
              <div className="form-grid">
                <input type="text" name="city" placeholder="City / Suburb" required value={formData.city} onChange={handleChange} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <select name="state" value={formData.state} onChange={handleChange} style={{ flex: 1 }}>
                    {['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <input type="text" name="zip" placeholder="Postcode" required value={formData.zip} onChange={handleChange} style={{ flex: 1 }} />
                </div>
              </div>
            </motion.section>

            <motion.section
              className="form-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3><span className="step-num">3</span> Payment Method</h3>
              <div className="payment-options">
                {[
                  { value: 'card', icon: <CreditCard className="icon" />, label: 'Credit / Debit Card' },
                  { value: 'transfer', icon: <Banknote className="icon" />, label: 'Bank Transfer (EFT)' },
                  { value: 'quote', icon: <CheckCircle className="icon" />, label: 'Request Official Quote Only' }
                ].map(opt => (
                  <label key={opt.value} className={`payment-option ${formData.paymentMethod === opt.value ? 'active' : ''}`}>
                    <input type="radio" name="paymentMethod" value={opt.value} checked={formData.paymentMethod === opt.value} onChange={handleChange} />
                    {opt.icon}
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="card-mock-form">
                  <div className="mock-input">4242 •••• •••• ••••</div>
                  <div className="form-grid">
                    <div className="mock-input">MM / YY</div>
                    <div className="mock-input">CVV</div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'transfer' && (
                <div className="card-mock-form" style={{ lineHeight: 1.7 }}>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Bank:</strong> Commonwealth Bank</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>BSB:</strong> 063-000</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Account:</strong> 12345678</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0' }}>Reference: Your order number will be emailed.</p>
                </div>
              )}
            </motion.section>
          </div>

          <motion.div
            className="checkout-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.cartId} className="summary-item">
                  <span style={{ flex: 1 }}>{item.quantity}× {item.name}</span>
                  <span>{item.priceRange || 'POA'}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--text-main)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--highlight)' }}>TBD</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              <span>GST (10%)</span>
              <span style={{ color: 'var(--text-main)' }}>${gst.toFixed(2)}</span>
            </div>

            <div className="total-row">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isProcessing}
              style={{ opacity: isProcessing ? 0.7 : 1 }}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin" style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopcolor: 'var(--text-main)', borderRadius: '50%' }}></div>
                  Processing...
                </>
              ) : (
                formData.paymentMethod === 'quote' ? 'Submit Quote Request' : 'Place Order'
              )}
            </button>
            <p className="secure-note"><CreditCard size={14} /> 256-bit SSL Encrypted Secure Payment</p>
          </motion.div>

        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
