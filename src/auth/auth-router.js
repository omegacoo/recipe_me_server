const express = require('express');
const AuthService = require('./auth-service');
const jwt = require('jsonwebtoken');

const jwtKey = 'u%3FgDR8&ljLnvYDluy5%T2Yd_##C#';
const jwtExpirySeconds = 900;

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
                res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
                res.end();
            })
            .catch(next)
    })

authRouter
    .post('/refresh', (req, res, next) => {
        const toke = req.cookies.token;

        if(!token){
            return res.status(401).end()
        };

        let payload;
        try{
            payload = jwt.verify(token, jwtKey);
        } catch(e){
            if(e instanceof jwt.JsonWebTokenError){
                return res.status(401).end()
            };
            return res.status(400).end()
        };
        const nowUnixSeconds = Math.round(Number(new Date()) / 1000);

        if(payload.exp - nowUnixSeconds > 30){
            return res.status(400).end()
        };

        const newToken = jwt.sign({ username: payload.username }, jwtKey, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
        });

        res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 });
        res.end();
    })


module.exports = authRouter;