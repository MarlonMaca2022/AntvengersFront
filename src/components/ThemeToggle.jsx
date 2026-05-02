import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : true; // Default to dark as per original body class
    });

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button 
            className="menu-btn" 
            id="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            title="Cambiar tema"
        >
            <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} id="theme-icon"></i>
        </button>
    );
};

export default ThemeToggle;
