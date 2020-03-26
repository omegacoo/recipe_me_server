const express = require('express');
const xss = require('xss');
const IngredientsService = require('./ingredients-service');

const ingredientsRouter = express.Router();

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