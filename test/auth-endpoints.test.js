const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const config = require('../src/config');
const bcrypt = require('bcryptjs');

describe('Auth endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });        
        app.set('db', db);
    });
    

    after('disconnect from DB', () => db.destroy());

    beforeEach('clean the table', () => db.raw('TRUNCATE users RESTART IDENTITY CASCADE'));

    afterEach('cleanup', () => db.raw('TRUNCATE users RESTART IDENTITY CASCADE'));

    describe('POST /api/auth/login', () => {
        const testUser = {
            user_name: 'test_one',
            password: 'test_password'
        };

        const testUserEncrypted = {
            user_name: 'test_one',
            password: bcrypt.hashSync('test_password', config.BCRYPT_VERSION),
            email: 'test_email1'
        };
        

        beforeEach('insert users', () => 
            helpers.seedUsers(
                db,
                testUserEncrypted
            )
        );

        const requiredFields = ['user_name', 'password'];        

        requiredFields.forEach(field => {
            const loginAttemptBody = {
                user_name: testUser.user_name,
                password: testUser.password
            };

            it(`responds with 400 required error when '${field}' is missing`, () => {
                delete loginAttemptBody[field];

                return supertest(app)
                    .post('/api/auth/login')
                    .send(loginAttemptBody)
                    .expect(400, { error: { message: `Missing '${field}' in request body` } })
            });

            it(`responds with 400 'invalid user_name or password' when bad user_name`, () => {
                const userInvalidUser = { user_name: 'user-not', password: 'test_password' };

                return supertest(app)
                    .post('/api/auth/login')
                    .send(userInvalidUser)
                    .expect(401, {error: { message: `Incorrect user_name or password` } })
            });

            it(`responds with 400 'invalid user_name or password' when bad password`, () => {
                const userInvalidPass = { user_name: 'test_one', password: 'wrong' };

                return supertest(app)
                    .post('/api/auth/login')
                    .send(userInvalidPass)
                    .expect(401, { error: { message: `Incorrect user_name or password` } })
            });

            it(`responds with 400 'invalid user_name or password' when both fields are wrong`, () => {
                const userInvalidFields = { user_name: 'user_not', password: 'wrong' };

                return supertest(app)
                    .post('/api/auth/login')
                    .send(userInvalidFields)
                    .expect(401, { error: { message: `Incorrect user_name or password` } })
            });
        });

        it(`responds with 200 when good user_name and password`, () => {
            const loginAttemptBody = {
                user_name: testUser.user_name,
                password: testUser.password
            };            

            return supertest(app)
                .post('/api/auth/login')
                .send(loginAttemptBody)
                .expect(200)
        });
    });
});