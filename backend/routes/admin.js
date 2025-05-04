
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All routes in this file require authentication and admin role
router.use(auth);
router.use(adminAuth);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Admin
router.get('/users', adminController.getUsers);

// @route   GET api/admin/users/:id
// @desc    Get user by ID
// @access  Admin
router.get('/users/:id', adminController.getUserById);

// @route   GET api/admin/users/:id/activities
// @desc    Get user activities
// @access  Admin
router.get('/users/:id/activities', adminController.getUserActivities);

// @route   GET api/admin/doctors
// @desc    Get all doctors
// @access  Admin
router.get('/doctors', adminController.getDoctors);

// @route   POST api/admin/doctors
// @desc    Add a doctor
// @access  Admin
router.post('/doctors', adminController.addDoctor);

// @route   PUT api/admin/doctors/:id
// @desc    Update a doctor
// @access  Admin
router.put('/doctors/:id', adminController.updateDoctor);

// @route   DELETE api/admin/doctors/:id
// @desc    Delete a doctor
// @access  Admin
router.delete('/doctors/:id', adminController.deleteDoctor);

module.exports = router;
