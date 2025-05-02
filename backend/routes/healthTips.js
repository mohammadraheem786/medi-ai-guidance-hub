
const express = require('express');
const router = express.Router();
const healthTipsController = require('../controllers/healthTipsController');

// @route   GET api/health-tips
// @desc    Get all health tips
// @access  Public
router.get('/', healthTipsController.getAllHealthTips);

// @route   GET api/health-tips/search
// @desc    Search health tips
// @access  Public
router.get('/search', healthTipsController.searchHealthTips);

// @route   GET api/health-tips/category/:category
// @desc    Get health tips by category
// @access  Public
router.get('/category/:category', healthTipsController.getHealthTipsByCategory);

module.exports = router;
