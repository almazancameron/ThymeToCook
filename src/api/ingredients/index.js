import {db} from '../../firebaseConfig'
import { collection, addDoc, updateDoc } from "firebase/firestore";


export async function addIngredient(ingredient) {
    try {
        const docRef = await addDoc(collection(db, "ingredients"), ingredient);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateIngredient(updatedIngredient) {
    const ingredientRef = doc(db, 'ingredients', updatedIngredient.id)
    try {
        await updateDoc(ingredientRef, updatedIngredient);
        console.log("Updated document with ID " + updatedIngredient.id);
        return updatedIngredient
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}