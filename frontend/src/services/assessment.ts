export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'radio' | 'checkbox' | 'select';
  options: {
    value: string;
    label: string;
    score: number;
  }[];
}

export interface AssessmentResult {
  id: string;
  score: number;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  recommendations: string[];
  created: string;
}

const assessmentQuestions: Record<string, AssessmentQuestion[]> = {
  'general': [
    {
      id: 'duration',
      text: 'How long have you been experiencing these symptoms?',
      type: 'radio',
      options: [
        { value: 'day', label: 'Less than a day', score: 1 },
        { value: 'week', label: '2-7 days', score: 2 },
        { value: 'twoweeks', label: '1-2 weeks', score: 3 },
        { value: 'month', label: 'More than 2 weeks', score: 4 },
      ]
    },
    {
      id: 'severity',
      text: 'On a scale of 1 to 5, how severe is your discomfort?',
      type: 'radio',
      options: [
        { value: '1', label: '1 - Barely noticeable', score: 1 },
        { value: '2', label: '2 - Mild discomfort', score: 2 },
        { value: '3', label: '3 - Moderate discomfort', score: 3 },
        { value: '4', label: '4 - Severe discomfort', score: 4 },
        { value: '5', label: '5 - Extreme discomfort', score: 5 },
      ]
    },
    {
      id: 'impact',
      text: 'How much does this affect your daily activities?',
      type: 'radio',
      options: [
        { value: 'none', label: 'No impact', score: 1 },
        { value: 'slight', label: 'Slightly affects some activities', score: 2 },
        { value: 'moderate', label: 'Moderately affects daily life', score: 3 },
        { value: 'severe', label: 'Severely limits daily activities', score: 4 },
        { value: 'unable', label: 'Unable to perform normal activities', score: 5 },
      ]
    },
    {
      id: 'worsening',
      text: 'Are your symptoms getting worse?',
      type: 'radio',
      options: [
        { value: 'improving', label: 'No, they are improving', score: 1 },
        { value: 'stable', label: 'No, they are stable', score: 2 },
        { value: 'slightlyWorse', label: 'Yes, slightly worse', score: 3 },
        { value: 'significantlyWorse', label: 'Yes, significantly worse', score: 4 },
        { value: 'rapidlyWorse', label: 'Yes, rapidly getting worse', score: 5 },
      ]
    },
    {
      id: 'warning',
      text: 'Do you have any of these warning signs? (select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'None of these', score: 0 },
        { value: 'fever', label: 'High fever (over 102°F/39°C)', score: 3 },
        { value: 'breath', label: 'Difficulty breathing', score: 5 },
        { value: 'chest', label: 'Chest pain or pressure', score: 5 },
        { value: 'confusion', label: 'Confusion or altered mental state', score: 5 },
        { value: 'severe', label: 'Severe or persistent pain', score: 4 },
      ]
    }
  ],
  'headache': [
    {
      id: 'headache_type',
      text: 'How would you describe your headache?',
      type: 'radio',
      options: [
        { value: 'dull', label: 'Dull, constant pain', score: 2 },
        { value: 'throbbing', label: 'Throbbing or pulsing', score: 3 },
        { value: 'severe', label: 'Severe, sharp pain', score: 4 },
        { value: 'worst', label: 'The worst headache of my life', score: 5 },
      ]
    },
    {
      id: 'headache_symptoms',
      text: 'Do you have any of these additional symptoms? (select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'None of these', score: 0 },
        { value: 'nausea', label: 'Nausea or vomiting', score: 3 },
        { value: 'light', label: 'Sensitivity to light or sound', score: 2 },
        { value: 'vision', label: 'Vision changes or blurriness', score: 4 },
        { value: 'stiff', label: 'Stiff neck', score: 4 },
      ]
    }
  ],
  'chest': [
    {
      id: 'chest_pain',
      text: 'How would you describe your chest pain?',
      type: 'radio',
      options: [
        { value: 'sharp', label: 'Sharp or stabbing', score: 3 },
        { value: 'pressure', label: 'Pressure or squeezing', score: 5 },
        { value: 'burning', label: 'Burning sensation', score: 3 },
        { value: 'ache', label: 'Mild ache', score: 2 },
      ]
    },
    {
      id: 'chest_triggers',
      text: 'Does anything trigger or worsen the chest pain?',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'Nothing specific', score: 1 },
        { value: 'exertion', label: 'Physical exertion', score: 5 },
        { value: 'breathing', label: 'Deep breathing', score: 3 },
        { value: 'position', label: 'Certain positions', score: 2 },
        { value: 'eating', label: 'After eating', score: 2 },
      ]
    },
    {
      id: 'chest_symptoms',
      text: 'Do you have any of these additional symptoms? (select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'None of these', score: 0 },
        { value: 'shortness', label: 'Shortness of breath', score: 4 },
        { value: 'sweating', label: 'Cold sweats', score: 4 },
        { value: 'arm', label: 'Pain radiating to arm, neck, or jaw', score: 5 },
        { value: 'dizziness', label: 'Dizziness or lightheadedness', score: 3 },
      ]
    }
  ],
  'abdominal': [
    {
      id: 'abdominal_location',
      text: 'Where is your abdominal pain located?',
      type: 'radio',
      options: [
        { value: 'upper', label: 'Upper abdomen', score: 2 },
        { value: 'lower', label: 'Lower abdomen', score: 2 },
        { value: 'right', label: 'Right side', score: 3 },
        { value: 'left', label: 'Left side', score: 2 },
        { value: 'all', label: 'All over abdomen', score: 3 },
      ]
    },
    {
      id: 'abdominal_type',
      text: 'How would you describe your abdominal pain?',
      type: 'radio',
      options: [
        { value: 'crampy', label: 'Crampy', score: 2 },
        { value: 'sharp', label: 'Sharp', score: 3 },
        { value: 'burning', label: 'Burning', score: 2 },
        { value: 'dull', label: 'Dull and constant', score: 2 },
        { value: 'severe', label: 'Severe and intense', score: 4 },
      ]
    },
    {
      id: 'abdominal_symptoms',
      text: 'Do you have any of these additional symptoms? (select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'none', label: 'None of these', score: 0 },
        { value: 'vomiting', label: 'Vomiting', score: 3 },
        { value: 'diarrhea', label: 'Diarrhea', score: 2 },
        { value: 'constipation', label: 'Constipation', score: 2 },
        { value: 'blood', label: 'Blood in stool', score: 5 },
        { value: 'fever', label: 'Fever', score: 3 },
      ]
    }
  ]
};

