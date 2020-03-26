const express = require('express');
const path = require('path');
const User_IngredientService = require('./user_ingredients-service');

const user_ingredientsRouter = express.Router();
const bodyParser = express.json();

user_ingredientsRouter
    .route('/')
    .post(bodyParser, (req, res, next) => { 
        const userIngredients = req.body;        
        const userId = req.headers.user_id;
        
        
        User_IngredientService.truncateUserIngredients(
            req.app.get('db'),
            userId
        )
            .then(() => {
                res
                    .status(201)
                    .end()
            })
            .catch(next)

        User_IngredientService.putNewUserIngredients(
            req.app.get('db'),
            userIngredients
        )
            .then(() => {
                res
                    .status(201)
                    .end()
            })
            .catch(next);
    })

module.exports = user_ingredientsRouter;