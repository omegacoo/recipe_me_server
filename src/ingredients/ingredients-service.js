const IngredientsService = {
    getAllIngredients(knex){
        return knex
            .select('*')
            .from('ingredients')
    },
    getById(knex, id){
        return knex
            .from('ingredients')
            .select('*')
            .where('id', id)
            .first()
    }
};

module.exports = IngredientsService;