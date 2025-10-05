import React, { useState } from 'react';
import styles from '../Styles/FormularioProducto.module.css';

function FormularioProducto({
  onAdd,
  onError,
  onCancel,
  onSuccess,
  initialData,
  setMensajeEmergente,
  setMostrarNotificacion
}) {
  const esEdicion = !!initialData;
  const [form, setForm] = useState(initialData || { name: '', price: '', stock: '', imageUrl: '' });
  const [errores, setErrores] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!form.name.trim()) nuevosErrores.name = 'El nombre es obligatorio.';
    if (form.price <= 0 || form.price === '') nuevosErrores.price = 'El precio debe ser mayor a cero.';
    if (form.stock < 0 || form.stock === '') nuevosErrores.stock = 'El stock no puede ser negativo.';
    if (form.imageUrl && !form.imageUrl.startsWith('http')) {
      nuevosErrores.imageUrl = 'La URL debe comenzar con http o https.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      if (setMensajeEmergente && setMostrarNotificacion) {
        setMensajeEmergente('Por favor corregí los errores del formulario.');
        setMostrarNotificacion(true);
        setTimeout(() => setMostrarNotificacion(false), 3000);
      }
      return;
    }

    const productoFinal = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    if (esEdicion) {
      productoFinal.id = initialData.id;
    }

    onAdd(productoFinal);
    setForm({ name: '', price: '', stock: '', imageUrl: '' });
    setErrores({});
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginTop: 0 }}>
        {esEdicion ? 'Editar Producto' : 'Agregar Producto'}
      </h2>

      <div>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className={errores.name ? styles.inputError : ''}
        />
        <span className={styles.mensajeError}>{errores.name || '\u00A0'}</span>
      </div>

      <div>
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className={errores.price ? styles.inputError : ''}
        />
        <span className={styles.mensajeError}>{errores.price || '\u00A0'}</span>
      </div>

      <div>
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className={errores.stock ? styles.inputError : ''}
        />
        <span className={styles.mensajeError}>{errores.stock || '\u00A0'}</span>
      </div>

      <div>
        <input
          name="imageUrl"
          placeholder="URL de la imagen"
          value={form.imageUrl || ''}
          onChange={handleChange}
          className={errores.imageUrl ? styles.inputError : ''}
        />
        <span className={styles.mensajeError}>{errores.imageUrl || '\u00A0'}</span>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-primary btn-sm">
          {esEdicion ? 'Guardar cambios' : 'Agregar'}
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioProducto;
