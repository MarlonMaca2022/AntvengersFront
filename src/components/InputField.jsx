import React, { useState } from 'react';

const InputField = ({ label, icon, type, id, placeholder, required, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="input-group">
            <label className="input-label" htmlFor={id}>{label}</label>
            <div className="input-wrapper">
                <i className={`bi ${icon} input-icon`}></i>
                <input 
                    type={inputType} 
                    id={id} 
                    className="form-input" 
                    placeholder={placeholder} 
                    required={required}
                    value={value}
                    onChange={onChange}
                />
                {isPassword && (
                    <button 
                        type="button" 
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;
