import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import ComercioModal from '../components/ComercioModal';
import '../admin_comercios.css';

const AdminComerciosPage = () => {
    const [comercios, setComercios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentFilter, setCurrentFilter] = useState('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comercioToEdit, setComercioToEdit] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('ant_comercios')) {
            const initialComercios = [
                { id: Date.now(), nombre: 'Tienda Ara', nit: '800.234.112-5', ubicacion: 'Bogotá, D.C.', categoria: 'Supermercado' },
                { id: Date.now() + 1, nombre: 'D1', nit: '900.556.788-2', ubicacion: 'Medellín, ANT', categoria: 'Descuento' },
                { id: Date.now() + 2, nombre: 'Farmatodo', nit: '830.111.455-9', ubicacion: 'Cali, VAL', categoria: 'Salud' },
                { id: Date.now() + 3, nombre: 'Homecenter', nit: '860.003.190-2', ubicacion: 'Barranquilla, ATL', categoria: 'Hogar' }
            ];
            localStorage.setItem('ant_comercios', JSON.stringify(initialComercios));
        }
        const storedComercios = JSON.parse(localStorage.getItem('ant_comercios') || '[]');
        setComercios(storedComercios);
    }, []);

    const saveToLocalStorage = (newComercios) => {
        localStorage.setItem('ant_comercios', JSON.stringify(newComercios));
        setComercios(newComercios);
    };

    const handleSaveComercio = (comercioData) => {
        let updatedComercios;
        if (comercioToEdit) {
            updatedComercios = comercios.map(c => c.id === comercioData.id ? comercioData : c);
        } else {
            updatedComercios = [...comercios, comercioData];
        }
        saveToLocalStorage(updatedComercios);
        setComercioToEdit(null);
        setIsModalOpen(false);
    };

    const handleDeleteComercio = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este comercio?')) {
            const updatedComercios = comercios.filter(c => c.id !== id);
            saveToLocalStorage(updatedComercios);
        }
    };

    const handleEditComercio = (comercio) => {
        setComercioToEdit(comercio);
        setIsModalOpen(true);
    };

    const filteredComercios = useMemo(() => {
        return comercios.filter(comercio => {
            const matchesSearch = comercio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  comercio.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  comercio.nit.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilter = currentFilter === 'Todos' || comercio.ubicacion.includes(currentFilter);

            return matchesSearch && matchesFilter;
        });
    }, [comercios, searchTerm, currentFilter]);

    const getCategoryStyles = (category) => {
        switch(category) {
            case 'Supermercado': return { icon: 'bi-cart', badge: 'cat-supermercado', bg: 'icon-supermercado' };
            case 'Descuento': return { icon: 'bi-tag', badge: 'cat-descuento', bg: 'icon-descuento' };
            case 'Salud': return { icon: 'bi-heart-pulse', badge: 'cat-salud', bg: 'icon-salud' };
            case 'Hogar': return { icon: 'bi-house-heart', badge: 'cat-hogar', bg: 'icon-hogar' };
            default: return { icon: 'bi-shop', badge: 'cat-otro', bg: 'icon-otro' };
        }
    };

    const uniqueCitiesCount = new Set(comercios.map(c => c.ubicacion)).size;

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <AdminHeader 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    icon="bi-shop"
                    placeholder="Buscar comercios, ciudades..."
                />

                <div className="content-body" style={{ paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Gestión de Comercios</h2>
                            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Administra la información de los comercios aliados.</p>
                        </div>
                        <button 
                            className="submit-btn" 
                            style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem', width: 'auto' }} 
                            onClick={() => { setComercioToEdit(null); setIsModalOpen(true); }}
                        >
                            <i className="bi bi-shop-window" style={{ fontSize: '1.1rem', marginRight: '0.25rem' }}></i>
                            <span>Agregar Comercio</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        <div className="stat-card">
                            <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Total Comercios
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{comercios.length}</h3>
                            <div className="stat-desc" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontWeight: 500 }}>
                                <i className="bi bi-graph-up-arrow"></i>
                                <span>12% este mes</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Ciudades Activas
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{uniqueCitiesCount}</h3>
                            <div className="stat-desc">A nivel nacional</div>
                        </div>
                        <div className="stat-card">
                            <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Categoría Top
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>Supermercado</h3>
                            <div className="stat-desc">42% del volumen</div>
                        </div>
                        <div className="stat-card">
                            <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Pendientes
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>18</h3>
                            <div className="stat-desc" style={{ color: 'var(--primary)', fontWeight: 500 }}>Requieren validación</div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="filtros-scroll" style={{ marginBottom: '1.5rem' }}>
                        {['Todos', 'Bogotá', 'Medellín', 'Cali'].map(filter => (
                            <button 
                                key={filter}
                                className={`filtro-btn ${currentFilter === filter ? 'active' : ''}`} 
                                onClick={() => setCurrentFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="table-container" style={{ border: 'none', borderRadius: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginBottom: '2rem' }}>
                        <table className="custom-table" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Nombre</th>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Ubicación/Ciudad</th>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Categoría Frecuente</th>
                                    <th style={{ textAlign: 'right', backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComercios.map(comercio => {
                                    const styles = getCategoryStyles(comercio.categoria);
                                    return (
                                        <tr key={comercio.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div className={`comercio-icon ${styles.bg}`}>
                                                        <i className={`bi ${styles.icon}`} style={{ fontSize: '1.25rem' }}></i>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{comercio.nombre}</p>
                                                        <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>NIT: {comercio.nit}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-500)' }}>
                                                    <i className="bi bi-geo-alt"></i>
                                                    <span>{comercio.ubicacion}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`category-badge ${styles.badge}`}>{comercio.categoria}</span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button className="action-btn" onClick={() => handleEditComercio(comercio)} title="Editar">
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button className="action-btn delete" onClick={() => handleDeleteComercio(comercio.id)} title="Eliminar">
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination info */}
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-current)', backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-500)' }}>
                                Mostrando {filteredComercios.length} de {comercios.length} resultados
                            </p>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                <button className="menu-btn" style={{ width: '2rem', height: '2rem', background: 'transparent', border: '1px solid var(--border-current)' }} disabled>
                                    <i className="bi bi-chevron-left" style={{ fontSize: '0.8rem' }}></i>
                                </button>
                                <button className="menu-btn active" style={{ width: '1.5rem', height: '1.5rem', background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>
                                    1
                                </button>
                                <button className="menu-btn" style={{ width: '1.5rem', height: '1.5rem', background: 'transparent', border: '1px solid var(--border-current)', fontSize: '0.75rem' }}>
                                    2
                                </button>
                                <button className="menu-btn" style={{ width: '1.5rem', height: '1.5rem', background: 'transparent', border: '1px solid var(--border-current)', fontSize: '0.75rem' }}>
                                    3
                                </button>
                                <button className="menu-btn" style={{ width: '2rem', height: '2rem', background: 'transparent', border: '1px solid var(--border-current)' }}>
                                    <i className="bi bi-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ComercioModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveComercio}
                comercioToEdit={comercioToEdit}
            />
        </div>
    );
};

export default AdminComerciosPage;
