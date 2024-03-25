// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-1-ca929.firebaseapp.com",
  projectId: "mern-1-ca929",
  storageBucket: "mern-1-ca929.appspot.com",
  messagingSenderId: "1039364147380",
  appId: "1:1039364147380:web:d46ab088d60dbeca626fe1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);