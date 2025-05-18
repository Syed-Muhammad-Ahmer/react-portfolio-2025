const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL'],
    trim: true
  },
  projectUrl: {
    type: String,
    trim: true
  },
  technologies: {
    type: [String],
    required: [true, 'Please add at least one technology']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);