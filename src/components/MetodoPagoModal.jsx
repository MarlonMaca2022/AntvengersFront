import React, { useState, useEffect } from 'react';

const MetodoPagoModal = ({ isOpen, onClose, onSave, methodToEdit }) => {
    const [platform, setPlatform] = useState('');
    const [type, setType] = useState('Crédito');
    const [status, setStatus] = useState('Activo');

    useEffect(() => {
        if (methodToEdit) {
            setPlatform(methodToEdit.platform || '');
            setType(methodToEdit.type || 'Crédito');
            setStatus(methodToEdit.status || 'Activo');
        } else {
            setPlatform('');
            setType('Crédito');
            setStatus('Activo');
        }
    }, [methodToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: methodToEdit ? methodToEdit.id : Date.now(),
            platform,
            type,
            status
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
                    {methodToEdit ? 'Editar Método' : 'Añadir Método'}
                </h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Plataforma / Medio</label>
                        <div className="input-wrapper">
                            <i className="bi bi-bank input-icon"></i>
                            <input 
                                type="text" 
                                className="form-input" 
                                required 
                                placeholder="Ej. Addi, Sistecredito, Tarjeta Visa..."
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Tipo de Método</label>
                        <div className="input-wrapper">
                            <i className="bi bi-credit-card input-icon"></i>
                            <select 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Crédito">Crédito</option>
                                <option value="Débito">Débito</option>
                                <option value="Efectivo">Efectivo</option>
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
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
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
