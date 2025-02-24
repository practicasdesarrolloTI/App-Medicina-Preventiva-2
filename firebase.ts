// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTdHPdUQUBAe33aUVyaaBEJy2qjsdBTS0",
  authDomain: "bienestarips-3f286.firebaseapp.com",
  projectId: "bienestarips-3f286",
  storageBucket: "bienestarips-3f286.firebasestorage.app",
  messagingSenderId: "12582667340",
  appId: "1:12582667340:web:2851cbed7d8b268b9c20e9",
  measurementId: "G-6VR9W84D5Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
