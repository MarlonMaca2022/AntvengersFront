import React, { useState, useEffect } from 'react';

const UserModal = ({ isOpen, onClose, onSave, userToEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Viewer');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setRole(userToEdit.role);
        } else {
            setName('');
            setEmail('');
            setRole('Viewer');
        }
    }, [userToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            id: userToEdit ? userToEdit.id : Date.now(), 
            name, 
            email, 
            role, 
            status: userToEdit ? userToEdit.status : 'Active' 
        });
        onClose();
    };

    return (
        <div id="user-modal" style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, alignItems: 'center', justifyState: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <div className="stat-card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', position: 'relative' }}>
                <button 
                    id="close-modal" 
                    style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
                    onClick={onClose}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
                <h2 id="modal-title" style={{ marginBottom: '2rem', fontWeight: 800 }}>
                    {userToEdit ? 'Editar Usuario' : 'Añadir Usuario'}
                </h2>
                
                <form id="user-form" className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Nombre Completo</label>
                        <div className="input-wrapper">
                            <i className="bi bi-person input-icon"></i>
                            <input 
                                type="text" 
                                className="form-input" 
                                required 
                                placeholder="Ej. Alex Rivera"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Correo Electrónico</label>
                        <div className="input-wrapper">
                            <i className="bi bi-envelope input-icon"></i>
                            <input 
                                type="email" 
                                className="form-input" 
                                required 
                                placeholder="alex@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Rol</label>
                        <div className="input-wrapper">
                            <i className="bi bi-shield-check input-icon"></i>
                            <select 
                                className="form-input" 
                                style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="Admin">Administrador</option>
                                <option value="Editor">Editor</option>
                                <option value="Viewer">Visualizador</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
                        <span>{userToEdit ? 'Actualizar Usuario' : 'Guardar Usuario'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
