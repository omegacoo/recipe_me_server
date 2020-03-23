const express = require('express');
const xss = require('xss');
const IngredientsService = require('./ingredients-service');

const ingredientsRouter = express.Router();

const jwtKey = 'u%3FgDR8&ljLnvYDluy5%T2Yd_##C#';

const serializeIngredient = ingredient => ({
    id: ingredient.id,
    title: xss(ingredient.title),
    category: xss(ingredient.category)
});

ingredientsRouter
    .route('/')
    .get((req, res, next) => {

        IngredientsService.getAllIngredients(
            req.app.get('db')
        )
            .then(ingredients => {
                res.json(ingredients.map(serializeIngredient))
            })
            .catch(next)
    })

module.exports = ingredientsRouter;