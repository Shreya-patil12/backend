const Job = require('../models/Job');

// 1. Create a new Job (Recruiter only)
exports.createJob = async (req, res) => {
  try {
    const { company, role, type, location, minCGPA, requiredSkills, description } = req.body;
    const postedBy = req.user.id; // From auth middleware (JWT decoded user)

    const newJob = new Job({
      company,
      role,
      type,
      location,
      minCGPA,
      requiredSkills, // Expected as array of strings
      description,
      postedBy
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. List all Jobs (Students & Recruiters)
exports.listJobs = async (req, res) => {
  try {
    // Optionally implement filters here using query params
    const { search, type } = req.query;
    let filters = {};

    if (type) filters.type = type;
    if (search) {
      filters.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(filters).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Update a Job (Recruiter only, their own jobs)
exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.user.id;
    const updateData = req.body;

    // Find job and confirm recruiter owns it
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== recruiterId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(job, updateData); // Update fields
    await job.save();
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Delete a Job (Recruiter only, their own jobs)
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== recruiterId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await job.remove();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
