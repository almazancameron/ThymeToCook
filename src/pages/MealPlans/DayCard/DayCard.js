import { Card, CardHeader, CardContent } from "@mui/material"
import MealCard from "./MealCard/MealCard"

const DayCard = ({meals, date}) => {
    return (
        <Card container>
            <CardHeader title={`Meals for ${new Date(date.seconds*1000).toLocaleDateString()}`} />
            <CardContent>
                {meals.map((meal) => {
                    return (
                        <MealCard meal={meal} />
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default DayCard