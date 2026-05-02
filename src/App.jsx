import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminUserPage from './pages/AdminUserPage';
import AdminMetodoPagoPage from './pages/AdminMetodoPagoPage';
import AdminComerciosPage from './pages/AdminComerciosPage';
import AdminGastosPage from './pages/AdminGastosPage';
import AdminCategoriasPage from './pages/AdminCategoriasPage';
import DashboardPage from './pages/DashboardPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
import './index.css';

function App() {
  // Initialize mock data as per original JS
  useEffect(() => {
    if (!localStorage.getItem('ant_users')) {
      const initialUsers = [
        { id: Date.now(), name: 'Alex Rivera', email: 'alex@antvengers.com', role: 'Admin', status: 'Active' },
        { id: Date.now() + 1, name: 'Sam Smith', email: 'sam@antvengers.com', role: 'Editor', status: 'Active' },
        { id: Date.now() + 2, name: 'Jordan Lee', email: 'jordan@antvengers.com', role: 'Viewer', status: 'Inactive' }
      ];
      localStorage.setItem('ant_users', JSON.stringify(initialUsers));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admin_user" element={<AdminUserPage />} />
      <Route path="/admin_metodos_pago" element={<AdminMetodoPagoPage />} />
      <Route path="/admin_comercios" element={<AdminComerciosPage />} />
      <Route path="/admin_gastos" element={<AdminGastosPage />} />
      <Route path="/admin_categorias" element={<AdminCategoriasPage />} />
      <Route path="/configuracion" element={<ConfiguracionPage />} />
    </Routes>
  );
}

export default App;
