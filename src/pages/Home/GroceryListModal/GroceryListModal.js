import { Button, Checkbox, List, ListItem, ListItemButton, ListItemText, MenuItem, Modal, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useGrocery } from "../../../context/GroceryContext"

const GroceryListModal = () => {
    const { currentUser } = useAuth()
    const { groceryList, editGroceryList, viewGroceryModal, toggleViewGroceryModal } = useGrocery()
    const ref = useRef(null)

    const [newGroceries, setNewGroceries] = useState([])

    useEffect(() => {
        setNewGroceries(groceryList?.groceries || [])
    }, [groceryList])

    const handleCheck = (g) => {
        if (newGroceries.includes(g)) {
            setNewGroceries([...newGroceries].filter((n) => n !== g))
        } else {
            setNewGroceries([...newGroceries, g])
        }
    }

    const handleSave = () => {
        const copyGroceryList = {...groceryList, groceries: newGroceries}
        editGroceryList(copyGroceryList)
    }

    const handleAddCustom = () => {
        const copyGroceryList = {...groceryList, groceries: [...groceryList.groceries, ref.current?.value]}
        editGroceryList(copyGroceryList)
        ref.current.value = ''
    }

    return (
        <Modal
            open={viewGroceryModal}
            onClose={toggleViewGroceryModal}
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'fit-content',
                    backgroundColor:'white',
                    maxHeight:'80vh',
                    height:'fit-content',
                    padding:'2em',
                    border: '2px solid #000',
                    paddingTop:'0.5em',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth:'75vw',
                    borderRadius:'10px',
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                    color:'black'
                }}
            >
                {groceryList.groceries?.length > 0 ?
                    <List>
                        {groceryList.groceries.map((g, i) => (
                            <ListItemButton key={i} onClick={() => handleCheck(g)} component={MenuItem} sx={{display:'flex', paddingLeft:"0.5em"}}>
                                <Checkbox checked={!newGroceries.includes(g)} sx={{padding:0}} />
                                <ListItemText 
                                    primary={g} 
                                    sx={{
                                        paddingLeft:'0.5em', 
                                        textDecoration: newGroceries.includes(g) ? 'none' : 'line-through'
                                    }} 
                                />
                            </ListItemButton>
                        ))}
                    </List> :
                    <p>
                        You have no groceries to display!
                    </p>
                }
                <div style={{display:'flex'}}>
                    <TextField inputRef={ref} label='Custom Item' />
                    <Button onClick={handleAddCustom}>Add</Button>
                </div>
                {!groceryList?.groceries?.every(g => newGroceries.includes(g)) &&
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                }
            </Box>
        </Modal>
    )
}

export default GroceryListModal