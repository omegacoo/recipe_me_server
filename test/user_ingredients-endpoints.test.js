const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('User_ingredients endpoints', () => {
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

    describe('POST /api/user_ingredients', () => {
        context('Given no new ingredients', () => {
            // it('responds with 200', () => {
            //     return supertest(app)
            //         .post('/api/user_ingredients')
            //         .send({})
            //         .expect(200)
            // });
        });
    });
});