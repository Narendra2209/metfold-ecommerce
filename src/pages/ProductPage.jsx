import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { getColorsForFinish } from '../data/constants';
import { ArrowLeft, Check, Info, ShoppingBag, ChevronRight, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const category = product ? CATEGORIES.find(c => c.id === product.categoryId) : null;
  const { addToCart } = useCart();
  const relatedProducts = product ? PRODUCTS.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4) : [];

  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    if (!product) return;

    const defaults = {};
    let initialColors = [];

    if (product.options) {
      Object.entries(product.options).forEach(([key, value]) => {
        if (key === 'finish' && Array.isArray(value)) {
          defaults[key] = value[0];
          initialColors = getColorsForFinish(value[0]);
        } else if (value.type === 'range') defaults[key] = value.min;
        else if (value.type === 'select') defaults[key] = value.values[0];
        else if (Array.isArray(value)) {
          if (key === 'color') {
            defaults[key] = value[0];
          } else if (typeof value[0] === 'object') {
            defaults[key] = value[0];
          } else {
            defaults[key] = value[0];
          }
        }
      });
    }

    if (product.options?.color && !product.options.finish) {
      initialColors = product.options.color;
    }

    setSelectedOptions(defaults);
    setAvailableColors(initialColors);
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="container section page-transition" style={{ textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleFinishChange = (finish) => {
    const newColors = getColorsForFinish(finish);
    setAvailableColors(newColors);
    setSelectedOptions(prev => ({
      ...prev,
      finish: finish,
      color: newColors.length > 0 ? newColors[0] : null
    }));
  };

  const handleOptionChange = (key, value) => {
    if (key === 'finish') {
      handleFinishChange(value);
    } else {
      setSelectedOptions(prev => ({ ...prev, [key]: value }));
    }
  };

  const getPriceDisplay = () => {
    if (product.priceType === 'variable' && product.basePricePerMeter) {
      const length = parseFloat(selectedOptions.length) || 1;
      const total = (product.basePricePerMeter * length * quantity).toFixed(2);
      return `$${total}`;
    }
    if (product.priceType === 'fixed' && product.basePrice) {
      return `$${(product.basePrice * quantity).toFixed(2)}`;
    }
    return product.priceRange || 'Get Quote';
  };

  const handleAddToCart = () => {
    addToCart(product, selectedOptions, quantity);
  };

  return (
    <div className="product-page section page-transition">
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'inherit' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${product.categoryId}`} style={{ color: 'inherit' }}>{category?.name || 'Category'}</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-main)' }}>{product.name}</span>
        </div>

        <div className="product-layout">
          {/* Left: Image Gallery */}
          <motion.div
            className="product-gallery"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="main-image">
              <div className="placeholder-image">
                {product.name}
              </div>
            </div>

            {/* Trust badges below image */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                { icon: <Truck size={18} />, text: 'Fast Delivery' },
                { icon: <ShieldCheck size={18} />, text: 'Quality Assured' },
                { icon: <RefreshCw size={18} />, text: 'Easy Returns' }
              ].map((badge, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                  padding: '1rem',
                  background: 'var(--glass-surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center'
                }}>
                  <div style={{ color: 'var(--primary)' }}>{badge.icon}</div>
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Details & Config */}
          <motion.div
            className="product-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              {product.categoryName}
            </p>
            <h1 className="product-title" style={{ fontSize: '2.25rem', color: 'var(--text-main)', marginBottom: '1rem' }}>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>(12 reviews)</span>
            </div>

            <p className="product-price" style={{ fontSize: '1.75rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1.5rem' }}>
              {product.priceType === 'variable' ? `From $${product.basePricePerMeter}/m` : product.priceRange || 'Price on Application'}
            </p>

            <p className="product-description" style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="features-list">
                <h4>Key Features:</h4>
                <ul>
                  {product.features.map((f, i) => (
                    <li key={i}><Check size={14} className="check-icon" /> {f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="configuration-panel">
              <h3>Customize Your Order</h3>

              {product.options && Object.entries(product.options).map(([key, config]) => {
                if (key === 'color') return null;

                if (key === 'finish') {
                  return (
                    <div key={key} className="option-group">
                      <label className="option-label">Finish</label>
                      <div className="chip-group">
                        {config.map(item => (
                          <button
                            key={item}
                            className={`chip ${selectedOptions[key] === item ? 'active' : ''}`}
                            onClick={() => handleOptionChange(key, item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (config.type === 'range') {
                  return (
                    <div key={key} className="option-group">
                      <label className="option-label">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                        <span className="selected-val">{selectedOptions[key]} {config.unit}</span>
                      </label>
                      <input
                        type="range"
                        min={config.min}
                        max={config.max}
                        step={config.step}
                        value={selectedOptions[key] || config.min}
                        onChange={(e) => handleOptionChange(key, parseFloat(e.target.value))}
                        className="range-input"
                      />
                      <div className="range-meta">
                        <span>{config.min}{config.unit}</span>
                        <span>{config.max}{config.unit}</span>
                      </div>
                    </div>
                  );
                }

                if (Array.isArray(config) || (config.type === 'select')) {
                  const items = Array.isArray(config) ? config : config.values;
                  return (
                    <div key={key} className="option-group">
                      <label className="option-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <div className="chip-group">
                        {items.map(item => {
                          const label = typeof item === 'object' ? item.name : item;
                          return (
                            <button
                              key={label}
                              className={`chip ${selectedOptions[key] === item ? 'active' : ''}`}
                              onClick={() => handleOptionChange(key, item)}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })}

              {/* Dynamic Color Section */}
              {availableColors.length > 0 && (
                <div className="option-group">
                  <label className="option-label">
                    Color: <span className="selected-val">{selectedOptions.color?.name || 'Select'}</span>
                  </label>
                  <div className="color-grid">
                    {availableColors.map((c) => (
                      <button
                        key={c.name}
                        className={`color-swatch ${selectedOptions.color?.name === c.name ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => handleOptionChange('color', c)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="option-group">
                <label className="option-label">Quantity</label>
                <div className="qty-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="add-to-cart-section">
              <div className="est-total">
                <span>Estimated Total:</span>
                <span className="total-price">{getPriceDisplay()}</span>
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={handleAddToCart} style={{ marginBottom: '1rem' }}>
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <p className="note"><Info size={14} /> Final price confirmed at checkout. GST included.</p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: '6rem' }}
          >
            <h2 style={{ marginBottom: '2rem' }}>Related Products</h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="glass-panel" style={{
                  padding: '1.5rem', textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
                >
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{p.categoryName}</p>
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{p.name}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: 0 }}>{p.priceRange}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
