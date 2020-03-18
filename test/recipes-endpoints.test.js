const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Recipes endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });

        app.set('db', db);
    });

    after('disconnect from DB', () => db.destroy());

    before('clean the table', () => db.raw('TRUNCATE recipes RESTART IDENTITY CASCADE'));

    afterEach('cleanup', () => db.raw('TRUNCATE recipes RESTART IDENTITY CASCADE'));

    describe('GET /api/recipes', () => {
        context('Given no recipes', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/recipes')
                    .expect(200, [])
            });
        });

        context('Given there are recipes in the DB', () => {
            const testRecipes = helpers.makeRecipesArray();

            beforeEach('insert recipes', () => {
                return db
                    .into('recipes')
                    .insert(testRecipes)
            });

            it('responds with 200 and all of the recipes', () => {
                return supertest(app)
                    .get('/api/recipes')
                    .expect(200, testRecipes)
            });
        });
    });

    describe('GET /api/recipes/:recipe_id', () => {
        context('Given no recipes', () => {
            it('responds with 404', () => {
                const recipe_id = 1234;

                return supertest(app)
                    .get(`/api/recipes/${recipe_id}`)
                    .expect(404, { error: { message: `Recipe doesn't exist` } })
            });
        });

        context('Given there are recipes in the DB', () => {
            const testRecipes = helpers.makeRecipesArray();

            beforeEach('insert recipes', () => {
                return db
                    .into('recipes')
                    .insert(testRecipes)
            });

            it('responds with 200 and the recipe', () => {
                const recipe_id = 2;
                const expectedRecipe = testRecipes[recipe_id - 1];

                return supertest(app)
                    .get(`/api/recipes/${recipe_id}`)
                    .expect(200, expectedRecipe)
            });
        });
    });
});