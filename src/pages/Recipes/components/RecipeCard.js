import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "../Recipes.module.css";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { updateCurrentUser } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext"
import { updateRecipe } from "../../../api/recipes";

const RecipeCard = ({ recipe, recipes, updateRecipes, variant = "none" }) => {
  const { name, ingredients, imageURL, users } = recipe; //calories, time to cook, rating, users, imageURL
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  async function removeRecipeFromUser(){
    try {
      const copyRecipe = {...recipe, users: recipe.users.filter((u) => u !== currentUser.uid)}
      await updateRecipe(copyRecipe)
      let copyRecipes = variant === 'heart' ? [...recipes].map((r) => r.id === recipe.id ? copyRecipe : r): [...recipes].filter((r) => r.id !== recipe.id)
      updateRecipes(copyRecipes) 
    } catch (error) {
      console.log(error)
    }
  }
console.log(recipes)
  async function addRecipeToUser(){
    try {
      const copyRecipe = {...recipe, users: [...recipe.users, currentUser.uid]}
      await updateRecipe(copyRecipe)
      let copyRecipes = recipes.map((r) => r.id === recipe.id ? copyRecipe : r)
      updateRecipes(copyRecipes)
    } catch (error) {
      console.log(error)
    }
  }

  const strip = (html) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <Card sx={{ height: "100%" }} className={styles.recipeCard}>
      <CardContent>
        <Typography className="recipe-name" component="h3">
          {name}
        </Typography>
        <CardMedia component="img" height="200" image={imageURL} alt={name} />
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
          <Typography component='span'>
            {recipe.calories} kcal.
          </Typography>
          <Typography component='span'>
            {recipe.prepTime || '0 minutes'}
          </Typography>
        </div>
        <div className={styles.recipeFooter}>
          <Typography className="recipe-description" component="span">
            <Button variant="contained" onClick={() => navigate(`/recipes/${recipe.id}`)} sx={{ fontSize: '12px' }}>View Recipe</Button> &nbsp;
          </Typography>
          {variant === "heart" && 
            <IconButton
              onClick={() => users.includes(currentUser.uid) ? removeRecipeFromUser() : addRecipeToUser()}
              alt="Add to my recipes"
            >
              {users.includes(currentUser.uid) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          }
          {variant !== 'heart' &&
            <IconButton
              onClick={removeRecipeFromUser}
              alt="Remove from my recipes"
            >
              <DeleteOutlineIcon />
            </IconButton>
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
