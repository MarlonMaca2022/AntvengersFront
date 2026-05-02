import React, { useState, useEffect } from 'react';

const CategoriaModal = ({ isOpen, onClose, onSave, categoriaToEdit }) => {
    const [nombre, setNombre] = useState('');
    const [ref, setRef] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [icono, setIcono] = useState('bi-cup-hot');

    useEffect(() => {
        if (categoriaToEdit) {
            setNombre(categoriaToEdit.nombre);
            setRef(categoriaToEdit.ref);
            setDescripcion(categoriaToEdit.descripcion);
            setIcono(categoriaToEdit.icono);
        } else {
            setNombre('');
            setRef('');
            setDescripcion('');
            setIcono('bi-cup-hot');
        }
    }, [categoriaToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: categoriaToEdit ? categoriaToEdit.id : Date.now(),
            nombre,
            ref,
            descripcion,
            icono
        });
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
            <div className="stat-card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', position: 'relative' }}>
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
                                value={ref} onChange={e => setRef(e.target.value)} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Descripción</label>
                        <div className="input-wrapper">
                            <textarea className="form-input" rows="3" required placeholder="Descripción de la categoría..."
                                style={{ paddingLeft: '1rem', borderRadius: 'var(--radius-lg)' }}
                                value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Icono</label>
                        <div className="input-wrapper">
                            <i className={`bi ${icono} input-icon`}></i>
                            <select className="form-input" 
                                style={{ paddingLeft: '3rem', WebkitAppearance: 'none', appearance: 'none' }}
                                value={icono} onChange={e => setIcono(e.target.value)}>
                                <option value="bi-cup-hot">Alimentos / Restaurante (Cup)</option>
                                <option value="bi-pc-display">Tecnología (PC)</option>
                                <option value="bi-house">Hogar (House)</option>
                                <option value="bi-heart-pulse">Salud (Heart)</option>
                                <option value="bi-box-seam">General (Box)</option>
                                <option value="bi-basket">Canasta (Basket)</option>
                                <option value="bi-airplane">Viajes (Airplane)</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
                        <span>{categoriaToEdit ? 'Actualizar Categoría' : 'Guardar Categoría'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoriaModal;
