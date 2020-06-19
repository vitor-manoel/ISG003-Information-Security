const express = require('express');

const UserController = require('./controllers/UserController');
const TokenController = require('./controllers/TokenController');

const routes = express.Router();

routes.post('/register', UserController.create);
routes.get('/userMail/:hexMail', UserController.userMail);

routes.post('/sendToken', TokenController.create);

module.exports = routes;