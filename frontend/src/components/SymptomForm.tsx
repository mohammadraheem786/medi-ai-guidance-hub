import { useState } from 'react';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyzeSymptoms, getAvailableSymptoms, saveSymptomAnalysis, AnalysisResult } from "@/services/symptoms";
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { jsonrepair } from 'jsonrepair';

interface SymptomFormProps {
  onAnalysisComplete: (results: AnalysisResult, selectedSymptoms: string[]) => void;
  useAI?: boolean;
}

// You can remove the OpenAI key if not using it anymore
// const OPENAI_API_KEY = "...";
const GROQ_API_KEY = "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"; // Replace this with your Groq API key

const SymptomForm = ({ onAnalysisComplete, useAI = false }: SymptomFormProps) => {
  const availableSymptoms = getAvailableSymptoms();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleSymptomChange = (symptom: string, isChecked: boolean) => {
    setSelectedSymptoms(prev =>
      isChecked ? [...prev, symptom] : prev.filter(s => s !== symptom)
    );
  };

  // Groq LLM AI call with robust JSON repair
  const predictDiseasesWithAI = async (symptoms: string[]): Promise<AnalysisResult> => {
    const symptomsText = symptoms.join(", ");
    const prompt = `
You are a medical assistant. Given these symptoms: ${symptomsText}, 
respond ONLY in JSON with fields: 
- conditions (array of {condition, probability, severity, description, recommendations, symptomSpecificAdvice}), 
- symptomDetails (object mapping symptom to {bodyPart, description, severity, personalizedAdvice, possibleCauses, whenToSeekHelp}). 
Do NOT include any extra text, only the JSON object.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // or "mixtral-8x7b-32768"
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 2048,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    // Extract JSON from the response
    const text = response.data.choices[0].message.content;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not extract JSON from Groq response");

    // Try parsing and repair if needed
    let parsedData;
    try {
      parsedData = JSON.parse(jsonMatch[0]);
    } catch (err) {
      try {
        parsedData = JSON.parse(jsonrepair(jsonMatch[0]));
      } catch (err2) {
        throw new Error("Groq response is not valid JSON and could not be repaired");
      }
    }

    if (
      !parsedData.conditions ||
      !Array.isArray(parsedData.conditions) ||
      !parsedData.symptomDetails
    ) {
      throw new Error("AI response does not have the expected data structure");
    }
    return parsedData as AnalysisResult;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSymptoms.length) return;

    setIsAnalyzing(true);

    try {
      let results: AnalysisResult;

      if (useAI) {
        try {
          results = await predictDiseasesWithAI(selectedSymptoms);
        } catch (error) {
          console.error("AI prediction failed, falling back to local analysis:", error);
          toast({
            title: "AI Service Unavailable",
            description: "Using local analysis instead. Try again later for AI-powered predictions.",
            variant: "destructive"
          });
          results = analyzeSymptoms(selectedSymptoms);
        }
      } else {
        results = analyzeSymptoms(selectedSymptoms);
      }

      saveSymptomAnalysis(selectedSymptoms, results);
      setAnalysisResults(results);
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

  const renderConditionDetails = () => {
    if (!analysisResults) return null;

    return (
      <div className="space-y-6">
        {analysisResults.conditions.map((condition, index) => (
          <Card key={index} className="p-4">
            <CardHeader>
              <CardTitle>{condition.condition}</CardTitle>
              <CardDescription>
                Probability: {condition.probability}% | Severity:{" "}
                <Badge
                  color={
                    condition.severity === "severe"
                      ? "red"
                      : condition.severity === "moderate"
                      ? "yellow"
                      : "green"
                  }
                >
                  {condition.severity}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{condition.description}</p>
              {condition.recommendations?.length > 0 && (
                <>
                  <h4>Recommendations:</h4>
                  <ul>
                    {condition.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </>
              )}
              {condition.symptomSpecificAdvice &&
                Object.entries(condition.symptomSpecificAdvice).length > 0 && (
                  <>
                    <h4>Symptom-Specific Advice:</h4>
                    {Object.entries(condition.symptomSpecificAdvice).map(
                      ([symptom, advice]) => (
                        <p key={symptom}>
                          <strong>{symptom}:</strong> {advice}
                        </p>
                      )
                    )}
                  </>
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Select Your Symptoms</h3>
              <p className="text-sm text-gray-500 mb-4">
                Please select all symptoms that apply to you from the list below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableSymptoms.map(symptom => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={`symptom-${symptom}`}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={checked =>
                        handleSymptomChange(symptom, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`symptom-${symptom}`}
                      className="text-sm font-medium"
                    >
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-medical-500 hover:bg-medical-600"
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
            >
              {isAnalyzing
                ? "Analyzing..."
                : useAI
                ? "Analyze with AI"
                : "Analyze"}
            </Button>
          </div>
        </form>
      </Card>
      {analysisResults && (
        <motion.div className="mt-6">
          <h3 className="text-lg font-medium">Analysis Results:</h3>
          {renderConditionDetails()}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SymptomForm;