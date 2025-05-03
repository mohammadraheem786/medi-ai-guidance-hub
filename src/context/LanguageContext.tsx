
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Hero section
    "hero.title": "Your AI-powered",
    "hero.subtitle": "health assistant",
    "hero.description": "MediAI helps you analyze symptoms, assess severity, and get personalized health guidance. Your health matters, and we're here to help you understand it better.",
    "hero.button.checkSymptoms": "Check My Symptoms",
    "hero.button.getStarted": "Get Started",
    "hero.button.dashboard": "My Dashboard",
    "hero.button.learnMore": "Learn More",
    
    // About section
    "about.title": "About MediAI",
    "about.description.1": "MediAI is an advanced, AI-powered platform revolutionizing healthcare by enhancing diagnostic accuracy, streamlining clinical workflows, and enabling personalized patient care.",
    "about.description.2": "By leveraging cutting-edge machine learning algorithms, natural language processing, and real-time data analytics, MediAI supports medical professionals in making informed decisions.",
    "about.description.3": "The system integrates with electronic health records, medical imaging tools, and wearable health devices to provide a comprehensive, data-driven approach to healthcare delivery.",
    "about.feature.1": "Diagnostic Accuracy",
    "about.feature.2": "Clinical Workflow Optimization",
    "about.feature.3": "Personalized Patient Care",
    
    // Features section
    "features.title": "How MediAI Helps You",
    "features.description": "Our intelligent health platform is designed to provide guidance when you need it most.",
    "features.card.1.title": "Symptom Analysis",
    "features.card.1.description": "Input your symptoms and receive potential condition matches along with relevant recommendations.",
    "features.card.2.title": "Severity Assessment",
    "features.card.2.description": "Answer questions to determine the urgency of your condition and get appropriate guidance.",
    "features.card.3.title": "Health Tips",
    "features.card.3.description": "Access a library of health recommendations to maintain wellness and manage conditions.",
    
    // How it works section
    "howItWorks.title": "How It Works",
    "howItWorks.description": "MediAI provides a simple, step-by-step process to help you understand your health concerns",
    "howItWorks.step.1.title": "Create an Account",
    "howItWorks.step.1.description": "Sign up to access all features and save your health information securely.",
    "howItWorks.step.2.title": "Enter Your Symptoms",
    "howItWorks.step.2.description": "Select from our comprehensive list of symptoms to describe what you're experiencing.",
    "howItWorks.step.3.title": "Get Insights",
    "howItWorks.step.3.description": "Receive AI-powered analysis, severity assessment, and personalized recommendations.",
    "howItWorks.step.4.title": "Take Action",
    "howItWorks.step.4.description": "Follow guidance on when to seek medical care and how to manage your symptoms.",
    
    // Call to action section
    "cta.title": "Ready to take control of your health?",
    "cta.description": "Join thousands of users who rely on MediAI for health guidance and personalized recommendations.",
    "cta.button.1": "Sign Up - It's Free",
    "cta.button.2": "Learn More",
    
    // Footer
    "footer.disclaimer": "MediAI provides informational health guidance only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers.",
    "footer.link.1": "Terms of Service",
    "footer.link.2": "Privacy Policy",
    "footer.link.3": "Contact",
    
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.dashboard": "Dashboard",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    
    // Symptom form
    "symptom.title": "Symptom Analysis",
    "symptom.description": "Input your symptoms to receive potential condition matches and recommendations",
    "symptom.form.title": "Select your symptoms",
    "symptom.form.description": "Choose all the symptoms you are experiencing",
    "symptom.form.button": "Analyze Symptoms",
    "symptom.form.analyzing": "Analyzing...",
    "symptom.form.error": "Please select at least one symptom",
    
    // Language selector
    "language.english": "English",
    "language.hindi": "हिन्दी",
    "language.telugu": "తెలుగు",
  },
  hi: {
    // Hero section
    "hero.title": "आपका एआई-संचालित",
    "hero.subtitle": "स्वास्थ्य सहायक",
    "hero.description": "मेडिएआई आपको लक्षणों का विश्लेषण करने, गंभीरता का आकलन करने और व्यक्तिगत स्वास्थ्य मार्गदर्शन प्राप्त करने में मदद करता है। आपका स्वास्थ्य महत्वपूर्ण है, और हम आपको इसे बेहतर समझने में मदद करने के लिए यहां हैं।",
    "hero.button.checkSymptoms": "मेरे लक्षण जांचें",
    "hero.button.getStarted": "शुरू करें",
    "hero.button.dashboard": "मेरा डैशबोर्ड",
    "hero.button.learnMore": "अधिक जानें",
    
    // About section
    "about.title": "मेडिएआई के बारे में",
    "about.description.1": "मेडिएआई एक उन्नत, एआई-संचालित प्लेटफॉर्म है जो नैदानिक सटीकता को बढ़ाने, क्लिनिकल वर्कफ़्लो को सुव्यवस्थित करने और व्यक्तिगत रोगी देखभाल को सक्षम करके स्वास्थ्य सेवा उद्योग में क्रांति लाने के लिए डिज़ाइन किया गया है।",
    "about.description.2": "अत्याधुनिक मशीन लर्निंग एल्गोरिदम, प्राकृतिक भाषा प्रसंस्करण और रीयल-टाइम डेटा एनालिटिक्स का लाभ उठाकर, मेडिएआई चिकित्सा पेशेवरों को सूचित निर्णय लेने में सहायता करता है।",
    "about.description.3": "यह सिस्टम स्वास्थ्य सेवा वितरण के लिए एक व्यापक, डेटा-संचालित दृष्टिकोण प्रदान करने के लिए इलेक्ट्रॉनिक स्वास्थ्य रिकॉर्ड, मेडिकल इमेजिंग टूल और पहनने योग्य स्वास्थ्य उपकरणों के साथ सहजता से एकीकृत होता है।",
    "about.feature.1": "नैदानिक सटीकता",
    "about.feature.2": "क्लिनिकल वर्कफ़्लो अनुकूलन",
    "about.feature.3": "व्यक्तिगत रोगी देखभाल",
    
    // Features section
    "features.title": "मेडिएआई आपकी कैसे मदद करता है",
    "features.description": "हमारा बुद्धिमान स्वास्थ्य प्लेटफॉर्म आपको जब सबसे ज्यादा जरूरत हो तब मार्गदर्शन प्रदान करने के लिए डिज़ाइन किया गया है।",
    "features.card.1.title": "लक्षण विश्लेषण",
    "features.card.1.description": "अपने लक्षणों को दर्ज करें और प्रासंगिक सिफारिशों के साथ संभावित स्थिति मिलान प्राप्त करें।",
    "features.card.2.title": "गंभीरता मूल्यांकन",
    "features.card.2.description": "अपनी स्थिति की तात्कालिकता निर्धारित करने और उचित मार्गदर्शन प्राप्त करने के लिए प्रश्नों के उत्तर दें।",
    "features.card.3.title": "स्वास्थ्य युक्तियाँ",
    "features.card.3.description": "स्वस्थ रहने और स्थितियों को प्रबंधित करने के लिए स्वास्थ्य सिफारिशों के पुस्तकालय तक पहुंचें।",
    
    // How it works section
    "howItWorks.title": "यह कैसे काम करता है",
    "howItWorks.description": "मेडिएआई आपको अपनी स्वास्थ्य चिंताओं को समझने में मदद करने के लिए एक सरल, चरण-दर-चरण प्रक्रिया प्रदान करता है",
    "howItWorks.step.1.title": "खाता बनाएं",
    "howItWorks.step.1.description": "सभी सुविधाओं तक पहुंचने और अपनी स्वास्थ्य जानकारी को सुरक्षित रूप से सहेजने के लिए साइन अप करें।",
    "howItWorks.step.2.title": "अपने लक्षण दर्ज करें",
    "howItWorks.step.2.description": "आप जो अनुभव कर रहे हैं उसका वर्णन करने के लिए हमारी व्यापक लक्षण सूची से चुनें।",
    "howItWorks.step.3.title": "अंतर्दृष्टि प्राप्त करें",
    "howItWorks.step.3.description": "एआई-संचालित विश्लेषण, गंभीरता मूल्यांकन और व्यक्तिगत सिफारिशें प्राप्त करें।",
    "howItWorks.step.4.title": "कार्रवाई करें",
    "howItWorks.step.4.description": "चिकित्सा देखभाल कब लेनी है और अपने लक्षणों को कैसे प्रबंधित करना है, इस पर मार्गदर्शन का पालन करें।",
    
    // Call to action section
    "cta.title": "अपने स्वास्थ्य को नियंत्रित करने के लिए तैयार हैं?",
    "cta.description": "हजारों उपयोगकर्ताओं से जुड़ें जो स्वास्थ्य मार्गदर्शन और व्यक्तिगत सिफारिशों के लिए मेडिएआई पर भरोसा करते हैं।",
    "cta.button.1": "साइन अप करें - यह मुफ्त है",
    "cta.button.2": "अधिक जानें",
    
    // Footer
    "footer.disclaimer": "मेडिएआई केवल सूचनात्मक स्वास्थ्य मार्गदर्शन प्रदान करता है और यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। हमेशा योग्य स्वास्थ्य सेवा प्रदाताओं से परामर्श करें।",
    "footer.link.1": "सेवा की शर्तें",
    "footer.link.2": "गोपनीयता नीति",
    "footer.link.3": "संपर्क",
    
    // Navigation
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.dashboard": "डैशबोर्ड",
    "nav.login": "लॉगिन",
    "nav.register": "रजिस्टर",
    "nav.logout": "लॉगआउट",
    
    // Symptom form
    "symptom.title": "लक्षण विश्लेषण",
    "symptom.description": "संभावित स्थिति मिलान और सिफारिशें प्राप्त करने के लिए अपने लक्षण दर्ज करें",
    "symptom.form.title": "अपने लक्षण चुनें",
    "symptom.form.description": "वे सभी लक्षण चुनें जिनका आप अनुभव कर रहे हैं",
    "symptom.form.button": "लक्षणों का विश्लेषण करें",
    "symptom.form.analyzing": "विश्लेषण कर रहा है...",
    "symptom.form.error": "कृपया कम से कम एक लक्षण चुनें",
    
    // Language selector
    "language.english": "English",
    "language.hindi": "हिन्दी",
    "language.telugu": "తెలుగు",
  },
  te: {
    // Hero section
    "hero.title": "మీ AI-ఆధారిత",
    "hero.subtitle": "ఆరోగ్య సహాయకుడు",
    "hero.description": "మెడిఎయ్ మీకు లక్షణాలను విశ్లేషించడంలో, తీవ్రతను అంచనా వేయడంలో మరియు వ్యక్తిగతీకృత ఆరోగ్య మార్గదర్శకత్వాన్ని పొందడంలో సహాయం చేస్తుంది. మీ ఆరోగ్యం ముఖ్యమైనది, మరియు దాన్ని మీరు మరింత బాగా అర్థం చేసుకోవడానికి మేము ఇక్కడ ఉన్నాము.",
    "hero.button.checkSymptoms": "నా లక్షణాలను తనిఖీ చేయండి",
    "hero.button.getStarted": "ప్రారంభించండి",
    "hero.button.dashboard": "నా డాష్‌బోర్డ్",
    "hero.button.learnMore": "మరింత తెలుసుకోండి",
    
    // About section
    "about.title": "మెడిఎయ్ గురించి",
    "about.description.1": "మెడిఎయ్ అనేది నిదాన ఖచ్చితత్వాన్ని పెంచడం, క్లినికల్ వర్క్‌ఫ్లోలను సువ్యవస్థీకరించడం మరియు వ్యక్తిగతీకృత రోగి సంరక్షణను అనుమతించడం ద్వారా ఆరోగ్య రంగంలో విప్లవాత్మక మార్పు తేవడానికి రూపొందించబడిన అధునాతన, AI-ఆధారిత వేదిక.",
    "about.description.2": "అత్యాధునిక మెషిన్ లెర్నింగ్ అల్గారిథమ్‌లు, సహజ భాషా ప్రాసెసింగ్ మరియు రియల్-టైమ్ డేటా అనలిటిక్స్‌ను ఉపయోగించడం ద్వారా, మెడిఎయ్ వైద్య నిపుణులు సమాచార నిర్ణయాలు తీసుకోవడంలో సహాయపడుతుంది.",
    "about.description.3": "ఈ వ్యవస్థ ఎలక్ట్రానిక్ హెల్త్ రికార్డ్‌లు, మెడికల్ ఇమేజింగ్ టూల్స్ మరియు ధరించగల ఆరోగ్య పరికరాలతో సమగ్ర, డేటా-ఆధారిత ఆరోగ్య సంరక్షణ పద్ధతిని అందించడానికి నిర్విఘ్నంగా అనుసంధానమవుతుంది.",
    "about.feature.1": "నిదాన ఖచ్చితత్వం",
    "about.feature.2": "క్లినికల్ వర్క్‌ఫ్లో ఆప్టిమైజేషన్",
    "about.feature.3": "వ్యక్తిగతీకృత రోగి సంరక్షణ",
    
    // Features section
    "features.title": "మెడిఎయ్ మీకు ఎలా సహాయం చేస్తుంది",
    "features.description": "మా తెలివైన ఆరోగ్య వేదిక మీకు అత్యంత అవసరమైన సమయంలో మార్గదర్శకత్వం అందించడానికి రూపొందించబడింది.",
    "features.card.1.title": "లక్షణ విశ్లేషణ",
    "features.card.1.description": "మీ లక్షణాలను నమోదు చేయండి మరియు సంబంధిత సిఫార్సులతో కూడిన సంభావ్య పరిస్థితి మ్యాచ్‌లను పొందండి.",
    "features.card.2.title": "తీవ్రత అంచనా",
    "features.card.2.description": "మీ పరిస్థితి యొక్క అత్యవసరతను నిర్ధారించడానికి మరియు సరైన మార్గదర్శకత్వాన్ని పొందడానికి ప్రశ్నలకు సమాధానం ఇవ్వండి.",
    "features.card.3.title": "ఆరోగ్య చిట్కాలు",
    "features.card.3.description": "ఆరోగ్యంగా ఉండటానికి మరియు పరిస్థితులను నిర్వహించడానికి ఆరోగ్య సిఫార్సుల లైబ్రరీని యాక్సెస్ చేయండి.",
    
    // How it works section
    "howItWorks.title": "ఇది ఎలా పనిచేస్తుంది",
    "howItWorks.description": "మెడిఎయ్ మీ ఆరోగ్య ఆందోళనలను అర్థం చేసుకోవడానికి మీకు సాధారణ, దశల వారీగా ప్రక్రియను అందిస్తుంది",
    "howItWorks.step.1.title": "ఖాతాను సృష్టించండి",
    "howItWorks.step.1.description": "అన్ని ఫీచర్‌లను యాక్సెస్ చేయడానికి మరియు మీ ఆరోగ్య సమాచారాన్ని సురక్షితంగా సేవ్ చేయడానికి సైన్ అప్ చేయండి.",
    "howItWorks.step.2.title": "మీ లక్షణాలను నమోదు చేయండి",
    "howItWorks.step.2.description": "మీరు అనుభవిస్తున్న దానిని వివరించడానికి మా సమగ్ర లక్షణాల జాబితా నుండి ఎంచుకోండి.",
    "howItWorks.step.3.title": "అంతర్దృష్టులను పొందండి",
    "howItWorks.step.3.description": "AI-ఆధారిత విశ్లేషణ, తీవ్రత అంచనా మరియు వ్యక్తిగతీకృత సిఫార్సులను పొందండి.",
    "howItWorks.step.4.title": "చర్య తీసుకోండి",
    "howItWorks.step.4.description": "ఎప్పుడు వైద్య సంరక్షణను కోరుకోవాలి మరియు మీ లక్షణాలను ఎలా నిర్వహించాలి అనే దాని గురించి మార్గదర్శకత్వాన్ని అనుసరించండి.",
    
    // Call to action section
    "cta.title": "మీ ఆరోగ్యాన్ని నియంత్రించడానికి సిద్ధంగా ఉన్నారా?",
    "cta.description": "ఆరోగ్య మార్గదర్శకత్వం మరియు వ్యక్తిగతీకృత సిఫార్సుల కోసం మెడిఎయ్‌పై ఆధారపడే వేలాది మంది వినియోగదారులతో చేరండి.",
    "cta.button.1": "సైన్ అప్ చేయండి - ఇది ఉచితం",
    "cta.button.2": "మరింత తెలుసుకోండి",
    
    // Footer
    "footer.disclaimer": "మెడిఎయ్ సమాచార ఆరోగ్య మార్గదర్శకత్వం మాత్రమే అందిస్తుంది మరియు ఇది వృత్తిపరమైన వైద్య సలహా, నిర్ధారణ లేదా చికిత్సకు ప్రత్యామ్నాయం కాదు. ఎల్లప్పుడూ అర్హత గల ఆరోగ్య సంరక్షణ ప్రదాతలను సంప్రదించండి.",
    "footer.link.1": "సేవా నిబంధనలు",
    "footer.link.2": "గోప్యతా విధానం",
    "footer.link.3": "సంప్రదించండి",
    
    // Navigation
    "nav.home": "హోమ్",
    "nav.about": "మా గురించి",
    "nav.dashboard": "డాష్‌బోర్డ్",
    "nav.login": "లాగిన్",
    "nav.register": "రిజిస్టర్",
    "nav.logout": "లాగౌట్",
    
    // Symptom form
    "symptom.title": "లక్షణ విశ్లేషణ",
    "symptom.description": "సంభావ్య పరిస్థితి మ్యాచ్‌లు మరియు సిఫార్సులను పొందడానికి మీ లక్షణాలను నమోదు చేయండి",
    "symptom.form.title": "మీ లక్షణాలను ఎంచుకోండి",
    "symptom.form.description": "మీరు అనుభవిస్తున్న అన్ని లక్షణాలను ఎంచుకోండి",
    "symptom.form.button": "లక్షణాలను విశ్లేషించండి",
    "symptom.form.analyzing": "విశ్లేషిస్తోంది...",
    "symptom.form.error": "దయచేసి కనీసం ఒక లక్షణాన్ని ఎంచుకోండి",
    
    // Language selector
    "language.english": "English",
    "language.hindi": "हिन्दी",
    "language.telugu": "తెలుగు",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language preference from localStorage on component mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'te'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Function to set language and save to localStorage
  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('language', newLang);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = newLang;
  };

  // Function to translate key
  const translate = (key: string): string => {
    const langData = translations[language];
    return langData[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
