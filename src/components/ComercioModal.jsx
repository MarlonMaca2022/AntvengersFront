import React, { useState, useEffect } from 'react';

const ComercioModal = ({ isOpen, onClose, onSave, comercioToEdit }) => {
    const [nit, setNit] = useState('');
    const [nombre, setNombre] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [contacto, setContacto] = useState('');
    const [tipoEmpresa, setTipoEmpresa] = useState('Supermercado');
    const [numeroEmpleados, setNumeroEmpleados] = useState(1);
    const [sector, setSector] = useState('Comercio');
    const [representanteLegal, setRepresentanteLegal] = useState('');
    const [frecuenciadevisita, setFrecuenciadevisita] = useState(1);

    useEffect(() => {
        if (comercioToEdit) {
            setNit(comercioToEdit.nit || '');
            setNombre(comercioToEdit.nombre || '');
            setCiudad(comercioToEdit.ciudad || '');
            setContacto(comercioToEdit.contacto || '');
            setTipoEmpresa(comercioToEdit.tipoEmpresa || 'Supermercado');
            setNumeroEmpleados(comercioToEdit.numeroEmpleados || 1);
            setSector(comercioToEdit.sector || 'Comercio');
            setRepresentanteLegal(comercioToEdit.representanteLegal || '');
            setFrecuenciadevisita(comercioToEdit.frecuenciadevisita || 1);
        } else {
            setNit('');
            setNombre('');
            setCiudad('');
            setContacto('');
            setTipoEmpresa('Supermercado');
            setNumeroEmpleados(1);
            setSector('Comercio');
            setRepresentanteLegal('');
            setFrecuenciadevisita(1);
        }
    }, [comercioToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: comercioToEdit ? comercioToEdit.id : Date.now(),
            nit,
            nombre,
            ciudad,
            contacto,
            tipoEmpresa,
            numeroEmpleados: parseInt(numeroEmpleados, 10),
            sector,
            representanteLegal,
            frecuenciadevisita: parseInt(frecuenciadevisita, 10)
        });
    };

    return (
        <div style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <div className="stat-card" style={{ width: '100%', maxWidth: '650px', padding: '2.5rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
                <button 
                    onClick={onClose}
                    style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
                <h2 style={{ marginBottom: '2rem', fontWeight: 800, fontSize: '1.5rem' }}>
                    {comercioToEdit ? 'Editar Comercio' : 'Añadir Comercio'}
                </h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label className="input-label">NIT</label>
                            <div className="input-wrapper">
                                <i className="bi bi-card-text input-icon"></i>
                                <input type="text" className="form-input" required maxLength="15" placeholder="Ej. 900.xxx.xxx-x"
                                    value={nit} onChange={(e) => setNit(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Nombre del Comercio</label>
                            <div className="input-wrapper">
                                <i className="bi bi-shop input-icon"></i>
                                <input type="text" className="form-input" required maxLength="50" placeholder="Ej. Tienda D1"
                                    value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Ciudad</label>
                            <div className="input-wrapper">
                                <i className="bi bi-geo-alt input-icon"></i>
                                <input type="text" className="form-input" required maxLength="50" placeholder="Ej. Bogotá, D.C."
                                    value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Contacto (Teléfono/Email)</label>
                            <div className="input-wrapper">
                                <i className="bi bi-telephone input-icon"></i>
                                <input type="text" className="form-input" required maxLength="50" placeholder="Ej. 300 123 4567"
                                    value={contacto} onChange={(e) => setContacto(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Tipo de Empresa</label>
                            <div className="input-wrapper">
                                <i className="bi bi-building input-icon"></i>
                                <select className="form-input" style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={tipoEmpresa} onChange={(e) => setTipoEmpresa(e.target.value)}>
                                    <option value="Supermercado">Supermercado</option>
                                    <option value="Descuento">Descuento</option>
                                    <option value="Salud">Salud</option>
                                    <option value="Hogar">Hogar</option>
                                    <option value="Minimarket">Minimarket</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Número de Empleados</label>
                            <div className="input-wrapper">
                                <i className="bi bi-people input-icon"></i>
                                <input type="number" className="form-input" required min="1"
                                    value={numeroEmpleados} onChange={(e) => setNumeroEmpleados(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Sector</label>
                            <div className="input-wrapper">
                                <i className="bi bi-pie-chart input-icon"></i>
                                <input type="text" className="form-input" required maxLength="20" placeholder="Ej. Retail, Tecnología"
                                    value={sector} onChange={(e) => setSector(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Representante Legal</label>
                            <div className="input-wrapper">
                                <i className="bi bi-person-badge input-icon"></i>
                                <input type="text" className="form-input" required maxLength="50" placeholder="Nombre completo"
                                    value={representanteLegal} onChange={(e) => setRepresentanteLegal(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Frecuencia de Visita (Días)</label>
                            <div className="input-wrapper">
                                <i className="bi bi-calendar-check input-icon"></i>
                                <input type="number" className="form-input" required min="1"
                                    value={frecuenciadevisita} onChange={(e) => setFrecuenciadevisita(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-btn" style={{ marginTop: '1.5rem', width: '100%' }}>
                        <span>{comercioToEdit ? 'Actualizar Comercio' : 'Guardar Comercio'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComercioModal;
