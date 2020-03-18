function makeIngredientsArray(){
    return [
        {
            id: 1,
            title: 'carrot',
            category: 'vegetable'
        },
        {
            id: 2,
            title: 'milk',
            category: 'dairy'
        },
        {
            id: 3,
            title: 'chicken',
            category: 'protein'
        }
    ]
};

function makeRecipesArray(){
    return [
        {
            id: 1,
            title: 'milk chicken',
            description: 'soppy chicken',
            diet: 'paleo',
            instructions: 'make nasty chicken'
        },
        {
            id: 2,
            title: 'milk carrot',
            description: 'soppy carrot',
            diet: 'vegan',
            instructions: 'make nasty carrot'
        },
        {
            id: 3,
            title: 'chicken with carrot',
            description: 'two things together',
            diet: 'keto',
            instructions: 'put carrot on chicken'
        }
    ]
};

module.exports = {
    makeIngredientsArray,
    makeRecipesArray
};