import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { environment } from "./environments/environment";
import { getAuth } from "firebase/auth"

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import MealPlans from "./pages/MealPlans/MealPlans"
import HomeIP from "./pages/Home/HomeIP";

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
      <header className="App-header">
        <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mealplans" element={<MealPlans />} />
          <Route path="/" element={<Home />} />
          <Route path="/homeip" element={<HomeIP />} />
        </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
