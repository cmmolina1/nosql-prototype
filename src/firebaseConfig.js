// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // 

// Datos  Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEt4lmcjRRKbEC_HCyDgHx2-R7ekptFMs",
  authDomain: "nosql-prototype.firebaseapp.com",
  projectId: "nosql-prototype",
  storageBucket: "nosql-prototype.firebasestorage.app",
  messagingSenderId: "37530119784",
  appId: "1:37530119784:web:fd8a7294f76f760ff615dd",
  measurementId: "G-K4MCG3JCQL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar instancia de Firestore
export const db = getFirestore(app);   
