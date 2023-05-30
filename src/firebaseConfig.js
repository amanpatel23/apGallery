// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAfgLlP7oJE2cOEiHYSqjhJ6wz4Sc7X0B4",
  authDomain: "rk-gallery.firebaseapp.com",
  projectId: "rk-gallery",
  storageBucket: "rk-gallery.appspot.com",
  messagingSenderId: "250136545327",
  appId: "1:250136545327:web:4dc10fd46d092f82371eda"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
