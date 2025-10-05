import React, { useEffect, useState } from 'react';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from '../services/productService';
import ListaProductos from '../components/ListaProductos';
import FormularioProducto from '../components/FormularioProducto';
import Modal from '../components/Modal';
import styles from '../Styles/InventoryPage.module.css';
import ConfirmacionEliminar from '../components/ConfirmacionEliminar';
import NotificacionEmergente from '../components/NotificacionEmergente';

function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [mensajeEmergente, setMensajeEmergente] = useState('');
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);


    const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const mostrarMensaje = (texto) => {
        setMensajeEmergente(texto);
        setMostrarNotificacion(true);
        setTimeout(() => setMostrarNotificacion(false), 3000);
    };

    const handleAdd = async product => {
        try {
            await addProduct(product);
            setMensajeEmergente('Producto agregado correctamente');
            setMostrarNotificacion(true);
            setTimeout(() => setMostrarNotificacion(false), 3000);
            await loadProducts();
        } catch (error) {
            console.error('Error al agregar el producto', error);
            mostrarMensaje('Error al agregar el producto');
        }
    };


    const handleDelete = async id => {
        try {
            const resultado = await deleteProduct(id);
            if (resultado) {
                mostrarMensaje('Producto eliminado correctamente');
                await loadProducts();
            } else {
                mostrarMensaje('No se pudo eliminar el producto');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            mostrarMensaje('Error al eliminar producto');
        }
    };

    const handleUpdate = async productoActualizado => {
        try {
            await updateProduct(productoActualizado.id, {
                name: productoActualizado.name,
                price: productoActualizado.price,
                stock: productoActualizado.stock,
                imageUrl: productoActualizado.imageUrl
            });
            mostrarMensaje('Producto actualizado correctamente');
            await loadProducts();
            setProductoEditando(null);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            mostrarMensaje('Error al actualizar producto');
        }
    };

    return (
        <div>
            <div className="container text-center mb-4">
                <h2>Gestión de Inventario</h2>
            </div>

            <div className="container text-end mb-3">
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className={styles.botonAgregarProducto}
                >
                    + Agregar producto
                </button>
            </div>


            {mostrarNotificacion && (
                <NotificacionEmergente
                    mensaje={mensajeEmergente}
                    onClose={() => setMostrarNotificacion(false)}
                />
            )}


            {productoAEliminar && (
                <ConfirmacionEliminar
                    producto={productoAEliminar}
                    onConfirmar={(id) => {
                        handleDelete(id);
                        setProductoAEliminar(null);
                    }}
                    onCancelar={() => setProductoAEliminar(null)}
                />
            )}


            <ListaProductos
                products={products}
                onDelete={handleDelete}
                onEdit={setProductoEditando}
                setProductoAEliminar={setProductoAEliminar}
            />

            {mostrarFormulario && (
                <Modal onClose={() => setMostrarFormulario(false)}>
                    <FormularioProducto
                        onAdd={handleAdd}
                        onCancel={() => setMostrarFormulario(false)}
                        onSuccess={() => setMostrarFormulario(false)}
                        initialData={productoEditando}
                        setMensajeEmergente={setMensajeEmergente}
                        setMostrarNotificacion={setMostrarNotificacion}
                    />
                </Modal>
            )}

            {productoEditando && (
                <Modal onClose={() => setProductoEditando(null)}>
                    <FormularioProducto
                        onAdd={handleUpdate}
                        onCancel={() => setProductoEditando(null)}
                        onSuccess={() => setProductoEditando(null)}
                        initialData={productoEditando}
                        setMensajeEmergente={setMensajeEmergente}
                        setMostrarNotificacion={setMostrarNotificacion}
                    />
                </Modal>
            )}

        </div>
    );
}

export default InventoryPage;
