const express = require('express');
const xss = require('xss');
const RecipesService = require('./recipes-service');
const jwt = require('jsonwebtoken');

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
        const token = req.get('cookies');       

        if(!token){
            return res.status(401).end()
        };

        let payload;
        try{
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch(e) {
            if(e instanceof jwt.JsonWebTokenError){
                return res.status(401).end()
            };
            return res.status(400).end()
        }
        
        RecipesService.getAllRecipes(
            req.app.get('db')
        )
            .then(recipes => {
                res.json(recipes.map(serializeRecipe))
            })
            .catch(next)
    })

module.exports = recipesRouter;