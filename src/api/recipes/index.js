import {db} from '../../firebaseConfig'
import { collection, addDoc, updateDoc } from "firebase/firestore";


export async function addRecipe(recipe) {
    try {
        const docRef = await addDoc(collection(db, "recipes"), recipe);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateRecipe(updatedRecipe) {
    const recipeRef = doc(db, 'recipes', updatedRecipe.id)
    try {
        await updateDoc(recipeRef, updatedRecipe);
        console.log("Updated document with ID " + updatedRecipe.id);
        return updatedRecipe
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}