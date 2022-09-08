import React, { useState, useEffect } from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import NoBake from "./assets/nobake.jpg";
import styles from "./Recipes.css"
import ReadMoreReact from 'read-more-react';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const list = await axios.get(`https://api.spoonacular.com/recipes/random?number=1&limitLicense=true&apiKey=${process.env.REACT_APP_API_KEY}`)
                setRecipes(list.data.recipes)
            } catch (e) {
                console.log('ERROR GETTING RECIPES')
            }
        }
        getRecipes()
    }, [])

  return (
    <div className="recipes-page">
      <nav className="recipe-header"><h1>Recipes</h1></nav>
      {recipes.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}

const RecipeCard = ({ recipe }) => {
  const { title, image, summary } = recipe;

  const strip = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }

  return (
  
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <CardMedia
          className="recipe-img"
          component="img"
          height="194"
          image={image}
          alt={title}
        />
        <Typography className="recipe-name" sx={{ fontSize: 16 }}>
          {title}
        </Typography>
        <Typography className="recipe-description" sx={{ fontSize: 12 }}>
        <ReadMoreReact
                text={strip(summary)}
                min={minimumLength}
                ideal={idealLength}
                max={maxLength}
                readMoreText={readMore}/>
        </Typography>
      </CardContent>
    </Card>
  );
};

const minimumLength = 80;
const idealLength = 100;
const maxLength = 200;
const readMore = "Read More...";