// const Highlight = require('../models/Highlight');

// // @desc    Get all highlights
// // @route   GET /api/v1/highlights
// // @access  Public
// exports.getHighlights = async (req, res, next) => {
//   try {
//     const highlights = await Highlight.find().sort('order');
//     res.status(200).json({ success: true, data: highlights });
//   } catch (err) {
//     res.status(400).json({ success: false });
//   }
// };
const Highlight = require('../models/Highlight');

// @desc    Get all highlights
// @route   GET /api/v1/highlights
// @access  Public
exports.getHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find().sort('order');
    res.status(200).json({ success: true, data: highlights });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get single highlight
// @route   GET /api/v1/highlights/:id
// @access  Public
exports.getHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    if (!highlight) {
      return res.status(404).json({ success: false, message: 'Highlight not found' });
    }
    res.status(200).json({ success: true, data: highlight });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Create new highlight
// @route   POST /api/v1/highlights
// @access  Public/Admin
exports.createHighlight = async (req, res) => {
  try {
    const newHighlight = await Highlight.create(req.body);
    res.status(201).json({ success: true, data: newHighlight });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update highlight
// @route   PUT /api/v1/highlights/:id
// @access  Public/Admin
exports.updateHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!highlight) {
      return res.status(404).json({ success: false, message: 'Highlight not found' });
    }

    res.status(200).json({ success: true, data: highlight });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete highlight
// @route   DELETE /api/v1/highlights/:id
// @access  Public/Admin
exports.deleteHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndDelete(req.params.id);
    if (!highlight) {
      return res.status(404).json({ success: false, message: 'Highlight not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
