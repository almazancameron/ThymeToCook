import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { getAllRecipes } from "../../api/recipes";
import RecipeCard from "../Recipes/components/RecipeCard";
import styles from "../Recipes/Recipes.module.css";
import Carousel from "react-material-ui-carousel";

export default function RandomRecipes() {
  const [recipes, setRecipes] = useState([]);

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
      {/* <Carousel> */}
      {/* <Grid container space={2} classname={styles.recipeGrid} direction='row'> */}
      {/* {recipes.map((recipe) => {
                return (
                        <Grid item xs={2} className={styles.recipeCard}>
                        <RecipeCard key={recipe.id} recipe={recipe} />
                        </Grid>
                )}
            )} */}
      {/* </Grid> */}
      {/* </Carousel> */}
      <Grid
        container
        spacing={2}
        className={styles.recipeGrid}
        direction="row"
        alignItems="stretch"
      >
        {recipes.map((recipe) => {
          return (
            <Grid item xs={2} className={styles.recipeCard}>
              <RecipeCard key={recipe.id} recipe={recipe} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
