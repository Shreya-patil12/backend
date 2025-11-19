const express = require('express');
const routes = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// List all jobs (public)
routes.get('/', jobController.listJobs);

// Create job (recruiter only)
routes.post('/', authMiddleware, roleMiddleware('recruiter'), jobController.createJob);

// Update job (recruiter only, their own jobs)
routes.put('/:id', authMiddleware, roleMiddleware('recruiter'), jobController.updateJob);

// Delete job (recruiter only, their own jobs)
routes.delete('/:id', authMiddleware, roleMiddleware('recruiter'), jobController.deleteJob);

module.exports = routes;


