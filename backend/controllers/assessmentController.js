
// Controller for health assessments
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
    
    if (severityPercentage >= 70) {
      severityLevel = 'high';
      recommendation = 'Seek immediate medical attention.';
    } else if (severityPercentage >= 40) {
      severityLevel = 'medium';
      recommendation = 'Consult with a healthcare provider within 24-48 hours.';
    } else {
      severityLevel = 'low';
      recommendation = 'Monitor your symptoms. Rest and stay hydrated.';
    }
    
    // Generate results
    const results = [
      {
        title: 'Severity Assessment',
        description: `Based on your responses, your condition is of ${severityLevel} severity.`,
        severity: severityLevel,
        recommendation: recommendation
      }
    ];
    
    res.json({
      severityPercentage: Math.round(severityPercentage),
      results
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
