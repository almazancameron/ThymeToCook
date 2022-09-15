import React, { useState, useEffect , useParams } from "react";
import styles from "./Recipe.module.css";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';

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
    console.log("enteres")
    const params = useParams();
    const {currentUser} = useAuth();
    const [recipe, setRecipe] = useState([]);
     currentUser ="Gw1hZ8Fv0D0WWmQzXrhV";
//   const [items, setItems] = useState([
//     { itemName: "item 1", isSelected: false },
//     { itemName: "item 2", isSelected: false },
//     { itemName: "item 3", isSelected: false },
//   ]);
console.log("parametsr : " + params)

  useEffect(() => {
    const getRecipeinfo = async () => {
        try {
            const recipe = params.recipeId > 0 ? await getRecipe(params.recipeId) : await "Error"
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

//   const handleAddToGrocery = (index) => {
//     const newItems = [...items];
//     // here add the item to grocery list

//     console.log("Item added to grocery list");
//     // setItems(newItems);
//   };

//   const toggleComplete = (index) => {
//     const newItems = [...items];

//     newItems[index].isSelected = !newItems[index].isSelected;

//     setItems(newItems);
//   };
  console.log("recipe : " + recipe)
  return (
    <div className={styles.appbackground}>
      <img
        className={styles.image}
        src={recipe.imageURL}
      />

      <div className={styles.maincontainer}>
        <h1>Ingredients List</h1>
       
        <div className={styles.itemlist}>
          {recipe.map((recipe, index) => (
            <div className={styles.itemcontainer}>
              <div className={styles.itemname} onClick={() => "toggleComplete(index)"}>
                {/* {item.isSelected ? ( */}
                  <>
                    <CheckBoxRoundedIcon icon={CheckBoxRoundedIcon} />
                    <RecipeCard key={recipe.id} recipe={recipe} />
                    <span className={styles.completed}>{recipe.ingredients}</span>
                  </>
                {/* ) : ( */}
                  <>
                    <CheckBoxOutlineBlankRoundedIcon icon={CheckBoxOutlineBlankRoundedIcon} />
                    <span>{recipe.ingredients}</span>
                  </>
                {/* )} */}
              </div>
              <div className={styles.addtogrocery}>
                <button>
                  <AddShoppingCartIcon
                    icon={AddShoppingCartIcon}
                    onClick={() => "handleAddToGrocery(index)"}
                  />
                </button>
              </div>
             
            </div>
          ))}
        </div>
        <div className={styles.additembox}>
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
        </div>
        <h2>Description</h2>
      </div>
    </div>
  );
}
