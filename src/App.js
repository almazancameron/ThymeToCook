import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import MealPlans from "./pages/MealPlans/MealPlans";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/Login/ForgotPassword";
import RecipesPage from "./pages/Recipes/Recipes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mealplans" element={<MealPlans />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/:recipe" element={<RecipesPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
