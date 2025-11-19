const express = require('express');
const routes = express.Router();  // Corrected from 'Routes()' to 'Router()'

const authController = require('./authcontroller');



// Register new user
routes.post('/register', authController.register);

// Login user
routes.post('/login', authController.login);

module.exports = routes;


