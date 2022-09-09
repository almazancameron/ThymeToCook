import {db} from '../../firebaseConfig'
import { collection, addDoc, updateDoc } from "firebase/firestore";


export async function addMealplan(mealplan) {
    try {
        const docRef = await addDoc(collection(db, "mealplans"), mealplan);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateMealplan(updatedMealplan) {
    const mealplanRef = doc(db, 'mealplans', updatedMealplan.id)
    try {
        await updateDoc(mealplanRef, updatedMealplan);
        console.log("Updated document with ID " + updatedMealplan.id);
        return updatedMealplan
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}