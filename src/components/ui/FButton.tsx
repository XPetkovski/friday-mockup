import React from 'react';

// 1. Define the Interface
interface FButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    isLoading?: boolean; // Useful for showing a spinner later
}

const FButton = ({
                     variant = 'primary',
                     className = '',
                     children,
                     isLoading,
                     ...props
                 }: FButtonProps) => {

    // 2. Define Base Styles
    const baseStyles = "rounded-lg px-4 py-3 text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50";

    // 3. Define Variant Styles
    const variants = {
        primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
        outline: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? "Processing..." : children}
        </button>
    );
};

export default FButton;