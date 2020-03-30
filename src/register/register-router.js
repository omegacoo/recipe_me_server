const express = require('express');
const bcrypt = require('bcryptjs');

const RegisterService = require('./register-service');

const registerRouter = express.Router();
const bodyParser = express.json();

registerRouter
    .route('/')
    .post(bodyParser, (req, res, next) => {
        let { user_name, password, email } = req.body;
        password = bcrypt.hashSync(password, process.env.BCRYPT_SALT);
        const newUser = { user_name, password, email };

        RegisterService.checkIfUserNameOrEmailUsedAlready(
            req.app.get('db'),
            newUser
        )
            .then(response => {
                if(response.length > 0){
                    res.status(400).json({
                        error: {
                            message: `Username or email is already in use`
                        }
                    });
                    console.log('here');
                    return
                };
                RegisterService.registerNewUser(
                    req.app.get('db'),
                    newUser
                )
                    .then(regRes => {
                        res.json(regRes)
                    })
            })
            .catch(next)
    })

module.exports = registerRouter;