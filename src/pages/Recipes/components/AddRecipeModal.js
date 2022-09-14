import { Modal, Box, Button, Typography, TextField, Grid, InputAdornment } from '@mui/material'
import styles from '../Recipes.module.css'
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'
import { addRecipe } from '../../../api/recipes';
import { useAuth } from '../../../context/AuthContext';

const AddRecipeModal = ({viewAddRecipeModal, toggleViewAddRecipeModal, recipes, updateRecipes}) => {
    const {currentUser} = useAuth()
    const [newRecipe, setNewRecipe] = useState({name: '', ingredients: [], calories: '', prepTime: '', imageURL: '', users: currentUser?.id ? [currentUser.id] : []})
    const [newIngredient, setNewIngredient] = useState('')

    const handleSubmit = async () => {
        try {
            let id = await addRecipe(newRecipe)
            const newRecipes = [...recipes, newRecipe]
            updateRecipes(newRecipes)
            setNewRecipe({name: '', ingredients: [], calories: '', prepTime: '', imageURL: '', users: currentUser?.id ? [currentUser.id] : []})
            toggleViewAddRecipeModal()
        } catch(error) {
            console.log('Error: ' + error)
        }
    }

    const handleAddIngredient = () => {
        setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, newIngredient]})
        setNewIngredient('')
    }

    return (
        <Modal
            open={viewAddRecipeModal}
            onClose={() => { 
                setNewRecipe({name: '', ingredients: [], calories: '', prepTime: '', imageURL: '', users: currentUser?.id ? [currentUser.id] : []}); 
                toggleViewAddRecipeModal();
            }}
        >
            <Box className={styles.modalBody}>
                <Button 
                    className={styles.closeButton} 
                    color='error' 
                    onClick={() => { 
                        setNewRecipe({name: '', ingredients: [], calories: '', prepTime: '', imageURL: '', users: currentUser?.id ? [currentUser.id] : []}); 
                        toggleViewAddRecipeModal();
                    }}
                >
                    <CloseIcon />
                </Button>
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
                        <div className='d-flex'>
                            <TextField 
                                fullWidth
                                label='Ingredients' 
                                variant='outlined' 
                                value={newIngredient} 
                                onChange={(e) => setNewIngredient(e.target.value)} 
                                onKeyDown={(e) => {
                                    if(e.key.toUpperCase() === 'ENTER') {
                                        handleAddIngredient()
                                    }
                                }}
                            />
                            <Button onClick={handleAddIngredient} sx={{marginLeft:'2em'}} variant='contained' color='success'>Add</Button>
                        </div>
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