const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Available_RecipesService = require('./available_recipes-service');

const available_recipesRouter = express.Router();
const parser = express.json();

available_recipesRouter
    .route('/')
    .get(parser, (req, res, next) => {        
        const token = req.get('cookies');        

        if(!token){
            return res.status(401).end()
        };

        let payload;
        try {
            payload = jwt.verify(token, config.JWT_SECRET);
        } catch(e) {
            if(e instanceof jwt.JsonWebTokenError){
                return res.status(401).end()
            };
            return res.status(400).end()
        };

        let possibleRecipes = [];
        let allIngredientsForEachFoundRecipe = [];

        Available_RecipesService.getRecipesUserHasIngredientsFor(
            req.app.get('db'),
            parseInt(req.headers.user_id)
        )
            .then(rawRecipes => {
                let duplicateChecker = [];
                rawRecipes.map(r => {
                    if(!duplicateChecker.includes(r.recipe_id)){
                        duplicateChecker.push(r.recipe_id);
                        possibleRecipes.push(r.recipe_id);
                    };
                });
            })
            .then(() => {
                Available_RecipesService.getAllIngredientsForEachFoundRecipe(
                    req.app.get('db'),
                    possibleRecipes
                )
                    .then(response => {
                        // response.map(r => allIngredientsForEachFoundRecipe.push(r));
                        console.log(response);
                        res.send(response)
                    })
            })
            .catch(next)
            
    })

module.exports = available_recipesRouter;