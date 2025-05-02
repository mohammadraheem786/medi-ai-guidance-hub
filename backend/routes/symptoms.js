
const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');
const auth = require('../middleware/auth');

// @route   GET api/symptoms
// @desc    Get all symptoms
// @access  Public
router.get('/', symptomController.getAllSymptoms);

// @route   POST api/symptoms/analyze
// @desc    Analyze symptoms and get possible conditions
// @access  Private
router.post('/analyze', auth, symptomController.analyzeSymptoms);

// @route   GET api/symptoms/:name
// @desc    Get symptom by name
// @access  Public
router.get('/:name', symptomController.getSymptomByName);

module.exports = router;
