import { CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import styles from './MealPlans.module.css'


const MealPlans = () => {
    const mockMeals = [
        {
            name:'French Omelette',
            recipeId:'000aaa',
            meal:'Breakfast'
        },
        {
            name:'Caesar Salad',
            recipeId: '123abc',
            meal: 'Lunch',
        },
        {
            name:'Spaghetti',
            recipeId:'345def',
            meal:'Dinner'
        }
    ]
    const mockDays = [
        {
            date: new Date('9/6/2022'),
            meals:mockMeals
        },
        {
            date: new Date('9/7/2022'),
            meals:mockMeals
        },
        {
            date: new Date('9/8/2022'),
            meals:mockMeals
        }
    ]

    const mockMealPlan = {
        dateStart: new Date('9/6/2022'),
        dateEnd: new Date('9/9/2022'),
        days: mockDays
    }

    return (
        <div>
            <Typography variant='h2'>Meal Plans</Typography>
            <br />
            <Card>
                <CardHeader 
                    className={styles.planHeader} 
                    title={`Meals for ${mockMealPlan.dateStart.toLocaleDateString()} - ${mockMealPlan.dateEnd.toLocaleDateString()}`} 
                />
                <CardContent component='div'>
                    <Grid container spacing={2}>
                        {mockMealPlan.days.map((dayPlan) => {
                            
                        })}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default MealPlans