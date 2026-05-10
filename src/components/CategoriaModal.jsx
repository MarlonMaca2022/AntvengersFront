import React, { useState, useEffect } from 'react';

const CategoriaModal = ({ isOpen, onClose, onSave, categoriaToEdit }) => {
    const [nombre, setNombre] = useState('');
    const [referencia, setReferencia] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [prioridad, setPrioridad] = useState('Media');
    const [color, setColor] = useState('Azul');
    const [icono, setIcono] = useState('bi-cup-hot');

    useEffect(() => {
        if (categoriaToEdit) {
            setNombre(categoriaToEdit.nombre || '');
            setReferencia(categoriaToEdit.referencia || '');
            setDescripcion(categoriaToEdit.descripcion || '');
            setEstado(categoriaToEdit.estado || 'Activo');
            setPrioridad(categoriaToEdit.prioridad || 'Media');
            setColor(categoriaToEdit.color || 'Azul');
            setIcono(categoriaToEdit.icono || 'bi-cup-hot');
        } else {
            setNombre('');
            setReferencia('');
            setDescripcion('');
            setEstado('Activo');
            setPrioridad('Media');
            setColor('Azul');
            setIcono('bi-cup-hot');
        }
    }, [categoriaToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        onSave({
            id: categoriaToEdit ? categoriaToEdit.id : Date.now(),
            nombre,
            referencia,
            descripcion,
            estado,
            prioridad,
            color,
            icono,
            fechaCreacion: categoriaToEdit && categoriaToEdit.fechaCreacion ? categoriaToEdit.fechaCreacion : currentDate,
            fechaActualizacion: currentDate
        });
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
            <div className="stat-card" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
                <button 
                    onClick={onClose}
                    style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
                <h2 style={{ marginBottom: '2rem', fontWeight: 800, fontSize: '1.5rem' }}>
                    {categoriaToEdit ? 'Editar Categoría' : 'Añadir Categoría'}
                </h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label className="input-label">Nombre de Categoría</label>
                            <div className="input-wrapper">
                                <i className="bi bi-tag input-icon"></i>
                                <input type="text" className="form-input" required placeholder="Ej. Alimentos" 
                                    value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Referencia (REF)</label>
                            <div className="input-wrapper">
                                <i className="bi bi-upc-scan input-icon"></i>
                                <input type="text" className="form-input" required placeholder="Ej. CAT-001" 
                                    value={referencia} onChange={e => setReferencia(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Estado</label>
                            <div className="input-wrapper">
                                <i className="bi bi-toggle-on input-icon"></i>
                                <select className="form-input" style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={estado} onChange={e => setEstado(e.target.value)}>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Pendiente">Pendiente</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Prioridad</label>
                            <div className="input-wrapper">
                                <i className="bi bi-list-nested input-icon"></i>
                                <select className="form-input" style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={prioridad} onChange={e => setPrioridad(e.target.value)}>
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Color</label>
                            <div className="input-wrapper">
                                <i className="bi bi-palette input-icon"></i>
                                <select className="form-input" style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={color} onChange={e => setColor(e.target.value)}>
                                    <option value="Azul">Azul</option>
                                    <option value="Verde">Verde</option>
                                    <option value="Rojo">Rojo</option>
                                    <option value="Amarillo">Amarillo</option>
                                    <option value="Naranja">Naranja</option>
                                    <option value="Morado">Morado</option>
                                    <option value="Gris">Gris</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Icono</label>
                            <div className="input-wrapper">
                                <i className={`bi ${icono} input-icon`}></i>
                                <select className="form-input" style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                    value={icono} onChange={e => setIcono(e.target.value)}>
                                    <option value="bi-cup-hot">Alimentos / Restaurante</option>
                                    <option value="bi-pc-display">Tecnología</option>
                                    <option value="bi-house">Hogar</option>
                                    <option value="bi-heart-pulse">Salud</option>
                                    <option value="bi-box-seam">General</option>
                                    <option value="bi-basket">Canasta</option>
                                    <option value="bi-airplane">Viajes</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Descripción</label>
                            <div className="input-wrapper">
                                <textarea className="form-input" rows="3" required placeholder="Descripción de la categoría..."
                                    style={{ paddingLeft: '1rem', borderRadius: 'var(--radius-lg)' }}
                                    value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-btn" style={{ marginTop: '1.5rem', width: '100%' }}>
                        <span>{categoriaToEdit ? 'Actualizar Categoría' : 'Guardar Categoría'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoriaModal;
