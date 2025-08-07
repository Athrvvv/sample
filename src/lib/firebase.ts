// Implemented Firebase configuration and initialization to connect the app with Firebase services.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "pocketai-e4n6o",
  appId: "1:214335210694:web:b00a39827f7234d84243c7",
  storageBucket: "pocketai-e4n6o.firebasestorage.app",
  apiKey: "AIzaSyC729M_UoMijkTzn0bPQfCFCxkUeefIrc0",
  authDomain: "pocketai-e4n6o.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "214335210694"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
