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
        const token = req.cookies.token;

        if(!token){
            return res.status(401).end()
        };

        let payload;
        try{
            payload = jwt.verify(token, jwtKey)
        } catch (e) {
            if(e instanceof jwt.JsonWebTokenError){
                return res.status(401).end()
            };
            return res.status(400).end()
        };

        IngredientsService.getAllIngredients(
            req.app.get('db')
        )
            .then(ingredients => {
                res.json(ingredients.map(serializeIngredient))
            })
            .catch(next)
    })

ingredientsRouter
    .route('/:ingredient_id')
    .all((req, res, next) => {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).end()
        };

        let payload;
        try{
            payload = jwt.verify(token, jwtKey)
        } catch (e) {
            if(e instanceof jwt.JsonWebTokenError){
                return res.status(401).end()
            };
            return res.status(400).end()
        };

        IngredientsService.getById(
            req.app.get('db'),
            req.params.ingredient_id
        )
            .then(ingredient => {
                if(!ingredient){
                    return res.status(404).json({
                        error: {
                            message: `Ingredient doesn't exist`
                        }
                    })
                };
                res.ingredient = ingredient;
                next();
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeIngredient(res.ingredient))
    })

module.exports = ingredientsRouter;