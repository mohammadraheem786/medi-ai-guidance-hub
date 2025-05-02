
const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  bodyPart: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: true
  }
});

module.exports = mongoose.model('Symptom', SymptomSchema);
