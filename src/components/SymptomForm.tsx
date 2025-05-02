
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { analyzeSymptoms, getAvailableSymptoms, saveSymptomAnalysis, SymptomMatch } from "@/services/symptoms";

interface SymptomFormProps {
  onAnalysisComplete: (results: SymptomMatch[], selectedSymptoms: string[]) => void;
}

const SymptomForm = ({ onAnalysisComplete }: SymptomFormProps) => {
  const availableSymptoms = getAvailableSymptoms();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Select your symptoms</h3>
            <p className="text-sm text-gray-500 mb-4">
              Choose all the symptoms you are experiencing
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableSymptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
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
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-medical-500 hover:bg-medical-600" 
            disabled={selectedSymptoms.length === 0 || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
          </Button>
          
          {selectedSymptoms.length === 0 && (
            <p className="text-sm text-center text-red-500">
              Please select at least one symptom
            </p>
          )}
        </div>
      </form>
    </Card>
  );
};

export default SymptomForm;
