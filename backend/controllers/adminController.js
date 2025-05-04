
const User = require('../models/User');
const Doctor = require('../models/Doctor');

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

// Get user activity logs (placeholder)
exports.getUserActivities = async (req, res) => {
  try {
    // This is a placeholder - in a real application, you would have a separate model for activities
    res.json([
      { userId: req.params.id, activity: 'symptom-check', timestamp: new Date() },
      { userId: req.params.id, activity: 'assessment', timestamp: new Date() }
    ]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
