
const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  answers: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }],
  recommendations: [{
    type: String,
    required: true
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
