const Education = require('../models/Education');

// @desc    Get all education entries
// @route   GET /api/v1/education
// @access  Public
exports.getEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: education.length, data: education });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new education entry
// @route   POST /api/v1/education
// @access  Private (you'll need to add authentication later)
exports.createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update education entry
// @route   PUT /api/v1/education/:id
// @access  Private
exports.updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!education) {
      return res.status(404).json({ success: false, error: 'Education entry not found' });
    }

    res.status(200).json({ success: true, data: education });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete education entry
// @route   DELETE /api/v1/education/:id
// @access  Private
exports.deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({ success: false, error: 'Education entry not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};