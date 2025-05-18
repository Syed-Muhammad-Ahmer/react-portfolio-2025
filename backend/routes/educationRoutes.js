const express = require('express');
const educationController = require('../controllers/educationController');

const router = express.Router();

router
  .route('/')
  .get(educationController.getEducation)
  .post(educationController.createEducation);

router
  .route('/:id')
  .put(educationController.updateEducation)
  .delete(educationController.deleteEducation);

module.exports = router;