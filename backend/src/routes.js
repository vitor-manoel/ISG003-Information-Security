const express = require('express');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/register', UserController.create);

module.exports = routes;