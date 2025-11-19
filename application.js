const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicantName: String,
  applicantEmail: String,
  resumeUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
