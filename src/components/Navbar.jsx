import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu, X, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { NAV_STRUCTURE } from '../data/products';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { cartCount } = useCart();
  const location = useLocation();
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (id) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <span className="top-bar-text">🇦🇺 Proudly Australian Made | Free shipping on orders over $500</span>
            <div className="top-right">
              <Link to="/track-order">Track Order</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link to="/" className="logo-link">
              {/* <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                <path d="M15 65 L50 30 L85 65" stroke="#1B3A5C" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25 72 L50 42 L75 72" stroke="#4A7BA7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M35 78 L50 55 L65 78" stroke="#7AADD4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg> */}
              <div className="logo-text">
                <div className="logo-brand">METFOLD</div>
                <div className="logo-sub">Sheet Metal</div>
              </div>
            </Link>

            {/* Search */}
            <div className="search-bar-container">
              <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                <input className="search-input" type="text" placeholder="Search roofing, gutters, cladding..." />
                <button className="search-btn" type="submit"><Search size={16} /></button>
              </form>
            </div>

            {/* Actions */}
            <div className="header-actions">
              <Link to="/account" className="action-item">
                <User size={20} className="action-icon" />
                <div className="action-text">
                  <span className="sub-text">Hello</span>
                  <span className="main-text">Account</span>
                </div>
              </Link>

              <Link to="/cart" className="action-item">
                <div className="cart-icon-wrap">
                  <ShoppingCart size={20} className="action-icon" />
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </div>
                <div className="action-text">
                  <span className="sub-text">Your</span>
                  <span className="main-text">Cart</span>
                </div>
              </Link>

              <a href="tel:1800638653" className="action-item phone-item">
                <Phone size={18} className="action-icon" />
                <div className="action-text">
                  <span className="sub-text">Call Us</span>
                  <span className="main-text phone-number">1800 638 3653</span>
                </div>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="main-nav">
        <div className="container">
          <div className="nav-inner">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                  Home
                </NavLink>
              </li>

              {NAV_STRUCTURE.map(navItem => (
                <li
                  key={navItem.id}
                  className={`nav-item ${navItem.hasDropdown ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => navItem.hasDropdown && handleMouseEnter(navItem.id)}
                  onMouseLeave={() => navItem.hasDropdown && handleMouseLeave()}
                >
                  {navItem.hasDropdown ? (
                    <>
                      <button className={`nav-link nav-dropdown-trigger ${openDropdown === navItem.id ? 'open' : ''}`}>
                        {navItem.label}
                        <ChevronDown size={14} className={`nav-arrow ${openDropdown === navItem.id ? 'rotated' : ''}`} />
                      </button>
                      <div className={`dropdown-menu ${openDropdown === navItem.id ? 'visible' : ''}`}>
                        {navItem.items.map(sub => (
                          <Link
                            key={sub.id}
                            to={`/category/${sub.id}`}
                            className="dropdown-item"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={navItem.linkTo || `/category/${navItem.id}`}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                      {navItem.label}
                    </NavLink>
                  )}
                </li>
              ))}

              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <span className="mobile-menu-brand">METFOLD</span>
            <button onClick={() => setIsMenuOpen(false)} className="mobile-menu-close">
              <X size={28} />
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Home</Link>

            {NAV_STRUCTURE.map(navItem => (
              <div key={navItem.id} className="mobile-nav-group">
                {navItem.hasDropdown ? (
                  <>
                    <div className="mobile-nav-group-title">{navItem.label}</div>
                    {navItem.items.map(sub => (
                      <Link
                        key={sub.id}
                        to={`/category/${sub.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="mobile-nav-sublink"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={navItem.linkTo || `/category/${navItem.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="mobile-nav-link"
                  >
                    {navItem.label}
                  </Link>
                )}
              </div>
            ))}

            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Contact</Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Cart ({cartCount})</Link>
            <Link to="/account" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Account</Link>

            <a href="tel:1800638653" className="mobile-phone-cta">
              <Phone size={18} /> 1800 638 3653
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
