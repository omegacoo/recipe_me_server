# Recipe Me Server

## Setting up

- Install dependencies: `npm install`
- Create development and test databases: `createdb recipe_me`, `createdb recipe_me_test`
- Create database user: `createuser recipe_me`
- Grant privileges to new user in `psql`:
    - `GRANT ALL PRIVILEGES ON DATABASE recipe_me TO recipe_me`
    - `GRANT ALL PRIVILIGES ON DATABASE recipe_me_test TO recipe_me`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm t`