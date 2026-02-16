
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
    {
        id: 1,
        title: 'Choosing the Right Roof Profile for Your Climate',
        excerpt: 'Understanding how different roofing profiles handle wind, rain, and heat can save you thousands. We break down the science behind profile selection.',
        tag: 'Roofing Guide',
        author: 'Sarah Mitchell',
        date: 'Feb 14, 2026',
        readTime: '6 min read',
        gradient: 'linear-gradient(135deg, #f5f7fa 0%, #2d1b4e 100%)'
    },
    {
        id: 2,
        title: 'Colorbond vs Zincalume: The Complete Comparison',
        excerpt: 'Both are excellent Australian steel products, but they serve different purposes. Learn which finish suits your next building project.',
        tag: 'Materials',
        author: 'James Chen',
        date: 'Feb 10, 2026',
        readTime: '8 min read',
        gradient: 'linear-gradient(135deg, #f5f7fa 0%, #1b3a4e 100%)'
    },
    {
        id: 3,
        title: '2026 Architectural Cladding Trends in Australia',
        excerpt: 'From standing seam to interlocking panels, discover the trending cladding styles architects are specifying for modern Australian buildings.',
        tag: 'Trends',
        author: 'Emma Williams',
        date: 'Feb 5, 2026',
        readTime: '5 min read',
        gradient: 'linear-gradient(135deg, #f5f7fa 0%, #3a1b1b 100%)'
    },
    {
        id: 4,
        title: 'How CNC Folding Technology Changed Metal Fabrication',
        excerpt: 'Precision-folded metal profiles were once prohibitively expensive. See how modern CNC tech has made custom profiles accessible to every builder.',
        tag: 'Technology',
        author: 'David Park',
        date: 'Jan 28, 2026',
        readTime: '7 min read',
        gradient: 'linear-gradient(135deg, #f5f7fa 0%, #1b4e3a 100%)'
    },
    {
        id: 5,
        title: 'Rainwater Harvesting: Gutter Sizing Guide',
        excerpt: 'Incorrectly sized gutters lead to overflow, damage, and wasted water. Our comprehensive guide helps you size gutters for Australian rainfall.',
        tag: 'Installation',
        author: 'Mark Johnson',
        date: 'Jan 20, 2026',
        readTime: '10 min read',
        gradient: 'linear-gradient(135deg, #f5f7fa 0%, #4e441b 100%)'
    },
    {
        id: 6,
        title: 'Sustainability in Steel: Our Green Manufacturing Promise',
        excerpt: 'How Metfold is reducing waste, recycling offcuts, and investing in energy-efficient fabrication processes for a greener future.',
        tag: 'Sustainability',
        author: 'Lisa Thompson',
        date: 'Jan 15, 2026',
        readTime: '4 min read',
        gradient: 'linear-gradient(135deg, #f5f7fa 0%, #1b4e2a 100%)'
    }
];

const Blog = () => {
    return (
        <div className="blog-page page-transition">
            <div className="container section">
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
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
                        <BookOpen size={16} /> Industry Insights
                    </span>
                    <h1 className="text-gradient">Our Blog</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>Expert articles, guides, and industry news from the Metfold team.</p>
                </motion.header>

                <div className="blog-grid">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="glass-panel blog-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                        >
                            <div className="blog-card-image" style={{ background: post.gradient }}>
                                <div style={{
                                    width: '100%', height: '100%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'radial-gradient(circle at 30% 70%, rgba(27,58,92,0.1) 0%, transparent 60%)'
                                    }}></div>
                                    <BookOpen size={48} color="rgba(255,255,255,0.15)" />
                                </div>
                            </div>
                            <div className="blog-card-content">
                                <span className="blog-tag">
                                    <Tag size={10} style={{ marginRight: '4px', display: 'inline' }} />
                                    {post.tag}
                                </span>
                                <h3 style={{ color: 'var(--text-main)' }}>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <div className="blog-meta">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={14} /> {post.author}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={14} /> {post.readTime}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