// Storage key for localStorage
const ASSESSMENT_HISTORY_STORAGE_KEY = 'mediAI-assessment-history';

// Get assessment questions by type
export const getAssessmentQuestions = (type: string = 'general'): AssessmentQuestion[] => {
  const specificQuestions = assessmentQuestions[type] || [];
  return [...assessmentQuestions.general, ...specificQuestions];
};

// Calculate assessment result
export const calculateAssessmentResult = (answers: Record<string, string | string[]>): AssessmentResult => {
  let totalScore = 0;
  let maxPossibleScore = 0;
  let checkedQuestionsCount = 0;
  
  // Analyze all questions to calculate score
  Object.entries(answers).forEach(([questionId, answer]) => {
    // Find the corresponding question
    let question: AssessmentQuestion | undefined;
    
    for (const category in assessmentQuestions) {
      const found = assessmentQuestions[category].find(q => q.id === questionId);
      if (found) {
        question = found;
        break;
      }
    }
    
    if (!question) return;
    
    checkedQuestionsCount++;
    
    if (Array.isArray(answer)) {
      // Multiple selected answers (checkbox)
      answer.forEach(selectedValue => {
        const option = question?.options.find(opt => opt.value === selectedValue);
        if (option) {
          totalScore += option.score;
        }
      });
      
      // Calculate max possible score for this question
      const highestScores = question.options
        .map(option => option.score)
        .sort((a, b) => b - a)
        .slice(0, answer.length);
        
      maxPossibleScore += highestScores.reduce((sum, score) => sum + score, 0);
    } else {
      // Single selected answer (radio)
      const option = question?.options.find(opt => opt.value === answer);
      if (option) {
        totalScore += option.score;
      }
      
      // Get max possible score for this question
      const maxScore = Math.max(...question.options.map(opt => opt.score));
      maxPossibleScore += maxScore;
    }
  });
  
  // Calculate normalized score as percentage of max possible
  const normalizedScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  
  // Determine severity based on score
  let severity: 'low' | 'medium' | 'high' = 'low';
  let title = '';
  let description = '';
  let recommendations: string[] = [];
  
  if (normalizedScore >= 70) {
    severity = 'high';
    title = 'Urgent Medical Attention Advised';
    description = 'Your symptoms indicate a potentially serious condition that requires prompt medical evaluation.';
    recommendations = [
      'Seek immediate medical attention or go to the nearest emergency room.',
      'Do not delay seeking care, especially if symptoms are worsening.',
      'Bring a list of your symptoms and medications to show medical professionals.',
      'If you can\'t travel safely alone, call for emergency services.',
    ];
  } else if (normalizedScore >= 40) {
    severity = 'medium';
    title = 'Medical Consultation Recommended';
    description = 'Your symptoms suggest a condition that should be evaluated by a healthcare provider.';
    recommendations = [
      'Schedule an appointment with your healthcare provider within the next 1-2 days.',
      'Monitor your symptoms closely and seek immediate care if they worsen.',
      'Keep track of any changes or new symptoms that develop.',
      'Rest and avoid activities that worsen your symptoms.',
    ];
  } else {
    severity = 'low';
    title = 'Self-Care May Be Appropriate';
    description = 'Your symptoms appear mild and may be managed with appropriate self-care.';
    recommendations = [
      'Rest and monitor your symptoms over the next few days.',
      'Stay hydrated and maintain healthy habits.',
      'Over-the-counter medications may help relieve your symptoms (follow package directions).',
      'If symptoms persist beyond 7 days or worsen, consult a healthcare provider.',
    ];
  }
  
  // Warning for severe symptoms regardless of overall score
  if (answers.warning && Array.isArray(answers.warning)) {
    const severeSymptoms = answers.warning.filter(symptom => symptom !== 'none');
    if (severeSymptoms.includes('breath') || severeSymptoms.includes('chest') || severeSymptoms.includes('confusion')) {
      severity = 'high';
      title = 'Urgent Medical Attention Required';
      description = 'You reported one or more serious symptoms that require immediate medical evaluation.';
      recommendations = [
        'Seek emergency medical care immediately.',
        'Call emergency services if you are unable to go to the hospital safely.',
        'Do not wait to see if these symptoms resolve on their own.',
        'These symptoms may indicate a serious medical condition.',
      ];
    }
  }
  
  const result: AssessmentResult = {
    id: Date.now().toString(),
    score: Math.round(normalizedScore),
    severity,
    title,
    description,
    recommendations,
    created: new Date().toISOString(),
  };
  
  // Save to history
  saveAssessmentResult(result);
  
  return result;
};

// Save assessment result to history
export const saveAssessmentResult = (result: AssessmentResult): void => {
  const existingHistory = localStorage.getItem(ASSESSMENT_HISTORY_STORAGE_KEY);
  const history = existingHistory ? JSON.parse(existingHistory) : [];
  
  history.push(result);
  
  // Keep only the latest 10 entries
  if (history.length > 10) {
    history.shift();
  }
  
  localStorage.setItem(ASSESSMENT_HISTORY_STORAGE_KEY, JSON.stringify(history));
};

// Get assessment history
export const getAssessmentHistory = () => {
  const existingHistory = localStorage.getItem(ASSESSMENT_HISTORY_STORAGE_KEY);
  return existingHistory ? JSON.parse(existingHistory) : [];
};
