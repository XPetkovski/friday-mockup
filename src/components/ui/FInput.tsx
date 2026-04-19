import React from 'react';

interface FInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const FInput = ({ name, placeholder, required, type = "text", ...props }: FInputProps) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className={
                "rounded-lg px-4 py-3 bg-white border border-slate-200 mb-4 focus:ring-2 focus:ring-slate-900 outline-none transition-all w-full"
                // Allows overriding or adding styles from the parent
            }
            {...props} // Spreads any other standard props (id, onBlur, etc.)
        />
    );
};

export default FInput;