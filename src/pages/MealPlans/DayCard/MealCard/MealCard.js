import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import styles from './MealCard.module.css'

const MealCard = ({meal}) => {
    return (
        <Paper variant="outlined" style={{marginBottom:'1em'}}>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{meal.meal} - {meal.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <img className={styles.mealImage} src={meal.imageURL} />
                    <div style={{display:'flex', justifyContent:'space-evenly', alignContent:''}}>
                        <p><a href='#'>Link to Recipe</a></p>
                        <p>Time: 30 mins.</p>
                        <p>300 calories</p>
                    </div>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}

export default MealCard