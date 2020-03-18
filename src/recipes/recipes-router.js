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

recipesRouter
    .route('/:recipe_id')
    .all((req, res, next) => {
        RecipesService.getById(
            req.app.get('db'),
            req.params.recipe_id
        )
            .then(recipe => {
                if(!recipe){
                    return res.status(404).json({
                        error: {
                            message: `Recipe doesn't exist`
                        }
                    })
                };
                res.recipe = recipe;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(serializeRecipe(res.recipe))
    })

module.exports = recipesRouter;