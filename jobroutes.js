const express = require('express');
const routes = express.Router();

const jobController = require('./jobcontroller');

routes.post('/', jobController.createJob);
routes.get('/', jobController.getAllJobs);
routes.get('/:id', jobController.getJobById);
routes.put('/:id', jobController.updateJob);
routes.delete('/:id', jobController.deleteJob);

module.exports = routes;
