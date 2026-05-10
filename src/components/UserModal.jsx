import React, { useState, useEffect } from 'react';

const UserModal = ({ isOpen, onClose, onSave, userToEdit }) => {
    const [nombres, setNombres] = useState('');
    const [tipodoc, setTipodoc] = useState('CC');
    const [documento, setDocumento] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('Masculino');
    const [correo, setCorreo] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('Usuario');

    useEffect(() => {
        if (userToEdit) {
            setNombres(userToEdit.nombres || '');
            setTipodoc(userToEdit.tipodoc || 'CC');
            setDocumento(userToEdit.documento || '');
            setEdad(userToEdit.edad || '');
            setGenero(userToEdit.genero || 'Masculino');
            setCorreo(userToEdit.correo || '');
            setUsername(userToEdit.username || '');
            setPassword(userToEdit.password || '');
            setRol(userToEdit.rol || 'Usuario');
        } else {
            setNombres('');
            setTipodoc('CC');
            setDocumento('');
            setEdad('');
            setGenero('Masculino');
            setCorreo('');
            setUsername('');
            setPassword('');
            setRol('Usuario');
        }
    }, [userToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            id: userToEdit ? userToEdit.id : Date.now(), 
            nombres,
            tipodoc,
            documento,
            edad: parseInt(edad, 10),
            genero,
            correo,
            username,
            password,
            rol,
            fechaRegistro: userToEdit && userToEdit.fechaRegistro ? userToEdit.fechaRegistro : new Date().toISOString().split('T')[0]
        });
        onClose();
    };

    return (
        <div id="user-modal" style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, alignItems: 'center', justifyState: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <div className="stat-card" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Nombres Completos</label>
                            <div className="input-wrapper">
                                <i className="bi bi-person input-icon"></i>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    required 
                                    placeholder="Ej. Alex Rivera"
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Tipo Documento</label>
                            <div className="input-wrapper">
                                <i className="bi bi-card-heading input-icon"></i>
                                <select 
                                    className="form-input" 
                                    style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={tipodoc}
                                    onChange={(e) => setTipodoc(e.target.value)}
                                >
                                    <option value="CC">CC</option>
                                    <option value="pasaporte">Pasaporte</option>
                                    <option value="TI">TI</option>
                                    <option value="CE">CE</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Número de Documento</label>
                            <div className="input-wrapper">
                                <i className="bi bi-hash input-icon"></i>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    required 
                                    placeholder="Ej. 1020304050"
                                    value={documento}
                                    onChange={(e) => setDocumento(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Edad</label>
                            <div className="input-wrapper">
                                <i className="bi bi-calendar input-icon"></i>
                                <input 
                                    type="number" 
                                    className="form-input" 
                                    required 
                                    placeholder="Ej. 25"
                                    value={edad}
                                    onChange={(e) => setEdad(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Género</label>
                            <div className="input-wrapper">
                                <i className="bi bi-gender-ambiguous input-icon"></i>
                                <select 
                                    className="form-input" 
                                    style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                >
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Correo Electrónico</label>
                            <div className="input-wrapper">
                                <i className="bi bi-envelope input-icon"></i>
                                <input 
                                    type="email" 
                                    className="form-input" 
                                    required 
                                    placeholder="alex@correo.com"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Nombre de Usuario</label>
                            <div className="input-wrapper">
                                <i className="bi bi-at input-icon"></i>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    required 
                                    placeholder="Ej. alexrivera"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Contraseña</label>
                            <div className="input-wrapper">
                                <i className="bi bi-shield-lock input-icon"></i>
                                <input 
                                    type="password" 
                                    className="form-input" 
                                    required 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Rol de Usuario</label>
                            <div className="input-wrapper">
                                <i className="bi bi-shield-check input-icon"></i>
                                <select 
                                    className="form-input" 
                                    style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                >
                                    <option value="Usuario">Usuario</option>
                                    <option value="Admin">Administrador</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-btn" style={{ marginTop: '1.5rem', width: '100%' }}>
                        <span>{userToEdit ? 'Actualizar Usuario' : 'Guardar Usuario'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
