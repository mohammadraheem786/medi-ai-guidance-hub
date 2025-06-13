
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
type Language = "en" | "hi" | "te";

// Define translation structure
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, defaultText?: string) => string;
  translations: Translations;
}

// Initialize translations
const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.dashboard": "Dashboard",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "nav.doctors": "Doctors",
    "theme.toggle": "Toggle theme",
    "theme.lightMode": "Switch to light mode",
    "theme.darkMode": "Switch to dark mode",
    "hero.title": "Smart Health Insights",
    "hero.subtitle": "For Better Living",
    "hero.description": "AI-powered health guidance at your fingertips. Analyze symptoms, assess severity, and get personalized recommendations.",
    "hero.button.getStarted": "Get Started",
    "hero.button.learnMore": "Learn More",
    "hero.button.checkSymptoms": "Check Your Symptoms",
    "hero.button.dashboard": "Go to Dashboard",
    "about.title": "Health Assistant",
    "about.description.1": "MediAI is an intelligent health platform designed to provide guidance when you need it most.",
    "about.description.2": "Our AI analyzes symptoms and provides personalized health recommendations based on the latest medical data.",
    "about.description.3": "Not a replacement for professional healthcare, but a helpful first step in understanding your health concerns.",
    "about.feature.1": "Symptom Analysis",
    "about.feature.2": "Severity Assessment",
    "about.feature.3": "Health Recommendations",
    "language.english": "English",
    "language.hindi": "हिन्दी",
    "language.telugu": "తెలుగు",
    "doctors.title": "Consult a Doctor",
    "doctors.description": "Connect with skilled healthcare professionals across Telangana. Filter by district to find doctors near you.",
    "doctors.selectDistrict": "Select District",
    "doctors.showing": "Showing",
    "doctors.doctors": "doctors",
    "doctors.bookAppointment": "Book Appointment",
    "districts.alldistricts": "All Districts",
    "districts.hyderabad": "Hyderabad",
    "districts.warangal": "Warangal",
    "districts.nizamabad": "Nizamabad",
    "districts.karimnagar": "Karimnagar",
    "districts.khammam": "Khammam",
    "districts.adilabad": "Adilabad",
    "districts.mahabubnagar": "Mahabubnagar",
    "districts.nalgonda": "Nalgonda",
    "districts.rangareddy": "Rangareddy",
    "districts.medak": "Medak",
  },
  hi: {
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.dashboard": "डैशबोर्ड",
    "nav.login": "लॉगिन",
    "nav.register": "रजिस्टर",
    "nav.logout": "लॉगआउट",
    "nav.doctors": "डॉक्टर",
    "theme.toggle": "थीम बदलें",
    "theme.lightMode": "लाइट मोड में बदलें",
    "theme.darkMode": "डार्क मोड में बदलें",
    "hero.title": "स्मार्ट स्वास्थ्य जानकारी",
    "hero.subtitle": "बेहतर जीवन के लिए",
    "hero.description": "आपके फिंगरटिप पर AI-संचालित स्वास्थ्य मार्गदर्शन। लक्षणों का विश्लेषण करें, गंभीरता का आकलन करें, और व्यक्तिगत सिफारिशें प्राप्त करें।",
    "hero.button.getStarted": "शुरू करें",
    "hero.button.learnMore": "अधिक जानें",
    "hero.button.checkSymptoms": "अपने लक्षणों की जांच करें",
    "hero.button.dashboard": "डैशबोर्ड पर जाएं",
    "about.title": "स्वास्थ्य सहायक",
    "about.description.1": "MediAI एक बुद्धिमान स्वास्थ्य प्लेटफॉर्म है जिसे आपको जरूरत के समय मार्गदर्शन प्रदान करने के लिए डिज़ाइन किया गया है।",
    "about.description.2": "हमारा AI लक्षणों का विश्लेषण करता है और नवीनतम चिकित्सा डेटा के आधार पर व्यक्तिगत स्वास्थ्य सिफारिशें प्रदान करता है।",
    "about.description.3": "पेशेवर स्वास्थ्य देखभाल के लिए प्रतिस्थापन नहीं, लेकिन आपकी स्वास्थ्य चिंताओं को समझने में एक सहायक पहला कदम।",
    "about.feature.1": "लक्षण विश्लेषण",
    "about.feature.2": "गंभीरता आकलन",
    "about.feature.3": "स्वास्थ्य सिफारिशें",
    "language.english": "अंग्रेज़ी",
    "language.hindi": "हिन्दी",
    "language.telugu": "తెలుగు",
    "doctors.title": "डॉक्टर से परामर्श करें",
    "doctors.description": "तेलंगाना के कुशल स्वास्थ्य पेशेवरों से जुड़ें। अपने आस-पास के डॉक्टर खोजने के लिए जिले के अनुसार फ़िल्टर करें।",
    "doctors.selectDistrict": "जिला चुनें",
    "doctors.showing": "दिखा रहा है",
    "doctors.doctors": "डॉक्टर",
    "doctors.bookAppointment": "अपॉइंटमेंट बुक करें",
    "districts.alldistricts": "सभी जिले",
    "districts.hyderabad": "हैदराबाद",
    "districts.warangal": "वारंगल",
    "districts.nizamabad": "निज़ामाबाद",
    "districts.karimnagar": "करीमनगर",
    "districts.khammam": "खम्मम",
    "districts.adilabad": "आदिलाबाद",
    "districts.mahabubnagar": "महबूबनगर",
    "districts.nalgonda": "नलगोंडा",
    "districts.rangareddy": "रंगारेड्डी",
    "districts.medak": "मेडक",
  },
  te: {
    "nav.home": "హోమ్",
    "nav.about": "మా గురించి",
    "nav.dashboard": "డాష్బోర్డ్",
    "nav.login": "లాగిన్",
    "nav.register": "రిజిస్టర్",
    "nav.logout": "లాగౌట్",
    "nav.doctors": "డాక్టర్లు",
    "theme.toggle": "థీమ్ మార్చండి",
    "theme.lightMode": "లైట్ మోడ్‌కి మారండి",
    "theme.darkMode": "డార్క్ మోడ్‌కి మారండి",
    "hero.title": "స్మార్ట్ హెల్త్ ఇన్‌సైట్స్",
    "hero.subtitle": "మెరుగైన జీవితానికి",
    "hero.description": "మీ వేలికొనల వద్ద AI ఆధారిత ఆరోగ్య మార్గదర్శకం. లక్షణాలను విశ్లేషించండి, తీవ్రతను అంచనా వేయండి మరియు వ్యక్తిగతీకరించిన సిఫార్సులను పొందండి.",
    "hero.button.getStarted": "ప్రారంభించండి",
    "hero.button.learnMore": "మరింత తెలుసుకోండి",
    "hero.button.checkSymptoms": "మీ లక్షణాలను తనిఖీ చేయండి",
    "hero.button.dashboard": "డాష్‌బోర్డ్‌కు వెళ్లండి",
    "about.title": "ఆరోగ్య సహాయకుడు",
    "about.description.1": "MediAI మీకు అవసరమైనప్పుడు మార్గదర్శకత్వం అందించడానికి రూపొందించబడిన తెలివైన ఆరోగ్య ప్లాట్‌ఫారమ్.",
    "about.description.2": "మా AI లక్షణాలను విశ్లేషిస్తుంది మరియు తాజా వైద్య డేటా ఆధారంగా వ్యక్తిగతీకరించిన ఆరోగ్య సిఫారసులను అందిస్తుంది.",
    "about.description.3": "వృత్తిపరమైన ఆరోగ్య సంరక్షణకు ప్రత్యామ్నాయం కాదు, కానీ మీ ఆరోగ్య ఆందోళనలను అర్థం చేసుకోవడానికి సహాయకరమైన మొదటి అడుగు.",
    "about.feature.1": "లక్షణ విశ్లేషణ",
    "about.feature.2": "తీవ్రత అంచనా",
    "about.feature.3": "ఆరోగ్య సిఫార్సులు",
    "language.english": "ఇంగ్లీష్",
    "language.hindi": "హిందీ",
    "language.telugu": "తెలుగు",
    "doctors.title": "వైద్యుని సలహా తీసుకోండి",
    "doctors.description": "తెలంగాణలోని నైపుణ్యం గల ఆరోగ్య నిపుణులతో అనుసంధానించండి. మీకు సమీపంలోని డాక్టర్లను కనుగొనడానికి జిల్లా ద్వారా ఫిల్టర్ చేయండి.",
    "doctors.selectDistrict": "జిల్లాను ఎంచుకోండి",
    "doctors.showing": "చూపిస్తోంది",
    "doctors.doctors": "డాక్టర్లు",
    "doctors.bookAppointment": "అపాయింట్మెంట్ బుక్ చేయండి",
    "districts.alldistricts": "అన్ని జిల్లాలు",
    "districts.hyderabad": "హైదరాబాద్",
    "districts.warangal": "వరంగల్",
    "districts.nizamabad": "నిజామాబాద్",
    "districts.karimnagar": "కరీంనగర్",
    "districts.khammam": "ఖమ్మం",
    "districts.adilabad": "ఆదిలాబాద్",
    "districts.mahabubnagar": "మహబూబ్‌నగర్",
    "districts.nalgonda": "నల్గొండ",
    "districts.rangareddy": "రంగారెడ్డి",
    "districts.medak": "మెదక్",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get the language from localStorage
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "hi" || storedLanguage === "te")) {
      return storedLanguage as Language;
    }
    
    // If no stored preference, use navigator language or default to English
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "hi" || browserLang === "te") {
      return browserLang as Language;
    }
    
    return "en";
  });

  // Update language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Translation function
  const translate = (key: string, defaultText?: string): string => {
    const languageTranslations = translations[language] || {};
    return languageTranslations[key] || defaultText || key;
  };

  // Set document language attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    
    // Update direction if needed (for RTL languages)
    // For now, all our languages are LTR
    document.documentElement.dir = "ltr";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
