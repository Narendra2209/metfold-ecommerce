import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CART_KEY = 'metfold_cart';

const loadCart = () => {
    try {
        const saved = localStorage.getItem(CART_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(loadCart);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const addToCart = useCallback((product, options, quantity) => {
        const cartItem = {
            ...product,
            options,
            quantity,
            cartId: `${product.id}-${Date.now()}`
        };
        setCart(prev => [...prev, cartItem]);
        showToast(`${product.name} added to cart!`);
    }, [showToast]);

    const removeFromCart = useCallback((cartId) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
        showToast('Item removed from cart', 'info');
    }, [showToast]);

    const updateQuantity = useCallback((cartId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prev => prev.map(item =>
            item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        ));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
        showToast('Cart cleared', 'info');
    }, [showToast]);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const cartTotal = cart.reduce((acc, item) => {
        if (item.priceType === 'variable' && item.basePricePerMeter) {
            const length = parseFloat(item.options?.length) || 1;
            return acc + (item.basePricePerMeter * length * item.quantity);
        }
        if (item.priceType === 'fixed' && item.basePrice) {
            return acc + (item.basePrice * item.quantity);
        }
        // For items with priceRange, parse the lower bound
        if (item.priceRange) {
            const match = item.priceRange.match(/\$([0-9.]+)/);
            if (match) return acc + (parseFloat(match[1]) * item.quantity);
        }
        return acc;
    }, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            toast
        }}>
            {children}
        </CartContext.Provider>
    );
};
