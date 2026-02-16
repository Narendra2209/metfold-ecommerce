
import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categoryId === selectedCategory);
    }

    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'price-asc') result.sort((a, b) => (a.basePricePerMeter || 0) - (b.basePricePerMeter || 0));
    else if (sortBy === 'price-desc') result.sort((a, b) => (b.basePricePerMeter || 0) - (a.basePricePerMeter || 0));
    else if (sortBy === 'newest') result.reverse();

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="shop-page section page-transition">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.25rem',
            background: 'rgba(27,58,92,0.1)',
            border: '1px solid rgba(27,58,92,0.3)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--primary)',
            fontWeight: 600,
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            <SlidersHorizontal size={16} /> Our Products
          </span>
          <h1 className="text-gradient">Shop All Products</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>Premium roofing, cladding, guttering, and accessories for every project.</p>
        </motion.header>

        {/* Toolbar */}
        <motion.div
          className="glass-panel shop-toolbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="select-wrap">
              <Filter size={16} />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="select-wrap">
              <ChevronDown size={16} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name A-Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </motion.div>

        <p className="results-count" style={{ marginBottom: '2rem' }}>
          Showing <strong style={{ color: 'var(--text-main)' }}>{filteredProducts.length}</strong> of {PRODUCTS.length} products
        </p>

        {filteredProducts.length > 0 ? (
          <div className="products-scroll">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Search size={28} color="var(--text-dim)" />
              </div>
              <h3>No Products Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear Filters
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
