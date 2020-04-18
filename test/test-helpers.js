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
            category: 'meat'
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

function makeUsersArray(){
    return [
        {
            user_name: 'test_one',
            password: 'test_password',
            email: 'test_email1'
        }
    ]
};

function seedUsers(db, users){
    return db
        .into('users')
        .insert(users)
};

module.exports = {
    makeIngredientsArray,
    makeRecipesArray,
    makeUsersArray,
    seedUsers
};