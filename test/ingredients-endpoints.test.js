const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Ingredients endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());

    beforeEach('cleanup', () => db.raw('TRUNCATE ingredients RESTART IDENTITY CASCADE'));

    afterEach('cleanup', () => db.raw('TRUNCATE ingredients RESTART IDENTITY CASCADE'));

    describe('GET /api/ingredients', () => {
        context('Given no ingredients', () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/ingredients')
                    .expect(200, [])
            });
        });

        context('Given there are ingredients in the DB', () => {
            const testIngredients = helpers.makeIngredientsArray();
            testIngredients.sort((a, b) => {
                let titleA = a.title;
                let titleB = b.title;

                return(titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
            });


            beforeEach('insert ingredients', () => {
                return db
                    .into('ingredients')
                    .insert(testIngredients)
            });

            it('responds with 200 and all of the ingredients in alphabetical order', () => {
                return supertest(app)
                    .get('/api/ingredients')
                    .expect(200, testIngredients)
            });
        });
    });

    describe('GET /api/ingredients/:ingredient_id', () => {
        context('Given no ingredients', () => {
            it('responds with 404', () => {
                const ingredient_id = 1234;

                return supertest(app)
                    .get(`/api/ingredients/${ingredient_id}`)
                    .expect(404, { error: { message: `Ingredient doesn't exist` } })
            });
        }); 

        context('Given there are ingredients in the DB', () => {
            const testIngredients = helpers.makeIngredientsArray();
            
            beforeEach('insert ingredients', () => {
                return db
                    .into('ingredients')
                    .insert(testIngredients)
            });

            it('responds with 200 and the ingredient', () => {
                const ingredient_id = 2;
                const expectedIngredient = testIngredients[ingredient_id - 1];

                return supertest(app)
                    .get(`/api/ingredients/${ingredient_id}`)
                    .expect(200, expectedIngredient)
            });
        });
    });
});