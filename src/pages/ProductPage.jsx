import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useProducts } from '../context/ProductContext';
import {
  COLORBOND_COLORS,
  COLORBOND_MATT_COLORS,
  COLORBOND_ULTRA_COLORS,
  ZINCALUME_COLOR,
  GALVANISED_COLOR
} from '../data/constants';
import { ArrowLeft, Check, Info, ShoppingBag, ChevronRight, Star, Truck, ShieldCheck, RefreshCw, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const { products: PRODUCTS } = useProducts();
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const category = product ? CATEGORIES.find(c => c.id === product.categoryId) : null;
  const { addToCart } = useCart();

  // State
  const [colorCategory, setColorCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [thickness, setThickness] = useState('');
  const [cover, setCover] = useState('');
  const [length, setLength] = useState(1.0);
  const [quantity, setQuantity] = useState(1);
  const [availableColors, setAvailableColors] = useState([]);

  // Helper function defined outside or inside
  const getColorsForCategory = (cat) => {
    if (!cat) return [];
    if (cat.includes('Standard') || cat === 'Colorbond') return COLORBOND_COLORS;
    if (cat.includes('Matt')) return COLORBOND_MATT_COLORS;
    if (cat.includes('Ultra')) return COLORBOND_ULTRA_COLORS;
    if (cat.includes('Zincalume')) return ZINCALUME_COLOR;
    if (cat.includes('Galvanised')) return GALVANISED_COLOR;
    return [];
  };

  // Initialization
  useEffect(() => {
    if (!product) return;

    // Set Defaults based on product.options
    // If product has new options structure
    if (product.options?.colorCategory) {
      const defaultCat = product.options.colorCategory[0];
      setColorCategory(defaultCat);
      const colors = getColorsForCategory(defaultCat);
      setAvailableColors(colors);
      if (colors.length > 0) setSelectedColor(colors[0]);
    }

    if (product.options?.thickness) {
      setThickness(product.options.thickness[0]);
    }

    if (product.options?.cover) {
      setCover(product.options.cover[0]);
    }

    if (product.options?.length) {
      setLength(product.options.length.default || 1.0);
    }
  }, [product]);

  // Handlers
  const handleCategoryChange = (cat) => {
    setColorCategory(cat);
    const colors = getColorsForCategory(cat);
    setAvailableColors(colors);
    // Reset color to first available in new category
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    } else {
      setSelectedColor(null);
    }
  };

  const calculateTotalPrice = () => {
    if (!product) return '0.00';

    let base = product.priceType === 'variable' ? product.basePricePerMeter : product.price || 0;

    // Upcharges logic (simplified)
    if (colorCategory.includes('Matt')) base *= 1.1;
    if (colorCategory.includes('Ultra')) base *= 1.2;
    // Thickness upcharge 
    if (thickness && thickness.includes('0.48')) base *= 1.15;
    else if (thickness && thickness.includes('0.42')) base *= 1.05;

    if (product.priceType === 'variable') {
      return (base * length * quantity).toFixed(2);
    }
    return (base * quantity).toFixed(2);
  };

  const getPriceDisplay = () => {
    return `$${calculateTotalPrice()}`;
  };

  const handleAddToCart = () => {
    const total = parseFloat(calculateTotalPrice());
    const unitPrice = total / quantity;

    addToCart({
      ...product,
      price: unitPrice
    }, {
      colorCategory,
      color: selectedColor?.name,
      color: selectedColor?.name,
      thickness,
      cover,
      length: product.priceType === 'variable' ? length : undefined
    }, quantity);
  };

  if (!product) {
    return (
      <div className="container section page-transition" style={{ textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const isConfigurable = product.priceType === 'variable';

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
            <div className="main-image" style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', position: 'relative' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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
              {isConfigurable ? `$${calculateTotalPrice()}` : product.priceRange || 'Get Quote'}
              {isConfigurable && <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>(Total Ex. GST)</span>}
            </p>

            <p className="product-description" style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* CONFIGURATION PANEL */}
            {isConfigurable && product.options && (
              <div className="configuration-panel" style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>

                {/* 1. Color Category */}
                {product.options.colorCategory && (
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Color Categories:</label>
                    <div className="select-wrapper">
                      <select
                        value={colorCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                      >
                        {product.options.colorCategory.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* 2. Color Dropdown & Swatches */}
                {availableColors.length > 0 && (
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Color:</label>
                    <select
                      value={selectedColor?.name || ''}
                      onChange={(e) => {
                        const c = availableColors.find(col => col.name === e.target.value);
                        setSelectedColor(c);
                      }}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', marginBottom: '1rem' }}
                    >
                      {availableColors.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>

                    {/* Swatches */}
                    <div className="color-swatches" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {availableColors.map(c => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          title={c.name}
                          style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: c.hex,
                            border: selectedColor?.name === c.name ? '3px solid var(--primary)' : '2px solid #e2e8f0',
                            boxShadow: selectedColor?.name === c.name ? '0 0 0 2px white inset' : 'none',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Thickness */}
                {product.options.thickness && (
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Thickness:</label>
                    <select
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                    >
                      {product.options.thickness.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 3.5 Cover Width */}
                {product.options.cover && (
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cover Width:</label>
                    <select
                      value={cover}
                      onChange={(e) => setCover(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                    >
                      {product.options.cover.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 4. Length */}
                {product.options.length && (
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Length in Metre(s):</label>
                    <input
                      type="number"
                      step={product.options.length.step}
                      min={product.options.length.min}
                      max={product.options.length.max}
                      value={length}
                      onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                )}

                {/* 5. Quantity & Add to Cart */}
                <div className="action-row" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  <div className="quantity-control" style={{ display: 'flex', alignItems: 'center', background: '#e2e8f0', borderRadius: 'var(--radius-sm)' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Minus size={16} />
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      style={{ width: '40px', textAlign: 'center', background: 'transparent', border: 'none', fontWeight: 600 }}
                    />
                    <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button className="btn btn-outline" style={{ width: '100%', fontWeight: 700 }}>BUY NOW</button>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--primary)' }}>${calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>
            )}

            {!isConfigurable && (
              <div style={{ marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: '100%' }}>Add to Cart</button>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="features-list" style={{ marginTop: '2rem' }}>
                <h4>Key Features:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                      <Check size={16} className="check-icon" style={{ marginTop: '4px', color: 'var(--success)' }} />
                      <span style={{ color: 'var(--text-muted)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
