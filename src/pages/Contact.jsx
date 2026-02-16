
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Check, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '', email: '', phone: '', subject: '', message: '', submitted: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState(prev => ({ ...prev, submitted: true }));
    };

    return (
        <div className="contact-page section page-transition">
            <div className="container">
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.4rem 1.25rem',
                        background: 'rgba(27,58,92,0.1)',
                        border: '1px solid rgba(27,58,92,0.3)',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        marginBottom: '1.5rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        <MessageSquare size={16} /> Get in Touch
                    </span>
                    <h1 className="text-gradient">Contact Us</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>Have a question or need a custom quote? We're here to help.</p>
                </motion.header>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                { icon: <Phone size={22} />, title: 'Phone', info: '1300 MET FOLD', sub: 'Mon-Fri, 7am – 5pm AEST' },
                                { icon: <Mail size={22} />, title: 'Email', info: 'sales@metfold.com.au', sub: 'We reply within 2 hours' },
                                { icon: <MapPin size={22} />, title: 'Showroom', info: '123 Industrial Ave, Brooklyn VIC', sub: 'Open for walk-ins' },
                                { icon: <Clock size={22} />, title: 'Business Hours', info: 'Mon - Fri: 7:00 AM - 5:00 PM', sub: 'Saturday by appointment' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="glass-panel"
                                    style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                >
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: 'rgba(27,58,92,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--primary)', flexShrink: 0
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                                        <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' }}>{item.info}</p>
                                        <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.8rem' }}>{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        className="glass-panel"
                        style={{ padding: '3rem' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {formState.submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '3rem 0' }}
                            >
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%',
                                    background: 'rgba(16,185,129,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem'
                                }}>
                                    <Check size={32} color="var(--success)" />
                                </div>
                                <h3>Message Sent!</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. We'll respond within 2 business hours.</p>
                                <button onClick={() => setFormState({ name: '', email: '', phone: '', subject: '', message: '', submitted: false })} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Send size={20} color="var(--primary)" /> Send Us a Message
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-grid" style={{ marginBottom: '1rem' }}>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            required
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                            style={{
                                                width: '100%', padding: '0.85rem 1.25rem',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: 'var(--text-main)', outline: 'none',
                                                fontFamily: 'inherit', fontSize: '0.95rem',
                                                transition: 'border-color 0.3s, box-shadow 0.3s'
                                            }}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            value={formState.email}
                                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                                            style={{
                                                width: '100%', padding: '0.85rem 1.25rem',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: 'var(--text-main)', outline: 'none',
                                                fontFamily: 'inherit', fontSize: '0.95rem',
                                                transition: 'border-color 0.3s, box-shadow 0.3s'
                                            }}
                                        />
                                    </div>
                                    <div className="form-grid" style={{ marginBottom: '1rem' }}>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={formState.phone}
                                            onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                            style={{
                                                width: '100%', padding: '0.85rem 1.25rem',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: 'var(--text-main)', outline: 'none',
                                                fontFamily: 'inherit', fontSize: '0.95rem',
                                                transition: 'border-color 0.3s, box-shadow 0.3s'
                                            }}
                                        />
                                        <select
                                            value={formState.subject}
                                            onChange={e => setFormState({ ...formState, subject: e.target.value })}
                                            style={{
                                                width: '100%', padding: '0.85rem 1.25rem',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: 'var(--text-muted)', outline: 'none',
                                                fontFamily: 'inherit', fontSize: '0.95rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="" style={{ background: 'var(--bg-dark)' }}>Select Subject</option>
                                            <option value="quote" style={{ background: 'var(--bg-dark)' }}>Request a Quote</option>
                                            <option value="custom" style={{ background: 'var(--bg-dark)' }}>Custom Order</option>
                                            <option value="support" style={{ background: 'var(--bg-dark)' }}>Order Support</option>
                                            <option value="general" style={{ background: 'var(--bg-dark)' }}>General Enquiry</option>
                                        </select>
                                    </div>
                                    <textarea
                                        placeholder="Your Message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        style={{
                                            width: '100%', padding: '0.85rem 1.25rem',
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: 'var(--radius-sm)',
                                            color: 'var(--text-main)', outline: 'none',
                                            fontFamily: 'inherit', fontSize: '0.95rem',
                                            resize: 'vertical', marginBottom: '1.5rem',
                                            transition: 'border-color 0.3s, box-shadow 0.3s'
                                        }}
                                    />
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                                        <Send size={18} /> Send Message
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
