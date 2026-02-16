import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Save, RefreshCw, Package, DollarSign, Palette, Ruler, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('metfold_products');
        return saved ? JSON.parse(saved) : [];
    });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setMessage({ type: '', text: '' });

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Expected Excel columns: ProductID, Name, Category, Price, Size, Color, Thickness, Description
                const parsedProducts = jsonData.map(row => ({
                    id: row.ProductID || row.productId || row.id || `prod-${Date.now()}-${Math.random()}`,
                    name: row.Name || row.name || 'Unnamed Product',
                    category: row.Category || row.category || 'General',
                    price: parseFloat(row.Price || row.price || 0),
                    size: row.Size || row.size || '',
                    color: row.Color || row.color || '',
                    thickness: row.Thickness || row.thickness || '',
                    description: row.Description || row.description || '',
                    image: row.Image || row.image || '',
                }));

                setProducts(parsedProducts);
                localStorage.setItem('metfold_products', JSON.stringify(parsedProducts));
                setMessage({ type: 'success', text: `Successfully imported ${parsedProducts.length} products!` });
            } catch (error) {
                setMessage({ type: 'error', text: `Error parsing Excel file: ${error.message}` });
            } finally {
                setUploading(false);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {
        const template = [
            {
                ProductID: '5-rib-sheet',
                Name: '5-Rib Sheet',
                Category: 'Roof Sheets',
                Price: 25.50,
                Size: '0.42mm x 762mm',
                Color: 'Surfmist',
                Thickness: '0.42 BMT',
                Description: 'Premium 5-rib roofing profile',
                Image: '/assets/5-rib.jpg'
            },
            {
                ProductID: 'trimdek',
                Name: 'Trimdek',
                Category: 'Roof Sheets',
                Price: 28.90,
                Size: '0.42mm x 762mm',
                Color: 'Monument',
                Thickness: '0.42 BMT',
                Description: 'Classic Trimdek profile',
                Image: '/assets/trimdek.jpg'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        XLSX.writeFile(wb, 'metfold_product_template.xlsx');
    };

    const exportCurrentProducts = () => {
        if (products.length === 0) {
            setMessage({ type: 'error', text: 'No products to export' });
            return;
        }

        const exportData = products.map(p => ({
            ProductID: p.id,
            Name: p.name,
            Category: p.category,
            Price: p.price,
            Size: p.size,
            Color: p.color,
            Thickness: p.thickness,
            Description: p.description,
            Image: p.image
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        XLSX.writeFile(wb, `metfold_products_${new Date().toISOString().split('T')[0]}.xlsx`);
        setMessage({ type: 'success', text: 'Products exported successfully!' });
    };

    const clearProducts = () => {
        if (window.confirm('Are you sure you want to clear all products? This cannot be undone.')) {
            setProducts([]);
            localStorage.removeItem('metfold_products');
            setMessage({ type: 'success', text: 'All products cleared' });
        }
    };

    return (
        <div className="section page-transition" style={{ minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h1 style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                            Manage products, pricing, and catalog via Excel upload
                        </p>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        {[
                            { icon: <Package size={24} />, label: 'Total Products', value: products.length, color: 'var(--brand-navy)' },
                            { icon: <DollarSign size={24} />, label: 'Avg Price', value: `$${products.length ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : '0.00'}`, color: 'var(--primary)' },
                            { icon: <Palette size={24} />, label: 'Categories', value: new Set(products.map(p => p.category)).size, color: 'var(--brand-steel)' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: `${stat.color}15`, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', color: stat.color
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message */}
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '1rem 1.25rem', marginBottom: '2rem',
                                background: message.type === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                                border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                                borderRadius: 'var(--radius-md)',
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                color: message.type === 'success' ? 'var(--success)' : 'var(--danger)'
                            }}
                        >
                            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span style={{ fontWeight: 500 }}>{message.text}</span>
                        </motion.div>
                    )}

                    {/* Upload Section */}
                    <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Upload size={24} color="var(--brand-navy)" />
                            Upload Product Catalog
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                            <label className="btn btn-primary" style={{ cursor: 'pointer', position: 'relative' }}>
                                <Upload size={18} />
                                {uploading ? 'Uploading...' : 'Upload Excel File'}
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                                />
                            </label>

                            <button onClick={downloadTemplate} className="btn btn-secondary">
                                <Download size={18} />
                                Download Template
                            </button>

                            <button onClick={exportCurrentProducts} className="btn btn-outline" disabled={products.length === 0}>
                                <Save size={18} />
                                Export Current
                            </button>

                            <button onClick={clearProducts} className="btn btn-secondary" disabled={products.length === 0}>
                                <RefreshCw size={18} />
                                Clear All
                            </button>
                        </div>

                        <div style={{
                            padding: '1rem', background: 'rgba(27,58,92,0.05)',
                            border: '1px solid rgba(27,58,92,0.12)', borderRadius: 'var(--radius-sm)',
                            fontSize: '0.88rem', color: 'var(--text-muted)'
                        }}>
                            <strong style={{ color: 'var(--brand-navy)' }}>Excel Format:</strong> Your Excel file should have these columns:<br />
                            <code style={{ color: 'var(--brand-navy)', fontWeight: 600 }}>ProductID, Name, Category, Price, Size, Color, Thickness, Description, Image</code>
                        </div>
                    </div>

                    {/* Products Table */}
                    {products.length > 0 && (
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Current Products ({products.length})</h2>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)' }}>ID</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)' }}>Name</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)' }}>Category</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)' }}>Price</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)' }}>Size</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)' }}>Color</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)' }}>Thickness</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.slice(0, 20).map((product, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{product.id}</td>
                                                <td style={{ padding: '0.75rem', fontWeight: 500 }}>{product.name}</td>
                                                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{product.category}</td>
                                                <td style={{ padding: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>${product.price.toFixed(2)}</td>
                                                <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{product.size}</td>
                                                <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{product.color}</td>
                                                <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{product.thickness}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {products.length > 20 && (
                                    <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                        Showing first 20 of {products.length} products
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
