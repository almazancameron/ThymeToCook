import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsGQS4oEvSmDSABqYUTIIi9PXjyW5DH8c",
  authDomain: "capstone-3-74587.firebaseapp.com",
  projectId: "capstone-3-74587",
  storageBucket: "capstone-3-74587.appspot.com",
  messagingSenderId: "346403488737",
  appId: "1:346403488737:web:65927b8a7a1725eb36c8a0",
  measurementId: "G-1HE4GV7FX5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
