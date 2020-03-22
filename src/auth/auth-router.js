const express = require('express');
const AuthService = require('./auth-service');
const jwt = require('jsonwebtoken');

const jwtKey = 'u%3FgDR8&ljLnvYDluy5%T2Yd_##C#';
const jwtExpirySeconds = 300;

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
                if(!dbUser){
                    return res.status(401).json({
                        error: {
                            message: `Incorrect user_name or password`
                        }
                    })
                } else if(dbUser.password !== loginUser.password){
                    return res.status(401).json({
                        error: {
                            message: `Incorrect user_name or password`
                        }
                    })
                };
                const token = jwt.sign({ user_name }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                });
                res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true, sameSite: none });
                res.end();
            })
            .catch(next)
    })

module.exports = authRouter;