const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salary: Number,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
