const express = require('express');
const xss = require('xss');
const RecipesService = require('./recipes-service');

const recipesRouter = express.Router();

const serializeRecipe = recipe => ({
    id: recipe.id,
    title: xss(recipe.title),
    description: xss(recipe.description),
    diet: recipe.diet,
    instructions: xss(recipe.instructions)
});

recipesRouter
    .route('/')
    .get((req, res, next) => {
        RecipesService.getAllRecipes(
            req.app.get('db')
        )
            .then(recipes => {
                res.json(recipes.map(serializeRecipe))
            })
            .catch(next)
    })

module.exports = recipesRouter;