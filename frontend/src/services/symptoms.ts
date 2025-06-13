export interface Symptom {
  id: string;
  name: string;
  description: string;
  bodyPart: string;
  severity: 'mild' | 'moderate' | 'severe';
  personalizedAdvice?: string;
  possibleCauses?: string[];
  whenToSeekHelp?: string;
}

export interface SymptomMatch {
  condition: string;
  probability: number;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  symptomSpecificAdvice?: Record<string, string>;
  matchingSymptoms?: string[];
}

export interface AnalysisResult {
  conditions: SymptomMatch[];
  symptomDetails: Record<string, Symptom>;
}

// Mock symptom database
const symptomDatabase: Symptom[] = [
  {
    id: '1',
    name: 'Headache',
    description: 'Pain in the head or upper neck',
    bodyPart: 'head',
    severity: 'mild',
    personalizedAdvice: 'For headaches, try resting in a dark room and staying hydrated. Apply a cold compress to your forehead or neck.',
    possibleCauses: ['Stress', 'Dehydration', 'Lack of sleep', 'Eye strain'],
    whenToSeekHelp: 'Seek medical attention if your headache is severe, comes on suddenly, or is accompanied by fever, stiff neck, confusion, seizures, double vision, weakness, numbness or difficulty speaking.'
  },
  {
    id: '2',
    name: 'Fever',
    description: 'Elevated body temperature',
    bodyPart: 'whole body',
    severity: 'moderate',
    personalizedAdvice: 'Stay hydrated and get plenty of rest. Take over-the-counter fever reducers as directed. Use a lukewarm compress if the fever is high.',
    possibleCauses: ['Infection', 'Inflammatory conditions', 'Medication reactions'],
    whenToSeekHelp: 'Seek immediate medical attention if fever is above 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe symptoms.'
  },
  {
    id: '3',
    name: 'Cough',
    description: 'Reflex action to clear throat or airways',
    bodyPart: 'respiratory',
    severity: 'mild',
  },
  {
    id: '4',
    name: 'Fatigue',
    description: 'Feeling of tiredness or exhaustion',
    bodyPart: 'whole body',
    severity: 'mild',
  },
  {
    id: '5',
    name: 'Sore throat',
    description: 'Pain or irritation in the throat',
    bodyPart: 'throat',
    severity: 'mild',
  },
  {
    id: '6',
    name: 'Chest pain',
    description: 'Pain or discomfort in the chest',
    bodyPart: 'chest',
    severity: 'severe',
  },
  {
    id: '7',
    name: 'Shortness of breath',
    description: 'Difficulty breathing or catching breath',
    bodyPart: 'respiratory',
    severity: 'severe',
  },
  {
    id: '8',
    name: 'Nausea',
    description: 'Feeling of sickness with an inclination to vomit',
    bodyPart: 'stomach',
    severity: 'moderate',
  },
  {
    id: '9',
    name: 'Abdominal pain',
    description: 'Pain felt anywhere between chest and groin',
    bodyPart: 'abdomen',
    severity: 'moderate',
  },
  {
    id: '10',
    name: 'Dizziness',
    description: 'Feeling faint, woozy, or unbalanced',
    bodyPart: 'head',
    severity: 'moderate',
  },
];

// Mock condition database with symptom-specific advice
const conditionDatabase = [
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
    symptomSpecificAdvice: {
      'Headache': 'For cold-related headaches, try a warm compress on your sinuses and stay hydrated.',
      'Cough': 'Use honey and lemon in warm water to soothe your throat and reduce coughing (not for children under 1 year).',
      'Sore throat': 'Gargle with salt water and drink warm liquids to relieve sore throat pain from a cold.',
      'Fever': 'A low-grade fever with a cold usually doesn\'t require specific treatment beyond rest and fluids.'
    }
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
    symptomSpecificAdvice: {
      'Fever': 'Influenza fevers can be high - take acetaminophen or ibuprofen as directed and use cooling methods if needed.',
      'Cough': 'For flu-related cough, use a humidifier and consider cough suppressants at night to help with sleep.',
      'Fatigue': 'The extreme fatigue with influenza requires extra rest - don\'t rush back to normal activities.',
      'Headache': 'Flu headaches can be intense - use pain relievers and consider a cool, dark room to rest in.'
    }
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
    symptomSpecificAdvice: {
      'Fever': 'COVID-19 fevers can be high - take acetaminophen or ibuprofen as directed and use cooling methods if needed.',
      'Cough': 'For COVID-19 cough, use a humidifier and consider cough suppressants at night to help with sleep.',
      'Fatigue': 'The extreme fatigue with COVID-19 requires extra rest - don\'t rush back to normal activities.',
      'Shortness of breath': 'COVID-19 shortness of breath can be severe - use oxygen therapy if needed.'
    }
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
    symptomSpecificAdvice: {
      'Headache': 'For migraine headaches, try a warm compress on your forehead and stay hydrated.',
      'Nausea': 'Migraine nausea can be severe - try ginger or peppermint tea.',
      'Dizziness': 'Migraine dizziness can be intense - use a cool, dark room to rest in.'
    }
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
    symptomSpecificAdvice: {
      'Nausea': 'Gastroenteritis nausea can be severe - try ginger or peppermint tea.',
      'Abdominal pain': 'Gastroenteritis abdominal pain can be severe - try warm liquids and rest.',
      'Fever': 'Gastroenteritis fever can be high - take acetaminophen or ibuprofen as directed.',
      'Fatigue': 'Gastroenteritis fatigue can be severe - get plenty of rest and stay hydrated.'
    }
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
    symptomSpecificAdvice: {
      'Chest pain': 'Heart attack chest pain can be severe - use a cool, dark room to rest in.',
      'Shortness of breath': 'Heart attack shortness of breath can be severe - use oxygen therapy if needed.',
      'Dizziness': 'Heart attack dizziness can be intense - use a cool, dark room to rest in.',
      'Fatigue': 'Heart attack fatigue can be severe - get plenty of rest and stay hydrated.'
    }
  },
];

