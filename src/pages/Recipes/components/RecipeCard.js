import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HeartIcon from "../assets/iconheartplus.png";
import Grid from '@mui/material/Grid'
import styles from '../Recipes.module.css'

const RecipeCard = ({ recipe }) => {
    const { name, ingredients } = recipe; //calories, time to cook, rating, users, imageURL

    const strip = (html) => {
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    return (
        <Card sx={{height: "100%"}} className="recipe-card">
            <CardContent>
            <Typography className="recipe-name" component='h3'>
                {name}
            </Typography>
            {/* <CardMedia
                component="img"
                height="200"
                image={imageURL}
                alt={title}
            /> */}
            
            <Typography className="recipe-description">
                {ingredients?.join(', ')}
            </Typography>
            <img src={HeartIcon} alt="Add to my recipes"/>
            </CardContent>
        </Card>
    );
};

export default RecipeCard