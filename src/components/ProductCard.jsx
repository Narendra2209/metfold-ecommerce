import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Search, Layers, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          {/* Placeholder image since we don't have real assets yet */}
          <div className="product-image-placeholder">
            <img src={product.image} alt={product.name} onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentNode.classList.add('no-image');
            }} />
          </div>
        </Link>

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="product-badges">
            {product.badges.map((badge, index) => (
              <span key={index} className="badge-discount">{badge}</span>
            ))}
          </div>
        )}

        {/* Hover Actions */}
        <motion.div
          className="product-actions"
          variants={{
            hover: { opacity: 1, x: 0 },
            initial: { opacity: 0, x: 10 }
          }}
        >
          <button className="action-btn" title="Add to Wishlist"><Heart size={18} /></button>
          <button className="action-btn" title="Quick View"><Search size={18} /></button>
          <button className="action-btn" title="Compare"><Layers size={18} /></button>
        </motion.div>
      </div>

      <div className="product-info">
        <div className="product-category">{product.categoryName}</div>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.name}
        </Link>

        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="star-icon" fill="#e2e8f0" color="#e2e8f0" />
          ))}
        </div>

        <div className="product-price">
          {product.priceRange}
        </div>

        <Link to={`/product/${product.id}`} className="btn-select-options">
          SELECT OPTIONS
        </Link>
      </div>


    </motion.div>
  );
};

export default ProductCard;
