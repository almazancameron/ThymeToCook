import { Modal, Box, Typography, Button, Grid } from "@mui/material"
import styles from './AddMealPlanModal.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import moment from 'moment/moment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TextField } from "@mui/material";
import * as firestore from 'firebase/firestore'
import { useMemo } from "react";
import { addMealplan } from "../../../api/mealplans";
import { useAuth } from "../../../context/AuthContext";


const AddMealPlanModal = ({ viewAddPlanModal, toggleViewAddPlanModal, mealplans, updateMealplans }) => {
    const { currentUser } = useAuth()
    const [newMealplan, setNewMealplan] = useState({dateStart: null, dateEnd: null, days: [], userId: currentUser.uid, name:''})
    const daysLength = useMemo(() => {
        return ((newMealplan.dateEnd?.seconds + 86400) - newMealplan.dateStart?.seconds) / (60 * 60 * 24)
    }, [newMealplan?.dateEnd, newMealplan?.dateStart])

    const handleSubmit = async () => {
        //86400 seconds in 1 day
        for (let i = newMealplan.dateEnd?.seconds; i > newMealplan.dateStart?.seconds - 86400; i -= 86400) {
            newMealplan.days.push({date: firestore.Timestamp.fromDate(new Date(i*1000)), meals: []})
        }
        let id = await addMealplan(newMealplan)
        newMealplan.id = id
        let copyMealplans = [...mealplans, newMealplan]
        updateMealplans(copyMealplans)
        setNewMealplan({dateStart: null, dateEnd: null, days: []})
        toggleViewAddPlanModal()
    }
    return (
        <Modal
            open={viewAddPlanModal}
            onClose={() => {
                toggleViewAddPlanModal()
                setNewMealplan({dateStart: null, dateEnd: null, days: []})
            }}
        >
            <Box className={styles.modalBody}>
                <Button 
                    className={styles.closeButton} 
                    color='error' 
                    onClick={() => {
                        toggleViewAddPlanModal()
                        setNewMealplan({dateStart: null, dateEnd: null, days: []})
                    }}
                >
                    <CloseIcon />
                </Button>
                <Typography id="modal-modal-title" variant="h5" className={styles.modalHeader}>
                    Add a Meal Plan
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField value={newMealplan.name} onChange={(e) => setNewMealplan({...newMealplan, name:e.target.value})} label="Meal Plan Name" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="MM/DD/YYYY"
                                value={newMealplan.dateStart ? new Date(newMealplan.dateStart.seconds * 1000) : null}
                                onChange={(e) => setNewMealplan({...newMealplan, dateStart: firestore.Timestamp.fromDate(new Date(e.valueOf()))})}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="MM/DD/YYYY"
                                value={newMealplan.dateEnd ? new Date(newMealplan.dateEnd.seconds * 1000) : null}
                                onChange={(e) => setNewMealplan({...newMealplan, dateEnd: firestore.Timestamp.fromDate(new Date(e.valueOf()))})}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='success' onClick={handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddMealPlanModal