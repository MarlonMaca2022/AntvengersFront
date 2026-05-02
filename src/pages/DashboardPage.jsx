import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import '../dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const DashboardPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [gastos, setGastos] = useState([]);
    const [userName, setUserName] = useState('Admin');

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('ant_session') || '{}');
        if (session && session.name) {
            setUserName(session.name.split(' ')[0]);
        }

        const loadedGastos = JSON.parse(localStorage.getItem('ant_gastos') || '[]');
        setGastos(loadedGastos.sort((a, b) => b.id - a.id));
    }, []);

    const formatter = new Intl.NumberFormat('es-CO', { 
        style: 'currency', 
        currency: 'COP', 
        maximumFractionDigits: 0 
    });

    const filteredGastos = gastos.filter(g => 
        g.comercio.toLowerCase().includes(searchTerm.toLowerCase()) || 
        g.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalGastos = gastos.reduce((acc, g) => acc + parseFloat(g.monto), 0);
    const recentGastos = filteredGastos.slice(0, 5);

    const lineChartData = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
            label: 'Gastos Semanales',
            data: [1200000, 1900000, 1500000, 2100000],
            borderColor: '#2aa3cf',
            backgroundColor: 'rgba(42, 163, 207, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#2aa3cf'
        }]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { 
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#64748b' }
            },
            x: { 
                grid: { display: false },
                ticks: { color: '#64748b' }
            }
        }
    };

    const donutChartData = {
        labels: ['Alimentación', 'Transporte', 'Entretenimiento', 'Hogar'],
        datasets: [{
            data: [42, 26, 18, 14],
            backgroundColor: ['#2aa3cf', '#4ade80', '#f59e0b', '#f43f5e'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    };

    const donutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    padding: 20,
                    font: { size: 11, family: 'Space Grotesk' }
                }
            }
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <AdminHeader 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm} 
                    icon="bi-speedometer2"
                    placeholder="Buscar métricas, transacciones..."
                />

                <div className="content-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.875rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Panel de Control Unificado</h2>
                            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Bienvenido de nuevo, <span>{userName}</span>. Aquí tienes el resumen de hoy.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="secondary-btn" style={{ margin: 0, padding: '0.6rem 1.2rem', fontSize: '0.875rem', width: 'auto', borderRadius: 'var(--radius-lg)' }}>
                                <i className="bi bi-calendar3" style={{ marginRight: '0.5rem' }}></i>
                                <span>Últimos 30 días</span>
                            </button>
                            <button className="submit-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem', width: 'auto' }}>
                                <i className="bi bi-download" style={{ marginRight: '0.5rem' }}></i>
                                <span>Exportar</span>
                            </button>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card metric-card">
                            <div className="stat-header">
                                <div className="logo-icon" style={{ background: 'rgba(var(--primary-rgb), 0.1)' }}>
                                    <i className="bi bi-wallet2" style={{ color: 'var(--primary)' }}></i>
                                </div>
                                <span className="status-chip status-active">+12.5%</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gasto Total Mensual</p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0' }}>{formatter.format(totalGastos)}</h3>
                            <div style={{ height: '4px', background: 'var(--slate-800)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: '65%', height: '100%', background: 'var(--primary)' }}></div>
                            </div>
                        </div>
                        <div className="stat-card metric-card">
                            <div className="stat-header">
                                <div className="logo-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                                    <i className="bi bi-graph-up" style={{ color: '#4ade80' }}></i>
                                </div>
                                <span className="status-chip" style={{ background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)' }}>Diario</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Promedio Diario</p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0' }}>$ 141.666</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Basado en gastos registrados</p>
                        </div>
                        <div className="stat-card metric-card">
                            <div className="stat-header">
                                <div className="logo-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                                    <i className="bi bi-piggy-bank" style={{ color: '#f59e0b' }}></i>
                                </div>
                                <span className="status-chip" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>Meta</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ahorro Proyectado</p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.5rem 0' }}>$ 520.000</h3>
                            <p style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '600' }}>85% de la meta mensual</p>
                        </div>
                    </div>

                    <div className="charts-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <div className="stat-card">
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Actividad de Gastos Mensuales</h3>
                            <div className="chart-container">
                                <Line data={lineChartData} options={lineChartOptions} />
                            </div>
                        </div>
                        <div className="stat-card">
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Distribución por Categoría</h3>
                            <div className="chart-container">
                                <Doughnut data={donutChartData} options={donutChartOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-current)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Últimas Transacciones</h3>
                            <a href="/admin_gastos" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Ver todo</a>
                        </div>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Comercio</th>
                                    <th>Categoría</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentGastos.length > 0 ? (
                                    recentGastos.map(tx => (
                                        <tr key={tx.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', background: 'rgba(var(--primary-rgb), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                                        <i className="bi bi-shop"></i>
                                                    </div>
                                                    <span style={{ fontWeight: '600' }}>{tx.comercio}</span>
                                                </div>
                                            </td>
                                            <td><span className="status-chip status-inactive">{tx.categoria}</span></td>
                                            <td style={{ color: 'var(--slate-500)' }}>{new Date(tx.fecha || tx.id).toLocaleDateString()}</td>
                                            <td style={{ fontWeight: '700', color: 'var(--primary)' }}>{formatter.format(tx.monto)}</td>
                                            <td><span className="status-chip status-active">Completado</span></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', color: 'var(--slate-500)', padding: '2rem' }}>
                                            No hay transacciones registradas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
