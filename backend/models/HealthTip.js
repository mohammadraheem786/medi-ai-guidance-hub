
const mongoose = require('mongoose');

const HealthTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  importance: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  tips: [{
    type: String,
    required: true
  }],
  source: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('HealthTip', HealthTipSchema);
