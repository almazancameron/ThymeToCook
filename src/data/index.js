export const emptyMealPlan = {
    dateEnd: new Date(),
    dateStart: new Date(),
    days: [
        {
            date: new Date(),
            meals: [
                {
                    imageURL: '',
                    meal: '',
                    name: '',
                    recipeId: '',
                }
            ]
        }
    ]
}

export const oneDay = 60*60*24*1000