import { CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { addMealplan, getAllMealPlans, getUserMealPlans } from '../../api/mealplans';
import DayCard from './DayCard/DayCard';
import styles from './MealPlans.module.css'
import Button from '@mui/material/Button'
import AddMealPlanModal from './AddMealPlanModal/AddMealPlanModal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuth } from '../../context/AuthContext';


const MealPlans = () => {
    const [mealplans, setMealplans] = useState([])
    const [currentMealplan, setCurrentMealplan] = useState(null)
    const [viewAddPlanModal, setViewAddPlanModal] = useState(false)

    const { currentUser } = useAuth()

    const updateMealplans = (newMealplans) => {
        setMealplans(newMealplans)
    }

    const toggleViewAddPlanModal = () => {
        setViewAddPlanModal(!viewAddPlanModal)
    }

    useEffect(() => {
        const getMealPlans = async () => {
            const allMealPlans = await getAllMealPlans() // this will be getUserMealPlans when we have user context so the user will only access their own meal plans
            const todayHasPlan = allMealPlans.filter((p) => new Date(p.dateEnd.seconds*1000) >= new Date() && new Date(p.dateStart.seconds*1000) <= new Date() ).length > 0
            const todayPlan = todayHasPlan ? 
                allMealPlans.find((p) => new Date(p.dateEnd.seconds*1000) > new Date() && new Date(p.dateStart.seconds*1000) < new Date()) : 
                null
            // console.log(todayPlan)
            setMealplans(allMealPlans)
            setCurrentMealplan(todayPlan || allMealPlans[0])
        }

        getMealPlans()
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid className={styles.navRow} item xs={12}>
                <Typography variant='h3' component='span' className={styles.navLogo}>Navbar</Typography>
                {mealplans.length > 0 &&
                    <>
                        <Button 
                            onClick={() => {
                                let prevIndex = mealplans.indexOf(currentMealplan) === 0 ? mealplans.length-1 : mealplans.indexOf(currentMealplan)-1
                                setCurrentMealplan(mealplans[prevIndex])
                            }} 
                            color='success'
                        >
                            <ArrowBackIosNewIcon />
                        </Button>
                        <FormControl className={styles.navSelect}>
                            <InputLabel id='mealplan-select-label'>Meal Plans</InputLabel>
                            <Select
                                color='success'
                                style={{minWidth:'12em', color:'white', backgroundColor:'gray'}}
                                labelId='mealplan-select-label'
                                id='mealplan-select'
                                value={mealplans.indexOf(currentMealplan)}
                                label='Meal Plans'
                                onChange={(e) => setCurrentMealplan(mealplans[e.target.value])}
                            >
                                {mealplans.map((p, i) => {
                                    return (
                                        <MenuItem key={i} value={i}>
                                            {`${new Date(p.dateStart.seconds * 1000).toLocaleDateString()} - ${new Date(p.dateEnd.seconds * 1000).toLocaleDateString()}`}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Button 
                            onClick={() => {
                                let nextIndex = mealplans.indexOf(currentMealplan) === mealplans.length-1 ? 0 : mealplans.indexOf(currentMealplan)+1
                                setCurrentMealplan(mealplans[nextIndex])
                            }} 
                            color='success'
                        >
                            <ArrowForwardIosIcon />
                        </Button>
                    </>
                }
            </Grid>
            {currentMealplan &&
                <Grid item xs={12}>
                    <Card>
                        <CardHeader 
                            className={styles.planHeader} 
                            title={`Meals for ${new Date(currentMealplan?.dateStart?.seconds*1000).toLocaleDateString()} - ${new Date(currentMealplan.dateEnd.seconds*1000).toLocaleDateString()}`} 
                        />
                        <CardContent component='div'>
                            <Grid container spacing={2}>
                                {currentMealplan.days.map((dayPlan, i) => {
                                    return (
                                        <Grid key={i} item xs={12} md={12/currentMealplan.days.length} className={styles.gridItem}>
                                            <DayCard meals={dayPlan.meals} date={dayPlan.date} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            }
            <Grid item xs={12}>
                <Button onClick={toggleViewAddPlanModal} variant='contained' color='success'>Add Meal Plans</Button>
            </Grid>
            <AddMealPlanModal viewAddPlanModal={viewAddPlanModal} toggleViewAddPlanModal={toggleViewAddPlanModal} mealplans={mealplans} updateMealplans={updateMealplans} />
        </Grid>
    )
}

export default MealPlans