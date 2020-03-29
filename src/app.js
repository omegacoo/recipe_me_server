require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config'); 

const ingredientsRouter = require('./ingredients/ingredients-router');
const recipesRouter = require('./recipes/recipes-router');
const authRouter = require('./auth/auth-router');
const user_ingredientsRouter = require('./user_ingredients/user_ingredients-router');
const available_recipesRouter = require('./available_recipes/available_recipes-router');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

const corsOptions = {
    origin: ['http://localhost:3000', 'https://pantry-buddy.com'],
    exposedHeaders: ['X-token', 'user_id']
};

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors(corsOptions));

app.use('/api/ingredients', ingredientsRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);
app.use('/api/user_ingredients', user_ingredientsRouter);
app.use('/api/available_recipes', available_recipesRouter);

app.use(function errorHandler(error, req, res, next){
    let response;
    if(NODE_ENV === 'production'){
        response = { error: { message: 'server error' } };
    } else {
        console.error(error);
        response = { message: error.message, error }
    };
    res.status(500).json(response);
});

module.exports = app;