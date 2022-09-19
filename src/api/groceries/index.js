import {db} from '../../firebaseConfig'
import { collection, addDoc, updateDoc, setDoc, query, doc, getDocs } from "firebase/firestore";

export async function getMyGroceryList(userId) {
    const q = query(collection(db, 'grocerylists'))
    try {
        let grocerylists = await getDocs(q)
        grocerylists = grocerylists.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))
        return grocerylists.find((g) => g.user === userId)
    } catch (e) {
        console.log('Error: ', e)
    }
}

export async function updateGroceryList(updatedGroceryList) {
    const { id, ...obj } = updatedGroceryList
    const groceryRef = doc(db, 'grocerylists', updatedGroceryList.id)
    try {
        await setDoc(groceryRef, obj);
        console.log("Updated document with ID " + updatedGroceryList.id);
        return updatedGroceryList
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// export async function updateIngredient(updatedIngredient) {
//     const ingredientRef = doc(db, 'ingredients', updatedIngredient.id)
//     try {
//         await updateDoc(ingredientRef, updatedIngredient);
//         console.log("Updated document with ID " + updatedIngredient.id);
//         return updatedIngredient
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }