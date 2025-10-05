import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from '../Styles/ContactoPage.module.css';
import { enviarMensaje, obtenerMensajes } from '../services/contactService';
import Spinner from 'react-bootstrap/Spinner';
import NotificacionEmergente from '../components/NotificacionEmergente';
import { eliminarMensaje } from '../services/contactService';



export default function ContactoPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [mensajesRecibidos, setMensajesRecibidos] = useState([]);
    const [cargandoMensajes, setCargandoMensajes] = useState(true);
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
    const [mensajeEmergente, setMensajeEmergente] = useState('');


    useEffect(() => {
        obtenerMensajes().then((mensajes) => {
            setMensajesRecibidos(mensajes);
            setCargandoMensajes(false);
        });
    }, []);


    const onSubmit = async (data) => {
        try {
            await enviarMensaje(data);
            reset();
            setMensajeEmergente('Mensaje enviado con éxito');
            setMostrarNotificacion(true);
            setTimeout(() => setMostrarNotificacion(false), 3000);
            const nuevosMensajes = await obtenerMensajes();
            setMensajesRecibidos(nuevosMensajes);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setMensajeEmergente('Hubo un error al enviar el mensaje');
            setMostrarNotificacion(true);
            setTimeout(() => setMostrarNotificacion(false), 3000);
        }
    };


    return (
        <div className="container">
            <h2 className="mb-4 text-center">Contacto</h2>

            {mostrarNotificacion && (
                <NotificacionEmergente
                    mensaje={mensajeEmergente}
                    onClose={() => setMostrarNotificacion(false)}
                />
            )}


            <form onSubmit={handleSubmit(onSubmit)} className={`p-4 border rounded ${styles.formulario}`}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        {...register('nombre', { required: 'El nombre es obligatorio' })}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        {...register('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Formato de email inválido'
                            }
                        })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea
                        className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                        rows="4"
                        {...register('mensaje', { required: 'El mensaje es obligatorio' })}
                    ></textarea>
                    {errors.mensaje && <div className="invalid-feedback">{errors.mensaje.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>

            <h2 className="mt-5">Mensajes recibidos</h2>

            {cargandoMensajes ? (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Cargando mensajes...</p>
                </div>
            ) : mensajesRecibidos.length === 0 ? (
                <p>No se han recibido mensajes aún.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Mensaje</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mensajesRecibidos.map((msg) => (
                                <tr key={msg.id}>
                                    <td>{msg.nombre}</td>
                                    <td>{msg.email}</td>
                                    <td>{msg.mensaje}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={async () => {
                                                await eliminarMensaje(msg.id);
                                                const actualizados = await obtenerMensajes();
                                                setMensajesRecibidos(actualizados);
                                                setMensajeEmergente('Mensaje eliminado correctamente');
                                                setMostrarNotificacion(true);
                                                setTimeout(() => setMostrarNotificacion(false), 3000);
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
