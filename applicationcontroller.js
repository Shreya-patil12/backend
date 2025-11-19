const Application = require('../models/Application');

// 1. Student applies to Job
exports.applyToJob = async (req, res) => {
  try {
    const studentId = req.user.id; // From auth middleware (JWT)
    const { jobId, resumeUrl } = req.body;

    // Check if already applied (optional)
    const existingApp = await Application.findOne({ student: studentId, job: jobId });
    if (existingApp) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = new Application({
      student: studentId,
      job: jobId,
      resumeUrl
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Recruiter views applications for a given job
exports.getApplicationsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const applications = await Application.find({ job: jobId })
      .populate('student', 'name email') // Populate student info
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Student views jobs they applied to
exports.getAppliedJobsForStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications = await Application.find({ student: studentId })
      .populate('job') // Populate full job details
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
