
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Announcement = require('../models/Announcement');
const Symptom = require('../models/Symptom');
const Condition = require('../models/Condition');
const ActivityLog = require('../models/ActivityLog');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server error');
  }
};

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add doctor
exports.addDoctor = async (req, res) => {
  try {
    const { name, specialization, district, availability, experience, imageUrl } = req.body;
    
    const doctor = new Doctor({
      name,
      specialization,
      district,
      availability,
      experience,
      imageUrl
    });
    
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { name, specialization, district, availability, experience, imageUrl } = req.body;
    
    // Find doctor by id and update
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Update fields
    doctor.name = name;
    doctor.specialization = specialization;
    doctor.district = district;
    doctor.availability = availability;
    doctor.experience = experience;
    if (imageUrl) doctor.imageUrl = imageUrl;
    
    await doctor.save();
    
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(500).send('Server error');
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    await doctor.deleteOne();
    
    res.json({ message: 'Doctor removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(500).send('Server error');
  }
};

// Activate/deactivate user
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isActive = !user.isActive;
    await user.save();
    
    res.json({ 
      id: user._id, 
      isActive: user.isActive,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, importance, expiresAt } = req.body;
    
    const announcement = new Announcement({
      title,
      content,
      importance,
      expiresAt: expiresAt || null,
      createdBy: req.user.id
    });
    
    const savedAnnouncement = await announcement.save();
    res.status(201).json(savedAnnouncement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    await announcement.deleteOne();
    
    res.json({ message: 'Announcement removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(500).send('Server error');
  }
};

// Update symptom
exports.updateSymptom = async (req, res) => {
  try {
    const { name, description, bodyPart, severity, personalizedAdvice, possibleCauses, whenToSeekHelp } = req.body;
    
    const symptom = await Symptom.findById(req.params.id);
    
    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }
    
    // Update fields
    if (name) symptom.name = name;
    if (description) symptom.description = description;
    if (bodyPart) symptom.bodyPart = bodyPart;
    if (severity) symptom.severity = severity;
    if (personalizedAdvice) symptom.personalizedAdvice = personalizedAdvice;
    if (possibleCauses) symptom.possibleCauses = possibleCauses;
    if (whenToSeekHelp) symptom.whenToSeekHelp = whenToSeekHelp;
    
    await symptom.save();
    
    res.json(symptom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update condition
exports.updateCondition = async (req, res) => {
  try {
    const { name, symptoms, description, severity, recommendations, specificSymptomAdvice } = req.body;
    
    const condition = await Condition.findById(req.params.id);
    
    if (!condition) {
      return res.status(404).json({ message: 'Condition not found' });
    }
    
    // Update fields
    if (name) condition.name = name;
    if (symptoms) condition.symptoms = symptoms;
    if (description) condition.description = description;
    if (severity) condition.severity = severity;
    if (recommendations) condition.recommendations = recommendations;
    if (specificSymptomAdvice) condition.specificSymptomAdvice = specificSymptomAdvice;
    
    await condition.save();
    
    res.json(condition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user activity logs (actual implementation)
exports.getUserActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find({ userId: req.params.id })
      .sort({ timestamp: -1 })
      .limit(100);
    
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get admin analytics (dashboard stats)
exports.getAnalytics = async (req, res) => {
  try {
    // Get counts
    const [
      totalUsers, 
      activeUsers, 
      inactiveUsers, 
      totalDoctors,
      totalSymptoms,
      totalConditions,
      recentActivities
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'user', isActive: true }),
      User.countDocuments({ role: 'user', isActive: false }),
      Doctor.countDocuments(),
      Symptom.countDocuments(),
      Condition.countDocuments(),
      ActivityLog.find().sort({ timestamp: -1 }).limit(10)
    ]);

    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalDoctors,
      totalSymptoms,
      totalConditions,
      userStatus: {
        active: activeUsers,
        inactive: inactiveUsers
      },
      recentActivities
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
