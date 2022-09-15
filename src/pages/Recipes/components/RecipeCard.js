import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HeartIcon from "../assets/iconheartplus.png";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "../Recipes.module.css";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { updateCurrentUser } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext"

const RecipeCard = ({ recipe, variant='none' }) => {
    const { name, ingredients, imageURL, id, prepTime, calories } = recipe; //calories, time to cook, rating, users, imageURL

    return (
        <Card sx={{height: "100%"}} className={styles.recipeCard}>
            <CardContent>
                <Typography className="recipe-name" component='h3'>
                    {name}
                </Typography>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageURL}
                    alt={name}
                />
                <div className={styles.recipeFooter}>
                    <Typography className="recipe-link" component='span'>
                        <Link to={`${id}`}>View Recipe</Link> &nbsp;
                    </Typography>
                    <Typography className="recipe-description" component='span'>
                        {recipe?.calories} kcal.
                    </Typography>
                    {variant==='heart' &&
                        <img src={HeartIcon} alt="Add to my recipes"/>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
