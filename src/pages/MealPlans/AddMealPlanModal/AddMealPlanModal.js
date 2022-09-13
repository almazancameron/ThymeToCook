import { Modal, Box, Typography, Button, Grid } from "@mui/material"
import styles from './AddMealPlanModal.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import moment from 'moment/moment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TextField } from "@mui/material";
import * as firestore from 'firebase/firestore'

const AddMealPlanModal = ({ viewAddPlanModal, toggleViewAddPlanModal }) => {
    const [newMealplan, setNewMealplan] = useState({dateStart: null, dateEnd: null})
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
console.log(newMealplan)
    return (
        <Modal
            open={viewAddPlanModal}
            onClose={toggleViewAddPlanModal}
        >
            <Box className={styles.modalBody}>
                <Button className={styles.closeButton} color='error' onClick={toggleViewAddPlanModal}><CloseIcon /></Button>
                <Typography id="modal-modal-title" variant="h5" className={styles.modalHeader}>
                    Add a Meal Plan
                </Typography>
                <Grid container spacing={2}>
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
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddMealPlanModal