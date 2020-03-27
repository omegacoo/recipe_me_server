const User_IngredientService = {
    truncateUserIngredients(knex, id){      
        return knex('user_ingredients')
            .where('user_id', id)
            .del()
    },
    putNewUserIngredients(knex, newUserIngredients){  
        return knex('user_ingredients')
            .insert(newUserIngredients)
    },
    getUserIngredients(knex, id){
        return knex
            .select('*')
            .from('user_ingredients')
            .where('user_id', id)
    }
};

module.exports = User_IngredientService; 