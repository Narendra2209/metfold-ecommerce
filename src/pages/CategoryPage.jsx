
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, ChevronRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const { id } = useParams();
  const category = CATEGORIES.find(c => c.id === id);
  const products = PRODUCTS.filter(p => p.categoryId === id);

  if (!category) {
    return (
      <div className="container section page-transition" style={{ textAlign: 'center' }}>
        <h2>Category Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The category you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn btn-primary">Browse All Products</Link>
      </div>
    );
  }

  return (
    <div className="category-page section page-transition">
      <div className="container">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}
        >
          <Link to="/" style={{ color: 'inherit' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-main)' }}>{category.name}</span>
        </motion.div>

        {/* Category Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(27,58,92,0.15), rgba(27,58,92,0.05))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--primary)', flexShrink: 0
            }}>
              <Layers size={32} />
            </div>
            <div>
              <h1 className="text-gradient" style={{ marginBottom: '0.5rem' }}>{category.name}</h1>
              <p style={{ maxWidth: '600px', marginBottom: '1rem' }}>{category.description}</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', margin: 0 }}>
                <strong style={{ color: 'var(--text-main)' }}>{products.length}</strong> products available
              </p>
            </div>
          </div>
        </motion.header>

        {/* Subcategories if any */}
        {category.subcategories && category.subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            {category.subcategories.map(sub => (
              <span key={sub} style={{
                padding: '0.5rem 1.25rem',
                background: 'var(--glass-surface)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.color = 'white'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.color = 'var(--text-muted)'; }}
              >
                {sub}
              </span>
            ))}
          </motion.div>
        )}

        {/* Products */}
        {products.length > 0 ? (
          <div className="products-scroll">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.06, 0.5), duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <h3>No Products Yet</h3>
            <p>We're adding products to this category soon. Check back shortly!</p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse All Products</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
