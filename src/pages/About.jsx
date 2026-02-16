
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Clock, Award, Target, Wrench, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const features = [
        { icon: <Shield size={32} />, color: 'var(--primary)', title: 'Quality Guarantee', text: 'Every piece that leaves our facility undergoes rigorous quality control to ensure it meets Australian standards and your exact specifications.' },
        { icon: <Users size={32} />, color: 'var(--highlight)', title: 'Expert Team', text: 'Our fabricators have decades of combined experience working with architectural metalwork and specialized cladding systems.' },
        { icon: <Award size={32} />, color: '#fbbf24', title: 'Award Winning', text: 'Recognized for excellence in architectural sheet metal fabrication and innovative manufacturing processes.' },
        { icon: <Target size={32} />, color: 'var(--secondary-light)', title: 'Precision Focus', text: 'Computer-controlled folding technology achieves tolerances down to 0.5mm on any architectural profile.' }
    ];

    const capabilities = [
        'Custom CNC Folding & Bending',
        'Laser Cutting & Profiling',
        'Colorbond, Zincalume & Stainless Steel',
        'Architectural Cladding Systems',
        'Complete Rainwater Solutions',
        'CAD Design Support'
    ];

    return (
        <div className="about-page page-transition">
            <div className="container section">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <span style={{
                        display: 'inline-block',
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
                    }}>About Metfold</span>
                    <h1 className="text-gradient">Innovating the Metal Industry</h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
                        Metfold is more than just a fabrication shop. We are a team of engineers and craftsmen
                        dedicated to providing Australia's building industry with the highest quality metal
                        components and cladding systems.
                    </p>
                </motion.header>

                {/* Feature Cards */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                    {features.map((f, index) => (
                        <motion.div
                            key={index}
                            className="glass-panel"
                            style={{ padding: '2.5rem' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '16px',
                                background: `${f.color}15`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: f.color
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{f.title}</h3>
                            <p style={{ lineHeight: 1.7 }}>{f.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Facility Section */}
                <motion.div
                    className="glass-panel"
                    style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.3rem 1rem',
                            background: 'rgba(27,58,92,0.1)',
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--primary)',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            marginBottom: '1.5rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>Our Facility</span>
                        <h2 className="text-gradient-accent" style={{ marginBottom: '1.5rem' }}>State-of-the-Art Manufacturing</h2>
                        <p style={{ lineHeight: 1.7 }}>Located in the heart of the industrial district, our facility features computer-controlled folding machines and precision cutting technology that allows us to achieve tolerances other shops simply can't match.</p>

                        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '2rem' }}>
                            {capabilities.map((cap, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                                    <Check size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                                    {cap}
                                </div>
                            ))}
                        </div>

                        <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                            Get a Quote <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        height: '400px',
                        background: 'linear-gradient(135deg, rgba(27,58,92,0.05) 0%, rgba(0,217,255,0.05) 100%)',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at 50% 50%, rgba(27,58,92,0.08) 0%, transparent 60%)'
                        }}></div>
                        <div style={{ textAlign: 'center', zIndex: 1 }}>
                            <Wrench size={64} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Precision Manufacturing Facility</p>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline / Milestones */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Our Journey</h2>
                    <p>From humble beginnings to industry leaders in metal fabrication.</p>
                </motion.div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { year: '2010', title: 'Founded', desc: 'Started with a single folding machine and a vision for quality.' },
                        { year: '2015', title: 'ISO Certified', desc: 'Achieved AS/NZS ISO 9001 certification for manufacturing.' },
                        { year: '2020', title: 'CNC Upgrade', desc: 'Invested in state-of-the-art CNC folding technology.' },
                        { year: '2025', title: 'National Reach', desc: 'Now serving builders and architects across all of Australia.' }
                    ].map((m, idx) => (
                        <motion.div
                            key={idx}
                            className="glass-panel"
                            style={{ padding: '2rem', textAlign: 'center' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                        >
                            <div style={{
                                fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)',
                                color: 'var(--primary)', marginBottom: '1rem', lineHeight: 1
                            }}>{m.year}</div>
                            <h4 style={{ marginBottom: '0.75rem' }}>{m.title}</h4>
                            <p style={{ fontSize: '0.9rem' }}>{m.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
