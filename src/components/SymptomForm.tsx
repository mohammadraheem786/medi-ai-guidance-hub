
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { analyzeSymptoms, getAvailableSymptoms, saveSymptomAnalysis, SymptomMatch } from "@/services/symptoms";
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface SymptomFormProps {
  onAnalysisComplete: (results: SymptomMatch[], selectedSymptoms: string[]) => void;
}

const SymptomForm = ({ onAnalysisComplete }: SymptomFormProps) => {
  const availableSymptoms = getAvailableSymptoms();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { translate } = useLanguage();

  const handleSymptomChange = (symptom: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSymptoms(prev => [...prev, symptom]);
    } else {
      setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = analyzeSymptoms(selectedSymptoms);
      saveSymptomAnalysis(selectedSymptoms, results);
      onAnalysisComplete(results, selectedSymptoms);
      setIsAnalyzing(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium">{translate("symptom.form.title")}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {translate("symptom.form.description")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableSymptoms.map((symptom, index) => (
                  <motion.div 
                    key={symptom} 
                    className="flex items-center space-x-2"
                    variants={itemVariants}
                    custom={index}
                  >
                    <Checkbox 
                      id={`symptom-${symptom}`}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={(checked) => {
                        handleSymptomChange(symptom, checked === true);
                      }}
                    />
                    <Label
                      htmlFor={`symptom-${symptom}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {symptom}
                    </Label>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                className="w-full bg-medical-500 hover:bg-medical-600 relative" 
                disabled={selectedSymptoms.length === 0 || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="opacity-0">{translate("symptom.form.button")}</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg 
                        className="animate-spin h-5 w-5 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="ml-2">{translate("symptom.form.analyzing")}</span>
                    </span>
                  </>
                ) : (
                  translate("symptom.form.button")
                )}
              </Button>
              
              {selectedSymptoms.length === 0 && (
                <motion.p 
                  className="text-sm text-center text-red-500 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {translate("symptom.form.error")}
                </motion.p>
              )}
            </motion.div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default SymptomForm;
