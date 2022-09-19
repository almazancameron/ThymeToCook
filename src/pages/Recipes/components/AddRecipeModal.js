import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  Slider,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
} from "@mui/material";
import styles from "../Recipes.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { addRecipe } from "../../../api/recipes";
import { useAuth } from "../../../context/AuthContext";
import { Label } from "@mui/icons-material";

const /* `AddRecipe` is a modal that allows a user to add a recipe to the database. */
AddRecipeModal = ({
  viewAddRecipeModal,
  toggleViewAddRecipeModal,
  recipes,
  updateRecipes,
}) => {
  const { currentUser } = useAuth();
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: [],
    calories: "",
    prepTime: 0,
    imageURL: "",
    users: currentUser?.uid ? [currentUser.uid] : [],
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [newInstruction, setNewInstruction] = useState('')
console.log(currentUser?.uid)
  const handleSubmit = async () => {
    try {
      let id = await addRecipe(newRecipe);
      newRecipe.prepTime = newRecipe.prepTime === 180 ? '180+ mins' : newRecipe.prepTime + ' mins'
      newRecipe.id = id;
      const newRecipes = [...recipes, newRecipe];
      updateRecipes(newRecipes);
      setNewRecipe({
        name: "",
        ingredients: [],
        instructions: [],
        calories: "",
        prepTime: 0,
        imageURL: "",
        users: currentUser?.uid ? [currentUser.uid] : [],
      });
      toggleViewAddRecipeModal();
    } catch (error) {
      console.log("Error: " + error);
    }
  }

    const handleAddIngredient = () => {
        setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, newIngredient]})
        setNewIngredient('')
    }

    const handleAddInstruction = () => {
      setNewRecipe({...newRecipe, instructions: [...newRecipe.instructions, newInstruction]})
      setNewInstruction('')
  }

  const removeIngredient = (idx) => {
    let copyNewRecipe = {...newRecipe}
    copyNewRecipe.ingredients.splice(idx, 1)
    setNewRecipe(copyNewRecipe)
  }

  const removeInstruction = (idx) => {
    let copyNewRecipe = {...newRecipe}
    copyNewRecipe.instructions.splice(idx, 1)
    setNewRecipe(copyNewRecipe)
  }

    return (
        <Modal
            open={viewAddRecipeModal}
            onClose={() => { 
                setNewRecipe({name: '', ingredients: [], instructions:[], calories: '', prepTime: 0, imageURL: '', users: currentUser?.uid ? [currentUser.uid] : []}); 
                toggleViewAddRecipeModal();
            }}
        >
            <Box className={styles.modalBody}>
                <Button 
                    className={styles.closeButton} 
                    color='error' 
                    onClick={() => { 
                        setNewRecipe({name: '', ingredients: [], instructions:[], calories: '', prepTime: 0, imageURL: '', users: currentUser?.uid ? [currentUser.uid] : []}); 
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
                    <Grid item xs={6}>
                        {newRecipe.instructions?.length > 0 &&
                            <List style={{marginTop:0}}>
                                {newRecipe.instructions?.map((instruction, i) => (
                                    <ListItemButton 
                                    style={{whiteSpace: 'normal'}} 
                                    onClick={() => removeInstruction(i)} 
                                    className={styles.hoverStrike} 
                                    component={MenuItem} 
                                    key={i}
                                    >
                                    <ListItemText 
                                        sx={{flexWrap:'wrap', wordWrap:'wrap'}}
                                        primary={(i+1) + '. ' + instruction}
                                    />
                                    </ListItemButton>
                                ))}
                            </List>
                        }
                        <div className='d-flex'>
                            <TextField 
                                fullWidth
                                label='Instructions' 
                                variant='outlined' 
                                value={newInstruction} 
                                onChange={(e) => setNewInstruction(e.target.value)} 
                                onKeyDown={(e) => {
                                    if(e.key.toUpperCase() === 'ENTER') {
                                        handleAddInstruction()
                                    }
                                }}
                            />
                            <Button onClick={handleAddInstruction} sx={{marginLeft:'2em'}} variant='contained' color='success'>Add</Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        {newRecipe.ingredients?.length > 0 &&
                            <List style={{marginTop:0}}>
                                {newRecipe.ingredients?.map((ingredient, i) => (
                                    <ListItemButton 
                                    style={{whiteSpace: 'normal'}} 
                                    onClick={() => removeIngredient(i)} 
                                    className={styles.hoverStrike} 
                                    component={MenuItem} 
                                    key={i}
                                    >
                                    <ListItemText 
                                        sx={{flexWrap:'wrap', wordWrap:'wrap'}}
                                        primary={ingredient}
                                    />
                                    </ListItemButton>
                                ))}
                            </List>
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
                        <Typography>
                            Prep Time: {newRecipe.prepTime === 180 ? '180+' : newRecipe.prepTime} minutes
                        </Typography>
                        <Slider
                            label='Prep Time'
                            variant='outlined'
                            step={10}
                            min={0}
                            max={180}
                            value={newRecipe.prepTime}
                            onChange={(e) => setNewRecipe({...newRecipe, prepTime: e.target.value})}
                        />
                        {/* Change this to a slider from 10 minutes - 120 minutes? */}
                    </Grid>
                    <Grid item xs={6} sx={{display:'flex'}}>
                        
                        <TextField
                            sx={{alignSelf:'flex-end'}}
                            fullWidth
                            label='Image URL'
                            variant='outlined'
                            value={newRecipe.imageURL}
                            onChange={(e) => setNewRecipe({...newRecipe, imageURL: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                      {newRecipe.imageURL.length > 0 &&
                        <div className={styles.modalImage}>
                            <img src={newRecipe.imageURL} alt='Recipe Image' className={styles.modalImage} />
                        </div>
                      }
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSubmit} color='success'>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddRecipeModal;