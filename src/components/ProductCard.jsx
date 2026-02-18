import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card" id={`product-${product.id}`}>
      <div className="product-card-image">
        {product.image && !product.image.startsWith('/assets/') ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="product-card-placeholder" style={{ display: product.image && !product.image.startsWith('/assets/') ? 'none' : 'flex' }}>
          <span>{product.name.charAt(0)}</span>
        </div>
        {product.badges && product.badges.length > 0 && (
          <div className="product-card-badge">{product.badges[0]}</div>
        )}
        <div className="product-card-overlay">
          <motion.button
            className="product-card-action"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={18} />
          </motion.button>
        </div>
      </div>
      <div className="product-card-body">
        <p className="product-card-category">{product.categoryName}</p>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />
          ))}
          <span className="rating-count">(12)</span>
        </div>
        <div className="product-card-price-row">
          <span className="product-card-price">{product.priceRange || 'Get Quote'}</span>
        </div>
        <div className="product-card-cta">
          <span>View Details</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
