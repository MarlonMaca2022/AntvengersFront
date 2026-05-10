import React, { useState, useEffect } from 'react';

const MetodoPagoModal = ({ isOpen, onClose, onSave, methodToEdit }) => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('Tarjeta de crédito');
    const [estado, setEstado] = useState('Activo');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (methodToEdit) {
            setNombre(methodToEdit.nombre || '');
            setTipo(methodToEdit.tipo || 'Tarjeta de crédito');
            setEstado(methodToEdit.estado || 'Activo');
            setDescripcion(methodToEdit.descripcion || '');
        } else {
            setNombre('');
            setTipo('Tarjeta de crédito');
            setEstado('Activo');
            setDescripcion('');
        }
    }, [methodToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: methodToEdit ? methodToEdit.id : Date.now(),
            nombre,
            tipo,
            estado,
            descripcion
        });
    };

    return (
        <div style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <div className="stat-card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', position: 'relative' }}>
                <button 
                    onClick={onClose}
                    style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
                <h2 style={{ marginBottom: '2rem', fontWeight: 800, fontSize: '1.5rem' }}>
                    {methodToEdit ? 'Editar Método de Pago' : 'Añadir Método de Pago'}
                </h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Nombre</label>
                        <div className="input-wrapper">
                            <i className="bi bi-bank input-icon"></i>
                            <input 
                                type="text" 
                                className="form-input" 
                                required 
                                maxLength="40"
                                placeholder="Ej. Addi, Sistecredito, Visa..."
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Tipo</label>
                        <div className="input-wrapper">
                            <i className="bi bi-credit-card input-icon"></i>
                            <select 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                                <option value="Tarjeta de débito">Tarjeta de débito</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Billetera digital">Billetera digital</option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Crédito">Crédito (Financiación)</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Estado</label>
                        <div className="input-wrapper">
                            <i className="bi bi-toggle-on input-icon"></i>
                            <select 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="Pendiente">Pendiente</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Descripción</label>
                        <div className="input-wrapper">
                            <textarea 
                                className="form-input" 
                                rows="3" 
                                maxLength="100"
                                placeholder="Descripción del método de pago..."
                                style={{ paddingLeft: '1rem', borderRadius: 'var(--radius-lg)' }}
                                value={descripcion} 
                                onChange={e => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
                        <span>{methodToEdit ? 'Actualizar Método' : 'Guardar Método'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MetodoPagoModal;
