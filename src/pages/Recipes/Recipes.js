import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function RecipesPage() {
  return (
    <div>
    <h1>Recipes</h1>
    <RecipeCard/>
    </div>
  );
}

export function RecipeCard(){
    return(
      <Button variant="contained">Recipes</Button>
    );
}