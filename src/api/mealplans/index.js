import {db} from '../../firebaseConfig'
import { collection, addDoc, updateDoc, getDoc, query, getDocs, doc, where } from "firebase/firestore";


export async function addMealplan(mealplan) {
    const { id, ...obj } = mealplan
    try {
        const docRef = await addDoc(collection(db, "mealplans"), obj);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateMealplan(updatedMealplan) {
    const { id, ...obj } = updatedMealplan
    const mealplanRef = doc(db, 'mealplans', updatedMealplan.id)
    try {
        await updateDoc(mealplanRef, obj);
        console.log("Updated document with ID " + updatedMealplan.id);
        return updatedMealplan
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getMealPlan(mealplanId) {
    const mealplanRef = doc(db, 'mealplans', mealplanId)
    try {
        const doc = await getDoc(mealplanRef)
        return doc.data()
    } catch (e) {
        console.error('Error: ', e)
    }
}

export async function getUserMealPlans(userId) {
    const q = query(collection(db, 'mealplans'), where('userId', '==', userId))
    try {
        const mealplans = await getDocs(q)
        return mealplans.docs.map(doc => ({...doc.data(), id: doc.id}))
    } catch (e) {
        console.log('Error: ', e)
    }
}

export async function getAllMealPlans() {
    const q = query(collection(db, 'mealplans'))
    try {
        const mealplans = await getDocs(q)
        return mealplans.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))
    } catch (e) {
        console.log('Error: ', e)
    }
}