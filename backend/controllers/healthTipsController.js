
const HealthTip = require('../models/HealthTip');

// Get all health tips
exports.getAllHealthTips = async (req, res) => {
  try {
    const healthTips = await HealthTip.find().sort('title');
    res.json(healthTips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get health tips by category
exports.getHealthTipsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const healthTips = await HealthTip.find({ category }).sort('title');
    
    if (healthTips.length === 0) {
      return res.status(404).json({ message: 'No health tips found for this category' });
    }
    
    res.json(healthTips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Search health tips
exports.searchHealthTips = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const healthTips = await HealthTip.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tips: { $elemMatch: { $regex: query, $options: 'i' } } }
      ]
    }).sort('title');
    
    res.json(healthTips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get personalized health tips based on user's assessment history
exports.getPersonalizedHealthTips = async (req, res) => {
  try {
    // This endpoint would typically analyze the user's assessment history and condition matches
    // to provide personalized health tips. For now, we'll return a placeholder response.
    
    const personalizedTips = [
      {
        title: "Stay Hydrated",
        description: "Drinking enough water each day is crucial for many reasons.",
        tips: [
          "Aim to drink at least 8 glasses of water daily.",
          "Increase intake during hot weather or when exercising.",
          "Monitor your urine color - pale yellow indicates good hydration."
        ],
        importance: "high",
        category: "general",
        source: "Medical consensus"
      },
      {
        title: "Prioritize Sleep",
        description: "Quality sleep is essential for physical health and emotional wellbeing.",
        tips: [
          "Target 7-9 hours of sleep per night.",
          "Maintain a consistent sleep schedule.",
          "Create a restful environment - dark, quiet, and cool."
        ],
        importance: "high",
        category: "general",
        source: "Sleep Foundation"
      }
    ];
    
    res.json(personalizedTips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
