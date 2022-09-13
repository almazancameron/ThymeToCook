import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Grid } from "@mui/material/";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const list = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=1&limitLicense=true&apiKey=045b7bd3dde944d19ad1a58cf9d535b0`
        );
        setRecipes(list.data.recipes);
      } catch (e) {
        console.log("ERROR GETTING RECIPES");
      }
    };
    getRecipes();
  }, []);

  return (
    <div className="recipes-page">
      <nav className="recipe-header">
        <h1>Fan Favorites</h1>
      </nav>
      {recipes.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}

const RecipeCard = ({ recipe }) => {
  const { title, image, summary } = recipe;

  const strip = (html) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        <Grid item xs={12} md={4}>
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
              <FavoriteIcon />
            </CardContent>
          </Card>
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
              <FavoriteIcon />
            </CardContent>
          </Card>
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
              <FavoriteIcon />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
