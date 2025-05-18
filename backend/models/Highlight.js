const mongoose = require('mongoose');

const HighlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 chars']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Highlight', HighlightSchema);