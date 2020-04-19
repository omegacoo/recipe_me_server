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

function makeUserIngredientsArray(){
    return [
        {
            ingredient_id: 1,
            user_id: 1
        },
        {
            ingredient_id: 2,
            user_id: 2
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
    seedUsers,
    makeUserIngredientsArray
};