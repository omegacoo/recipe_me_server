const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Available recipes endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });

    after('disconnect from DB', () => db.destroy());

    beforeEach('cleanup', () => db.raw('TRUNCATE user_ingredients RESTART IDENTITY CASCADE'));

    afterEach('cleanup', () => db.raw('TRUNCATE user_ingredients RESTART IDENTITY CASCADE'));

    describe('GET /api/available_recipes', () => {
        context('Given the user is not authorized', () => {
            it('responds with 401', () => {
                return supertest(app)
                    .get('/api/available_recipes')
                    .expect(401)
            });
        });
    });
});