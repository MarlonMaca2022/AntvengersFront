import React from 'react';
import ThemeToggle from './ThemeToggle';

const AdminHeader = ({ searchTerm, onSearchChange, icon = "bi-people", placeholder = "Buscar usuarios..." }) => {
    return (
        <header className="content-header">
            <div>
                <i className={`bi ${icon}`} style={{ color: 'var(--slate-400)', fontSize: '1.25rem' }}></i>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, maxWidth: '500px', marginLeft: '1rem' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <i className="bi bi-search" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }}></i>
                    <input 
                        type="text" 
                        className="form-input" 
                        placeholder={placeholder} 
                        style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', fontSize: '0.8rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-current)' }}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: 'auto' }}>
                <ThemeToggle />
                <button className="menu-btn" title="Notificaciones">
                    <i className="bi bi-bell"></i>
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
