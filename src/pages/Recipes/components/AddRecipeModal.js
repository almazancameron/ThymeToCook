import { Modal, Box, Button, Typography, TextField, Grid, InputAdornment } from '@mui/material'
import styles from '../Recipes.module.css'
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'
import { addRecipe } from '../../../api/recipes';

const AddRecipeModal = ({viewAddRecipeModal, toggleViewAddRecipeModal, recipes, updateRecipes}) => {
    const [newRecipe, setNewRecipe] = useState({name: '', ingredients: [], calories: '', prepTime: '', imageURL: '', users:[]})
    const [newIngredient, setNewIngredient] = useState('')

    const handleSubmit = async () => {
        const newRecipes = [...recipes, newRecipe]
        try {
            await addRecipe(newRecipe)
            updateRecipes(newRecipes)
            setNewRecipe({name: '', ingredients: [], calories: '', prepTime: '', imageURL: '', users:[]})
            toggleViewAddRecipeModal()
        } catch(error) {
            console.log('Error: ' + error)
        }
    }

    return (
        <Modal
            open={viewAddRecipeModal}
            onClose={toggleViewAddRecipeModal}
        >
            <Box className={styles.modalBody}>
                <Button className={styles.closeButton} color='error' onClick={toggleViewAddRecipeModal}><CloseIcon /></Button>
                <Typography className={styles.modalHeader} variant="h5">
                    Add a Recipe
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth
                            label="Recipe Name" 
                            variant="outlined" 
                            value={newRecipe.name} 
                            onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {newRecipe.ingredients?.length > 0 &&
                            <ul>
                                {newRecipe.ingredients?.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                ))}
                            </ul>
                        }
                        <TextField 
                            fullWidth
                            label='Add Ingredients' 
                            variant='outlined' 
                            value={newIngredient} 
                            onChange={(e) => setNewIngredient(e.target.value)} 
                            onKeyDown={(e) => {
                                if(e.key.toUpperCase() === 'ENTER') {
                                    setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, newIngredient]})
                                    setNewIngredient('')
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Calories'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kcal.</InputAdornment>,
                            }}
                            value={newRecipe.calories}
                            onChange={(e) => setNewRecipe({...newRecipe, calories: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Prep Time'
                            variant='outlined'
                            value={newRecipe.prepTime}
                            onChange={(e) => setNewRecipe({...newRecipe, prepTime: e.target.value})}
                        />
                        {/* Change this to a slider from 10 minutes - 120 minutes? */}
                    </Grid>
                    <Grid item xs={12}>
                        {newRecipe.imageURL.length > 0 &&
                            <div className={styles.modalImage}>
                                <img src={newRecipe.imageURL} alt='Recipe Image' className={styles.modalImage} />
                            </div>
                        }
                        <TextField
                            fullWidth
                            label='Image URL'
                            variant='outlined'
                            value={newRecipe.imageURL}
                            onChange={(e) => setNewRecipe({...newRecipe, imageURL: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSubmit} color='success'>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddRecipeModal