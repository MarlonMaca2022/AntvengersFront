import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import UserModal from '../components/UserModal';

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/antvengersapi/v1/usuarios');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Error fetching users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSaveUser = () => {
        fetchUsers();
        setUserToEdit(null);
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                const response = await fetch(`http://localhost:8080/antvengersapi/v1/usuarios/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    fetchUsers();
                } else {
                    console.error('Error deleting user:', response.statusText);
                    alert('Error al eliminar el usuario');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error de conexión al eliminar el usuario');
            }
        }
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    };

    const filteredUsers = users.filter(user => 
        (user.nombres || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.correo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.username || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalHombres = users.filter(u => u.genero === 'Masculino').length;
    const totalMujeres = users.filter(u => u.genero === 'Femenino').length;
    const totalAdmins = users.filter(u => u.rol === 'admin' || u.rol === 'Admin').length;

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="main-content">
                <AdminHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                <div className="content-body" style={{ paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Gestión de Usuarios</h2>
                            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Gestiona los accesos y roles de la plataforma.</p>
                        </div>
                        <button 
                            className="submit-btn" 
                            style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem', width: 'auto' }} 
                            onClick={() => { setUserToEdit(null); setIsModalOpen(true); }}
                        >
                            <i className="bi bi-person-plus" style={{ fontSize: '1.1rem', marginRight: '0.25rem' }}></i>
                            <span>Nuevo Usuario</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="logo-icon" style={{ background: 'rgba(var(--primary-rgb), 0.1)' }}>
                                    <i className="bi bi-people" style={{ color: 'var(--primary)' }}></i>
                                </div>
                                <span className="status-chip status-active">+12%</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Total Usuarios</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{users.length}</h3>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="logo-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                                    <i className="bi bi-shield-lock" style={{ color: '#f59e0b' }}></i>
                                </div>
                                <span className="status-chip status-inactive">Admin</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Administradores</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalAdmins}</h3>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="logo-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                                    <i className="bi bi-gender-ambiguous" style={{ color: '#f59e0b' }}></i>
                                </div>
                                <span className="status-chip status-inactive">Distribución</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Mujeres / Hombres</p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalMujeres} / {totalHombres}</h3>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Usuario</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Documento</th>
                                    <th>Género</th>
                                    <th>Fecha Reg.</th>
                                    <th style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="fade-in">
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <img 
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombres || 'User')}&background=random`} 
                                                    className="user-avatar" 
                                                    alt={user.nombres} 
                                                    style={{ width: '32px', height: '32px' }}
                                                />
                                                <span style={{ fontWeight: 600 }}>{user.nombres}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="status-chip status-active" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
                                                @{user.username}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--slate-500)' }}>{user.correo}</td>
                                        <td>
                                            <span className={`status-chip ${(user.rol === 'Admin' || user.rol === 'admin') ? 'status-active' : 'status-inactive'}`}>
                                                {user.rol || 'user'}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ fontSize: '0.85rem' }}>{user.tipodoc} {user.documento}</span>
                                        </td>
                                        <td>{user.genero}</td>
                                        <td>{user.fechaRegistro}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="action-btn" onClick={() => handleEditUser(user)} title="Editar">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="action-btn delete" onClick={() => handleDeleteUser(user.id)} title="Eliminar">
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-current)', backgroundColor: 'rgba(var(--slate-100), 0.3)' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                                Mostrando {filteredUsers.length} resultados
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="menu-btn" style={{ width: '2rem', height: '2rem' }}><i className="bi bi-chevron-left" style={{ fontSize: '0.8rem' }}></i></button>
                                <button className="menu-btn active" style={{ width: '2rem', height: '2rem', background: 'var(--primary)', color: 'white' }}>1</button>
                                <button className="menu-btn" style={{ width: '2rem', height: '2rem' }}><i className="bi bi-chevron-right" style={{ fontSize: '0.8rem' }}></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <UserModal 
                isOpen={isModalOpen} 
                onClose={() => { setIsModalOpen(false); setUserToEdit(null); }}
                onSave={handleSaveUser}
                userToEdit={userToEdit}
            />
        </div>
    );
};

export default AdminUserPage;
