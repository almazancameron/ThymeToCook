import { Card, CardHeader, CardContent, Button, FormControl, Select, MenuItem, InputLabel, TextField } from "@mui/material"
import MealCard from "./MealCard/MealCard"
import styles from '../MealPlans.module.css'
import { useState } from "react"
import { useMemo } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useEffect } from "react"
import { getAllRecipes, getUserRecipes } from "../../../api/recipes"

const DayCard = ({meals, date, mealplan, updateMealplan}) => {
    const {currentUser} = useAuth()
    const [editState, setEditState] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [meal, setMeal] = useState('')

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const recipeList = currentUser?.email?.length > 0 ? await getUserRecipes(currentUser.uid) : await getAllRecipes()
                setRecipes(recipeList)
            } catch (e) {
                console.log('ERROR GETTING RECIPES')
            }
        }

        getRecipes()
    }, [])

    const toggleEditState = () => {
        setSelectedRecipe(null)
        setMeal('')
        setEditState(!editState)
    }

    const handleSave = () => {
        let copyMealplan = {...mealplan}
        copyMealplan.days = copyMealplan.days.map((d) => 
            d.date === date ? 
                {
                    ...d, 
                    meals: [
                        ...d.meals, 
                        {
                            imageURL:selectedRecipe.imageURL,
                            name:selectedRecipe.name,
                            recipeId: selectedRecipe.id,
                            meal: meal
                        }
                    ]
                } :
                d
        )
        updateMealplan(copyMealplan)
        toggleEditState()
    }

    return (
        <Card sx={{width:'100%'}}>
            <CardHeader title={`Meals for ${new Date(date.seconds*1000).toLocaleDateString()}`} />
            <CardContent sx={{display:'flex', flexDirection:'column'}}>
                {!editState && meals.map((meal, i) => {
                    return (
                        <MealCard key={i} meal={meal} />
                    )
                })}
                {editState &&
                    <>
                        <FormControl sx={{marginBottom:'1em'}}>
                            <InputLabel id='recipe-select-label'>Recipe</InputLabel>
                            <Select
                                labelId='recipe-select-label'
                                id='recipe-select'
                                label='recipe'
                                value={selectedRecipe || ''}
                                onChange={(e) => setSelectedRecipe(e.target.value)}
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
                        <TextField id="outlined-basic" label="Meal" variant="outlined" onChange={(e) => setMeal(e.target.value)} />
                    </>
                }
                {editState &&
                    <Button onClick={handleSave} sx={{marginTop:'0.5em'}}>Save</Button>
                }
                <Button onClick={toggleEditState} color={editState ? "error" : "success"}>{editState ? 'Cancel' : 'Add meal'}</Button>
            </CardContent>
        </Card>
    )
}

export default DayCard