import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Trash2, Plus, Zap, Lock, LogOut, FileSpreadsheet, AlertTriangle, CheckCircle, Edit2, X, Image as ImageIcon, Save, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { isLoggedIn, userName, logout } = useAuth();
    const isAdmin = isLoggedIn && (userName === 'Admin' || userName === 'admin' || userName === 'admin@metfold.com');
    // Destructure new context methods
    const { products: allProducts, importBatch, updateProduct, deleteProduct, uploadedFiles, deleteBatch } = useProducts();

    // Local State
    const [dealIds, setDealIds] = useState(() => {
        const saved = localStorage.getItem('metfold_deals');
        return saved ? JSON.parse(saved) : [];
    });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);

    // Edit Modal State
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [dragActive, setDragActive] = useState(false);

    const toggleDeal = (productId) => {
        setDealIds(prev => {
            const newIds = prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId];
            localStorage.setItem('metfold_deals', JSON.stringify(newIds));
            window.dispatchEvent(new Event('storage'));
            return newIds;
        });
    };

    // Helper: Default Images based on Sheet Name / Type
    const getDefaultImage = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('nailstrip')) return 'https://images.unsplash.com/photo-1621251322045-364155106197?auto=format&fit=crop&w=800&q=80';
        if (lower.includes('snaplock')) return 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80';
        if (lower.includes('standing')) return 'https://images.unsplash.com/photo-1598363765101-c88f1c3f8753?auto=format&fit=crop&w=800&q=80';
        if (lower.includes('interlocking')) return 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80';
        return 'https://images.unsplash.com/photo-1533090161767-e6ffed98ec5c?auto=format&fit=crop&w=800&q=80'; // Default Blue/Grey Texture
    };

    // Excel Upload Handler (Multi-Sheet Support)
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                let allNewProducts = [];

                // Process EACH Sheet
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    if (jsonData.length === 0) return;

                    // GROUPING LOGIC (Per Sheet)
                    const groupedMap = new Map();

                    jsonData.forEach(row => {
                        const getVal = (keys) => {
                            for (let k of keys) {
                                if (row[k] !== undefined) return row[k];
                            }
                            return null;
                        };

                        const rawName = getVal(['Description', 'Name', 'name', 'Product Name']) || 'Unnamed Product';
                        const inventoryID = getVal(['Inventory ID', 'InventoryID', 'ID', 'id']) || `prod-${Math.floor(Math.random() * 100000)}`;
                        const priceRaw = parseFloat(getVal(['BasePrice', 'Base Price', 'Price'])) || 0;

                        // Determine Group Key
                        let groupKey = rawName;
                        let displayName = rawName;

                        const lowerName = rawName.toLowerCase();
                        if (lowerName.includes('nailstrip')) { groupKey = 'Nailstrip Cladding'; displayName = 'Nailstrip Cladding'; }
                        else if (lowerName.includes('snaplock')) { groupKey = 'Snaplock Cladding'; displayName = 'Snaplock Cladding'; }
                        else if (lowerName.includes('standing seam')) { groupKey = 'Standing Seam Cladding'; displayName = 'Standing Seam Cladding'; }
                        else if (lowerName.includes('interlocking')) { groupKey = 'Interlocking Cladding'; displayName = 'Interlocking Cladding'; }

                        if (!groupedMap.has(groupKey)) {
                            // Determine Image based on Sheet Name OR Group Name
                            const fallbackImage = getDefaultImage(sheetName + ' ' + displayName);

                            groupedMap.set(groupKey, {
                                id: inventoryID.split('-')[0],
                                name: displayName,
                                description: displayName + ' - Available in multiple configurations.',
                                categoryId: getVal(['CategoryID', 'Category']) || 'cladding',
                                categoryName: sheetName, // Use Sheet Name as default Category Name
                                image: getVal(['Image', 'image']) || fallbackImage,
                                priceType: 'variable',
                                basePrices: [],
                                options: {
                                    colorCategory: new Set(),
                                    thickness: new Set(),
                                    cover: new Set(),
                                }
                            });
                        }

                        const product = groupedMap.get(groupKey);
                        product.basePrices.push(priceRaw);

                        // Extract Options
                        const tickMatch = rawName.match(/(\d+)\s*mm/i);
                        if (tickMatch) product.options.thickness.add(tickMatch[0]);
                        const bmtMatch = rawName.match(/(0\.\d+)\s*mm/i);
                        if (bmtMatch) product.options.thickness.add(bmtMatch[0] + ' BMT');

                        const coverMatch = rawName.match(/(\d+)\s*COVER/i);
                        if (coverMatch) product.options.cover.add(coverMatch[1] + 'mm');

                        if (lowerName.includes('colorbond')) product.options.colorCategory.add('Standard Colorbond');
                        if (lowerName.includes('matt')) product.options.colorCategory.add('Colorbond Matt');
                        if (lowerName.includes('ultra')) product.options.colorCategory.add('Colorbond Ultra');
                        if (lowerName.includes('zincalume')) product.options.colorCategory.add('Zincalume');
                    });

                    // Convert to Array
                    const sheetProducts = Array.from(groupedMap.values()).map(p => {
                        const minPrice = Math.min(...p.basePrices);
                        const maxPrice = Math.max(...p.basePrices);

                        return {
                            id: p.id,
                            name: p.name,
                            categoryId: p.categoryId,
                            categoryName: p.categoryName,
                            description: p.description,
                            image: p.image,
                            priceType: 'variable',
                            basePricePerMeter: minPrice,
                            priceRange: minPrice !== maxPrice ? `$${minPrice} - $${maxPrice}` : `$${minPrice}`,
                            options: {
                                colorCategory: Array.from(p.options.colorCategory),
                                thickness: Array.from(p.options.thickness).sort(),
                                cover: Array.from(p.options.cover).sort(),
                                length: { default: 1.0, min: 0.5, max: 15.0, step: 0.01 }
                            }
                        };
                    });

                    allNewProducts = [...allNewProducts, ...sheetProducts];
                });

                // USE IMPORT BATCH INSTEAD OF IMPORT PRODUCTS
                const fileId = `file-${Date.now()}`;
                importBatch(fileId, file.name, allNewProducts);

                setMessage({ type: 'success', text: `Successfully imported ${allNewProducts.length} products from ${file.name}!` });

            } catch (error) {
                console.error(error);
                setMessage({ type: 'error', text: `Upload Failed: ${error.message}` });
            } finally {
                setUploading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {
        const wb = XLSX.utils.book_new();

        // Sheet 1: Snaplock
        const snapData = [
            { 'Inventory ID': 'CB25S-225', 'Description': '25mm Snaplock Cladding 225 COVER', 'Price': 45.00 },
            { 'Inventory ID': 'CB25S-325', 'Description': '25mm Snaplock Cladding 325 COVER', 'Price': 48.00 }
        ];
        const ws1 = XLSX.utils.json_to_sheet(snapData);
        XLSX.utils.book_append_sheet(wb, ws1, "Snaplock");

        // Sheet 2: Nailstrip
        const nailData = [
            { 'Inventory ID': 'CB38N-165', 'Description': '38mm Nailstrip Cladding 165 COVER', 'Price': 52.00 }
        ];
        const ws2 = XLSX.utils.json_to_sheet(nailData);
        XLSX.utils.book_append_sheet(wb, ws2, "Nailstrip");

        XLSX.writeFile(wb, "Metfold_MultiSheet_Template.xlsx");
    };

    // EDIT MODAL LOGIC (Same as before)
    const handleEditClick = (product) => {
        setEditingProduct(product);
        setEditForm({ ...product });
    };

    const handleEditSave = () => {
        updateProduct(editingProduct.id, editForm);
        setEditingProduct(null);
        setDragActive(false);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageFile(e.dataTransfer.files[0]);
        }
    };

    const handleImageFile = (file) => {
        if (file.size > 500000) {
            if (!window.confirm("This image is large (>500KB) and may slow down the app. Are you sure?")) return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setEditForm(prev => ({ ...prev, image: e.target.result }));
        };
        reader.readAsDataURL(file);
    };

    if (!isAdmin) {
        return (
            <div className="section page-transition flex-center" style={{ minHeight: '80vh' }}>
                <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Lock size={28} color="#ef4444" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Access Denied</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You must be logged in as Admin to view this dashboard.</p>
                    <Link to="/account" className="btn btn-primary">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section page-transition" style={{ minHeight: '80vh', background: '#f8fafc' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>Dashboard</h1>
                            <p style={{ color: 'var(--text-muted)' }}>Welcome back, {userName}</p>
                        </div>
                        <button onClick={logout} className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </div>

                    {/* ACTION CARDS */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                        {/* 1. UPLOAD EXCEL */}
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: 'rgba(27,58,92,0.1)', borderRadius: '10px' }}><FileSpreadsheet size={24} color="var(--brand-navy)" /></div>
                                <h3>Smart Import</h3>
                            </div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                Supports multiple sheets (Sheet Name = Category). Automatically creates new categories.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <label className="btn btn-primary" style={{ flex: 1, cursor: 'pointer', textAlign: 'center', position: 'relative' }}>
                                    {uploading ? 'Processing Sheets...' : 'Upload Excel'}
                                    <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} disabled={uploading} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                                </label>
                                <button onClick={downloadTemplate} className="btn btn-outline" title="Download Template">
                                    <Download size={18} />
                                </button>
                            </div>
                            {message && (
                                <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: message.type === 'error' ? '#fee2e2' : '#dcfce7', color: message.type === 'error' ? '#991b1b' : '#166534', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {message.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                                    {message.text}
                                </div>
                            )}

                            {/* UPLOADED FILES LIST */}
                            {uploadedFiles && uploadedFiles.length > 0 && (
                                <div style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Uploaded Files</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {uploadedFiles.map(file => (
                                            <div key={file.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <FileText size={16} color="var(--text-muted)" />
                                                    <div>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{file.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(file.date).toLocaleDateString()} • {file.count} products</div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => { if (window.confirm(`Delete ${file.name} and all its products?`)) deleteBatch(file.id); }}
                                                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                                    title="Remove File & Products"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2. DEALS MANAGEMENT */}
                        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #f59e0b' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}><Zap size={24} color="#f59e0b" /></div>
                                <div>
                                    <h3 style={{ margin: 0 }}>Deals of the Day</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{dealIds.length} Active</span>
                                </div>
                            </div>
                            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-sm)', padding: '0.5rem' }}>
                                {allProducts.map(p => (
                                    <div key={p.id} onClick={() => toggleDeal(p.id)} style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: dealIds.includes(p.id) ? '#fef3c7' : 'transparent', borderRadius: '4px', marginBottom: '2px' }}>
                                        <div style={{ width: '16px', height: '16px', border: '1px solid #cbd5e1', borderRadius: '4px', background: dealIds.includes(p.id) ? '#f59e0b' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {dealIds.includes(p.id) && <CheckCircle size={10} color="white" />}
                                        </div>
                                        <span style={{ fontSize: '0.85rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT LIST TABLE */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Product Catalog ({allProducts.length})</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem' }}>Image</th>
                                        <th style={{ padding: '1rem' }}>Name</th>
                                        <th style={{ padding: '1rem' }}>Price Info</th>
                                        <th style={{ padding: '1rem' }}>Attributes</th>
                                        <th style={{ padding: '1rem' }}>Source</th>
                                        <th style={{ padding: '1rem', width: '100px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProducts.map(product => {
                                        const sourceFile = uploadedFiles.find(f => f.id === product.batchId);
                                        return (
                                            <tr key={product.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontWeight: 600 }}>{product.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.categoryName}</div>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    {product.priceType === 'variable'
                                                        ? `$${product.basePricePerMeter}/m`
                                                        : product.priceRange || 'N/A'
                                                    }
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                                        {product.options?.colorCategory?.length > 0 && <span className="chip" style={{ fontSize: '0.7rem' }}>Colors</span>}
                                                        {product.options?.thickness?.length > 0 && <span className="chip" style={{ fontSize: '0.7rem' }}>Thick</span>}
                                                        {product.options?.cover?.length > 0 && <span className="chip" style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0369a1' }}>Cover</span>}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    {sourceFile ? sourceFile.name : 'System'}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => handleEditClick(product)}
                                                            className="btn btn-sm"
                                                            style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => { if (window.confirm('Delete this product?')) deleteProduct(product.id); }}
                                                            className="btn btn-sm"
                                                            style={{ padding: '0.4rem', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer' }}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* EDIT MODAL */}
                    <AnimatePresence>
                        {editingProduct && (
                            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-panel"
                                    style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', background: 'white' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h2 style={{ margin: 0 }}>Edit Product</h2>
                                        <button onClick={() => setEditingProduct(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                                    </div>

                                    {/* Image Editor */}
                                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Product Image</label>

                                        <div
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            style={{
                                                border: dragActive ? '2px dashed var(--primary)' : '2px dashed #cbd5e1',
                                                borderRadius: '8px',
                                                padding: '2rem',
                                                textAlign: 'center',
                                                background: dragActive ? 'rgba(27,58,92,0.05)' : '#f8fafc',
                                                transition: 'all 0.2s',
                                                cursor: 'pointer',
                                                marginBottom: '1rem'
                                            }}
                                        >
                                            {editForm.image ? (
                                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                                    <img src={editForm.image} alt="Preview" style={{ maxHeight: '150px', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setEditForm(prev => ({ ...prev, image: '' })); }}
                                                        style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <ImageIcon size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                                                    <p style={{ margin: 0, fontWeight: 500 }}>Drag & Drop Image Here</p>
                                                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>or click "Browse" below if supported</p>
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input
                                                type="text"
                                                placeholder="Or paste image URL here..."
                                                value={editForm.image || ''}
                                                onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                                                style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                            />
                                            <label className="btn btn-outline" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                Browse
                                                <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleImageFile(e.target.files[0])} style={{ display: 'none' }} />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name || ''}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                                        <input
                                            type="text"
                                            value={editForm.categoryName || ''}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, categoryName: e.target.value }))}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                                        <textarea
                                            value={editForm.description || ''}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                            rows={4}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                        <button onClick={() => setEditingProduct(null)} className="btn btn-outline">Cancel</button>
                                        <button onClick={handleEditSave} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </div>

                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
