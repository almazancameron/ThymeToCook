import {db} from '../../firebaseConfig'
import { collection, addDoc, updateDoc, getDoc, query, getDocs, doc, where } from "firebase/firestore";



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

export async function getRecipe(recipeId) {
    const recipeRef = doc(db, 'recipes', recipeId)
    try {
        const doc = await getDoc(recipeRef)
        return doc.data()
    } catch (e) {
        console.error('Error: ', e)
    }
}

export async function getUserRecipes(userId) {
    const q = query(collection(db, 'recipes'), where('userId', '==', userId))
    try {
        const recipes = await getDocs(q)
        return recipes.docs.map(doc => ({...doc.data(), id: doc.id}))
    } catch (e) {
        console.log('Error: ', e)
    }
}

export async function getAllRecipes() {
    const q = query(collection(db, 'recipes'))
    try {
        const recipes = await getDocs(q)
        return recipes.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))
    } catch (e) {
        console.log('Error: ', e)
    }
}