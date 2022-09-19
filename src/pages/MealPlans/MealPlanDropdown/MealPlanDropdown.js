import { Button, Select, MenuItem, FormControl } from '@mui/material'
import { ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIosNew as ArrowBackIosNewIcon } from '@mui/icons-material'

const MealPlanDropdown = ({mealplans, currentMealplan, setCurrentMealplan}) => {
    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Button 
                onClick={() => {
                    let prevIndex = mealplans.indexOf(currentMealplan) === 0 ? mealplans.length-1 : mealplans.indexOf(currentMealplan)-1
                    setCurrentMealplan(mealplans[prevIndex])
                }} 
                color='success'
            >
                <ArrowBackIosNewIcon />
            </Button>
            
            <FormControl>
                {/* <InputLabel id='mealplan-select-label'>Meal Plans</InputLabel> */}
                <Select
                    color='success'
                    style={{minWidth:'12em'}}
                    labelId='mealplan-select-label'
                    id='mealplan-select'
                    value={currentMealplan?.id}
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
        </div>
    )
}

export default MealPlanDropdown