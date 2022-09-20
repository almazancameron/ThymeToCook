import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid'
import styles from "./Recipes.module.css";
import RecipeCard from "./components/RecipeCard";
import { getAllRecipes, getUserRecipes } from "../../api/recipes";
import Button from '@mui/material/Button'
import AddRecipeModal from "./components/AddRecipeModal";
import NavBar from "../../AppBar";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent } from "@mui/material";

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
                const recipeList = currentUser?.email?.length > 0 ? await getUserRecipes(currentUser.uid) : await getAllRecipes()
                setRecipes(recipeList)
            } catch (e) {
                console.log('ERROR GETTING RECIPES')
            }
        }

        getRecipes()
    }, [])

  return (
    <div className={styles.recipeName}>
      <NavBar/>
      <nav className={styles.recipeHeader}><h1>Saved Recipes</h1></nav>
      <Grid container padding={2} spacing={2} className={styles.recipeGrid} direction='row' alignItems="stretch">
        {recipes.map((recipe, i) => {
          return (
            <Grid key={i} item xs={12} md={4} lg={2}>
              <RecipeCard recipe={recipe} recipes={recipes} updateRecipes={updateRecipes} />
            </Grid>
          )
        })}
        <Grid item xs={2} className={styles.recipeCard}>
          <Card sx={{ height: "100%" }} className={styles.recipeCard}>
            <CardContent>
              <Button sx={{height:'100%'}} onClick={toggleViewAddRecipeModal} color='success'>Add Recipe</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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