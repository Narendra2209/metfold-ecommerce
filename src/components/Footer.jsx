
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', textAlign: 'left', marginBottom: '4rem' }}>
                    {/* Brand Info */}
                    <div className="footer-brand">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                                <path d="M15 65 L50 30 L85 65" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M25 72 L50 42 L75 72" stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M35 78 L50 55 L65 78" stroke="rgba(255,255,255,0.4)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>METFOLD</span>
                        </div>
                        <p style={{ lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Premium metal roofing, cladding, and rainwater solutions for builders and architects across Australia.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    style={{
                                        width: '36px', height: '36px', borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Quick Links</h4>
                        {[
                            { to: '/shop', label: 'Shop All' },
                            { to: '/category/roof-sheets', label: 'Roof Sheets' },
                            { to: '/category/fascia-gutter', label: 'Facia & Gutter' },
                            { to: '/category/cladding', label: 'Cladding' },
                            { to: '/about', label: 'About Us' },
                            { to: '/blog', label: 'Blog' }
                        ].map(link => (
                            <Link key={link.to} to={link.to} style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Customer Service</h4>
                        {[
                            { to: '/contact', label: 'Contact Us' },
                            { to: '/track-order', label: 'Track Order' },
                            { to: '/account', label: 'My Account' },
                            { to: '/cart', label: 'Shopping Cart' },
                            { to: '/checkout', label: 'Checkout' }
                        ].map(link => (
                            <Link key={link.to} to={link.to} style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Get in Touch</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <Phone size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                                <span>1300 MET FOLD</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <Mail size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                                <span>sales@metfold.com.au</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <MapPin size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                                <span>123 Industrial Ave, Brooklyn VIC 3012</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: 0 }}>
                        © 2026 Metfold Metal Solutions. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                        <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
                        <a href="#" style={{ color: 'inherit' }}>Warranty</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
