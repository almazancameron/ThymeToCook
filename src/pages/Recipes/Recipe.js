import React, { useState, useEffect, useMemo  } from "react";
import {useLocation, useNavigate} from "react-router-dom"
import styles from "./Recipe.module.css";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import axios from 'axios';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HeartIcon from "./assets/iconheartplus.png";
import Grid from '@mui/material/Grid'

import ReadMoreReact from 'read-more-react';
import RecipeCard from "./components/RecipeCard";
import { addRecipe, getAllRecipes, getRecipe } from "../../api/recipes";
import Button from '@mui/material/Button'
import AddRecipeModal from "./components/AddRecipeModal";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../../AppBar";
import { useGrocery } from "../../context/GroceryContext";
import { IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, MenuItem, Slider, TextField } from "@mui/material";
import { Box } from "@mui/system";

export default function Recipe(recipeId) {

    const { groceryList, editGroceryList, viewGroceryModal, toggleViewGroceryModal } = useGrocery()
    const navigate = useNavigate()
    const location = useLocation();
    const patharray = location.pathname.split("/");
    const {currentUser} = useAuth();
    const [recipe, setRecipe] = useState([]);
    const [alert, setAlert]=useState({
      text: 'Added to grocery list!',
      show:false 
    })
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
    const [editState, setEditState] = useState(false)

    const toggleEditState = () => {
      setEditState(!editState)
    }

    const groceries = useMemo(() => {
      return groceryList?.groceries
    }, [groceryList])
     
    const handleAddGrocery = (item) => {
      const copyGroceryList = {...groceryList}
      copyGroceryList.groceries.push(item)
      editGroceryList(copyGroceryList)
    }

    const handleAddIngredient = () => {
      setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, newIngredient]})
      setNewIngredient('')
    }

    const handleAddInstruction = () => {
      setNewRecipe({...newRecipe, instructions: [...newRecipe.instructions, newInstruction]})
      setNewInstruction('')
    }

    const handleSubmit = async () => {
      try {
        newRecipe.prepTime = newRecipe.prepTime === 180 ? '180+ mins' : newRecipe.prepTime + ' mins'
        let id = await addRecipe(newRecipe);
        toggleEditState()
        navigate(`/recipes/${id}`)
      } catch (error) {
        console.log("Error: " + error);
      }
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

  useEffect(() => {
    const getRecipeinfo = async () => {
        try {
            const recipe = patharray[patharray.length-1] ? await getRecipe(patharray[patharray.length-1] ) : await console.log("Error:No recipes")
            setRecipe(recipe)
            setNewRecipe({...recipe, users:[currentUser.uid], name:recipe.name + ' Copy'})
        } catch (e) {
            console.log('ERROR GETTING RECIPES')
        }
    }

    getRecipeinfo()
}, [location])

//   const [inputValue, setInputValue] = useState("");

//   const handleAddButtonClick = () => {
//     const newItem = {
//       itemName: inputValue,
//       isSelected: false,
//     };

//     const newItems = [...items, newItem];

//     setItems(newItems);
//     setInputValue("");
//   };



//   const toggleComplete = (index) => {
//     const newItems = [...items];

//     newItems[index].isSelected = !newItems[index].isSelected;

//     setItems(newItems);
//   };

function onCloseAlert() {
  setAlert({
    text: '',
    show: false
  })
}
function onShowAlert() {
  console.log("inshowlaet")
  setAlert({
    text: '',
    show: true
  })
}

function handleCart(){
  console.log("inshowlaet")
}

return (
  <>
    <NavBar />
    {!editState &&
      <div>
        <Typography variant='h2' sx={{padding:'0.5em 0 0 0.5em'}}>{recipe.name}</Typography>
        <div className={styles.appbackground}>
          <img
            className={styles.image}
            src={recipe.imageURL}
          />

          <div className={styles.maincontainer}>
            <hr />
            <h1 style={{marginBottom:'0'}}>Ingredients List</h1>
          
            <List className={styles.itemlist}>
              {recipe.ingredients?.map((ingredient, index) => (
                <ListItem key={index} className={styles.itemcontainer}>
                    <Typography variant='h6'>{(index+1) + '. ' + ingredient} </Typography>
                    <IconButton disabled={groceries?.includes(ingredient)}>
                      <AddShoppingCartIcon
                        icon={AddShoppingCartIcon}
                        onClick={() => handleAddGrocery(ingredient)}
                      />
                    </IconButton>
                </ListItem>
              ))}
            </List>
            <hr />
            <h1>Instructions</h1>
            <List className={styles.itemlist}>
              {recipe.instructions?.map((steps, i) => 
                <ListItem key={i} className={styles.itemcontainer}>
                  <Typography variant='h6'>
                    {(i+1) + '. ' + steps}
                  </Typography>
                </ListItem>
              )}
            </List> 
            <hr />
            <Button onClick={toggleEditState}>Modify Recipe</Button>
          </div>
        </div>
      </div>
    }
    {editState &&
      <Box className={styles.modalBody}>
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
                <Button color='error' onClick={toggleEditState}>Cancel</Button>
            </Grid>
        </Grid>
    </Box>
    }
  </>
);
}
