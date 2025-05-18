const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Please add a degree name'],
    trim: true,
    maxlength: [100, 'Degree cannot be more than 100 characters']
  },
  institution: {
    type: String,
    required: [true, 'Please add an institution name'],
    trim: true,
    maxlength: [200, 'Institution cannot be more than 200 characters']
  },
  year: {
    type: String,
    required: [true, 'Please add the year'],
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Please add the grade'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Education', EducationSchema);