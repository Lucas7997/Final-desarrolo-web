import React from 'react';
import styles from '../Styles/ConfirmacionEliminar.module.css';

function ConfirmacionEliminar({ producto, onConfirmar, onCancelar }) {
  return (
    <div className={styles.overlay} onClick={onCancelar}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h3>¿Eliminar "{producto.name}"?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div className={styles.botones}>
          <button className={styles.confirmar} onClick={() => onConfirmar(producto.id)}>Sí, eliminar</button>
          <button className={styles.cancelar} onClick={onCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmacionEliminar;
