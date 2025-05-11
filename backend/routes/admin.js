
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All routes in this file require authentication and admin role
router.use(auth);
router.use(adminAuth);

// User management
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserById);
router.get('/users/:id/activities', adminController.getUserActivities);
router.put('/users/:id/toggle-status', adminController.toggleUserStatus);

// Doctor management
router.get('/doctors', adminController.getDoctors);
router.post('/doctors', adminController.addDoctor);
router.put('/doctors/:id', adminController.updateDoctor);
router.delete('/doctors/:id', adminController.deleteDoctor);

// Announcement management
router.get('/announcements', adminController.getAnnouncements);
router.post('/announcements', adminController.createAnnouncement);
router.delete('/announcements/:id', adminController.deleteAnnouncement);

// Content management
router.put('/symptoms/:id', adminController.updateSymptom);
router.put('/conditions/:id', adminController.updateCondition);

// Analytics
router.get('/analytics', adminController.getAnalytics);

module.exports = router;
