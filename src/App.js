import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import MealPlans from "./pages/MealPlans/MealPlans";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/Login/ForgotPassword";
import RecipesPage from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipes/Recipe";
import { orange } from "@mui/material/colors";


function App() {
  const theme = createTheme({
    palette:{
        primary:{
          main: "#3E8E3C",
        }
    }
  })

  
  return (
    
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
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
              <Route path='/recipes/:recipe' element={<Recipe />} />
            </Routes>
          </AuthProvider>
        </Router>
      </header>
      </ThemeProvider>
    </div>
    
  );
}

export default App;
