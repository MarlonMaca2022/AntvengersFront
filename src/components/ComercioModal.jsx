import React, { useState, useEffect } from 'react';

const ComercioModal = ({ isOpen, onClose, onSave, comercioToEdit }) => {
    const [nombre, setNombre] = useState('');
    const [nit, setNit] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [categoria, setCategoria] = useState('Supermercado');

    useEffect(() => {
        if (comercioToEdit) {
            setNombre(comercioToEdit.nombre || '');
            setNit(comercioToEdit.nit || '');
            setUbicacion(comercioToEdit.ubicacion || '');
            setCategoria(comercioToEdit.categoria || 'Supermercado');
        } else {
            setNombre('');
            setNit('');
            setUbicacion('');
            setCategoria('Supermercado');
        }
    }, [comercioToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: comercioToEdit ? comercioToEdit.id : Date.now(),
            nombre,
            nit,
            ubicacion,
            categoria
        });
    };

    return (
        <div style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <div className="stat-card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', position: 'relative' }}>
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
                    <div className="input-group">
                        <label className="input-label">Nombre del Comercio</label>
                        <div className="input-wrapper">
                            <i className="bi bi-shop input-icon"></i>
                            <input 
                                type="text" 
                                className="form-input" 
                                required 
                                placeholder="Ej. Tienda D1"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">NIT</label>
                        <div className="input-wrapper">
                            <i className="bi bi-card-text input-icon"></i>
                            <input 
                                type="text" 
                                className="form-input" 
                                required 
                                placeholder="Ej. 900.xxx.xxx-x"
                                value={nit}
                                onChange={(e) => setNit(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Ubicación / Ciudad</label>
                        <div className="input-wrapper">
                            <i className="bi bi-geo-alt input-icon"></i>
                            <input 
                                type="text" 
                                className="form-input" 
                                required 
                                placeholder="Ej. Bogotá, D.C."
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Categoría Principal</label>
                        <div className="input-wrapper">
                            <i className="bi bi-tag input-icon"></i>
                            <select 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                                <option value="Supermercado">Supermercado</option>
                                <option value="Descuento">Descuento (Supermercado)</option>
                                <option value="Salud">Salud y Farmacia</option>
                                <option value="Hogar">Hogar y Construcción</option>
                                <option value="Otro">Otro Mercado</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
                        <span>{comercioToEdit ? 'Actualizar Comercio' : 'Guardar Comercio'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComercioModal;
