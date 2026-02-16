import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
    const { toast } = useCart();

    if (!toast) return null;

    const icons = {
        success: <CheckCircle size={20} color="#10b981" />,
        error: <AlertCircle size={20} color="#ef4444" />,
        info: <Info size={20} color="#00D9FF" />
    };

    return (
        <div className="toast-container">
            <div className={`toast toast-${toast.type}`} key={toast.id}>
                {icons[toast.type]}
                <span>{toast.message}</span>
            </div>
        </div>
    );
};

export default Toast;
