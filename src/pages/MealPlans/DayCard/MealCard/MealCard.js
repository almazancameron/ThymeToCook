import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Button, IconButton, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material"
import styles from './MealCard.module.css'
import { useState } from "react"
import { useEffect } from "react"
import { getRecipe } from "../../../../api/recipes"
import {Link} from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';

const MealCard = ({meal, index, recipes, mealplan, updateMealplan, date}) => {
    const [editMeal, setEditMeal] = useState(false)
    const [recipe, setRecipe] = useState(null)
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [mealTime, setMealTime] = useState('')

    const toggleEditMeal = () => {
        setEditMeal(!editMeal)
    }

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
    }, [meal])

    const handleSave = () => {
        let copyMealplan = {...mealplan}
        copyMealplan.days = copyMealplan.days.map((d) => 
            d.date === date ? 
                {
                    ...d, 
                    meals: [...d.meals].map((m, i) =>
                        i === index ?
                        {
                            imageURL:selectedRecipe.imageURL,
                            name:selectedRecipe.name,
                            recipeId: selectedRecipe.id,
                            meal: mealTime
                        } :
                        m
                    )
                } :
                d
        )
        updateMealplan(copyMealplan)
        setSelectedRecipe(null)
        setMealTime('')
        toggleEditMeal()
    }

    return (
        <Paper variant="outlined" style={{marginBottom:'1em', padding: editMeal ? '1em' : '0'}}>
            {!editMeal &&
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{meal.meal} - {meal.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <img className={styles.mealImage} src={meal.imageURL} />
                        <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
                            <p>{recipe?.prepTime}</p>
                            <p>{recipe?.calories} kcal.</p>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
                            <Link to={`/recipes/${meal.recipeId}`}>View Recipe</Link>
                            <IconButton onClick={toggleEditMeal}>
                                <EditIcon />
                            </IconButton>
                        </div>
                    </AccordionDetails>
                </Accordion>
            }
            {editMeal &&
                <>
                    <FormControl sx={{marginBottom:'1em', width:'100%'}}>
                        <InputLabel id='recipe-select-label'>Recipe</InputLabel>
                        <Select
                            labelId='recipe-select-label'
                            id='recipe-select'
                            label='recipe'
                            value={selectedRecipe || ''}
                            onChange={(e) => setSelectedRecipe(e.target.value)} 
                            fullWidth
                            sx={{
                                width:'100%',
                            }}
                        >
                            {recipes.map((recipe, i) => {
                                return (
                                    <MenuItem key={i} value={recipe}>
                                        {recipe.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <TextField id="outlined-basic" label="Meal" variant="outlined" onChange={(e) => setMealTime(e.target.value)} />
                    <Button onClick={handleSave} sx={{marginTop:'0.5em', width:'100%'}}>Save</Button>
                    <Button sx={{width:'100%'}} color='error' onClick={() => {toggleEditMeal()}}>Cancel</Button>
                </>
            }
        </Paper>
    )
}

export default MealCard