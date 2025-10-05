import React from 'react';
import styles from '../Styles/ListaProductos.module.css';

function ListaProductos({ products, onDelete, onEdit, setProductoAEliminar }) {
  return (
    <div className="container mt-4">
      <h2 className={styles.titulo}>Inventario</h2>
      <div className="row">
        {products.map(p => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100">              
                <img
                  src={p.imageUrl && p.imageUrl.trim() ? p.imageUrl : '/images/placeholder.png'}
                  className="card-img-top"
                  alt={p.name}
                  style={{ 
                    objectFit: 'contain', 
                    maxHeight: '180px', 
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px'
                  }}
                />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    Precio: ${p.price} <br />
                    Stock: {p.stock}
                  </p>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button className={`btn btn-sm ${styles.botonEditar}`} onClick={() => onEdit(p)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => setProductoAEliminar(p)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;
