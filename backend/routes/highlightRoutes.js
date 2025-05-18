// const express = require('express');
// const { getHighlights } = require('../controllers/highlights');

// const router = express.Router();

// router.route('/').get(getHighlights);

// module.exports = router;
// routes/highlightRoutes.js
const express = require('express');
const {
  getHighlights,
  getHighlight,
  createHighlight,
  updateHighlight,
  deleteHighlight,
} = require('../controllers/highlights');

const router = express.Router();

router.route('/')
  .get(getHighlights)
  .post(createHighlight);

router.route('/:id')
  .get(getHighlight)
  .put(updateHighlight)
  .delete(deleteHighlight);

module.exports = router;
