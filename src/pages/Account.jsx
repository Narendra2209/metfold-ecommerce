
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff, LogIn, LogOut, Package, FileText, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEMO_EMAIL = 'admin@metfold.com';
const DEMO_PASSWORD = 'metfold123';

const Account = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('metfold_logged_in') === 'true');
    const [userName, setUserName] = useState(() => localStorage.getItem('metfold_user_name') || 'Admin');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                setIsLoggedIn(true);
                setUserName('Admin');
                localStorage.setItem('metfold_logged_in', 'true');
                localStorage.setItem('metfold_user_name', 'Admin');
            } else {
                setError('Invalid email or password. Use demo credentials below.');
            }
        } else {
            if (name && email && password) {
                setIsLoggedIn(true);
                setUserName(name);
                localStorage.setItem('metfold_logged_in', 'true');
                localStorage.setItem('metfold_user_name', name);
            }
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
        setName('');
        localStorage.removeItem('metfold_logged_in');
        localStorage.removeItem('metfold_user_name');
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
                <div className="container" style={{ maxWidth: '900px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Welcome Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <div>
                                <h2 style={{ marginBottom: '0.25rem' }}>Welcome, {userName}</h2>
                                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Manage your account and orders</p>
                            </div>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>

                        {/* Dashboard Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            {[
                                ...(email === DEMO_EMAIL ? [{ icon: <Settings size={24} />, title: 'Admin Dashboard', desc: 'Manage products & pricing', link: '/admin', color: 'var(--primary)' }] : []),
                                { icon: <Package size={24} />, title: 'My Orders', desc: 'View and track your orders', link: '/track-order', color: 'var(--brand-navy)' },
                                { icon: <FileText size={24} />, title: 'My Quotes', desc: 'View saved quotes', link: '/shop', color: 'var(--brand-steel)' },
                                { icon: <Settings size={24} />, title: 'Account Settings', desc: 'Update your profile', link: '#', color: 'var(--text-muted)' },
                            ].map((item, i) => (
                                <Link key={i} to={item.link} style={{ textDecoration: 'none' }}>
                                    <motion.div
                                        className="glass-panel"
                                        style={{ padding: '2rem', cursor: 'pointer', transition: 'all 0.3s' }}
                                        whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                                    >
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '12px',
                                            background: `${item.color}15`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            color: item.color, marginBottom: '1rem'
                                        }}>
                                            {item.icon}
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                        <ChevronRight size={16} style={{ marginTop: '1rem', color: 'var(--text-dim)' }} />
                                    </motion.div>
                                </Link>
                            ))}
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
