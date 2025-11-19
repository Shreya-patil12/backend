const express = require('express');
const routes = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Student applies to job
routes.post('/apply', authMiddleware, roleMiddleware('student'), applicationController.applyToJob);

// Recruiter views applications for a job
routes.get('/job/:jobId', authMiddleware, roleMiddleware('recruiter'), applicationController.getApplicationsForJob);

// Student views applied jobs
routes.get('/my-applications', authMiddleware, roleMiddleware('student'), applicationController.getAppliedJobsForStudent);

module.exports = routes;


