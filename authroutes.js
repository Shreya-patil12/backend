const express = require('express');
const routes = express.Routes();
const authController = require('../controllers/authController');

// Register new user
routes.post('/register', authController.register);

// Login user
routes.post('/login', authController.login);

module.exports = routes;
