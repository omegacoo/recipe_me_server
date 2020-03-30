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
        const user_id = parseInt(req.headers.user_id);    

        if(!token){
            return res.status(401).end()
        };

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch(e) {
            if(e instanceof jwt.JsonWebTokenError){
                return res.status(401).end()
            };
            return res.status(400).end()
        };

        let ingredientsNeeded = [];
        let possibleRecipes = [];
        let recipeList = [];

        Available_RecipesService.getRecipesUserHasIngredientsFor(
            req.app.get('db'),
            user_id
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
                        ingredientsNeeded = [...response];
                    })
                    .then(() => {
                        Available_RecipesService.getUserIngredients(
                            req.app.get('db'),
                            user_id
                        )
                            .then(userIngredients => {
                                ingredientsNeeded.map(iN => {
                                    if(!userIngredients.find(uI => uI.ingredient_id === iN.ingredient_id)){
                                        ingredientsNeeded = ingredientsNeeded.filter(i => i.recipe_id !== iN.recipe_id);
                                    };
                                });
                                ingredientsNeeded.map( i => {
                                    if(!recipeList.find(element => element.recipe_id == i.recipe_id)){
                                        recipeList.push(i.recipe_id);
                                    };
                                });
                                let a = [];
                                recipeList.map(i => {
                                    if(!a.includes(i)){
                                        a.push(i)
                                    };
                                });

                                recipeList = [...a];
                            })
                            .then(() => {
                                Available_RecipesService.getSpecificRecipes(
                                    req.app.get('db'),
                                    recipeList
                                )
                                    .then(response => {
                                        response.map(r => {
                                            let recipeIngredients = ingredientsNeeded.filter(i => i.recipe_id === r.id);
                                            r.ingredients = recipeIngredients.map(i => i);
                                        });
                                        
                                        res.json(response);
                                    })
                            })
                    })
            })
            .catch(next)
            
    })

module.exports = available_recipesRouter;