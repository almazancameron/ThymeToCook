import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import styles from './MealCard.module.css'

const MealCard = ({meal}) => {
    return (
        <Paper variant="outlined">
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{meal.meal} - {meal.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <img className={styles.mealImage} src={meal.imageURL} />
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}

export default MealCard