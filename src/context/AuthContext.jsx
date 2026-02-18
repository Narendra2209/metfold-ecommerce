import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('metfold_logged_in') === 'true');
    const [userName, setUserName] = useState(() => localStorage.getItem('metfold_user_name') || '');
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem('metfold_user_email') || '');

    const login = useCallback((name, email) => {
        setIsLoggedIn(true);
        setUserName(name);
        setUserEmail(email);
        localStorage.setItem('metfold_logged_in', 'true');
        localStorage.setItem('metfold_user_name', name);
        localStorage.setItem('metfold_user_email', email);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserName('');
        setUserEmail('');
        localStorage.removeItem('metfold_logged_in');
        localStorage.removeItem('metfold_user_name');
        localStorage.removeItem('metfold_user_email');
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
