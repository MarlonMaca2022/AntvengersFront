import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import InputField from '../components/InputField';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/antvengersapi/v1/usuarios', {
                cache: 'no-store'
            });
            
            if (response.ok) {
                const users = await response.json();
                // Validar contra correo y contraseña
                const foundUser = users.find(u => u.correo === email && u.password === password);

                if (foundUser) {
                    localStorage.setItem('ant_session', JSON.stringify({ 
                        name: foundUser.nombres, 
                        email: foundUser.correo, 
                        role: foundUser.rol,
                        id: foundUser.id
                    }));
                    
                    if (foundUser.rol === 'Admin' || foundUser.rol === 'admin') {
                        alert('¡Acceso de Administrador!');
                    } else {
                        alert('¡Bienvenido de nuevo!');
                    }
                    navigate('/dashboard');
                } else {
                    alert('Credenciales incorrectas o usuario no encontrado.');
                }
            } else {
                alert('Error al conectar con la API de usuarios.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
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
