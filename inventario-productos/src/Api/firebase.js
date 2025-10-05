import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpTNhciImjTmXtQghEzfUo23SaTk2VFEU",
  authDomain: "inventario-productos-6410c.firebaseapp.com",
  projectId: "inventario-productos-6410c",
  storageBucket: "inventario-productos-6410c.firebasestorage.app",
  messagingSenderId: "379396820063",
  appId: "1:379396820063:web:a5bc9472cc82d5654a9fea"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
