// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDPaKXErymJr2Qsc8G0TXRuTjj0SKHHpNk",
    authDomain: "general-hub.firebaseapp.com",
    projectId: "general-hub",
    storageBucket: "general-hub.firebasestorage.app",
    messagingSenderId: "656826640676",
    appId: "1:656826640676:web:31008d95ad7e650cb72bb1",
    measurementId: "G-R5J44QVHWM"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
