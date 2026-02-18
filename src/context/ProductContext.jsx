import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    // Initialize products from localStorage or fallback to static list
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('metfold_products_v2');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    // Initialize uploaded files (batches) from localStorage
    const [uploadedFiles, setUploadedFiles] = useState(() => {
        const saved = localStorage.getItem('metfold_uploaded_files');
        return saved ? JSON.parse(saved) : [];
    });

    // Update localStorage whenever products change
    useEffect(() => {
        localStorage.setItem('metfold_products_v2', JSON.stringify(products));
    }, [products]);

    // Update localStorage whenever uploadedFiles change
    useEffect(() => {
        localStorage.setItem('metfold_uploaded_files', JSON.stringify(uploadedFiles));
    }, [uploadedFiles]);

    const addProduct = (product) => {
        setProducts(prev => [...prev, product]);
    };

    const updateProduct = (id, updates) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    // Legacy import (merges by ID) - kept for compatibility
    const importProducts = (newProducts) => {
        setProducts(prev => {
            const productMap = new Map(prev.map(p => [p.id, p]));
            newProducts.forEach(p => productMap.set(p.id, p));
            return Array.from(productMap.values());
        });
    };

    // New: Import a batch of products from a file
    const importBatch = (fileId, fileName, newProducts) => {
        // Tag products with batchId
        const taggedProducts = newProducts.map(p => ({ ...p, batchId: fileId }));

        // Add to products (merging by ID if necessary, but preferring the new batch's version)
        setProducts(prev => {
            const productMap = new Map(prev.map(p => [p.id, p]));
            taggedProducts.forEach(p => productMap.set(p.id, p));
            return Array.from(productMap.values());
        });

        // Add to uploadedFiles list
        setUploadedFiles(prev => [
            ...prev,
            { id: fileId, name: fileName, date: new Date().toISOString(), count: newProducts.length }
        ]);
    };

    // New: Delete a batch (file) and its products
    const deleteBatch = (fileId) => {
        // Remove products with this batchId
        setProducts(prev => prev.filter(p => p.batchId !== fileId));

        // Remove file from list
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    };

    const resetToDefault = () => {
        setProducts(initialProducts);
        setUploadedFiles([]);
        localStorage.removeItem('metfold_products_v2');
        localStorage.removeItem('metfold_uploaded_files');
    };

    return (
        <ProductContext.Provider value={{
            products,
            uploadedFiles,
            addProduct,
            updateProduct,
            deleteProduct,
            importProducts,
            importBatch,
            deleteBatch,
            resetToDefault
        }}>
            {children}
        </ProductContext.Provider>
    );
};
