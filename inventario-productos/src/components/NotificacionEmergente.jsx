import React, { useEffect } from 'react';
import styles from '../Styles/NotificacionEmergente.module.css';

function NotificacionEmergente({ mensaje, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.notificacion}>
      {mensaje}
    </div>
  );
}

export default NotificacionEmergente;
