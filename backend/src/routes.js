const express = require('express');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const TokenController = require('./controllers/TokenController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.post('/register', UserController.create);
routes.post('/recoveryPassword', UserController.recoveryPass);
routes.get('/userMail/:hexMail', UserController.userMail);

routes.post('/sendToken', TokenController.create);
routes.post('/checkToken', TokenController.checkToken);
routes.get('/token/:mail', TokenController.tokenAttemps);

module.exports = routes;