import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HeartIcon from "./assets/iconheartplus.png";
import "./Recipes.css";
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


/* main recipe card on the page. Click on read more to expand summary.
click on anywhere else on the card to get the full recipe. */
const RecipeCard = ({ recipe }) => {
  const { title, image, summary } = recipe;

  const strip = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }

  return (
  
    <Card className="recipe-card" sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography className="recipe-name" sx={{ fontSize: 14 }}>
          {title}
        </Typography>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
        />
        
        <Typography className="recipe-description" sx={{ fontSize: 12 }}>
          {strip(summary)}
        </Typography>
        <img src={HeartIcon} alt="Add to my recipes"/>
      </CardContent>
    </Card>
  );
};

const minimumLength = 80;
const idealLength = 100;
const maxLength = 200;
const readMore = "Read More...";