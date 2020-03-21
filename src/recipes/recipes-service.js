const RecipesService = {
    getAvailableRecipes(knex){
        return knex
            .select('*')
            .from('recipes')
    },
    getById(knex, id){
        return knex
            .from('recipes')
            .select('*')
            .where('id', id)
            .first()
    }
};

module.exports = RecipesService;