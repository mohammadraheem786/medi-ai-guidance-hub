
const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const auth = require('../middleware/auth');

// @route   POST api/assessments
// @desc    Submit an assessment and get results
// @access  Private
router.post('/', auth, assessmentController.submitAssessment);

module.exports = router;
