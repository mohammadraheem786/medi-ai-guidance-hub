
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Symptom = require('../models/Symptom');
const Condition = require('../models/Condition');
const HealthTip = require('../models/HealthTip');

// Load environment variables
dotenv.config();

// Sample data
const symptoms = [
  {
    name: 'Headache',
    description: 'Pain in any region of the head',
    bodyPart: 'head',
    severity: 'moderate'
  },
  {
    name: 'Fever',
    description: 'Elevated body temperature',
    bodyPart: 'body',
    severity: 'moderate'
  },
  {
    name: 'Cough',
    description: 'Sudden expulsion of air from the lungs',
    bodyPart: 'chest',
    severity: 'mild'
  },
  {
    name: 'Sore throat',
    description: 'Pain or irritation in the throat',
    bodyPart: 'throat',
    severity: 'mild'
  },
  {
    name: 'Fatigue',
    description: 'Extreme tiredness resulting from mental or physical exertion',
    bodyPart: 'body',
    severity: 'moderate'
  },
  {
    name: 'Shortness of breath',
    description: 'Difficulty breathing or catching your breath',
    bodyPart: 'chest',
    severity: 'severe'
  },
  {
    name: 'Chest pain',
    description: 'Pain or discomfort in the chest area',
    bodyPart: 'chest',
    severity: 'severe'
  },
  {
    name: 'Nausea',
    description: 'Discomfort in the stomach with an urge to vomit',
    bodyPart: 'stomach',
    severity: 'moderate'
  },
  {
    name: 'Vomiting',
    description: 'Forceful expulsion of stomach contents through the mouth',
    bodyPart: 'stomach',
    severity: 'moderate'
  },
  {
    name: 'Diarrhea',
    description: 'Loose, watery stools',
    bodyPart: 'stomach',
    severity: 'moderate'
  }
];

const conditions = [
  {
    name: 'Common Cold',
    symptoms: ['Headache', 'Cough', 'Sore throat', 'Fatigue'],
    description: 'A viral infectious disease of the upper respiratory tract that primarily affects the nose',
    severity: 'mild',
    recommendations: [
      'Rest and stay hydrated',
      'Use over-the-counter pain relievers',
      'Use a humidifier or take a hot shower to ease congestion'
    ]
  },
  {
    name: 'Influenza (Flu)',
    symptoms: ['Fever', 'Cough', 'Fatigue', 'Headache', 'Sore throat'],
    description: 'A contagious respiratory illness caused by influenza viruses',
    severity: 'moderate',
    recommendations: [
      'Rest and stay hydrated',
      'Take over-the-counter medications for symptom relief',
      'Seek medical attention if symptoms worsen',
      'Consider antiviral medications if diagnosed early'
    ]
  },
  {
    name: 'COVID-19',
    symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Headache'],
    description: 'A respiratory disease caused by the SARS-CoV-2 virus',
    severity: 'severe',
    recommendations: [
      'Isolate to prevent spreading the virus',
      'Rest and stay hydrated',
      'Monitor your symptoms carefully',
      'Seek medical attention if you have trouble breathing',
      'Follow local health department guidelines'
    ]
  },
  {
    name: 'Gastroenteritis',
    symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Fatigue'],
    description: 'Inflammation of the stomach and intestines, typically resulting from a bacterial or viral infection',
    severity: 'moderate',
    recommendations: [
      'Stay hydrated by drinking small sips of water or electrolyte solutions',
      'Rest to allow your body to recover',
      'Gradually reintroduce bland foods like rice, toast, and bananas',
      'Seek medical attention if symptoms persist or worsen'
    ]
  },
  {
    name: 'Migraine',
    symptoms: ['Headache'],
    description: 'A neurological condition that causes intense, debilitating headaches',
    severity: 'moderate',
    recommendations: [
      'Rest in a quiet, dark room',
      'Apply cold or warm compresses to your head or neck',
      'Take over-the-counter pain relievers',
      'Consider prescription medications if migraines are frequent'
    ]
  },
  {
    name: 'Angina',
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
    description: 'A type of chest pain caused by reduced blood flow to the heart muscles',
    severity: 'severe',
    recommendations: [
      'Seek immediate medical attention',
      'Take nitroglycerin if prescribed',
      'Sit down and rest',
      'Call emergency services if pain is severe or doesn\'t subside'
    ]
  }
];

const healthTips = [
  {
    title: 'Stay Hydrated',
    description: 'Drinking enough water each day is crucial for many reasons.',
    category: 'general',
    importance: 'high',
    tips: [
      'Aim to drink at least 8 glasses of water daily.',
      'Increase intake during hot weather or when exercising.',
      'Monitor your urine color - pale yellow indicates good hydration.'
    ],
    source: 'Medical consensus'
  },
  {
    title: 'Prioritize Sleep',
    description: 'Quality sleep is essential for physical health and emotional wellbeing.',
    category: 'general',
    importance: 'high',
    tips: [
      'Target 7-9 hours of sleep per night.',
      'Maintain a consistent sleep schedule.',
      'Create a restful environment - dark, quiet, and cool.'
    ],
    source: 'Sleep Foundation'
  },
  {
    title: 'Regular Exercise',
    description: 'Physical activity improves cardiovascular health and mental wellbeing.',
    category: 'fitness',
    importance: 'high',
    tips: [
      'Aim for at least 150 minutes of moderate-intensity activity each week.',
      'Include both cardio and strength training exercises.',
      'Find activities you enjoy to maintain consistency.'
    ],
    source: 'World Health Organization'
  },
  {
    title: 'Balanced Diet',
    description: 'A nutritious diet supports overall health and prevents disease.',
    category: 'nutrition',
    importance: 'high',
    tips: [
      'Eat plenty of fruits, vegetables, and whole grains.',
      'Limit processed foods, added sugars, and unhealthy fats.',
      'Practice portion control and mindful eating.'
    ],
    source: 'American Dietary Guidelines'
  },
  {
    title: 'Manage Stress',
    description: 'Chronic stress can contribute to numerous health problems.',
    category: 'mental',
    importance: 'medium',
    tips: [
      'Practice relaxation techniques like deep breathing or meditation.',
      'Maintain social connections and seek support when needed.',
      'Set realistic goals and boundaries in your personal and professional life.'
    ],
    source: 'American Psychological Association'
  },
  {
    title: 'Respiratory Health',
    description: 'Taking care of your lungs is essential for overall health.',
    category: 'respiratory',
    importance: 'medium',
    tips: [
      'Avoid smoking and exposure to secondhand smoke.',
      'Exercise regularly to improve lung capacity.',
      'Practice deep breathing exercises.'
    ],
    source: 'American Lung Association'
  },
  {
    title: 'Heart Health',
    description: 'Maintaining cardiovascular health is crucial for longevity.',
    category: 'cardiovascular',
    importance: 'high',
    tips: [
      'Maintain a healthy weight and blood pressure.',
      'Limit saturated fats and sodium in your diet.',
      'Stay physically active and avoid prolonged sitting.'
    ],
    source: 'American Heart Association'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing data
    await Symptom.deleteMany({});
    await Condition.deleteMany({});
    await HealthTip.deleteMany({});
    
    // Insert new data
    await Symptom.insertMany(symptoms);
    await Condition.insertMany(conditions);
    await HealthTip.insertMany(healthTips);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
