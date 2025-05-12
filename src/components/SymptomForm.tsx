
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { analyzeSymptoms, getAvailableSymptoms, saveSymptomAnalysis, AnalysisResult } from "@/services/symptoms";
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface SymptomFormProps {
  onAnalysisComplete: (results: AnalysisResult, selectedSymptoms: string[]) => void;
  useAI?: boolean;
}

const SymptomForm = ({ onAnalysisComplete, useAI = false }: SymptomFormProps) => {
  const availableSymptoms = getAvailableSymptoms();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { translate } = useLanguage();
  const { toast } = useToast();

  const handleSymptomChange = (symptom: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSymptoms(prev => [...prev, symptom]);
    } else {
      setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    try {
      let results: AnalysisResult;
      
      if (useAI) {
        // Use AI-powered prediction
        try {
          const aiResults = await predictDiseasesWithAI(selectedSymptoms);
          results = aiResults;
        } catch (error) {
          console.error("AI prediction failed, falling back to local analysis:", error);
          toast({
            title: "AI Service Unavailable",
            description: "Using local analysis instead. Try again later for AI-powered predictions.",
            variant: "destructive"
          });
          // Fallback to local analysis
          results = analyzeSymptoms(selectedSymptoms);
        }
      } else {
        // Use local analysis
        results = analyzeSymptoms(selectedSymptoms);
      }
      
      saveSymptomAnalysis(selectedSymptoms, results);
      onAnalysisComplete(results, selectedSymptoms);
    } catch (error) {
      console.error("Error during symptom analysis:", error);
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing your symptoms. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const predictDiseasesWithAI = async (symptoms: string[]): Promise<AnalysisResult> => {
    try {
      // Format the symptoms for the AI
      const symptomsText = symptoms.join(", ");
      
      // Make the API request
      const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyD7y1HAUzbKM-URXdSMBMNOOFC7wBNaqno"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a medical assistant analyzing symptoms. Based on these symptoms: ${symptomsText}, provide a detailed analysis of possible medical conditions. For each condition, include: name, probability percentage (as a number), severity level (mild, moderate, or severe), description, recommendations, and specific advice for each symptom. Format your response as proper JSON that can be parsed with JavaScript's JSON.parse() method, with this structure: { "conditions": [ { "condition": "Disease Name", "probability": 85, "description": "Description", "severity": "moderate", "recommendations": ["rec1", "rec2"], "symptomSpecificAdvice": { "Symptom1": "Advice for symptom 1", "Symptom2": "Advice for symptom 2" } } ], "symptomDetails": { "Symptom1": { "description": "desc", "bodyPart": "part", "severity": "mild", "personalizedAdvice": "advice", "possibleCauses": ["cause1"], "whenToSeekHelp": "when" } } }`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      
      // Extract the text content from the Gemini response
      const textContent = responseData.candidates[0].content.parts[0].text;
      
      // Extract just the JSON part from the response
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not extract JSON from AI response");
      }
      
      // Parse the JSON data
      const parsedData = JSON.parse(jsonMatch[0]) as AnalysisResult;
      
      // Validate the response has the expected structure
      if (!parsedData.conditions || !Array.isArray(parsedData.conditions) || !parsedData.symptomDetails) {
        throw new Error("AI response does not have the expected data structure");
      }
      
      return parsedData;
    } catch (error) {
      console.error("Error in AI disease prediction:", error);
      throw error;
    }
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

              {useAI && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-start gap-2 border border-blue-200 dark:border-blue-800">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Using AI-powered analysis for more accurate disease predictions based on your symptoms.
                  </p>
                </div>
              )}

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
                  useAI ? "Analyze Symptoms with AI" : translate("symptom.form.button")
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
