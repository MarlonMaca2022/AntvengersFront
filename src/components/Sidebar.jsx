import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get user session info
    const session = JSON.parse(localStorage.getItem('ant_session') || '{}');
    const userName = session.name || 'Admin Antvenger';
    const userEmail = session.email || 'alex@antvengers.com';

    const handleLogout = () => {
        localStorage.removeItem('ant_session');
        navigate('/');
    };

    const navItems = [
        { title: 'Principal', items: [
            { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
            { path: '/admin_gastos', icon: 'bi-receipt', label: 'Gastos' },
            { path: '#', icon: 'bi-graph-up-arrow', label: 'Reportes' },
        ]},
        { title: 'Administración', items: [
            { path: '/admin_user', icon: 'bi-people', label: 'Usuarios' },
            { path: '/admin_categorias', icon: 'bi-tags', label: 'Categorías' },
            { path: '/admin_metodos_pago', icon: 'bi-credit-card', label: 'Métodos de Pago' },
            { path: '/admin_comercios', icon: 'bi-shop', label: 'Comercios' },
        ]},
        { title: 'Sistema', items: [
            { path: '/configuracion', icon: 'bi-gear', label: 'Configuración' },
        ]}
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">
                        <i className="bi bi-bug-fill"></i>
                    </div>
                    <h2 className="logo-text">Antvengers</h2>
                </div>
                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginTop: '0.5rem', paddingLeft: '3.25rem' }}>
                    Admin Central
                </p>
            </div>

            <nav className="flex-1">
                {navItems.map((section, idx) => (
                    <div className="nav-section" key={idx}>
                        <p className="nav-title">{section.title}</p>
                        {section.items.map((item, itemIdx) => (
                            <Link 
                                to={item.path} 
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                key={itemIdx}
                            >
                                <i className={`bi ${item.icon}`}></i>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-current)' }}>
                <div className="user-badge" style={{ background: 'none', padding: 0 }}>
                    <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2aa3cf&color=fff`} 
                        className="user-avatar" 
                        alt={userName} 
                    />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 700 }}>{userName}</p>
                        <p style={{ fontSize: '0.65rem', color: 'var(--slate-500)' }}>{userEmail}</p>
                    </div>
                    <button className="action-btn" onClick={handleLogout} title="Cerrar sesión">
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
