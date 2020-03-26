const User_IngredientService = {
    truncateUserIngredients(knex, id){      
        return knex('user_ingredients')
            .where('user_id', id)
            .del()
    },
    putNewUserIngredients(knex, newUserIngredients){  
        return knex('user_ingredients')
            .insert(newUserIngredients)
    }
};

module.exports = User_IngredientService; 