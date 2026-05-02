import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import InputField from '../components/InputField';

const RegisterPage = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);

        // Mock Register Logic based on original JS
        setTimeout(() => {
            const newUser = {
                id: Date.now(),
                name: fullname,
                email: email,
                role: 'Viewer',
                status: 'Active'
            };

            const users = JSON.parse(localStorage.getItem('ant_users') || '[]');
            users.push(newUser);
            localStorage.setItem('ant_users', JSON.stringify(users));

            alert('¡Cuenta creada con éxito!');
            setLoading(false);
            navigate('/');
        }, 1200);
    };

    return (
        <div className="auth-page">
            <div className="app-container centered-layout">
            <div className="layout-container">
                <header>
                    <div className="logo">
                        <div className="logo-icon">
                            <i className="bi bi-bug-fill" style={{ fontSize: '1.5rem' }}></i>
                        </div>
                        <h2 className="logo-text">Antvengers</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" className="menu-btn" title="Volver al Login">
                            <i className="bi bi-arrow-left"></i>
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>

                <main style={{ padding: '2.5rem' }}>
                    <div className="form-container" style={{ maxWidth: '100%' }}>
                        <div className="form-header fade-in">
                            <h2 className="form-title">Crear cuenta</h2>
                            <p className="form-subtitle">Únete a la comunidad de Antvengers hoy mismo.</p>
                        </div>

                        <form className="auth-form fade-in delay-1" onSubmit={handleSubmit}>
                            <InputField
                                label="Nombre completo"
                                icon="bi-person"
                                type="text"
                                id="fullname"
                                placeholder="Tu nombre y apellido"
                                required
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />

                            <InputField
                                label="Correo electrónico"
                                icon="bi-envelope"
                                type="email"
                                id="email"
                                placeholder="hero@antvengers.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <InputField
                                label="Contraseña"
                                icon="bi-lock"
                                type="password"
                                id="password"
                                placeholder="Crea una contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <InputField
                                label="Confirmar contraseña"
                                icon="bi-lock-check"
                                type="password"
                                id="confirm-password"
                                placeholder="Repite tu contraseña"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }} disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span>Procesando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Registrarse</span>
                                        <i className="bi bi-rocket-takeoff"></i>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="divider fade-in delay-2">
                            <div className="divider-line"></div>
                            <span className="divider-text">O regístrate con</span>
                            <div className="divider-line"></div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }} className="fade-in delay-2">
                            <button className="secondary-btn" style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <i className="bi bi-google"></i> Google
                            </button>
                            <button className="secondary-btn" style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <i className="bi bi-apple"></i> Apple
                            </button>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '2rem' }} className="fade-in delay-3">
                            <p className="form-subtitle" style={{ fontSize: '0.875rem' }}>
                                ¿Ya tienes una cuenta? <Link to="/" className="forgot-link">Inicia sesión aquí</Link>
                            </p>
                        </div>

                        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '2rem' }} className="fade-in delay-3">
                            Al registrarte, aceptas nuestros <a href="#" className="forgot-link" style={{ fontSize: '0.75rem' }}>Términos de Servicio</a> y <a href="#" className="forgot-link" style={{ fontSize: '0.75rem' }}>Política de Privacidad</a>.
                        </p>
                    </div>
                </main>
            </div>
            </div>
        </div>
    );
};

export default RegisterPage;
