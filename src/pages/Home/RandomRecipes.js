import React, { useState, useEffect } from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { getAllRecipes } from "../../api/recipes";
import RecipeCard from "../Recipes/components/RecipeCard";
import styles from "../Recipes/Recipes.module.css";
import Carousel from "react-material-ui-carousel";

export default function RandomRecipes() {
  const [recipes, setRecipes] = useState([]);
  const {loading} = useAuth()

  const updateRecipes = (newRecipes) => {
    setRecipes(newRecipes)
  }

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipeList = await getAllRecipes();
        setRecipes(recipeList);
      } catch (e) {
        console.log("ERROR GETTING RECIPES");
      }
    };

    getRecipes();
  }, []);

  return (
    <>
      {!loading ?
        <Grid
          container
          spacing={2}
          className={styles.recipeGrid}
          direction="row"
          alignItems="stretch"
          padding={2}
        >
          {recipes.map((recipe, i) => {
            return (
              <Grid key={i} item xs={12} md={4} lg={2} className={styles.recipeCard}>
                <RecipeCard variant='heart' key={recipe.id} recipe={recipe} recipes={recipes} updateRecipes={updateRecipes} />
              </Grid>
            );
          })}
        </Grid> :
        <CircularProgress color='success' />
      }
    </>
  );
}
