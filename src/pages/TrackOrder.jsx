
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, MapPin, Clock, AlertCircle } from 'lucide-react';

const MOCK_ORDERS = {
    'MET-20260215-001': {
        status: 'in-transit',
        product: 'Custom Profile Roofing Sheet x10',
        orderedDate: 'Feb 14, 2026',
        estimatedDelivery: 'Feb 19, 2026',
        steps: [
            { label: 'Order Placed', date: 'Feb 14, 2026 – 9:15 AM', complete: true },
            { label: 'Fabrication Started', date: 'Feb 14, 2026 – 2:30 PM', complete: true },
            { label: 'Quality Check Passed', date: 'Feb 15, 2026 – 10:00 AM', complete: true },
            { label: 'Shipped', date: 'Feb 15, 2026 – 3:45 PM', complete: true },
            { label: 'Out for Delivery', date: 'Estimated Feb 19', complete: false }
        ]
    }
};

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const upperId = orderId.toUpperCase().trim();
        if (MOCK_ORDERS[upperId]) {
            setResult({ id: upperId, ...MOCK_ORDERS[upperId] });
            setError(false);
        } else {
            setResult(null);
            setError(true);
        }
    };

    return (
        <div className="track-order-page section page-transition">
            <div className="container" style={{ maxWidth: '700px' }}>
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        background: 'rgba(27,58,92,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Package size={32} color="var(--primary)" />
                    </div>
                    <h1 className="text-gradient">Track Your Order</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Enter your order number to view real-time tracking updates.</p>
                </motion.header>

                <motion.form
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex', gap: '1rem',
                        marginBottom: '2rem'
                    }}
                >
                    <input
                        type="text"
                        placeholder="e.g. MET-20260215-001"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                        style={{
                            flex: 1, padding: '1rem 1.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--text-main)', outline: 'none',
                            fontFamily: 'inherit', fontSize: '1rem',
                            transition: 'border-color 0.3s, box-shadow 0.3s'
                        }}
                    />
                    <button type="submit" className="btn btn-primary">
                        <Search size={18} /> Track
                    </button>
                </motion.form>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '2rem' }}>
                    Try: <button onClick={() => setOrderId('MET-20260215-001')} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 600, padding: 0 }}>MET-20260215-001</button>
                </p>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-panel"
                            style={{ padding: '2rem', textAlign: 'center' }}
                        >
                            <AlertCircle size={36} color="var(--danger)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>Order Not Found</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Please check your order number and try again, or contact us for assistance.</p>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-panel"
                            style={{ padding: '2.5rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: 0 }}>Order Number</p>
                                    <h3 style={{ margin: 0, color: 'var(--primary)' }}>{result.id}</h3>
                                </div>
                                <div style={{
                                    padding: '0.4rem 1rem',
                                    background: 'rgba(16,185,129,0.1)',
                                    border: '1px solid rgba(16,185,129,0.3)',
                                    borderRadius: 'var(--radius-full)',
                                    color: 'var(--success)',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}>
                                    In Transit
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                                {[
                                    { label: 'Product', value: result.product, icon: <Package size={16} /> },
                                    { label: 'Ordered', value: result.orderedDate, icon: <Clock size={16} /> },
                                    { label: 'Est. Delivery', value: result.estimatedDelivery, icon: <MapPin size={16} /> }
                                ].map((info, idx) => (
                                    <div key={idx} style={{
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--glass-border)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                                            {info.icon} {info.label}
                                        </div>
                                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{info.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Timeline */}
                            <h4 style={{ marginBottom: '1.5rem' }}>Tracking Timeline</h4>
                            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                <div style={{
                                    position: 'absolute', left: '11px', top: '8px', bottom: '8px',
                                    width: '2px',
                                    background: 'linear-gradient(to bottom, var(--success), var(--glass-border))'
                                }}></div>

                                {result.steps.map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 + 0.3 }}
                                        style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem', position: 'relative' }}
                                    >
                                        <div style={{
                                            width: '24px', height: '24px', borderRadius: '50%',
                                            background: step.complete ? 'var(--success)' : 'var(--glass-surface)',
                                            border: step.complete ? 'none' : '2px solid var(--glass-border)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0, zIndex: 2,
                                            boxShadow: step.complete ? '0 0 10px rgba(16,185,129,0.4)' : 'none'
                                        }}>
                                            {step.complete && <CheckCircle size={14} color="white" />}
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: step.complete ? 'white' : 'var(--text-dim)' }}>
                                                {step.label}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)' }}>{step.date}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrackOrder;
