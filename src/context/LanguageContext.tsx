
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
