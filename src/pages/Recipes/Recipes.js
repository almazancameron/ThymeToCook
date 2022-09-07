import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import NoBake from './assets/nobake.jpg';


export default function RecipesPage() {
  return (
    <div>
    <h1>Recipes</h1>
    <RecipeCard/>
    </div>
  );
}

const mockRecipes = [
    {
        name: "Granma's No Bake Cookies",
        recipeId: "125nbc",
        image:{NoBake},
        alt:"No bake cookie on paper"
    },
    {
        name: "Rice Bacon Cheese Casserole",
        recipeId: "340way",
        image:{NoBake},
        alt:"No bake cookie on paper"
    }
]

export function RecipeCard(){
  return(
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
      <CardMedia
        className='recipe-img'
        component="img"
        height="194"
        image={NoBake}
        alt="No bake cookie on paper"
      />
      <Typography className='recipe-name' sx={{ fontSize: 16 }}>
          Grandma's No Bake Cookies
      </Typography>
      <Typography className='recipe-description' sx={{ fontSize: 12}}>
       
      </Typography>

      </CardContent>
    </Card>
  );
}