const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Student applies to job
router.post('/apply', authMiddleware, roleMiddleware('student'), applicationController.applyToJob);

// Recruiter views applications for a job
router.get('/job/:jobId', authMiddleware, roleMiddleware('recruiter'), applicationController.getApplicationsForJob);

// Student views applied jobs
router.get('/my-applications', authMiddleware, roleMiddleware('student'), applicationController.getAppliedJobsForStudent);

module.exports = router;
