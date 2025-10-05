import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../Api/firebase';

const productsRef = collection(db, 'products');

export async function fetchProducts() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addProduct(product) {
const docRef = await addDoc(productsRef, product);
return docRef.id;
}

export async function updateProduct(id, updatedData) {
  const productDoc = doc(db, 'products', id);
  await updateDoc(productDoc, updatedData);
}

export async function deleteProduct(id) {
  const productDoc = doc(db, 'products', id);
  const snapshot = await getDoc(productDoc);

  if (!snapshot.exists()) {
    console.warn(`Producto con ID ${id} no existe.`);
    return false;
  }

  await deleteDoc(productDoc);
  return true;
}
