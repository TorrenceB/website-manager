import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhCClGX2tshKPasYmxjFvH0zV59hmRhag",
  authDomain: "portfolio-house.firebaseapp.com",
  projectId: "portfolio-house",
  storageBucket: "portfolio-house.appspot.com",
  messagingSenderId: "192968111068",
  appId: "1:192968111068:web:0b957f570fd0489803d519",
  measurementId: "G-TGJXHHKH63",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
