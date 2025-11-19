const express = require('express');
const routes = express.Router();
const applicationController = require('./applicationcontroller');

routes.post('/', applicationController.createApplication);
routes.get('/', applicationController.getAllApplications);

module.exports = routes;
