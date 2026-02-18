import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight, ShieldCheck, Truck, CreditCard, RefreshCw, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const guarantees = [
        { icon: <Truck size={28} />, title: 'Free Shipping', desc: 'On orders over $500' },
        { icon: <ShieldCheck size={28} />, title: 'Premium Quality', desc: 'AS/NZS certified' },
        { icon: <RefreshCw size={28} />, title: 'Easy Returns', desc: '30-day return policy' },
        { icon: <Headphones size={28} />, title: '24/7 Support', desc: 'Expert assistance' },
        { icon: <CreditCard size={28} />, title: 'Secure Payment', desc: '256-bit SSL encrypted' }
    ];

    return (
        <footer className="footer">
            {/* Guarantee Strip */}
            <div className="footer-guarantees">
                <div className="container">
                    <div className="guarantees-grid">
                        {guarantees.map((item, i) => (
                            <motion.div
                                key={i}
                                className="guarantee-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <div className="guarantee-icon">{item.icon}</div>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-brand-col">
                            <div className="footer-logo">
                                <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                                    <path d="M15 65 L50 30 L85 65" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M25 72 L50 42 L75 72" stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M35 78 L50 55 L65 78" stroke="rgba(255,255,255,0.4)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="footer-brand-name">METFOLD</span>
                            </div>
                            <p className="footer-brand-desc">
                                Premium metal roofing, cladding, and rainwater solutions for builders and architects across Australia. Proudly Australian operated.
                            </p>
                            <div className="footer-socials">
                                {[
                                    { Icon: Facebook, label: 'Facebook' },
                                    { Icon: Instagram, label: 'Instagram' },
                                    { Icon: Twitter, label: 'Twitter' },
                                    { Icon: Linkedin, label: 'LinkedIn' }
                                ].map(({ Icon, label }, i) => (
                                    <a key={i} href="#" className="social-link" aria-label={label}>
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* About Column */}
                        <div className="footer-col">
                            <h4 className="footer-heading">ABOUT</h4>
                            <ul className="footer-links">
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/blog">Blog & News</Link></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Press</a></li>
                            </ul>
                        </div>

                        {/* Help Column */}
                        <div className="footer-col">
                            <h4 className="footer-heading">HELP</h4>
                            <ul className="footer-links">
                                <li><Link to="/track-order">Track Order</Link></li>
                                <li><Link to="/account">My Account</Link></li>
                                <li><Link to="/cart">Shopping Cart</Link></li>
                                <li><a href="#">Payments</a></li>
                                <li><a href="#">Shipping Info</a></li>
                                <li><a href="#">Returns & Refunds</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Products Column */}
                        <div className="footer-col">
                            <h4 className="footer-heading">PRODUCTS</h4>
                            <ul className="footer-links">
                                <li><Link to="/category/roof-sheets">Roof Sheets</Link></li>
                                <li><Link to="/category/cladding">Cladding</Link></li>
                                <li><Link to="/category/fascia-gutter">Facia & Gutter</Link></li>
                                <li><Link to="/category/downpipes">Downpipes</Link></li>
                                <li><Link to="/shop">All Products</Link></li>
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div className="footer-col">
                            <h4 className="footer-heading">CONTACT</h4>
                            <div className="footer-contact-list">
                                <div className="footer-contact-item">
                                    <MapPin size={16} />
                                    <span>123 Industrial Ave, Brooklyn VIC 3012</span>
                                </div>
                                <div className="footer-contact-item">
                                    <Phone size={16} />
                                    <span>1300 MET FOLD</span>
                                </div>
                                <div className="footer-contact-item">
                                    <Mail size={16} />
                                    <span>sales@metfold.com.au</span>
                                </div>
                            </div>

                            {/* Newsletter mini */}
                            <div className="footer-newsletter">
                                <h4 className="footer-heading" style={{ marginTop: '1.5rem' }}>NEWSLETTER</h4>
                                <form onSubmit={(e) => e.preventDefault()} className="footer-newsletter-form">
                                    <input type="email" placeholder="Your email" />
                                    <button type="submit"><ArrowRight size={16} /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-inner">
                        <p className="footer-copyright">
                            © 2026 Metfold Metal Solutions. All rights reserved.
                        </p>
                        <div className="footer-bottom-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Warranty</a>
                            <a href="#">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
