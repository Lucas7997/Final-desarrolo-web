import { db } from '../Api/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';

export async function eliminarMensaje(id) {
  await deleteDoc(doc(db, 'mensajes', id));
}


export async function enviarMensaje(mensaje) {
  await addDoc(collection(db, 'mensajes'), mensaje);
}

export async function obtenerMensajes() {
  const snapshot = await getDocs(collection(db, 'mensajes'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
