import React, { useState, useEffect  } from "react";
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

export default function Recipe(recipeId) {
 
    const location = useLocation();
    const patharray = location.pathname.split("/");
    const {currentUser} = useAuth();
    const [recipe, setRecipe] = useState([]);
    const [alert, setAlert]=useState({
      text: 'Added to grocery list!',
      show:false 
    })
     


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
    <div className={styles.appbackground}>
      <img
        className={styles.image}
        src={recipe.imageURL}
      />

      <div className={styles.maincontainer}>
        <h1>Ingredients List</h1>
       
        <div className={styles.itemlist}>
          {recipe.ingredients?.map((ingredient, index) => (
            <div className={styles.itemcontainer}>
              <div className={styles.itemname} >
                    <p key={index}>{ingredient} </p>
              </div>
              <div className={styles.addtogrocery}>
               <button>
              <AddShoppingCartIcon
                    icon={AddShoppingCartIcon}
                    onClick={ handleCart }/> 
                   
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
        { recipe.instructions?.map(
            (steps) => <p> {steps}</p>
        )
          } 
         
       </div> 
      </div>
    </div>
  );
}
