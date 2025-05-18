const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  projectPhotoUpload
} = require('../controllers/projectController');

const router = express.Router();

// Remove or comment out this line:
// const reviewRouter = require('./reviews');
// router.use('/:projectId/reviews', reviewRouter);

router
  .route('/')
  .get(getProjects)
  .post(createProject);

router
  .route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

router
  .route('/:id/photo')
  .put(projectPhotoUpload);

module.exports = router;