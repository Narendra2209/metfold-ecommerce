
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight, Box, ShieldCheck, RefreshCw, CirclePlay, Zap, Trophy, Truck, ArrowRight, Star, Send, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, NAV_STRUCTURE } from '../data/products';
import ProductCard from '../components/ProductCard';

// Components
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

// Section Header Component
const SectionHeader = ({ title, subtitle, accent }) => (
  <motion.header
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, margin: '-50px' }}
    style={{ textAlign: 'center', marginBottom: '4rem' }}
  >
    {accent && (
      <span style={{
        display: 'inline-block',
        padding: '0.4rem 1.25rem',
        background: 'rgba(27,58,92,0.08)',
        border: '1px solid rgba(27,58,92,0.15)',
        borderRadius: 'var(--radius-full)',
        color: 'var(--brand-navy)',
        fontWeight: 600,
        fontSize: '0.85rem',
        marginBottom: '1.5rem',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>{accent}</span>
    )}
    <h2 className="text-gradient">{title}</h2>
    {subtitle && <p style={{ maxWidth: '600px', margin: '0 auto' }}>{subtitle}</p>}
  </motion.header>
);

const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 8);
  const scrollRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="home-container">
      {/* ============================================================
          1. HERO SECTION
          ============================================================ */}
      <section className="hero-section" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* 3D Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Suspense fallback={<div style={{ background: 'var(--brand-navy)', width: '100%', height: '100%' }} />}>
            <Hero3D />
          </Suspense>
        </div>

        {/* Gradient Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(27,58,92,0.85) 0%, rgba(27,58,92,0.5) 50%, rgba(27,58,92,0.75) 100%)', zIndex: 1 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '800px' }}
          >
            <motion.div variants={itemVariants} style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.85rem',
              marginBottom: '2rem',
              letterSpacing: '2px'
            }}>
              ✦ PROUDLY AUSTRALIAN OPERATED
            </motion.div>

            <motion.h1 variants={itemVariants} style={{ marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.05, color: 'white' }}>
              REDEFINING <br />
              METAL ARCHITECTURE
            </motion.h1>

            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: 1.7 }}>
              Metfold delivers precision-engineered roofing and cladding solutions with industrial-grade durability and premium aesthetics.
            </motion.p>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Explore Catalog <ChevronRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                Watch Process <CirclePlay size={20} />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '2.5rem', marginTop: '4rem', flexWrap: 'wrap' }}>
              {[
                { icon: <ShieldCheck size={20} />, text: 'AS/NZS Certified' },
                { icon: <Truck size={18} />, text: 'Nationwide Delivery' },
                { icon: <Zap size={18} />, text: '24hr Quotes' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  <div style={{ color: 'rgba(255,255,255,0.9)' }}>{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-dim)',
            fontSize: '0.8rem'
          }}
        >
          <span>Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================
          2. STATS BAR
          ============================================================ */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { value: '15', suffix: '+', color: 'var(--primary)', label: 'Years Experience' },
              { value: '2500', suffix: '+', color: 'var(--brand-navy)', label: 'Projects Completed' },
              { value: '100', suffix: '%', color: 'var(--brand-steel)', label: 'AU Sourced Steel' },
              { value: '24', suffix: 'h', color: 'var(--text-main)', label: 'Quote Turnaround' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 style={{ color: stat.color }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </h2>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. SHOP BY CATEGORY
          ============================================================ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <SectionHeader
            accent="Browse Categories"
            title="Shop By Category"
            subtitle="Explore our comprehensive range of premium metal products for every application."
          />

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {NAV_STRUCTURE.map((nav, index) => {
              const firstCat = nav.hasDropdown && nav.items?.length > 0
                ? CATEGORIES.find(c => c.id === nav.items[0].id)
                : CATEGORIES.find(c => c.id === nav.id);
              const linkTo = nav.hasDropdown && nav.items?.length > 0
                ? `/category/${nav.items[0].id}`
                : nav.linkTo || `/category/${nav.id}`;
              const description = firstCat?.description || 'Explore our product range.';

              return (
                <motion.div
                  key={nav.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true, margin: '-30px' }}
                >
                  <Link to={linkTo} className="glass-panel" style={{
                    display: 'block',
                    padding: '2rem',
                    textDecoration: 'none',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = 'rgba(27,58,92,0.3)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(27,58,92,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '120px',
                      height: '120px',
                      background: `radial-gradient(circle at top right, rgba(27,58,92,0.08) 0%, transparent 70%)`,
                      borderRadius: '0 0 0 100%',
                      zIndex: 0
                    }}></div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, rgba(27,58,92,0.15), rgba(27,58,92,0.05))`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        color: 'var(--primary)'
                      }}>
                        <Box size={28} />
                      </div>
                      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>{nav.label}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{description}</p>
                      {nav.hasDropdown && nav.items && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                          {nav.items.map(sub => (
                            <span key={sub.id} style={{
                              fontSize: '0.75rem',
                              padding: '0.2rem 0.6rem',
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: 'var(--radius-full)',
                              color: 'var(--text-dim)'
                            }}>
                              {sub.label}
                            </span>
                          ))}
                        </div>
                      )}
                      <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Explore <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. FEATURED PRODUCTS
          ============================================================ */}
      <section className="section featured-products" style={{ background: 'linear-gradient(180deg, #fff 0%, #f5f7fa 100%)' }}>
        <div className="container">
          <SectionHeader
            accent="Popular Products"
            title="Featured Products"
            subtitle="Our most popular roofing and cladding solutions trusted by builders nationwide."
          />

          <div className="products-scroll">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true, margin: '-30px' }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <Link to="/shop" className="btn btn-outline btn-lg">
              View All Products <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          5. BENTO GRID FEATURES
          ============================================================ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <SectionHeader
            accent="Why Choose Us"
            title="Engineered for Excellence"
            subtitle="Our commitment to quality starts with the world's best materials."
          />

          <div className="bento-grid">
            {/* Large Feature Card */}
            <motion.div
              className="glass-panel bento-item"
              style={{ gridColumn: 'span 8', padding: '3rem', position: 'relative', overflow: 'hidden' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(27,58,92,0.2), rgba(27,58,92,0.05))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '2rem'
                }}>
                  <Box size={28} color="var(--primary)" />
                </div>
                <h3 style={{ marginBottom: '1rem' }}>Custom CNC Folding</h3>
                <p style={{ maxWidth: '450px', lineHeight: 1.7 }}>Our state-of-the-art facility utilizes computer-controlled folding technology to achieve tolerances down to 0.5mm on any architectural profile.</p>
                <Link to="/about" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Our Technology <ArrowRight size={16} /></Link>
              </div>
              <div style={{ position: 'absolute', right: '-5%', bottom: '-10%', opacity: 0.05 }}>
                <Box size={250} />
              </div>
            </motion.div>

            {/* Quality Card */}
            <motion.div
              className="glass-panel bento-item"
              style={{ gridColumn: 'span 4', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(0,217,255,0.05))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <ShieldCheck size={28} color="var(--highlight)" />
              </div>
              <h3>Certified Quality</h3>
              <p style={{ fontSize: '0.95rem' }}>AS/NZS ISO 9001 certified manufacturing process for guaranteed performance in Australian conditions.</p>
            </motion.div>

            {/* Rapid Response */}
            <motion.div
              className="glass-panel bento-item"
              style={{ gridColumn: 'span 4', padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(139,146,168,0.2), rgba(139,146,168,0.05))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <RefreshCw size={28} color="var(--secondary-light)" />
              </div>
              <h3>Rapid Response</h3>
              <p style={{ fontSize: '0.95rem' }}>Optimized supply chain for fast lead times on both standard and custom profiles.</p>
            </motion.div>

            {/* Finishes Card */}
            <motion.div
              className="glass-panel bento-item"
              style={{ gridColumn: 'span 8', padding: '3rem', background: 'linear-gradient(135deg, rgba(27,58,92,0.08) 0%, transparent 100%)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 style={{ marginBottom: '1rem' }}>Architectural Finishes</h3>
              <p style={{ maxWidth: '500px' }}>Explore our wide range of Colorbond, Zincalume, and specialized metallic coatings that stand the test of time.</p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {[
                  { name: 'Monument', hex: '#333333' },
                  { name: 'Basalt', hex: '#696969' },
                  { name: 'Surfmist', hex: '#F5F5F5' },
                  { name: 'Dune', hex: '#BCAFA3' },
                  { name: 'Ironstone', hex: '#36454F' },
                  { name: 'Night Sky', hex: '#1C1C1C' },
                  { name: 'Woodland', hex: '#4F4F4F' },
                  { name: 'Manor Red', hex: '#800000' }
                ].map((color, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2, y: -4 }}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '50%',
                      background: color.hex,
                      border: '2px solid rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. PROCESS / HOW IT WORKS
          ============================================================ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #fff 0%, #f5f7fa 100%)' }}>
        <div className="container">
          <SectionHeader
            accent="Simple Process"
            title="How It Works"
            subtitle="From quote to delivery, we make it easy to get the materials you need."
          />

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', icon: <Star size={28} />, title: 'Choose Your Profile', desc: 'Browse our catalog and select the roofing or cladding profile that suits your project.' },
              { step: '02', icon: <Box size={28} />, title: 'Customize Options', desc: 'Select your finish, color, thickness, and custom dimensions for a perfect fit.' },
              { step: '03', icon: <ShieldCheck size={28} />, title: 'Get Instant Quote', desc: 'Our system calculates pricing in real-time. No hidden costs, no surprises.' },
              { step: '04', icon: <Truck size={28} />, title: 'Fast Delivery', desc: 'Your order is fabricated and shipped direct to your site with full tracking.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="glass-panel"
                style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: '-30px' }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '10px',
                  fontSize: '5rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  zIndex: 0
                }}>
                  {item.step}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(27,58,92,0.15), rgba(27,58,92,0.05))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: 'var(--primary)'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          7. TESTIMONIALS
          ============================================================ */}
      <section className="section testimonials-section" style={{ background: '#fff' }}>
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
                className="glass-panel testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: '-30px' }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="quote-mark">"</div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
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

      {/* ============================================================
          8. NEWSLETTER
          ============================================================ */}
      <section className="section newsletter-section" style={{ background: 'linear-gradient(180deg, #fff 0%, #f5f7fa 100%)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-flex',
              padding: '0.75rem',
              background: 'rgba(27,58,92,0.1)',
              borderRadius: '16px',
              marginBottom: '2rem'
            }}>
              <Send size={24} color="var(--primary)" />
            </div>
            <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Stay in the Loop</h2>
            <p style={{ marginBottom: '2.5rem' }}>Get exclusive deals, new product updates and industry insights delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.querySelector('input');
              if (input.value) {
                input.value = '';
              }
            }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                Subscribe <ArrowRight size={18} />
              </button>
            </form>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '1rem' }}>Join 2,500+ industry professionals. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          9. FINAL CTA
          ============================================================ */}
      <section className="section cta-section" style={{ textAlign: 'center' }}>
        <div className="container">
          <motion.div
            className="glass-panel"
            style={{
              padding: '6rem 2rem',
              overflow: 'hidden',
              position: 'relative'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'radial-gradient(circle at 50% 120%, rgba(27,58,92,0.12) 0%, transparent 60%)',
              zIndex: 0
            }}></div>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'radial-gradient(circle at 0% 0%, rgba(0,217,255,0.05) 0%, transparent 40%)',
              zIndex: 0
            }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-gradient" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Ready to Build Your Vision?</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>Join the hundreds of builders and architects who trust Metfold for their most ambitious projects.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/contact" className="btn btn-primary btn-lg">
                    Start a Quote <ArrowRight size={18} />
                  </Link>
                  <Link to="/shop" className="btn btn-secondary btn-lg">
                    Browse Shop
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
