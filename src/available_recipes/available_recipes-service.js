const Available_RecipesService = {
    getRecipesUserHasIngredientsFor(knex, id){
        return knex
            .select('*')
            .from('recipes_ingredients')
            .join('user_ingredients', 'user_ingredients.ingredient_id', '=', 'recipes_ingredients.ingredient_id')
            .where('user_ingredients.user_id', id)
    },
    getAllIngredientsForEachFoundRecipe(knex, recipes){        
        return knex('recipes_ingredients')
            .whereIn('recipes_ingredients.recipe_id', recipes)
    }
};

module.exports = Available_RecipesService;