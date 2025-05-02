
const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  symptoms: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: true
  },
  recommendations: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('Condition', ConditionSchema);
