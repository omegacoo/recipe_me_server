const express = require('express');
const AuthService = require('./auth-service');
const config = require('../config');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const jsonParser = express.json();

authRouter
    .post('/login', jsonParser, (req, res, next) => {
        const { user_name, password } = req.body;
        const loginUser = { user_name, password };

        for(const [key, value] of Object.entries(loginUser)){
            if(value == null){
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
            };
        };
        
        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.user_name
        )
            .then(dbUser => {
                if(!dbUser || dbUser.password !== loginUser.password){
                    return res.status(401).json({
                        error: {
                            message: `Incorrect user_name or password`
                        }
                    })
                };
                console.log('verified!');
                const user_name = dbUser.user_name;

                const token = jwt.sign({ user_name }, config.JWT_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: config.JWT_EXPIRY_SECONDS
                });
                
                // const sub = dbUser.user_name;
                // const payload = { user_id: dbUser.id };
                res.cookie('token', token, { maxAge: config.JWT_EXPIRY_SECONDS * 1000 }).end();
            })
            .catch(next)
    })

module.exports = authRouter;