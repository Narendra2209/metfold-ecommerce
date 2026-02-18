import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff, LogIn, LogOut, Package, FileText, Settings, ChevronRight, ShoppingCart, Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO_EMAIL = 'admin@metfold.com';
const DEMO_PASSWORD = 'metfold123';

const Account = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { isLoggedIn, userName, login, logout } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                login('Admin', email);
            } else if (email && password) {
                login(email.split('@')[0], email);
            } else {
                setError('Invalid email or password. Use demo credentials below.');
            }
        } else {
            if (name && email && password) {
                login(name, email);
            }
        }
    };

    const handleLogout = () => {
        logout();
        setEmail('');
        setPassword('');
        setName('');
    };

    const inputStyle = {
        width: '100%', padding: '0.9rem 1rem 0.9rem 3rem',
        background: '#f8f9fb',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-main)', outline: 'none',
        fontFamily: 'inherit', fontSize: '1rem',
        transition: 'border-color 0.3s, box-shadow 0.3s'
    };

    const iconStyle = {
        position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
        color: 'var(--text-dim)', pointerEvents: 'none'
    };

    // LOGGED IN DASHBOARD
    if (isLoggedIn) {
        return (
            <div className="account-page section page-transition" style={{ minHeight: '80vh' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Welcome Header */}
                        <div className="account-header">
                            <div className="account-user-info">
                                <div className="account-avatar">{userName.charAt(0).toUpperCase()}</div>
                                <div>
                                    <h2 style={{ marginBottom: '0.25rem' }}>Welcome, {userName}!</h2>
                                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Manage your account, orders and preferences</p>
                                </div>
                            </div>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>

                        {/* Dashboard Grid */}
                        <div className="account-grid">
                            {[
                                { icon: <Package size={24} />, title: 'My Orders', desc: 'Track, return, or buy things again', link: '/track-order', color: '#2874f0' },
                                { icon: <Heart size={24} />, title: 'Wishlist', desc: 'Your saved items', link: '/shop', color: '#ff6161' },
                                { icon: <ShoppingCart size={24} />, title: 'Cart', desc: 'View items in your cart', link: '/cart', color: '#388e3c' },
                                { icon: <FileText size={24} />, title: 'My Quotes', desc: 'Saved and pending quotes', link: '/shop', color: '#ff9800' },
                                { icon: <MapPin size={24} />, title: 'Addresses', desc: 'Manage your delivery addresses', link: '#', color: '#9c27b0' },
                                { icon: <Settings size={24} />, title: 'Settings', desc: 'Profile, password, notifications', link: '#', color: '#607d8b' },
                            ].map((item, i) => (
                                <Link key={i} to={item.link} style={{ textDecoration: 'none' }}>
                                    <motion.div
                                        className="account-card"
                                        whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        <div className="account-card-icon" style={{ background: `${item.color}15`, color: item.color }}>
                                            {item.icon}
                                        </div>
                                        <div className="account-card-info">
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </div>
                                        <ChevronRight size={18} className="account-card-arrow" />
                                    </motion.div>
                                </Link>
                            ))}
                            {userName === 'Admin' && (
                                <Link to="/admin" style={{ textDecoration: 'none' }}>
                                    <motion.div
                                        className="account-card"
                                        whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                                        style={{ border: '2px solid var(--primary)', background: '#f8fafc' }}
                                    >
                                        <div className="account-card-icon" style={{ background: 'var(--primary)', color: 'white' }}>
                                            <Lock size={24} />
                                        </div>
                                        <div className="account-card-info">
                                            <h3>Admin Dashboard</h3>
                                            <p>Manage products & deals</p>
                                        </div>
                                        <ChevronRight size={18} className="account-card-arrow" />
                                    </motion.div>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // LOGIN / REGISTER FORM
    return (
        <div className="account-page section page-transition" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <motion.div
                className="glass-panel"
                style={{ width: '100%', maxWidth: '480px', padding: '3rem' }}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, var(--brand-navy), var(--brand-steel))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 24px rgba(27,58,92,0.2)'
                    }}>
                        <User size={28} color="white" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p style={{ marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {isLogin ? 'Sign in to manage your orders and quotes' : 'Join Metfold for faster quotes and order tracking'}
                    </p>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    background: '#f5f7fa',
                    borderRadius: 'var(--radius-md)',
                    padding: '4px',
                    marginBottom: '2rem',
                    border: '1px solid var(--glass-border)'
                }}>
                    {['Sign In', 'Register'].map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => { setIsLogin(i === 0); setError(''); }}
                            style={{
                                flex: 1, padding: '0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 600, fontSize: '0.9rem',
                                background: (i === 0 ? isLogin : !isLogin) ? 'var(--brand-navy)' : 'transparent',
                                color: (i === 0 ? isLogin : !isLogin) ? 'white' : 'var(--text-muted)',
                                transition: 'all 0.3s ease',
                                border: 'none', cursor: 'pointer'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: '0.75rem 1rem', marginBottom: '1rem',
                        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: 'var(--radius-sm)', color: 'var(--danger)',
                        fontSize: '0.88rem', fontWeight: 500
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? 'login' : 'register'}
                            initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
                            transition={{ duration: 0.25 }}
                        >
                            {!isLogin && (
                                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                    <User size={18} style={iconStyle} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                            )}

                            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                <Mail size={18} style={iconStyle} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </div>

                            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                                <Lock size={18} style={iconStyle} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 0
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {isLogin && (
                        <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                            <a href="#" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500 }}>
                                Forgot Password?
                            </a>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginBottom: '1.5rem' }}>
                        <LogIn size={18} />
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                {/* Demo credentials hint */}
                {isLogin && (
                    <div style={{
                        padding: '0.85rem 1rem', marginBottom: '1.25rem',
                        background: 'rgba(27,58,92,0.05)', border: '1px solid rgba(27,58,92,0.12)',
                        borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-muted)'
                    }}>
                        <strong style={{ color: 'var(--brand-navy)' }}>Demo Credentials:</strong><br />
                        Email: <code style={{ color: 'var(--brand-navy)', fontWeight: 600 }}>admin@metfold.com</code><br />
                        Password: <code style={{ color: 'var(--brand-navy)', fontWeight: 600 }}>metfold123</code>
                    </div>
                )}

                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: 0 }}>
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
                    >
                        {isLogin ? 'Register' : 'Sign In'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Account;
