import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
    return (
        <section className="section categories-section">
            <div className="container">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-grid">
                    {CATEGORIES.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link to={`/category/${cat.id}`} className="category-card">
                                <div className="card-image-wrap">
                                    {/* Placeholder, normally cat.image */}
                                    <div className="cat-placeholder-bg" style={{ backgroundColor: `hsl(${210 + index * 10}, 20%, ${90 - index * 5}%)` }}></div>
                                    <div className="overlay"></div>
                                </div>
                                <div className="card-content">
                                    <h3>{cat.name}</h3>
                                    <p>{cat.description}</p>
                                    <span className="card-link">Explore <ArrowUpRight size={16} /></span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .categories-section {
          background-color: var(--surface);
        }

        .section-title {
          text-align: center;
          margin-bottom: 3rem;
          font-size: 2.25rem;
          color: var(--primary);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .category-card {
          display: block;
          background: var(--surface);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: 0.3s ease;
          border: 1px solid var(--border);
          position: relative;
          height: 100%;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent);
        }

        .card-image-wrap {
          height: 200px;
          background-color: #e2e8f0;
          position: relative;
          overflow: hidden;
        }
        
        .cat-placeholder-bg {
          width: 100%;
          height: 100%;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }

        .card-content p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .card-link {
          color: var(--accent);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.9rem;
        }

        .category-card:hover .card-link {
          text-decoration: underline;
        }
      `}</style>
        </section>
    );
};

export default CategoryGrid;
