const IngredientsService = {
    getAllIngredients(knex){
        return knex
            .select('*')
            .from('ingredients')
            .orderBy('title')
    }
};

module.exports = IngredientsService;