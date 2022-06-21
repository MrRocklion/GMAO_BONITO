// Import the functions you need from the SDKs you need
import { alignProperty } from "@mui/material/styles/cssUtils";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLVrDFXp3Qrz6CW1_npGSUbsvSDYbnbLo",
  authDomain: "tesis-avila-crespo.firebaseapp.com",
  projectId: "tesis-avila-crespo",
  storageBucket: "tesis-avila-crespo.appspot.com",
  messagingSenderId: "169338525225",
  appId: "1:169338525225:web:63a4b81458bf9faadeae38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
export{app, auth, db, storage}