import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import '../admin_gastos.css';

const AdminGastosPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Selects state (mantenemos localStorage para estos hasta que tengan su propia API)
    const [categorias, setCategorias] = useState([]);
    const [comercios, setComercios] = useState([]);
    const [metodos, setMetodos] = useState([]);

    // Form state - Original
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [comercio, setComercio] = useState('');
    const [metodo, setMetodo] = useState('');

    // Form state - Nuevos campos API
    const [emocion, setEmocion] = useState('');
    const [esRecurrente, setEsRecurrente] = useState(false);
    const [nivelNecesidad, setNivelNecesidad] = useState('');
    const [satisfaccion, setSatisfaccion] = useState('');
    const [esPlaneado, setEsPlaneado] = useState(false);
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

    // UI state
    const [isSaving, setIsSaving] = useState(false);

    // Gastos data
    const [gastos, setGastos] = useState([]);

    const fetchGastos = async () => {
        try {
            const response = await fetch('http://localhost:8080/antvengersapi/v1/gastos');
            if (response.ok) {
                const data = await response.json();
                setGastos(data.sort((a, b) => b.id - a.id));
            } else {
                console.error("Error fetching gastos from API");
            }
        } catch (error) {
            console.error("Network error fetching gastos", error);
        }
    };

    useEffect(() => {
        const fetchRelationships = async () => {
            try {
                const [resCat, resCom, resMet] = await Promise.all([
                    fetch('http://localhost:8080/antvengersapi/v1/categorias'),
                    fetch('http://localhost:8080/antvengersapi/v1/comercios'),
                    fetch('http://localhost:8080/antvengersapi/v1/mediopago')
                ]);

                if (resCat.ok) setCategorias(await resCat.json());
                if (resCom.ok) setComercios(await resCom.json());
                if (resMet.ok) {
                    const metData = await resMet.json();
                    setMetodos(metData.filter(m => m.estado === 'Activo' || m.status === 'Activo')); // Compatible con ambas props
                }
            } catch (error) {
                console.error("Error fetching relationships", error);
            }
        };

        fetchRelationships();
        fetchGastos();
    }, []);

    const handleSaveGasto = async (e) => {
        e.preventDefault();

        // Obtener el ID del usuario logeado desde la sesión
        const sessionData = JSON.parse(localStorage.getItem('ant_session') || '{}');
        const usuarioId = sessionData.id || 1; // Fallback a 1 si no hay sesión

        // OPCIÓN A: IDs enteros planos (para DTOs con campos como categoriaId)
        // const payload = {
        //     descripcion,
        //     valor: parseFloat(monto),
        //     fecha: new Date().toISOString().split('T')[0],
        //     icono: 'bi-receipt',
        //     emocion: emocion || null,
        //     esRecurrente,
        //     nivelNecesidad: nivelNecesidad ? parseInt(nivelNecesidad) : 0,
        //     satisfaccion: satisfaccion ? parseInt(satisfaccion) : 0,
        //     esPlaneado,
        const idCat = parseInt(categoria) || 1;
        const idCom = parseInt(comercio) || 1;
        const idMet = parseInt(metodo) || 1;
        const idUsu = parseInt(usuarioId) || 1;

        const payload = {
            descripcion,
            valor: parseFloat(monto) || 0,
            fecha,
            emocion: emocion || "Normal",
            esRecurrente: Boolean(esRecurrente),
            esPlaneado: Boolean(esPlaneado),
            nivelNecesidad: parseInt(nivelNecesidad) || 3,
            satisfaccion: parseInt(satisfaccion) || 5,
            categoria: { id: idCat },
            comercio: { id: idCom },
            mediopago: { id: idMet },
            usuario: { id: idUsu }
        };

        console.log("Enviando payload:", payload);

        try {
            const response = await fetch('http://localhost:8080/antvengersapi/v1/gastos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const savedGasto = await response.json();
                setGastos([savedGasto, ...gastos].sort((a, b) => b.id - a.id));

                // Reset form
                handleClearForm();

                // Visual Feedback
                setIsSaving(true);
                setTimeout(() => setIsSaving(false), 2000);
            } else {
                // Intentar leer el cuerpo del error para diagnóstico
                const errorText = await response.text();
                let errorDetail = errorText;
                try {
                    const errorJson = JSON.parse(errorText);
                    // Spring Boot a veces incluye 'message' o 'errors' con el detalle real
                    errorDetail = errorJson.message || errorJson.errors || errorJson.error || errorText;
                    console.error("Error JSON completo del backend:", errorJson);
                } catch (_) {
                    console.error("Error en texto plano del backend:", errorText);
                }
                console.error(`Error ${response.status} al guardar gasto:`, errorDetail);
                alert(`Error ${response.status} al guardar el gasto.\nDetalle: ${errorDetail}\n\n(Si el detalle es genérico, revisa la consola del backend para ver el stack trace)`);

            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Error de conexión al guardar.');
        }
    };

    const handleClearForm = () => {
        setMonto('');
        setDescripcion('');
        setCategoria('');
        setComercio('');
        setMetodo('');
        setEmocion('');
        setEsRecurrente(false);
        setNivelNecesidad('');
        setSatisfaccion('');
        setEsPlaneado(false);
        setFecha(new Date().toISOString().split('T')[0]);
    };

    const handleDeleteGasto = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este gasto de tus registros?')) {
            try {
                const response = await fetch(`http://localhost:8080/antvengersapi/v1/gastos/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setGastos(gastos.filter(g => g.id !== id));
                } else {
                    alert('Error al eliminar el gasto en el servidor.');
                }
            } catch (error) {
                console.error('Error deleting gasto:', error);
                alert('Error de conexión al eliminar.');
            }
        }
    };

    // Calculate stats
    const stats = useMemo(() => {
        let total = 0;
        const commerceCount = {};

        gastos.forEach(gasto => {
            total += parseFloat(gasto.valor || gasto.monto || 0);

            const comercioName = typeof gasto.comercio === 'object' ? gasto.comercio?.nombre : (typeof gasto.comercio === 'string' ? gasto.comercio : null);
            if (comercioName) {
                commerceCount[comercioName] = (commerceCount[comercioName] || 0) + 1;
            }
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
        return gastos.filter(g => {
            const catName = typeof g.categoria === 'object' ? g.categoria?.nombre : (typeof g.categoria === 'string' ? g.categoria : '');
            const comName = typeof g.comercio === 'object' ? g.comercio?.nombre : (typeof g.comercio === 'string' ? g.comercio : '');
            const metName = typeof g.medioPago === 'object' ? g.medioPago?.nombre : (typeof g.mediopago === 'object' ? g.mediopago?.nombre : (typeof g.medioPago === 'string' ? g.medioPago : ''));

            return (g.descripcion && g.descripcion.toLowerCase().includes(val)) ||
                catName.toLowerCase().includes(val) ||
                comName.toLowerCase().includes(val) ||
                metName.toLowerCase().includes(val);
        });
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
                                    <div>
                                        <label className="form-label">Fecha</label>
                                        <input
                                            type="date"
                                            required
                                            className="input-standard"
                                            value={fecha}
                                            onChange={(e) => setFecha(e.target.value)}
                                        />
                                    </div>

                                    <div>
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
                                            {categorias.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
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
                                            {comercios.map((com) => (
                                                <option key={com.id} value={com.id}>{com.nombre}</option>
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
                                            {metodos.map((met) => (
                                                <option key={met.id} value={met.id}>{met.nombre || met.platform} ({met.tipo || met.type})</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* New Analysis Fields */}
                                    <div className="col-span-full">
                                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '10px', marginTop: '10px', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px' }}>Análisis Adicional (API)</h4>
                                    </div>

                                    <div>
                                        <label className="form-label">Emoción al gastar</label>
                                        <select className="input-standard" value={emocion} onChange={(e) => setEmocion(e.target.value)}>
                                            <option value="">Ninguna</option>
                                            <option value="Feliz">Feliz 😄</option>
                                            <option value="Estresado">Estresado 😰</option>
                                            <option value="Triste">Triste 😢</option>
                                            <option value="Impulsivo">Impulsivo ⚡</option>
                                            <option value="Neutral">Neutral 😐</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="form-label">Nivel Necesidad (1-5)</label>
                                        <select className="input-standard" value={nivelNecesidad} onChange={(e) => setNivelNecesidad(e.target.value)}>
                                            <option value="">Ninguno</option>
                                            <option value="1">1 - Nada necesario</option>
                                            <option value="2">2 - Poco necesario</option>
                                            <option value="3">3 - Neutral</option>
                                            <option value="4">4 - Necesario</option>
                                            <option value="5">5 - Muy necesario</option>
                                        </select>
                                    </div>

                                    <div className="col-span-full">
                                        <label className="form-label">Satisfacción (1-10)</label>
                                        <input
                                            type="number"
                                            min="1" max="10"
                                            className="input-standard"
                                            placeholder="Ej. 8"
                                            value={satisfaccion}
                                            onChange={(e) => setSatisfaccion(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-span-full" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '5px' }}>
                                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                                            <input
                                                type="checkbox"
                                                checked={esRecurrente}
                                                onChange={(e) => setEsRecurrente(e.target.checked)}
                                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }}
                                            />
                                            Gasto Recurrente
                                        </label>
                                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                                            <input
                                                type="checkbox"
                                                checked={esPlaneado}
                                                onChange={(e) => setEsPlaneado(e.target.checked)}
                                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }}
                                            />
                                            Gasto Planeado
                                        </label>
                                    </div>

                                </div>

                                <div className="form-actions" style={{ marginTop: '20px' }}>
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
                                                    <h4 title={gasto.descripcion}>
                                                        {gasto.descripcion}
                                                        {gasto.esRecurrente && <i className="bi bi-arrow-repeat" style={{ marginLeft: '8px', color: 'var(--primary-color)', fontSize: '14px' }} title="Gasto Recurrente"></i>}
                                                        {gasto.esPlaneado && <i className="bi bi-calendar-check" style={{ marginLeft: '8px', color: '#10b981', fontSize: '14px' }} title="Gasto Planeado"></i>}
                                                    </h4>
                                                    <div className="gasto-item-meta">
                                                        {gasto.categoria && (
                                                            <>
                                                                <span className="flex">
                                                                    <i className="bi bi-tag" style={{ fontSize: '13px' }}></i>
                                                                    <span>{typeof gasto.categoria === 'object' ? gasto.categoria?.nombre : gasto.categoria}</span>
                                                                </span>
                                                                <span>&bull;</span>
                                                            </>
                                                        )}
                                                        {gasto.comercio && (
                                                            <span className="flex">
                                                                <i className="bi bi-shop" style={{ fontSize: '13px' }}></i>
                                                                <span>{typeof gasto.comercio === 'object' ? gasto.comercio?.nombre : gasto.comercio}</span>
                                                            </span>
                                                        )}
                                                        {gasto.emocion && (
                                                            <span style={{ fontSize: '11px', padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginLeft: '5px' }}>
                                                                {gasto.emocion}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="gasto-item-amount">
                                                    <div style={{ textAlign: 'right' }}>
                                                        <p className="amount">{formatter.format(gasto.valor || gasto.monto)}</p>
                                                        {(gasto.mediopago || gasto.metodo) && (
                                                            <p className="method">
                                                                <i className="bi bi-credit-card" style={{ fontSize: '12px' }}></i>
                                                                {gasto.mediopago?.nombre || gasto.metodo}
                                                            </p>
                                                        )}
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
