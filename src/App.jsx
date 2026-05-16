import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
