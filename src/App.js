import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { environment } from "./environments/environment";
import { getAuth } from "firebase/auth"

// Initialize Firebase
const app = initializeApp(environment.firebase);
const db = getFirestore(app);
export const auth = getAuth(app);

async function testAddDoc() {
  try {
    const docRef = await addDoc(collection(db, "recipes"), {
      name: "Pizza",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function App() {
  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
