import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import InputField from '../components/InputField';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Look up the user in localStorage
        const users = JSON.parse(localStorage.getItem('ant_users') || '[]');
        const foundUser = users.find(u => u.email === email);

        setTimeout(() => {
            if (foundUser) {
                localStorage.setItem('ant_session', JSON.stringify({ name: foundUser.name, email: foundUser.email, role: foundUser.role }));
                
                if (foundUser.role === 'Admin') {
                    alert('¡Acceso de Administrador!');
                } else {
                    alert('¡Bienvenido de nuevo!');
                }
                navigate('/dashboard');
            } else if (email === 'alex@antvengers.com') {
                localStorage.setItem('ant_session', JSON.stringify({ name: 'Alex Rivera', email, role: 'Admin' }));
                alert('¡Acceso de Administrador!');
                navigate('/dashboard');
            } else {
                localStorage.setItem('ant_session', JSON.stringify({ name: 'Heroe', email, role: 'User' }));
                alert('¡Bienvenido de nuevo!');
                navigate('/dashboard');
            }
            setLoading(false);
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
                        <ThemeToggle />
                    </div>
                </header>

                <main style={{ padding: '2.5rem' }}>
                    <div className="form-container" style={{ maxWidth: '100%' }}>
                        <div className="form-header fade-in">
                            <h2 className="form-title">Iniciar sesión</h2>
                            <p className="form-subtitle">Bienvenido de nuevo a la base de Antvengers.</p>
                        </div>

                        <form className="auth-form fade-in delay-1" onSubmit={handleSubmit}>
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
                                placeholder="Tu contraseña secreta"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="remember-me">
                                    <input type="checkbox" className="checkbox" />
                                    <span className="checkbox-label">Recordarme</span>
                                </label>
                                <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span>Procesando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Entrar</span>
                                        <i className="bi bi-box-arrow-in-right"></i>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="divider fade-in delay-2">
                            <div className="divider-line"></div>
                            <span className="divider-text">O continúa con</span>
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
                                ¿No tienes una cuenta? <Link to="/register" className="forgot-link">Regístrate gratis</Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            </div>
        </div>
    );
};

export default LoginPage;
