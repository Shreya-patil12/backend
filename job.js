// models/Job.js

const mongoose = require('mongoose');

// Define the schema for the Job collection
const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Internship', 'Full-time', 'Part-time'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  minCGPA: {
    type: Number,
    required: true
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  description: {
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
