
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Symptom = require('../models/Symptom');
const Condition = require('../models/Condition');
const HealthTip = require('../models/HealthTip');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Sample data for seeding the database
const symptoms = [
  {
    name: 'Headache',
    description: 'Pain in the head or upper neck',
    bodyPart: 'head',
    severity: 'mild',
  },
  {
    name: 'Fever',
    description: 'Elevated body temperature',
    bodyPart: 'whole body',
    severity: 'moderate',
  },
  {
    name: 'Cough',
    description: 'Reflex action to clear throat or airways',
    bodyPart: 'respiratory',
    severity: 'mild',
  },
  {
    name: 'Fatigue',
    description: 'Feeling of tiredness or exhaustion',
    bodyPart: 'whole body',
    severity: 'mild',
  },
  {
    name: 'Sore throat',
    description: 'Pain or irritation in the throat',
    bodyPart: 'throat',
    severity: 'mild',
  },
  {
    name: 'Chest pain',
    description: 'Pain or discomfort in the chest',
    bodyPart: 'chest',
    severity: 'severe',
  },
  {
    name: 'Shortness of breath',
    description: 'Difficulty breathing or catching breath',
    bodyPart: 'respiratory',
    severity: 'severe',
  },
  {
    name: 'Nausea',
    description: 'Feeling of sickness with an inclination to vomit',
    bodyPart: 'stomach',
    severity: 'moderate',
  },
  {
    name: 'Abdominal pain',
    description: 'Pain felt anywhere between chest and groin',
    bodyPart: 'abdomen',
    severity: 'moderate',
  },
  {
    name: 'Dizziness',
    description: 'Feeling faint, woozy, or unbalanced',
    bodyPart: 'head',
    severity: 'moderate',
  },
];

const conditions = [
  {
    name: 'Common Cold',
    symptoms: ['Headache', 'Cough', 'Sore throat', 'Fever'],
    description: 'A viral infection of the upper respiratory tract that primarily affects the nose and throat.',
    severity: 'mild',
    recommendations: [
      'Rest and stay hydrated',
      'Use over-the-counter cold medications',
      'Use a humidifier',
      'Consult a doctor if symptoms persist beyond 7-10 days'
    ],
  },
  {
    name: 'Influenza',
    symptoms: ['Fever', 'Cough', 'Fatigue', 'Headache'],
    description: 'A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs.',
    severity: 'moderate',
    recommendations: [
      'Rest and stay hydrated',
      'Take fever-reducing medication',
      'Use antiviral medication if prescribed',
      'Seek medical attention if symptoms are severe or you\'re in a high-risk group'
    ],
  },
  {
    name: 'COVID-19',
    symptoms: ['Fever', 'Cough', 'Fatigue', 'Shortness of breath'],
    description: 'A respiratory disease caused by the SARS-CoV-2 virus.',
    severity: 'severe',
    recommendations: [
      'Isolate to prevent spreading',
      'Rest and stay hydrated',
      'Monitor oxygen levels if possible',
      'Seek immediate medical attention if experiencing severe symptoms'
    ],
  },
  {
    name: 'Migraine',
    symptoms: ['Headache', 'Nausea', 'Dizziness'],
    description: 'A type of headache characterized by severe pain, usually on one side of the head, often accompanied by nausea and sensitivity to light and sound.',
    severity: 'moderate',
    recommendations: [
      'Rest in a quiet, dark room',
      'Apply cold compresses to your forehead or neck',
      'Take pain relievers as recommended',
      'Consider preventative medications if migraines are frequent'
    ],
  },
  {
    name: 'Gastroenteritis',
    symptoms: ['Nausea', 'Abdominal pain', 'Fever', 'Fatigue'],
    description: 'An intestinal infection marked by diarrhea, cramps, nausea, vomiting, and fever.',
    severity: 'moderate',
    recommendations: [
      'Stay hydrated with clear fluids',
      'Ease back into eating with bland foods',
      'Avoid dairy, caffeine, and fatty foods',
      'See a doctor if symptoms persist beyond a few days or if there are signs of dehydration'
    ],
  },
  {
    name: 'Heart Attack',
    symptoms: ['Chest pain', 'Shortness of breath', 'Dizziness', 'Fatigue'],
    description: 'A blockage of blood flow to the heart muscle that can damage or destroy part of the heart muscle.',
    severity: 'severe',
    recommendations: [
      'Call emergency services immediately',
      'Chew an aspirin if advised',
      'Rest in a position that eases breathing',
      'Seek immediate medical attention - this is a life-threatening emergency'
    ],
  },
];

const healthTips = [
  {
    title: 'Stay Hydrated',
    description: 'Water is essential for your body to function properly.',
    category: 'General Wellness',
    importance: 'high',
    tips: [
      'Aim for 8 glasses (about 2 liters) of water per day.',
      'Increase intake during hot weather or when exercising.',
      'Watch for signs of dehydration: dark urine, dry mouth, fatigue, dizziness.',
      'Herbal teas and water-rich fruits contribute to daily fluid intake.'
    ],
    source: 'Mayo Clinic'
  },
  {
    title: 'Sleep Hygiene',
    description: 'Quality sleep is vital for physical and mental health.',
    category: 'General Wellness',
    importance: 'high',
    tips: [
      'Aim for 7-9 hours of sleep per night.',
      'Maintain a consistent sleep schedule, even on weekends.',
      'Create a restful environment: dark, quiet, and cool.',
      'Avoid screens, caffeine, and large meals before bedtime.'
    ],
    source: 'Sleep Foundation'
  },
  {
    title: 'Regular Exercise',
    description: 'Physical activity is crucial for maintaining good health.',
    category: 'General Wellness',
    importance: 'high',
    tips: [
      'Aim for at least 150 minutes of moderate activity weekly.',
      'Include both cardio and strength training exercises.',
      'Find activities you enjoy to stay motivated.',
      'Even short bursts of activity throughout the day are beneficial.'
    ],
    source: 'American Heart Association'
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Symptom.deleteMany();
    await Condition.deleteMany();
    await HealthTip.deleteMany();
    
    console.log('Database cleared');
    
    // Insert new data
    await Symptom.insertMany(symptoms);
    await Condition.insertMany(conditions);
    await HealthTip.insertMany(healthTips);
    
    console.log('Database seeded successfully');
    
    // Create admin user if it doesn't exist
    const adminEmail = 'admin@mediai.com';
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      adminUser = new User({
        name: 'Admin User',
        email: adminEmail,
        password: 'Password123!' // This will be hashed by the pre-save hook
      });
      
      await adminUser.save();
      console.log('Admin user created');
    }
    
    mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

seedDatabase();
