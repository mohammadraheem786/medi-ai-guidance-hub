
const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const auth = require('../middleware/auth');

// @route   POST api/assessments
// @desc    Submit an assessment and get results
// @access  Private
router.post('/', auth, assessmentController.submitAssessment);

// @route   GET api/assessments
// @desc    Get user's assessment history
// @access  Private
router.get('/', auth, assessmentController.getUserAssessments);

// @route   GET api/assessments/:id
// @desc    Get assessment by ID
// @access  Private
router.get('/:id', auth, assessmentController.getAssessmentById);

module.exports = router;
