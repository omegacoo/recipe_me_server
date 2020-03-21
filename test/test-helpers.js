function makeIngredientsArray(){
    return [
        {
            id: 1,
            title: 'carrot',
            category: 'vegetable/legume'
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

function makeUsersArray(){
    return [
        {
            user_name: 'test_one',
            password: 'test_password',
            email: 'test_email1'
        },
        {
            user_name: 'test_two',
            password: 'test_password',
            email: 'test_email2'
        },
        {
            user_name: 'test_three',
            password: 'test_password',
            email: 'test_email3'
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