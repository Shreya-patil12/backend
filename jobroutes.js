const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// List all jobs (public)
router.get('/', jobController.listJobs);

// Create job (recruiter only)
router.post('/', authMiddleware, roleMiddleware('recruiter'), jobController.createJob);

// Update job (recruiter only, their own jobs)
router.put('/:id', authMiddleware, roleMiddleware('recruiter'), jobController.updateJob);

// Delete job (recruiter only, their own jobs)
router.delete('/:id', authMiddleware, roleMiddleware('recruiter'), jobController.deleteJob);

module.exports = router;
