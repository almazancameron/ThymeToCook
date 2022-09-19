import React, { useState, useEffect, useMemo  } from "react";
import {useLocation} from "react-router-dom"
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
import { getAllRecipes, getRecipe } from "../../api/recipes";
import Button from '@mui/material/Button'
import AddRecipeModal from "./components/AddRecipeModal";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../../AppBar";
import { useGrocery } from "../../context/GroceryContext";

export default function Recipe(recipeId) {

    const { groceryList, editGroceryList, viewGroceryModal, toggleViewGroceryModal } = useGrocery()
    const location = useLocation();
    const patharray = location.pathname.split("/");
    const {currentUser} = useAuth();
    const [recipe, setRecipe] = useState([]);
    const [alert, setAlert]=useState({
      text: 'Added to grocery list!',
      show:false 
    })

    const groceries = useMemo(() => {
      return groceryList?.groceries
    }, [groceryList])
     
    const handleAddGrocery = (item) => {
      const copyGroceryList = {...groceryList}
      copyGroceryList.groceries.push(item)
      editGroceryList(copyGroceryList)
    }


  useEffect(() => {
    const getRecipeinfo = async () => {
        try {
            const recipe = patharray[patharray.length-1] ? await getRecipe(patharray[patharray.length-1] ) : await console.log("Error:No recipes")
            setRecipe(recipe)
        } catch (e) {
            console.log('ERROR GETTING RECIPES')
        }
    }

    getRecipeinfo()
}, [])

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
      <div className={styles.appbackground}>
        <img
          className={styles.image}
          src={recipe.imageURL}
        />

        <div className={styles.maincontainer}>
          <h1>Ingredients List</h1>
        
          <div className={styles.itemlist}>
            {recipe.ingredients?.map((ingredient, index) => (
              <div key={index} className={styles.itemcontainer}>
                <div className={styles.itemname} >
                      <p>{ingredient} </p>
                </div>
                <div className={styles.addtogrocery}>
                  <button disabled={groceries?.includes(ingredient)}>
                    <AddShoppingCartIcon
                      icon={AddShoppingCartIcon}
                      onClick={() => handleAddGrocery(ingredient)}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className={styles.additembox}>
            <input
              value={"inputValue"}
              onChange={(event) => "setInputValue(event.target.value)"}
              className={styles.additeminput}
              placeholder="Add an item..."
            />
            <AddRoundedIcon
              icon={AddRoundedIcon}
              onClick={() =>" handleAddButtonClick()"}
            />
          </div> */}
          <h2>Instructions</h2>
          <div>
            {recipe.instructions?.map((steps, i) => 
              <p key={i}>
                {steps}
              </p>
            )} 
            
          </div> 
        </div>
      </div>
    </>
  );
}
