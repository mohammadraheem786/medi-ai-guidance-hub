
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

const LanguageSelector = () => {
  const { language, setLanguage, translate } = useLanguage();

  const languageNames = {
    en: translate("language.english", "English"),
    hi: translate("language.hindi", "हिन्दी"),
    te: translate("language.telugu", "తెలుగు")
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1.5 items-center">
          <Languages className="h-4 w-4" />
          <span>{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className="cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            className="flex items-center"
          >
            {language === 'en' && <span className="mr-2">✓</span>}
            {translate("language.english", "English")}
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('hi')}
          className="cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            className="flex items-center"
          >
            {language === 'hi' && <span className="mr-2">✓</span>}
            {translate("language.hindi", "हिन्दी")}
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('te')}
          className="cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            className="flex items-center"
          >
            {language === 'te' && <span className="mr-2">✓</span>}
            {translate("language.telugu", "తెలుగు")}
          </motion.div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
