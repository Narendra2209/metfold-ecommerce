import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">
                        Build with Strength.<br />
                        <span className="highlight">Design with Style.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Australia's premium supplier of Colorbond© roofing, architectural cladding, and essential rainwater products.
                    </p>
                    <div className="hero-actions">
                        <Link to="/category/roofing" className="btn btn-primary">
                            Explore Roofing <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Link>
                        <Link to="/contact" className="btn btn-outline">
                            Request a Quote
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Placeholder for Hero Image */}
                    <div className="image-placeholder">
                        <div className="gradient-overlay"></div>
                        <img
                            src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Premium Roofing"
                        />
                    </div>
                </motion.div>
            </div>

            <style>{`
        .hero {
          padding: 6rem 0;
          background: linear-gradient(135deg, var(--surface-alt) 0%, #f1f5f9 100%);
          overflow: hidden;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          color: var(--primary);
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }

        .highlight {
          color: var(--accent);
          position: relative;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: var(--secondary);
          margin-bottom: 2.5rem;
          max-width: 500px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .image-placeholder {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          aspect-ratio: 4/3;
        }

        .image-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .image-placeholder:hover img {
          transform: scale(1.05);
        }

        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top right, rgba(15, 23, 42, 0.4), transparent);
          z-index: 10;
        }

        @media (max-width: 960px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-text {
            margin: 0 auto;
          }
          
          .hero-actions {
            justify-content: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
