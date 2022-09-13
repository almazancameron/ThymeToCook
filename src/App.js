import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MealPlans from "./pages/MealPlans/MealPlans";
import HomeIP from "./pages/Home/HomeIP";
import ForgotPassword from "./pages/Login/ForgotPassword";
import RecipesPage from './pages/Recipes/Recipes';

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
              <Route path="/homeip" element={<HomeIP />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/recipes" element={<RecipesPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
