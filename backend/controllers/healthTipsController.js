
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
