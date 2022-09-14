import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HeartIcon from "./assets/iconheartplus.png";
import Grid from '@mui/material/Grid'
import styles from "./Recipes.module.css";
import ReadMoreReact from 'read-more-react';
import RecipeCard from "./components/RecipeCard";
import { getAllRecipes, getUserRecipes } from "../../api/recipes";
import Button from '@mui/material/Button'
import AddRecipeModal from "./components/AddRecipeModal";
import { useAuth } from "../../context/AuthContext";


export default function RecipesPage() {
    const {currentUser} = useAuth()
    const [recipes, setRecipes] = useState([])
    const [viewAddRecipeModal, setViewAddRecipeModal] = useState(false)

    const updateRecipes = (newRecipes) => {
      setRecipes(newRecipes)
    }

    const toggleViewAddRecipeModal = () => {
      setViewAddRecipeModal(!viewAddRecipeModal)
    }

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const recipeList = await getUserRecipes(currentUser.uid)
                setRecipes(recipeList)
            } catch (e) {
                console.log('ERROR GETTING RECIPES')
            }
        }

        getRecipes()
    }, [])

  return (
    <div className={styles.recipeName}>
      <nav className={styles.recipeHeader}><h1>{currentUser.uid} Saved Recipes</h1></nav>
      <Grid container spacing={2} className={styles.recipeGrid} direction='row' alignItems="stretch">
        {recipes.map((recipe) => {
          return (
            <Grid item xs={2} className={styles.recipeCard}>
              <RecipeCard key={recipe.id} recipe={recipe} />
            </Grid>
          )
        })}
      </Grid>
      <Button onClick={toggleViewAddRecipeModal} color='success'>Add Recipes</Button>
      <AddRecipeModal viewAddRecipeModal={viewAddRecipeModal} toggleViewAddRecipeModal={toggleViewAddRecipeModal} recipes={recipes} updateRecipes={updateRecipes}  />
    </div>
  );
}


/* main recipe card on the page. Click on read more to expand summary.
click on anywhere else on the card to get the full recipe. */


const minimumLength = 80;
const idealLength = 100;
const maxLength = 200;
const readMore = "Read More...";