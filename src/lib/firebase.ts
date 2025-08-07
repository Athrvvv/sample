// Implemented Firebase configuration and initialization to connect the app with Firebase services.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { config } from 'dotenv';

config();

const firebaseConfig = {
  projectId: "pocketai-e4n6o",
  appId: "1:214335210694:web:b00a39827f7234d84243c7",
  storageBucket: "pocketai-e4n6o.firebasestorage.app",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC729M_UoMijkTzn0bPQfCFCxkUeefIrc0",
  authDomain: "pocketai-e4n6o.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "214335210694"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
