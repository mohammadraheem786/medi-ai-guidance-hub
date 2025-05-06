
const Symptom = require('../models/Symptom');
const Condition = require('../models/Condition');

// Get all symptoms
exports.getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find().sort('name');
    res.json(symptoms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Analyze symptoms with personalized responses
exports.analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ message: 'Symptoms must be provided as an array' });
    }
    
    // Get detailed symptom information
    const symptomDetails = await Symptom.find({ name: { $in: symptoms } });
    
    // Get all conditions from database
    const conditions = await Condition.find();
    const matches = [];
    
    // Calculate matches with personalized advice
    for (const condition of conditions) {
      const matchingSymptoms = condition.symptoms.filter(symptom => 
        symptoms.includes(symptom)
      );
      
      const probability = matchingSymptoms.length / condition.symptoms.length;
      
      if (probability > 0) {
        // Create personalized recommendations for each matching symptom
        const personalizedRecommendations = [];
        const personalizedSymptomAdvice = {};
        
        // Add general recommendations
        personalizedRecommendations.push(...condition.recommendations);
        
        // Add specific advice for each symptom
        matchingSymptoms.forEach(symptomName => {
          // Find specific advice in the condition
          const specificAdvice = condition.specificSymptomAdvice?.find(
            advice => advice.symptom === symptomName
          );
          
          // Find detailed symptom info
          const symptomDetail = symptomDetails.find(s => s.name === symptomName);
          
          if (specificAdvice) {
            personalizedSymptomAdvice[symptomName] = specificAdvice.advice;
          } else if (symptomDetail?.personalizedAdvice) {
            personalizedSymptomAdvice[symptomName] = symptomDetail.personalizedAdvice;
          }
        });
        
        matches.push({
          condition: condition.name,
          probability: parseFloat((probability * 100).toFixed(1)),
          description: condition.description,
          severity: condition.severity,
          recommendations: personalizedRecommendations,
          symptomSpecificAdvice: personalizedSymptomAdvice,
          matchingSymptoms: matchingSymptoms
        });
      }
    }
    
    // Add individual symptom information
    const symptomInfo = {};
    for (const detail of symptomDetails) {
      symptomInfo[detail.name] = {
        description: detail.description,
        bodyPart: detail.bodyPart,
        severity: detail.severity,
        personalizedAdvice: detail.personalizedAdvice,
        possibleCauses: detail.possibleCauses,
        whenToSeekHelp: detail.whenToSeekHelp
      };
    }
    
    // Sort matches by probability (highest first)
    const sortedMatches = matches.sort((a, b) => b.probability - a.probability);
    
    res.json({
      conditions: sortedMatches,
      symptomDetails: symptomInfo
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get symptom by name
exports.getSymptomByName = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({ name: req.params.name });
    
    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }
    
    res.json(symptom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
