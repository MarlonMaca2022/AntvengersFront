import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import '../configuracion.css';

const ConfiguracionPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Profile State
    const [user, setUser] = useState({ name: '', email: '', phone: '', location: '', password: '' });
    
    // Password State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('ant_session'));
        if (!session) {
            navigate('/');
            return;
        }

        const users = JSON.parse(localStorage.getItem('ant_users')) || [];
        const currentUser = users.find(u => u.email === session.email);

        if (currentUser) {
            setUser({
                ...currentUser,
                phone: currentUser.phone || '',
                location: currentUser.location || ''
            });
        } else {
            setUser({ ...session, phone: '', location: '', password: '' });
        }
    }, [navigate]);

    const handleSavePersonalInfo = (e) => {
        e.preventDefault();
        
        const users = JSON.parse(localStorage.getItem('ant_users')) || [];
        const updatedUsers = users.map(u => {
            if (u.email === user.email) {
                return { ...u, name: user.name, phone: user.phone, location: user.location };
            }
            return u;
        });
        
        localStorage.setItem('ant_users', JSON.stringify(updatedUsers));
        
        const session = JSON.parse(localStorage.getItem('ant_session'));
        session.name = user.name;
        localStorage.setItem('ant_session', JSON.stringify(session));
        
        alert('Información personal actualizada correctamente');
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        
        if (user.password && currentPassword !== user.password) {
            alert('La contraseña actual es incorrecta');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas nuevas no coinciden');
            return;
        }
        
        if (newPassword.length < 8) {
            alert('La nueva contraseña debe tener al menos 8 caracteres');
            return;
        }

        const users = JSON.parse(localStorage.getItem('ant_users')) || [];
        const updatedUsers = users.map(u => {
            if (u.email === user.email) {
                return { ...u, password: newPassword };
            }
            return u;
        });
        
        localStorage.setItem('ant_users', JSON.stringify(updatedUsers));
        setUser({ ...user, password: newPassword });
        
        alert('Contraseña actualizada correctamente');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <AdminHeader 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    icon="bi-gear"
                    placeholder="Buscar configuraciones..."
                />

                <div className="content-body" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="back-btn"
                        >
                            <i className="bi bi-arrow-left" style={{ fontSize: '1.2rem' }}></i>
                            <span>Volver a la vista anterior</span>
                        </button>
                        <h2 style={{ fontSize: '1.875rem', fontWeight: '800', marginTop: '1rem' }}>Configuración de Perfil</h2>
                        <p style={{ color: 'var(--slate-500)', marginTop: '0.5rem' }}>Actualiza tu información personal y gestiona la seguridad de tu cuenta.</p>
                    </div>

                    {/* Profile Photo Card */}
                    <section className="config-card">
                        <h3 className="config-card-title">
                            <i className="bi bi-image" style={{ color: 'var(--primary)' }}></i>
                            Foto de Perfil
                        </h3>
                        <div className="profile-photo-section">
                            <div className="profile-avatar-wrapper">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=2aa3cf&color=fff&size=128`} 
                                    alt="Foto de perfil" 
                                    className="profile-avatar"
                                />
                                <button className="edit-avatar-btn" title="Editar foto">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                            </div>
                            <div className="profile-photo-info">
                                <p className="photo-info-title">Sube una nueva imagen</p>
                                <p className="photo-info-desc">Formatos permitidos: JPG, PNG o GIF. Tamaño máximo de archivo: 2MB. Se recomienda una imagen cuadrada de al menos 400x400px.</p>
                                <div className="photo-actions">
                                    <button className="submit-btn" style={{ padding: '0.5rem 1rem', width: 'auto', fontSize: '0.875rem' }}>Subir nueva foto</button>
                                    <button className="secondary-btn" style={{ margin: 0, padding: '0.5rem 1rem', width: 'auto', fontSize: '0.875rem' }}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Personal Info Card */}
                    <section className="config-card">
                        <h3 className="config-card-title">
                            <i className="bi bi-person-badge" style={{ color: 'var(--primary)' }}></i>
                            Información Personal
                        </h3>
                        <form onSubmit={handleSavePersonalInfo}>
                            <div className="config-grid">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="input-label">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        value={user.name} 
                                        onChange={e => setUser({...user, name: e.target.value})} 
                                        required 
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="input-label">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        className="form-input" 
                                        value={user.email} 
                                        readOnly 
                                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="input-label">Número de Teléfono</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <span className="phone-prefix">+57</span>
                                        <input 
                                            type="tel" 
                                            className="form-input" 
                                            value={user.phone} 
                                            onChange={e => setUser({...user, phone: e.target.value})} 
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="input-label">Ubicación (Ciudad)</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        value={user.location} 
                                        onChange={e => setUser({...user, location: e.target.value})} 
                                    />
                                </div>
                            </div>
                            <div className="config-form-actions">
                                <button type="submit" className="submit-btn" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Password Change Card */}
                    <section className="config-card">
                        <h3 className="config-card-title">
                            <i className="bi bi-lock" style={{ color: 'var(--primary)' }}></i>
                            Cambiar Contraseña
                        </h3>
                        <form onSubmit={handleUpdatePassword}>
                            <div className="config-grid-single">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="input-label">Contraseña Actual</label>
                                    <div className="input-wrapper">
                                        <input 
                                            type={showCurrent ? "text" : "password"} 
                                            className="form-input" 
                                            placeholder="••••••••"
                                            value={currentPassword}
                                            onChange={e => setCurrentPassword(e.target.value)}
                                            required={!!user.password}
                                        />
                                        <button type="button" className="toggle-password" onClick={() => setShowCurrent(!showCurrent)}>
                                            <i className={`bi ${showCurrent ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="input-label">Nueva Contraseña</label>
                                    <div className="input-wrapper">
                                        <input 
                                            type={showNew ? "text" : "password"} 
                                            className="form-input" 
                                            placeholder="Mínimo 8 caracteres"
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            required
                                        />
                                        <button type="button" className="toggle-password" onClick={() => setShowNew(!showNew)}>
                                            <i className={`bi ${showNew ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="input-label">Confirmar Nueva Contraseña</label>
                                    <div className="input-wrapper">
                                        <input 
                                            type={showConfirm ? "text" : "password"} 
                                            className="form-input" 
                                            placeholder="Repite la contraseña"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <button type="button" className="toggle-password" onClick={() => setShowConfirm(!showConfirm)}>
                                            <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="password-info">
                                <i className="bi bi-info-circle"></i>
                                <p>La nueva contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.</p>
                            </div>

                            <div className="config-form-actions">
                                <button type="submit" className="submit-btn" style={{ width: 'auto', padding: '0.75rem 1.5rem', backgroundColor: 'var(--slate-800)' }}>
                                    Actualizar Contraseña
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Danger Zone */}
                    <div className="danger-zone">
                        <div className="danger-content">
                            <div>
                                <h3 className="danger-title">Zona de Peligro</h3>
                                <p className="danger-desc">Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.</p>
                            </div>
                            <button className="danger-btn">
                                Eliminar mi cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConfiguracionPage;
