import React, { useContext, useState, useEffect } from "react";
import { getMyGroceryList, updateGroceryList } from "../api/groceries";
import { useAuth } from "./AuthContext";

const GroceryContext = React.createContext();

export function useGrocery() {
  return useContext(GroceryContext);
}

export function GroceryProvider({ children }) {

    const { currentUser } = useAuth()
    const [groceryList, setGroceryList] = useState([])
    const [viewGroceryModal, setViewGroceryModal] = useState(false)

    const toggleViewGroceryModal = () => {
        setViewGroceryModal(!viewGroceryModal)
    }

    const editGroceryList = async (newGroceryList) => {
        try {
            await updateGroceryList(newGroceryList)
            setGroceryList(newGroceryList)
        } catch (e) {
            console.log('error: ' + e)
        }
    }
    
    useEffect(() => {
        const fetchGroceryList = async () => {
            const myGroceryList = await getMyGroceryList(currentUser.uid)
            const grocery = myGroceryList || {groceries: [], user: currentUser.uid, id: currentUser.uid}
            setGroceryList(grocery)
        }

        fetchGroceryList()
    }, [])

    const value = {
        groceryList,
        editGroceryList,
        viewGroceryModal,
        toggleViewGroceryModal,
    };

    return (
        <GroceryContext.Provider value={value}>
            {children}
        </GroceryContext.Provider>
    );
}