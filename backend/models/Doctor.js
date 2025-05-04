
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: '/placeholder.svg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
