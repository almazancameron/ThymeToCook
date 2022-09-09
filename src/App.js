import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Link, Route, Routes } from 'react-router-dom';
import MealPlans from './pages/MealPlans/MealPlans';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/mealplans" element={<MealPlans />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
