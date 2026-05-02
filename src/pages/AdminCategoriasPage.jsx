import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import CategoriaModal from '../components/CategoriaModal';
import '../admin_categorias.css';

const AdminCategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoriaToEdit, setCategoriaToEdit] = useState(null);
    const [recentActivity, setRecentActivity] = useState('Ninguna');

    useEffect(() => {
        if (!localStorage.getItem('ant_categorias')) {
            const initialCategorias = [
                { id: Date.now(), nombre: 'Alimentos', ref: 'CAT-001', descripcion: 'Insumos básicos y productos perecederos de la canasta familiar colombiana.', icono: 'bi-cup-hot' },
                { id: Date.now() + 1, nombre: 'Tecnología', ref: 'CAT-002', descripcion: 'Dispositivos electrónicos, computadores, smartphones y accesorios de última generación.', icono: 'bi-pc-display' },
                { id: Date.now() + 2, nombre: 'Hogar', ref: 'CAT-003', descripcion: 'Muebles, decoración y herramientas para la mejora del espacio doméstico.', icono: 'bi-house' },
                { id: Date.now() + 3, nombre: 'Salud', ref: 'CAT-004', descripcion: 'Medicamentos, suministros médicos y productos de cuidado personal especializado.', icono: 'bi-heart-pulse' }
            ];
            localStorage.setItem('ant_categorias', JSON.stringify(initialCategorias));
        }
        const loadedCategorias = JSON.parse(localStorage.getItem('ant_categorias') || '[]');
        setCategorias(loadedCategorias);
    }, []);

    const saveToLocalStorage = (newCategorias) => {
        localStorage.setItem('ant_categorias', JSON.stringify(newCategorias));
        setCategorias(newCategorias);
    };

    const handleSaveCategoria = (catData) => {
        let updatedCategorias;
        if (categoriaToEdit) {
            updatedCategorias = categorias.map(c => c.id === catData.id ? catData : c);
        } else {
            updatedCategorias = [...categorias, catData];
        }
        saveToLocalStorage(updatedCategorias);
        setRecentActivity(catData.nombre);
        setCategoriaToEdit(null);
        setIsModalOpen(false);
    };

    const handleDeleteCategoria = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            const updatedCategorias = categorias.filter(c => c.id !== id);
            saveToLocalStorage(updatedCategorias);
        }
    };

    const handleEditCategoria = (categoria) => {
        setCategoriaToEdit(categoria);
        setIsModalOpen(true);
    };

    const filteredCategorias = useMemo(() => {
        return categorias.filter(c => 
            c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
            c.ref.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categorias, searchTerm]);

    const topCategoria = categorias.length > 0 ? categorias[0].nombre : 'Ninguna';

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <AdminHeader 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    icon="bi-tags"
                    placeholder="Buscar categorías..."
                />

                <div className="content-body" style={{ paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Gestión de Categorías</h2>
                            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Administra las clasificaciones de productos del sistema Antvengers.</p>
                        </div>
                        <button 
                            className="submit-btn" 
                            style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem', width: 'auto' }} 
                            onClick={() => { setCategoriaToEdit(null); setIsModalOpen(true); }}
                        >
                            <i className="bi bi-plus" style={{ fontSize: '1.1rem', marginRight: '0.25rem' }}></i>
                            <span>Nueva Categoría</span>
                        </button>
                    </div>

                    <div className="table-container" style={{ border: 'none', borderRadius: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginBottom: '2rem' }}>
                        <table className="custom-table" style={{ width: '100%' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-current)' }}>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Icono</th>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Nombre</th>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Descripción</th>
                                    <th style={{ textAlign: 'right', backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategorias.map(cat => (
                                    <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td>
                                            <div className="cat-icon-container">
                                                <i className={`bi ${cat.icono}`}></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{cat.nombre}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>REF: {cat.ref}</div>
                                        </td>
                                        <td>
                                            <div className="table-desc">{cat.descripcion}</div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="action-btn" onClick={() => handleEditCategoria(cat)} title="Editar">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="action-btn delete" onClick={() => handleDeleteCategoria(cat.id)} title="Eliminar">
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-current)', backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-500)' }}>
                                Mostrando {filteredCategorias.length} de {categorias.length} resultados
                            </p>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                <button className="menu-btn" style={{ width: '2rem', height: '2rem', background: 'transparent', border: '1px solid var(--border-current)' }} disabled>
                                    <i className="bi bi-chevron-left" style={{ fontSize: '0.8rem' }}></i>
                                </button>
                                <button className="menu-btn active" style={{ width: '1.5rem', height: '1.5rem', background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>1</button>
                                <button className="menu-btn" style={{ width: '1.5rem', height: '1.5rem', background: 'transparent', border: '1px solid var(--border-current)', fontSize: '0.75rem' }}>2</button>
                                <button className="menu-btn" style={{ width: '1.5rem', height: '1.5rem', background: 'transparent', border: '1px solid var(--border-current)', fontSize: '0.75rem' }}>3</button>
                                <button className="menu-btn" style={{ width: '2rem', height: '2rem', background: 'transparent', border: '1px solid var(--border-current)' }}>
                                    <i className="bi bi-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid-stats-bottom">
                        <div className="bottom-stat-card">
                            <div className="stat-label-mini">Total Categorías</div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                <div className="stat-value-large">{categorias.length}</div>
                                <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 500, display: 'flex', alignItems: 'center', paddingBottom: '0.35rem' }}>
                                    <i className="bi bi-graph-up-arrow" style={{ marginRight: '0.25rem' }}></i>
                                    +2 este mes
                                </div>
                            </div>
                        </div>

                        <div className="bottom-stat-card">
                            <div className="stat-label-mini">Categoría Top</div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                <div className="stat-value-large" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{topCategoria}</div>
                            </div>
                            <div style={{ color: 'var(--slate-500)', fontSize: '0.7rem', marginTop: '0.25rem' }}>Mas productos asociados</div>
                        </div>

                        <div className="bottom-stat-card">
                            <div className="stat-label-mini">Actividad Reciente</div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.5rem' }}>{recentActivity}</div>
                            <div style={{ color: 'var(--slate-500)', fontSize: '0.7rem' }}>Última categoría editada</div>
                        </div>
                    </div>
                </div>
            </main>

            <CategoriaModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCategoria}
                categoriaToEdit={categoriaToEdit}
            />
        </div>
    );
};

export default AdminCategoriasPage;
