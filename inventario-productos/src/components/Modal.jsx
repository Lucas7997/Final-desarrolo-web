import React, { useEffect } from 'react';
import styles from '../Styles/Modal.module.css';

function Modal({ children, onClose }) {
    const [cerrando, setCerrando] = React.useState(false);
    const handleOverlayClick = () => {
        setCerrando(true);
    };

    useEffect(() => {
        if (cerrando) {
            const timer = setTimeout(() => {
                onClose();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [cerrando, onClose]);

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${cerrando ? styles.fadeOut : styles.fadeIn}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
