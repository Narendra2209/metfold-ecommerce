import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container section cart-empty page-transition" style={{ textAlign: 'center', padding: '8rem 2rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(27,58,92,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <ShoppingBag size={36} color="var(--primary)" />
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Start adding roofing and guttering products to build your quote.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Browse Products <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page section page-transition">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <h1 style={{ margin: 0 }}>Your Cart <span style={{ color: 'var(--text-dim)', fontSize: '1.5rem' }}>({cart.length} items)</span></h1>
          </div>
          <button onClick={clearCart} className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)' }}>
            Clear Cart
          </button>
        </motion.div>

        <div className="cart-layout">
          <div className="cart-items">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.cartId}
                  className="cart-item"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="item-image">
                    {item.name[0]}
                  </div>

                  <div className="item-details">
                    <h3>
                      <Link to={`/product/${item.id}`} style={{ color: 'var(--text-main)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                        onMouseLeave={e => e.target.style.color = 'white'}
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <div className="item-options">
                      {item.options && Object.entries(item.options).map(([key, value]) => {
                        let displayVal = value;
                        if (typeof value === 'object' && value !== null && value.name) displayVal = value.name;
                        return (
                          <span key={key} className="opt-pill">{key}: <strong>{String(displayVal)}</strong></span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="item-actions">
                    <div className="qty-control" style={{ marginBottom: '0.5rem' }}>
                      <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="item-price">
                      {item.priceRange || 'POA'}
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--text-main)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--highlight)' }}>Calculated at checkout</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              <span>GST (10%)</span>
              <span style={{ color: 'var(--text-main)' }}>${(cartTotal * 0.1).toFixed(2)}</span>
            </div>

            <div className="summary-row" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
              <span>Estimated Total</span>
              <span style={{ color: 'var(--primary)' }}>${(cartTotal * 1.1).toFixed(2)}</span>
            </div>

            <p className="summary-note" style={{ marginBottom: '1.5rem' }}>
              * Final price confirmed at checkout. Custom items may require a quote.
            </p>

            <Link to="/checkout" className="btn btn-primary btn-block btn-lg" style={{ marginBottom: '1rem' }}>
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <Link to="/shop" className="btn btn-secondary btn-block" style={{ fontSize: '0.9rem' }}>
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
