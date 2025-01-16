import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
   apiKey: "AIzaSyBodtW5B47yCKQzIsmYPrKQjqW6U4-Lrbs",
   authDomain: "rfid-login-8425c.firebaseapp.com",
   projectId: "rfid-login-8425c",
   storageBucket: "rfid-login-8425c.firebasestorage.app",
   messagingSenderId: "769875979265",
   appId: "1:769875979265:web:f0bdffa7e13abcb7ada400",
   measurementId: "G-D0369WEQ9F"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };




