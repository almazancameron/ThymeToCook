import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HeartIcon from "../assets/iconheartplus.png";
import Grid from '@mui/material/Grid'
import styles from '../Recipes.module.css'
import {Link} from 'react-router-dom'

const RecipeCard = ({ recipe, variant='none' }) => {
    const { name, ingredients, imageURL } = recipe; //calories, time to cook, rating, users, imageURL

    const strip = (html) => {
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

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
                    <Typography className="recipe-description" component='span'>
                        <Link to={`${recipe.id}`}>View Recipe</Link> &nbsp;
                    </Typography>
                    {variant==='heart' &&
                        <img src={HeartIcon} alt="Add to my recipes"/>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default RecipeCard