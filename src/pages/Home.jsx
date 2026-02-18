import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Box, ShieldCheck, Zap, Truck, ArrowRight, Star, Sparkles, Award, Clock, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, NAV_STRUCTURE } from '../data/products';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

import Hero3D from '../components/Hero3D';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(end);
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// Banner Carousel
const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    {
      title: "Premium Metal Roofing",
      subtitle: "Australian Engineered. Built to Last.",
      desc: "Precision-engineered roofing and cladding solutions with industrial-grade durability.",
      cta: "Shop Roofing",
      link: "/category/roof-sheets",
      gradient: "linear-gradient(135deg, #1B3A5C 0%, #2a5580 50%, #4A7BA7 100%)",
      image: "https://metfoldsm.com.au/wp-content/uploads/2025/07/Untitled-design-9-1-1024x576.jpg"
    },
    {
      title: "Cladding Solutions",
      subtitle: "Modern Aesthetics. Unmatched Durability.",
      desc: "Sleek, contemporary wall cladding for architectural excellence.",
      cta: "Explore Cladding",
      link: "/category/cladding",
      gradient: "linear-gradient(135deg, #0f2b44 0%, #1B3A5C 50%, #2a5580 100%)",
      image: "https://metfoldsm.com.au/wp-content/uploads/2025/07/Colorspan-Cladding_0000s_0000_Standing-Seam-Aluminium.jpg"
    },
    {
      title: "Rainwater Systems",
      subtitle: "Complete Gutter & Downpipe Range.",
      desc: "Premium fascia, gutter, and downpipe systems for effective water management.",
      cta: "View Range",
      link: "/category/fascia-gutter",
      gradient: "linear-gradient(135deg, #1a3650 0%, #1B3A5C 50%, #3d6d95 100%)",
      image: "https://metfoldsm.com.au/wp-content/uploads/2026/01/Home-page-01.avif"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="banner-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="banner-slide"
          style={{ background: banners[currentSlide].gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Image */}
          {banners[currentSlide].image && (
            <img
              src={banners[currentSlide].image}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.25,
                mixBlendMode: 'luminosity'
              }}
            />
          )}
          {/* 3D Background */}
          <div className="banner-3d-bg">
            <Suspense fallback={null}>
              <Hero3D />
            </Suspense>
          </div>
          <div className="banner-overlay"></div>

          <div className="container banner-content">
            <motion.div
              className="banner-text"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                className="banner-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Sparkles size={14} /> PREMIUM COLLECTION
              </motion.span>
              <h1 className="banner-title">{banners[currentSlide].title}</h1>
              <h2 className="banner-subtitle">{banners[currentSlide].subtitle}</h2>
              <p className="banner-desc">{banners[currentSlide].desc}</p>
              <div className="banner-ctas">
                <Link to={banners[currentSlide].link} className="btn btn-primary btn-lg banner-btn">
                  {banners[currentSlide].cta} <ArrowRight size={18} />
                </Link>
                <Link to="/shop" className="btn btn-secondary btn-lg banner-btn-ghost">
                  View All Products
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="banner-indicators">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`banner-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>

      {/* Nav Arrows */}
      <button className="banner-arrow banner-arrow-left" onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}>
        <ChevronLeft size={24} />
      </button>
      <button className="banner-arrow banner-arrow-right" onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}>
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle, accent, viewAllLink }) => (
  <motion.header
    className="section-header"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, margin: '-50px' }}
  >
    <div className="section-header-left">
      {accent && <span className="section-accent">{accent}</span>}
      <h2 className="text-gradient">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {viewAllLink && (
      <Link to={viewAllLink} className="view-all-link">
        View All <ArrowRight size={16} />
      </Link>
    )}
  </motion.header>
);

// Horizontal Product Scroll
const ProductScroll = ({ products, title, accent, viewAllLink }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <div className="product-scroll-section">
      <SectionHeader title={title} accent={accent} viewAllLink={viewAllLink} />
      <div className="product-scroll-wrapper">
        {canScrollLeft && (
          <button className="scroll-arrow scroll-arrow-left" onClick={() => scroll(-1)}>
            <ChevronLeft size={20} />
          </button>
        )}
        <div
          className="products-scroll"
          ref={scrollContainerRef}
          onScroll={checkScroll}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true, margin: '-30px' }}
              className="product-scroll-item"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        {canScrollRight && (
          <button className="scroll-arrow scroll-arrow-right" onClick={() => scroll(1)}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const { products: PRODUCTS } = useProducts();
  const roofingProducts = PRODUCTS.filter(p => p.categoryId === 'roof-sheets');
  const claddingProducts = PRODUCTS.filter(p => p.categoryId === 'cladding');
  const allAccessories = PRODUCTS.filter(p => ['fascia-gutter', 'gutter-accessories', 'downpipes', 'downpipe-accessories'].includes(p.categoryId));
  const featuredProducts = PRODUCTS.slice(0, 8);

  // Deals State
  const [dealProducts, setDealProducts] = useState([]);

  useEffect(() => {
    const loadDeals = () => {
      const savedDeals = localStorage.getItem('metfold_deals');
      if (savedDeals) {
        try {
          const ids = JSON.parse(savedDeals);
          const deals = PRODUCTS.filter(p => ids.includes(p.id));
          if (deals.length > 0) {
            setDealProducts(deals);
            return;
          }
        } catch (e) {
          console.error("Error parsing deals", e);
        }
      }
      // Fallback
      setDealProducts(PRODUCTS.filter(p => p.badges && p.badges.length > 0).concat(PRODUCTS.slice(0, 4)).slice(0, 5));
    };

    loadDeals();
    window.addEventListener('storage', loadDeals);
    return () => window.removeEventListener('storage', loadDeals);
  }, []);

  // Category images map
  const categoryImages = {
    'roofing': 'https://www.google.com/imgres?q=metfold%20roofing&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F06%2FStanding_seam_metal_roof_3.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMetal_roof&docid=taE1qsSF5jajuM&tbnid=TaLeNHTvsb1XxM&vet=12ahUKEwilioqE7eGSAxVSWHADHc5XBgMQnPAOegQITxAB..i&w=4000&h=3000&hcb=2&ved=2ahUKEwilioqE7eGSAxVSWHADHc5XBgMQnPAOegQITxAB',
    'cladding-nav': 'https://metfoldsm.com.au/wp-content/uploads/2025/07/Colorspan-Cladding_0000s_0000_Standing-Seam-Aluminium.jpg',
    'fascia-gutter-nav': 'https://metfoldsm.com.au/wp-content/uploads/2025/07/Metrib-1024x724.jpg',
    'downpipe-nav': 'https://metfoldsm.com.au/wp-content/uploads/2025/07/Clip-lock-700.jpg',
    'dambuster-nav': 'https://metfoldsm.com.au/wp-content/uploads/2025/11/Dambuster_11zon.webp',
    'accessories-nav': 'https://metfoldsm.com.au/wp-content/uploads/2025/11/selectionsteel_16_11zon.webp'
  };

  return (
    <div className="home-container">
      {/* 1. HERO BANNER CAROUSEL */}
      <BannerCarousel />

      {/* 2. CATEGORY STRIP - Flipkart style with images */}
      <section className="category-strip-section">
        <div className="container">
          <motion.div
            className="category-strip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {NAV_STRUCTURE.map((nav, index) => {
              const linkTo = nav.hasDropdown && nav.items?.length > 0
                ? `/category/${nav.items[0].id}`
                : nav.linkTo || `/category/${nav.id}`;

              return (
                <motion.div
                  key={nav.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  viewport={{ once: true }}
                >
                  <Link to={linkTo} className="category-strip-item">
                    <div className="category-strip-icon" style={{
                      backgroundImage: categoryImages[nav.id] ? `url(${categoryImages[nav.id]})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: categoryImages[nav.id] ? '2px solid var(--brand-navy)' : undefined
                    }}>
                      {!categoryImages[nav.id] && <span className="category-emoji">📦</span>}
                    </div>
                    <span className="category-strip-label">{nav.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="section" style={{ background: '#fff', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <SectionHeader
            accent="Popular Products"
            title="Featured Products"
            subtitle="Our most popular roofing and cladding solutions trusted by builders nationwide."
            viewAllLink="/shop"
          />
          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true, margin: '-30px' }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEALS OF THE DAY */}
      <section className="section deals-section" style={{ background: '#f5f7fa', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="deals-header">
            <div className="deals-header-left">
              <h2 className="text-gradient"><Zap size={24} style={{ display: 'inline', verticalAlign: 'middle' }} /> Deals of the Day</h2>
              <div className="deals-timer">
                <Clock size={16} />
                <span>Ends in: <strong>08:45:32</strong></span>
              </div>
            </div>
            <Link to="/shop" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="deals-grid">
            {dealProducts.map((product, i) => (
              <motion.div
                key={`deal-${product.id}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={`/product/${product.id}`} className="deal-card">
                  <div className="deal-badge">
                    <Percent size={12} /> Special Deal
                  </div>
                  <div className="deal-image">
                    {product.image && !product.image.startsWith('/assets/') ? (
                      <img src={product.image} alt={product.name} loading="lazy" />
                    ) : (
                      <div className="deal-placeholder">{product.name}</div>
                    )}
                  </div>
                  <div className="deal-info">
                    <h4>{product.name}</h4>
                    <p className="deal-category">{product.categoryName}</p>
                    <div className="deal-price">
                      <span className="deal-current">{product.priceRange}</span>
                    </div>
                    <div className="deal-rating">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={12} fill="#fbbf24" color="#fbbf24" />
                      ))}
                      <span>(12)</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROMOTIONAL BANNER */}
      <section className="promo-banner-section">
        <div className="container">
          <motion.div
            className="promo-banner"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="promo-content">
              <span className="promo-tag"><Award size={16} /> AUSTRALIAN MADE</span>
              <h2>Custom CNC Folding</h2>
              <p>Precision-engineered profiles with tolerances down to 0.5mm. Get perfect results for your architectural project.</p>
              <Link to="/about" className="btn btn-primary">Learn More <ArrowRight size={16} /></Link>
            </div>
            <div className="promo-visual">
              <div className="promo-stats">
                <div className="promo-stat">
                  <h3><AnimatedCounter end="15" suffix="+" /></h3>
                  <p>Years Experience</p>
                </div>
                <div className="promo-stat">
                  <h3><AnimatedCounter end="2500" suffix="+" /></h3>
                  <p>Projects Completed</p>
                </div>
                <div className="promo-stat">
                  <h3><AnimatedCounter end="100" suffix="%" /></h3>
                  <p>AU Sourced Steel</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. PRODUCT SCROLLS - Roofing & Cladding */}
      <section className="section" style={{ background: '#fff', paddingTop: '3rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <ProductScroll
            products={roofingProducts}
            title="Roof Sheets"
            accent="Roofing"
            viewAllLink="/category/roof-sheets"
          />
        </div>
      </section>

      <section className="section" style={{ background: '#f5f7fa', paddingTop: '2rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <ProductScroll
            products={claddingProducts}
            title="Cladding Solutions"
            accent="Wall Cladding"
            viewAllLink="/category/cladding"
          />
        </div>
      </section>

      <section className="section" style={{ background: '#fff', paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="container">
          <ProductScroll
            products={allAccessories}
            title="Gutters, Downpipes & More"
            accent="Rainwater & Accessories"
            viewAllLink="/category/fascia-gutter"
          />
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="section how-it-works" style={{ background: '#f5f7fa', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <SectionHeader
            accent="Simple Process"
            title="How It Works"
            subtitle="From quote to delivery, we make it easy to get the materials you need."
          />
          <div className="steps-grid">
            {[
              { step: '01', icon: <Star size={32} />, title: 'Choose Your Profile', desc: 'Browse our catalog and select the roofing or cladding profile that suits your project.' },
              { step: '02', icon: <Box size={32} />, title: 'Customize Options', desc: 'Select your finish, color, thickness, and custom dimensions for a perfect fit.' },
              { step: '03', icon: <ShieldCheck size={32} />, title: 'Get Instant Quote', desc: 'Our system calculates pricing in real-time. No hidden costs, no surprises.' },
              { step: '04', icon: <Truck size={32} />, title: 'Fast Delivery', desc: 'Your order is fabricated and shipped direct to your site with full tracking.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section testimonials-section" style={{ background: '#fff', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <SectionHeader
            accent="Client Testimonials"
            title="Trusted by Industry Leaders"
            subtitle="Hear what builders and architects across Australia say about working with us."
          />
          <div className="testimonials-grid">
            {[
              { name: 'James Mitchell', role: 'Project Manager, BuildCraft AU', initials: 'JM', text: 'Metfold\'s precision is unmatched. Their CNC folding gave us perfect profiles for our commercial project. Delivery was on schedule and quality exceeded expectations.' },
              { name: 'Sarah Chen', role: 'Architect, Studio Arc', initials: 'SC', text: 'The architectural finishes Metfold offers are stunning. Their team helped us specify the exact profile and color for our award-winning facade design.' },
              { name: 'David Thompson', role: 'Builder, Thompson Roofing', initials: 'DT', text: 'We\'ve used Metfold for 5+ years. Fast quotes, consistent quality, and their online ordering makes life so much easier. Highly recommended for any roofing contractor.' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{testimonial.initials}</div>
                  <div className="testimonial-author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA + NEWSLETTER COMBINED */}
      <section className="section cta-section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="cta-glow"></div>
            <div className="cta-content">
              <h2 className="text-gradient">Ready to Build Your Vision?</h2>
              <p>Join the hundreds of builders and architects who trust Metfold for their most ambitious projects.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Start a Quote <ArrowRight size={18} />
                </Link>
                <Link to="/shop" className="btn btn-secondary btn-lg">
                  Browse Shop
                </Link>
              </div>
              {/* Inline newsletter */}
              <form className="newsletter-form" onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.querySelector('input');
                if (input.value) input.value = '';
              }} style={{ marginTop: '2rem', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                <input type="email" placeholder="Enter your email for updates" required style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>Join 2,500+ industry professionals. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
