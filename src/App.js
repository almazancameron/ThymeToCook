import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Router, Route, Switch } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyBsGQS4oEvSmDSABqYUTIIi9PXjyW5DH8c",
  authDomain: "capstone-3-74587.firebaseapp.com",
  projectId: "capstone-3-74587",
  storageBucket: "capstone-3-74587.appspot.com",
  messagingSenderId: "346403488737",
  appId: "1:346403488737:web:65927b8a7a1725eb36c8a0",
  measurementId: "G-1HE4GV7FX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testAddDoc() {
  try {
    const docRef = await addDoc(collection(db, "recipes"), {
      name: 'Pizza'
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={testAddDoc}>test</button>
      </header>
    </div>
  );
}

export default App;
