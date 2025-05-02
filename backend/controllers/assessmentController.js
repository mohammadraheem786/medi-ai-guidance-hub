
const Assessment = require('../models/Assessment');

// Submit an assessment
exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers must be provided as an array' });
    }
    
    // Calculate severity score based on answers
    let severityScore = 0;
    let maxPossibleScore = 0;
    
    for (const answer of answers) {
      if (answer.value !== undefined) {
        severityScore += answer.value;
        maxPossibleScore += 3; // Assuming max value is 3 per question
      }
    }
    
    // Convert to percentage
    const severityPercentage = (severityScore / maxPossibleScore) * 100;
    
    // Determine severity level
    let severityLevel;
    let recommendation;
    let recommendations = [];
    
    if (severityPercentage >= 70) {
      severityLevel = 'high';
      recommendation = 'Seek immediate medical attention.';
      recommendations = [
        'Visit an emergency room or urgent care facility as soon as possible.',
        'Contact your primary care physician to inform them of your condition.',
        'Arrange for someone to accompany you to the medical facility if possible.',
        'Bring a list of your current medications and medical history.'
      ];
    } else if (severityPercentage >= 40) {
      severityLevel = 'medium';
      recommendation = 'Consult with a healthcare provider within 24-48 hours.';
      recommendations = [
        'Schedule an appointment with your doctor within the next 1-2 days.',
        'Monitor your symptoms and note any changes or worsening.',
        'Rest and avoid strenuous activities until you consult with a healthcare professional.',
        'Stay hydrated and follow general self-care practices.'
      ];
    } else {
      severityLevel = 'low';
      recommendation = 'Monitor your symptoms. Rest and stay hydrated.';
      recommendations = [
        'Get plenty of rest and allow your body to recover.',
        'Stay hydrated by drinking water and clear fluids.',
        'Take over-the-counter medications as appropriate for symptom relief.',
        'If symptoms persist for more than a week or worsen, consult with a healthcare provider.'
      ];
    }
    
    // Create assessment record
    const assessment = new Assessment({
      user: req.user.id,
      title: 'Health Assessment',
      description: `Based on your responses, your condition is of ${severityLevel} severity.`,
      severity: severityLevel,
      score: Math.round(severityPercentage),
      answers,
      recommendations: [recommendation, ...recommendations]
    });
    
    await assessment.save();
    
    // Generate results for response
    const results = [
      {
        title: 'Severity Assessment',
        description: `Based on your responses, your condition is of ${severityLevel} severity.`,
        severity: severityLevel,
        recommendation,
        recommendations
      }
    ];
    
    res.json({
      severityPercentage: Math.round(severityPercentage),
      results,
      assessmentId: assessment._id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user's assessment history
exports.getUserAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id })
      .sort({ created: -1 });
    
    res.json(assessments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get assessment by ID
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    // Check if assessment belongs to user
    if (assessment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this assessment' });
    }
    
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.status(500).send('Server error');
  }
};
