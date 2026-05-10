import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import MetodoPagoModal from '../components/MetodoPagoModal';
import '../admin_metodos_pago.css'; // Import custom styles

const AdminMetodoPagoPage = () => {
    const [methods, setMethods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [methodToEdit, setMethodToEdit] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('ant_methods')) {
            const initialMethods = [
                { id: Date.now(), nombre: 'Tarjeta de Crédito', tipo: 'Tarjeta de crédito', estado: 'Activo', descripcion: 'Pagos con franquicias Visa, Mastercard, etc.' },
                { id: Date.now() + 1, nombre: 'Tarjeta de Débito', tipo: 'Tarjeta de débito', estado: 'Activo', descripcion: 'Pagos directos de cuenta de ahorros/corriente.' },
                { id: Date.now() + 2, nombre: 'Efectivo', tipo: 'Efectivo', estado: 'Activo', descripcion: 'Pagos contra entrega en dinero físico.' },
                { id: Date.now() + 3, nombre: 'Sistecredito', tipo: 'Crédito', estado: 'Activo', descripcion: 'Financiación directa con Sistecredito.' },
                { id: Date.now() + 4, nombre: 'Addi', tipo: 'Crédito', estado: 'Inactivo', descripcion: 'Pagos a cuotas sin intereses con Addi.' }
            ];
            localStorage.setItem('ant_methods', JSON.stringify(initialMethods));
        }
        
        let storedMethods = JSON.parse(localStorage.getItem('ant_methods') || '[]');
        storedMethods = storedMethods.map(m => ({
            ...m,
            nombre: m.nombre || m.platform,
            tipo: m.tipo || m.type,
            estado: m.estado || m.status,
            descripcion: m.descripcion || ''
        }));
        setMethods(storedMethods);
    }, []);

    const saveToLocalStorage = (newMethods) => {
        localStorage.setItem('ant_methods', JSON.stringify(newMethods));
        setMethods(newMethods);
    };

    const handleSaveMethod = (methodData) => {
        let updatedMethods;
        if (methodToEdit) {
            updatedMethods = methods.map(m => m.id === methodData.id ? methodData : m);
        } else {
            updatedMethods = [...methods, methodData];
        }
        saveToLocalStorage(updatedMethods);
        setMethodToEdit(null);
        setIsModalOpen(false);
    };

    const handleDeleteMethod = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este método de pago?')) {
            const updatedMethods = methods.filter(m => m.id !== id);
            saveToLocalStorage(updatedMethods);
        }
    };

    const handleEditMethod = (method) => {
        setMethodToEdit(method);
        setIsModalOpen(true);
    };

    const filteredMethods = methods.filter(method => 
        (method.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (method.tipo || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getBadgeClass = (tipo) => {
        if (!tipo) return 'badge-efectivo';
        if (tipo.toLowerCase().includes('crédito')) return 'badge-credito';
        if (tipo.toLowerCase().includes('débito')) return 'badge-debito';
        return 'badge-efectivo';
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <AdminHeader 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    icon="bi-credit-card"
                    placeholder="Buscar por nombre..."
                />

                <div className="content-body" style={{ paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Gestión de Métodos de Pago</h2>
                            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Administra las pasarelas y plataformas de pago disponibles para los clientes.</p>
                        </div>
                        <button 
                            className="submit-btn" 
                            style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem', width: 'auto' }} 
                            onClick={() => { setMethodToEdit(null); setIsModalOpen(true); }}
                        >
                            <i className="bi bi-plus" style={{ fontSize: '1.2rem', marginRight: '-0.25rem' }}></i>
                            <span>Nuevo Método</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>Total Métodos</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>{methods.length}</h3>
                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 500 }}>
                                <i className="bi bi-graph-up-arrow"></i>
                                <span>+12% este mes</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>Transacciones Hoy</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>452</h3>
                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 500 }}>
                                <i className="bi bi-info-circle"></i>
                                <span>Promedio $45.000 COP</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>Tasa de Error</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>0.4%</h3>
                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--slate-500)', fontSize: '0.75rem', fontWeight: 500 }}>
                                <i className="bi bi-check-circle"></i>
                                <span>Sistema saludable</span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container" style={{ border: 'none', borderRadius: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                        <table className="custom-table" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Nombre</th>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Tipo</th>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Estado</th>
                                    <th style={{ backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Descripción</th>
                                    <th style={{ textAlign: 'right', backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMethods.map(method => (
                                    <tr key={method.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div className="method-icon">
                                                    <i className="bi bi-bank"></i>
                                                </div>
                                                <span style={{ fontWeight: 500 }}>{method.nombre}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${getBadgeClass(method.tipo)}`}>
                                                {method.tipo}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: method.estado === 'Activo' ? '#10b981' : '#94a3b8', fontSize: '0.75rem', fontWeight: 500 }}>
                                                <i className="bi bi-circle-fill" style={{ fontSize: '0.4rem' }}></i>
                                                {method.estado}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-desc" style={{ maxWidth: '250px' }}>{method.descripcion || 'Sin descripción'}</div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="action-btn" onClick={() => handleEditMethod(method)} title="Editar">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="action-btn delete" onClick={() => handleDeleteMethod(method.id)} title="Eliminar">
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination info */}
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-current)', backgroundColor: 'rgba(var(--slate-800), 0.5)' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                                Mostrando 1 a {filteredMethods.length} de {filteredMethods.length} resultados
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="menu-btn" style={{ width: '2.25rem', height: '2.25rem', background: 'transparent', border: '1px solid var(--border-current)' }} disabled>
                                    <i className="bi bi-chevron-left" style={{ fontSize: '1rem' }}></i>
                                </button>
                                <button className="menu-btn active" style={{ width: '2rem', height: '2.25rem', background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
                                    1
                                </button>
                                <button className="menu-btn" style={{ width: '2.25rem', height: '2.25rem', background: 'transparent', border: '1px solid var(--border-current)' }}>
                                    <i className="bi bi-chevron-right" style={{ fontSize: '1rem' }}></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--slate-500)', fontSize: '0.875rem', paddingTop: '2rem', borderTop: '1px solid var(--border-current)' }}>
                        © 2026 Antvengers Colombia. Todos los derechos reservados.
                    </footer>
                </div>
            </main>

            <MetodoPagoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveMethod}
                methodToEdit={methodToEdit}
            />
        </div>
    );
};

export default AdminMetodoPagoPage;