// Storage key for localStorage
const SYMPTOM_HISTORY_STORAGE_KEY = 'mediAI-symptom-history';

// Function to analyze symptoms with personalized responses
export const analyzeSymptoms = (userSymptoms: string[]): AnalysisResult => {
  const matches: SymptomMatch[] = [];
  const symptomDetails: Record<string, any> = {};
  
  // Get symptom details
  userSymptoms.forEach(symptomName => {
    const symptom = symptomDatabase.find(s => s.name === symptomName);
    if (symptom) {
      symptomDetails[symptomName] = {
        description: symptom.description,
        bodyPart: symptom.bodyPart,
        severity: symptom.severity,
        personalizedAdvice: symptom.personalizedAdvice,
        possibleCauses: symptom.possibleCauses,
        whenToSeekHelp: symptom.whenToSeekHelp
      };
    }
  });
  
  for (const condition of conditionDatabase) {
    // Calculate match score based on symptom overlap
    const matchingSymptoms = condition.symptoms.filter(symptom => 
      userSymptoms.includes(symptom)
    );
    
    // Calculate probability based on matching symptoms
    const probability = matchingSymptoms.length / condition.symptoms.length;
    
    if (probability > 0) {
      // Collect personalized advice for matching symptoms
      const symptomSpecificAdvice: Record<string, string> = {};
      
      matchingSymptoms.forEach(symptomName => {
        // Get condition-specific advice for this symptom if available
        if (condition.symptomSpecificAdvice && condition.symptomSpecificAdvice[symptomName]) {
          symptomSpecificAdvice[symptomName] = condition.symptomSpecificAdvice[symptomName];
        }
        // Fallback to general symptom advice
        else {
          const symptom = symptomDatabase.find(s => s.name === symptomName);
          if (symptom?.personalizedAdvice) {
            symptomSpecificAdvice[symptomName] = symptom.personalizedAdvice;
          }
        }
      });
      
      matches.push({
        condition: condition.name,
        probability: parseFloat((probability * 100).toFixed(1)),
        description: condition.description,
        severity: condition.severity as 'mild' | 'moderate' | 'severe',
        recommendations: condition.recommendations,
        symptomSpecificAdvice,
        matchingSymptoms
      });
    }
  }
  
  // Sort by probability (highest first)
  return {
    conditions: matches.sort((a, b) => b.probability - a.probability),
    symptomDetails
  };
};

// Function to get all available symptoms
export const getAvailableSymptoms = (): string[] => {
  return symptomDatabase.map(symptom => symptom.name);
};

// Function to save symptom analysis to history
export const saveSymptomAnalysis = (userSymptoms: string[], results: AnalysisResult): void => {
  const existingHistory = localStorage.getItem(SYMPTOM_HISTORY_STORAGE_KEY);
  const history = existingHistory ? JSON.parse(existingHistory) : [];
  
  history.push({
    id: Date.now().toString(),
    date: new Date().toISOString(),
    symptoms: userSymptoms,
    results: results,
  });
  
  // Keep only the latest 10 entries
  if (history.length > 10) {
    history.shift();
  }
  
  localStorage.setItem(SYMPTOM_HISTORY_STORAGE_KEY, JSON.stringify(history));
};

// Function to get symptom history
export const getSymptomHistory = () => {
  const existingHistory = localStorage.getItem(SYMPTOM_HISTORY_STORAGE_KEY);
  return existingHistory ? JSON.parse(existingHistory) : [];
};

// Function to get a single symptom by name
export const getSymptomByName = (name: string): Symptom | undefined => {
  return symptomDatabase.find(symptom => symptom.name === name);
};
