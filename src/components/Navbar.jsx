import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu, X, Phone, Heart, Package, LogOut, TrendingUp, Zap, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { NAV_STRUCTURE, PRODUCTS } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount } = useCart();
  const { isLoggedIn, userName, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeout = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setShowUserMenu(false);
    setShowSearch(false);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (id) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const results = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Promo Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-bar-marquee">
              <span className="top-bar-text">
                <Zap size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Free Shipping on orders over $500 &nbsp;|&nbsp;
                🇦🇺 Proudly Australian Made &nbsp;|&nbsp;
                <Star size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Premium Quality Guaranteed
              </span>
            </div>
            <div className="top-right">
              <Link to="/track-order"><Package size={12} /> Track Order</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Flipkart Style */}
      <div className="main-header">
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link to="/" className="logo-link">
              <div className="logo-icon-box">
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                  <path d="M15 65 L50 30 L85 65" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M25 72 L50 42 L75 72" stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="logo-text">
                <div className="logo-brand">METFOLD</div>
                <div className="logo-sub">Sheet Metal</div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="search-bar-container" ref={searchRef}>
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search for roofing, gutters, cladding and more..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => searchResults.length > 0 && setShowSearch(true)}
                />
                <button className="search-btn" type="submit"><Search size={18} /></button>
              </form>

              {/* Live Search Results Dropdown */}
              <AnimatePresence>
                {showSearch && searchResults.length > 0 && (
                  <motion.div
                    className="search-results-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {searchResults.map(product => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="search-result-item"
                        onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                      >
                        <div className="search-result-icon">
                          <Search size={14} />
                        </div>
                        <div className="search-result-info">
                          <span className="search-result-name">{product.name}</span>
                          <span className="search-result-category">{product.categoryName}</span>
                        </div>
                        <span className="search-result-price">{product.priceRange}</span>
                      </Link>
                    ))}
                    <Link
                      to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                      className="search-result-all"
                      onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                    >
                      See all results for "{searchQuery}" →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Items */}
            <div className="header-actions">
              {/* User Account */}
              <div className="user-action-wrap" ref={userMenuRef}>
                <button
                  className="action-item"
                  onClick={() => isLoggedIn ? setShowUserMenu(!showUserMenu) : navigate('/account')}
                  onMouseEnter={() => isLoggedIn && setShowUserMenu(true)}
                >
                  <div className="action-avatar">
                    <User size={18} />
                  </div>
                  <div className="action-text">
                    <span className="sub-text">{isLoggedIn ? `Hello, ${userName}` : 'Login'}</span>
                    <span className="main-text">
                      Account <ChevronDown size={12} style={{ display: 'inline' }} />
                    </span>
                  </div>
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {showUserMenu && isLoggedIn && (
                    <motion.div
                      className="user-dropdown"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setShowUserMenu(false)}
                    >
                      <div className="user-dropdown-header">
                        <div className="user-avatar-lg">{userName.charAt(0).toUpperCase()}</div>
                        <div>
                          <p className="user-name">{userName}</p>
                          <p className="user-role">Member</p>
                        </div>
                      </div>
                      <div className="user-dropdown-divider"></div>
                      <Link to="/account" className="user-dropdown-item">
                        <User size={16} /> My Account
                      </Link>
                      <Link to="/track-order" className="user-dropdown-item">
                        <Package size={16} /> My Orders
                      </Link>
                      <Link to="/cart" className="user-dropdown-item">
                        <Heart size={16} /> Wishlist
                      </Link>
                      {(userName === 'Admin' || userName === 'admin' || userName === 'admin@metfold.com') && (
                        <>
                          <div className="user-dropdown-divider"></div>
                          <Link to="/admin" className="user-dropdown-item" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                            <Zap size={16} /> Admin Dashboard
                          </Link>
                        </>
                      )}
                      <div className="user-dropdown-divider"></div>
                      <button className="user-dropdown-item logout-item" onClick={logout}>
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link to="/cart" className="action-item cart-action">
                <div className="cart-icon-wrap">
                  <ShoppingCart size={20} />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        className="cart-count"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        key={cartCount}
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="action-text">
                  <span className="sub-text">Your</span>
                  <span className="main-text">Cart</span>
                </div>
              </Link>

              {/* Phone */}
              <a href="tel:1800638653" className="action-item phone-item">
                <Phone size={16} className="action-icon" />
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

      {/* Category Navigation Bar */}
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
                      <AnimatePresence>
                        {openDropdown === navItem.id && (
                          <motion.div
                            className="dropdown-menu visible"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                          >
                            {navItem.items.map(sub => (
                              <Link
                                key={sub.id}
                                to={`/category/${sub.id}`}
                                className="dropdown-item"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-header">
              {isLoggedIn ? (
                <div className="mobile-user-info">
                  <div className="mobile-user-avatar">{userName.charAt(0).toUpperCase()}</div>
                  <div>
                    <span className="mobile-user-name">{userName}</span>
                    <span className="mobile-user-email">Member Account</span>
                  </div>
                </div>
              ) : (
                <Link to="/account" onClick={() => setIsMenuOpen(false)} className="mobile-login-btn">
                  <User size={20} /> Login / Register
                </Link>
              )}
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

              {isLoggedIn && (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="mobile-logout-btn">
                  <LogOut size={18} /> Logout
                </button>
              )}

              <a href="tel:1800638653" className="mobile-phone-cta">
                <Phone size={18} /> 1800 638 3653
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header >
  );
};

export default Navbar;
