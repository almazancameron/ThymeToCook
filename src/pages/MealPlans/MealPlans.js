import { CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import DayCard from './DayCard/DayCard';
import styles from './MealPlans.module.css'


const MealPlans = () => {
    const mockMeals = [
        {
            name:'French Omelette',
            recipeId:'000aaa',
            meal:'Breakfast',
            imageURL: 'https://www.seriouseats.com/thmb/p0fPMJ46OoYl7QCLN92prA0kDv4=/880x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__04__20160323-french-omelet-vicky-wasik--29-4443fd8d1f5b4e359f31e384d901cefb.jpg'
        },
        {
            name:'Caesar Salad',
            recipeId: '123abc',
            meal: 'Lunch',
            imageURL: 'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg'
        },
        {
            name:'Spaghetti',
            recipeId:'345def',
            meal:'Dinner',
            imageURL: 'https://veganwithgusto.com/wp-content/uploads/2021/05/speedy-spaghetti-arrabbiata-1st-image.jpg'
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
                            return (
                                <Grid item xs={12} md={12/mockMealPlan.days.length}>
                                    <DayCard meals={dayPlan.meals} date={dayPlan.date} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default MealPlans