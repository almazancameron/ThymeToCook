import { CardContent, CardHeader, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { addMealplan, getAllMealPlans, getUserMealPlans, updateMealplan } from '../../api/mealplans';
import DayCard from './DayCard/DayCard';
import styles from './MealPlans.module.css'
import Button from '@mui/material/Button'
import AddMealPlanModal from './AddMealPlanModal/AddMealPlanModal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../AppBar';


const MealPlans = () => {
    const [mealplans, setMealplans] = useState([])
    const [currentMealplan, setCurrentMealplan] = useState(null)
    const [viewAddPlanModal, setViewAddPlanModal] = useState(false)

    const { currentUser } = useAuth()

    const updateMealplans = (newMealplans) => {
        setMealplans(newMealplans)
    }

    const setMealplan = (newMealplan) => {
        updateMealplan(newMealplan)
        setCurrentMealplan(newMealplan)
        let copyMealplans = [...mealplans].map((m) => 
            m.id === currentMealplan.id ? 
                newMealplan : 
                m
        )
        console.log(copyMealplans)
        setMealplans(copyMealplans)
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
console.log(currentMealplan)
    return (
        <Grid container spacing={2}>
            <NavBar/>
            <Grid className={styles.navRow} item xs={12} >
                
                {/* <Typography variant='h3' component='span' className={styles.navLogo}>Navbar</Typography> */}
                
                {mealplans.length > 0 &&
                    <>
                    <Container justify="center">
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
                            {/* <InputLabel id='mealplan-select-label'>Meal Plans</InputLabel> */}
                            <Select
                                color='success'
                                style={{minWidth:'12em', color:'white', backgroundColor:'gray'}}
                                labelId='mealplan-select-label'
                                id='mealplan-select'
                                value={currentMealplan?.id}
                                label='Meal Plans'
                                onChange={(e) => setCurrentMealplan(mealplans.find(m => m.id === e.target.value))}
                            >
                                {mealplans.map((p, i) => {
                                    return (
                                        <MenuItem key={i} value={p.id}>
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
                        </Container>
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
                                            <DayCard meals={dayPlan.meals} date={dayPlan.date} mealplan={currentMealplan} updateMealplan={setMealplan} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            }
            <Grid item xs={12}>
                <Button onClick={toggleViewAddPlanModal} variant='contained' color='success'>Add Meal Plan</Button>
            </Grid>
            <AddMealPlanModal viewAddPlanModal={viewAddPlanModal} toggleViewAddPlanModal={toggleViewAddPlanModal} mealplans={mealplans} updateMealplans={updateMealplans} />
        </Grid>
    )
}

export default MealPlans