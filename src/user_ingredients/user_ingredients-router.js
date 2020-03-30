const express = require('express');
const User_IngredientService = require('./user_ingredients-service');
const jwt = require('jsonwebtoken');

const user_ingredientsRouter = express.Router();
const bodyParser = express.json();

user_ingredientsRouter
    .route('/')
    .get((req, res, next) => {
        const token = req.get('cookies');        

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

        User_IngredientService.getUserIngredients(
            req.app.get('db'),
            parseInt(req.headers.user_id)
        )
            .then(i => {
                res.json(i)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => { 
        const userIngredients = req.body;        
        const userId = req.headers.user_id;
        const token = req.get('cookies');

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
        
        User_IngredientService.truncateUserIngredients(
            req.app.get('db'),
            userId
        )
            .then(() => {
                res.end()
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