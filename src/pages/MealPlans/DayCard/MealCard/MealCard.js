import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import styles from './MealCard.module.css'
import { useState } from "react"
import { useEffect } from "react"
import { getRecipe } from "../../../../api/recipes"
import {Link} from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MealCard = ({meal}) => {
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipe = await getRecipe(meal.recipeId)
                setRecipe(recipe)
            } catch (e) {
                console.log('error: ' + e)
            }
        }
        fetchRecipe()
    }, [])
    return (
        <Paper variant="outlined" style={{marginBottom:'1em'}}>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{meal.meal} - {meal.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <img className={styles.mealImage} src={meal.imageURL} />
                    <div style={{display:'flex', justifyContent:'space-evenly', alignContent:''}}>
                        <p>{recipe?.prepTime}</p>
                        <p>{recipe?.calories} kcal.</p>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <Link to={`/recipes/${meal.recipeId}`}>View Recipe</Link>
                    </div>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}

export default MealCard