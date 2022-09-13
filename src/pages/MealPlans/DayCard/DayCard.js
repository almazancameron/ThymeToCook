import { Card, CardHeader, CardContent } from "@mui/material"
import MealCard from "./MealCard/MealCard"

const DayCard = ({meals, date}) => {
    return (
        <Card>
            <CardHeader title={`Meals for ${new Date(date.seconds*1000).toLocaleDateString()}`} />
            <CardContent>
                {meals.map((meal, i) => {
                    return (
                        <MealCard key={i} meal={meal} />
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default DayCard