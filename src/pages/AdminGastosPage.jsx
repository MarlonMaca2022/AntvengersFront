import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import '../admin_gastos.css';

const AdminGastosPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Selects state
    const [categorias, setCategorias] = useState([]);
    const [comercios, setComercios] = useState([]);
    const [metodos, setMetodos] = useState([]);
    
    // Form state
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [comercio, setComercio] = useState('');
    const [metodo, setMetodo] = useState('');
    
    // UI state
    const [isSaving, setIsSaving] = useState(false);
    
    // Gastos data
    const [gastos, setGastos] = useState([]);

    useEffect(() => {
        // Load data from LocalStorage
        const loadedCategorias = JSON.parse(localStorage.getItem('ant_categorias') || '[]');
        const loadedComercios = JSON.parse(localStorage.getItem('ant_comercios') || '[]');
        const loadedMetodos = JSON.parse(localStorage.getItem('ant_methods') || '[]');
        const loadedGastos = JSON.parse(localStorage.getItem('ant_gastos') || '[]');
        
        setCategorias(loadedCategorias);
        setComercios(loadedComercios);
        setMetodos(loadedMetodos.filter(m => m.status === 'Activo'));
        setGastos(loadedGastos.sort((a, b) => b.id - a.id));
    }, []);

    const saveGastosToStorage = (newGastos) => {
        localStorage.setItem('ant_gastos', JSON.stringify(newGastos));
        setGastos(newGastos);
    };

    const handleSaveGasto = (e) => {
        e.preventDefault();
        
        const nuevoGasto = {
            id: Date.now(),
            monto: parseFloat(monto),
            descripcion,
            categoria,
            comercio,
            metodo,
            fecha: new Date().toISOString()
        };

        const newGastos = [nuevoGasto, ...gastos];
        saveGastosToStorage(newGastos);

        // Reset form
        setMonto('');
        setDescripcion('');
        setCategoria('');
        setComercio('');
        setMetodo('');

        // Visual Feedback
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    const handleClearForm = () => {
        setMonto('');
        setDescripcion('');
        setCategoria('');
        setComercio('');
        setMetodo('');
    };

    const handleDeleteGasto = (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este gasto de tus registros?')) {
            const newGastos = gastos.filter(g => g.id !== id);
            saveGastosToStorage(newGastos);
        }
    };

    // Calculate stats
    const stats = useMemo(() => {
        let total = 0;
        const commerceCount = {};

        gastos.forEach(gasto => {
            total += parseFloat(gasto.monto);
            commerceCount[gasto.comercio] = (commerceCount[gasto.comercio] || 0) + 1;
        });

        let mainCommerce = 'N/A';
        if (Object.keys(commerceCount).length > 0) {
            mainCommerce = Object.keys(commerceCount).reduce((a, b) => commerceCount[a] > commerceCount[b] ? a : b);
        }

        return { total, mainCommerce };
    }, [gastos]);

    const filteredGastos = useMemo(() => {
        if (!searchTerm) return gastos;
        const val = searchTerm.toLowerCase();
        return gastos.filter(g => 
            g.descripcion.toLowerCase().includes(val) ||
            g.categoria.toLowerCase().includes(val) ||
            g.comercio.toLowerCase().includes(val) ||
            g.metodo.toLowerCase().includes(val)
        );
    }, [gastos, searchTerm]);

    const formatter = new Intl.NumberFormat('es-CO', { 
        style: 'currency', 
        currency: 'COP', 
        maximumFractionDigits: 0 
    });

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <AdminHeader 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    icon="bi-receipt"
                    placeholder="Buscar gastos..."
                />

                <div className="content-body" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '1.5rem' }}>
                    <div className="gastos-header-text">
                        <h2>Registro de Gastos</h2>
                        <p>Registra tus gastos con precisión y rapidez.</p>
                    </div>

                    <div className="gastos-layout" style={{ marginTop: '2rem' }}>
                        {/* Left Side: Form and Stats */}
                        <div className="gastos-left">
                            <form className="gastos-form" onSubmit={handleSaveGasto}>
                                <div className="gastos-form-grid">
                                    <div className="col-span-full">
                                        <label className="form-label">Monto</label>
                                        <div className="monto-input-wrapper">
                                            <span className="monto-symbol">$</span>
                                            <input 
                                                type="number" 
                                                required 
                                                className="input-monto" 
                                                placeholder="0.00" 
                                                step="0.01"
                                                value={monto}
                                                onChange={(e) => setMonto(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label className="form-label">Descripción</label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="input-standard" 
                                            placeholder="Ej. Suscripción a servidor en la nube"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Categoría</label>
                                        <select 
                                            required 
                                            className="input-standard"
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                        >
                                            <option value="">Seleccionar Categoría</option>
                                            {categorias.map((cat, idx) => (
                                                <option key={idx} value={cat.nombre}>{cat.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="form-label">Comercio</label>
                                        <select 
                                            required 
                                            className="input-standard"
                                            value={comercio}
                                            onChange={(e) => setComercio(e.target.value)}
                                        >
                                            <option value="">Seleccionar Comercio</option>
                                            {comercios.map((com, idx) => (
                                                <option key={idx} value={com.nombre}>{com.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-full">
                                        <label className="form-label">Método de Pago</label>
                                        <select 
                                            required 
                                            className="input-standard"
                                            value={metodo}
                                            onChange={(e) => setMetodo(e.target.value)}
                                        >
                                            <option value="">Seleccionar Método</option>
                                            {metodos.map((met, idx) => (
                                                <option key={idx} value={met.platform}>{met.platform} ({met.type})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button 
                                        type="submit" 
                                        className={`btn-save ${isSaving ? 'success' : ''}`}
                                    >
                                        {isSaving ? (
                                            <>
                                                <i className="bi bi-check-circle"></i> ¡Guardado!
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-save"></i> Guardar Gasto
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-clear" 
                                        onClick={handleClearForm}
                                    >
                                        Limpiar
                                    </button>
                                </div>
                            </form>

                            <div className="gastos-stats">
                                <div className="gasto-stat-card">
                                    <p className="stat-label">Gasto Total Acumulado</p>
                                    <p className="stat-value">{formatter.format(stats.total)}</p>
                                </div>
                                <div className="gasto-stat-card">
                                    <p className="stat-label">Comercio Principal (Más gastos)</p>
                                    <p className="stat-value" title={stats.mainCommerce}>{stats.mainCommerce}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Historial */}
                        <div className="gastos-right">
                            <div className="gastos-right-header">
                                <h3>Historial de Gastos</h3>
                            </div>
                            <div className="gastos-list-container">
                                {filteredGastos.length > 0 ? (
                                    <div className="gastos-list">
                                        {filteredGastos.map(gasto => (
                                            <div key={gasto.id} className="gasto-item">
                                                <div className="gasto-item-info">
                                                    <h4 title={gasto.descripcion}>{gasto.descripcion}</h4>
                                                    <div className="gasto-item-meta">
                                                        <span className="flex">
                                                            <i className="bi bi-tag" style={{ fontSize: '13px' }}></i> 
                                                            <span>{gasto.categoria}</span>
                                                        </span>
                                                        <span>&bull;</span>
                                                        <span className="flex">
                                                            <i className="bi bi-shop" style={{ fontSize: '13px' }}></i> 
                                                            <span>{gasto.comercio}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="gasto-item-amount">
                                                    <div>
                                                        <p className="amount">{formatter.format(gasto.monto)}</p>
                                                        <p className="method">
                                                            <i className="bi bi-credit-card" style={{ fontSize: '12px' }}></i>
                                                            {gasto.metodo}
                                                        </p>
                                                    </div>
                                                    <button 
                                                        className="gasto-item-delete" 
                                                        onClick={() => handleDeleteGasto(gasto.id)}
                                                        title="Eliminar gasto"
                                                    >
                                                        <i className="bi bi-trash3" style={{ fontSize: '18px' }}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <i className="bi bi-receipt"></i>
                                        <p>{searchTerm ? 'No hay gastos que coincidan con la búsqueda.' : 'No hay gastos registrados aún.'}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminGastosPage;
