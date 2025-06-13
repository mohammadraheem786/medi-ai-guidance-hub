
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  AssessmentQuestion,
  AssessmentResult,
  calculateAssessmentResult,
  getAssessmentQuestions,
} from "@/services/assessment";

interface AssessmentFormProps {
  type?: string;
  onAssessmentComplete: (result: AssessmentResult) => void;
}

const AssessmentForm = ({ type = 'general', onAssessmentComplete }: AssessmentFormProps) => {
  const questions = getAssessmentQuestions(type);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleRadioChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentValues = answers[currentQuestion.id] as string[] || [];
    
    let newValues: string[];
    if (option === 'none') {
      // If "None" is selected, clear other selections
      newValues = checked ? ['none'] : [];
    } else {
      // If another option is selected, remove "None" if it's in the array
      newValues = checked 
        ? [...currentValues.filter(v => v !== 'none'), option]
        : currentValues.filter(v => v !== option);
    }
    
    setAnswers({ ...answers, [currentQuestion.id]: newValues });
  };

  const isQuestionAnswered = () => {
    const answer = answers[currentQuestion.id];
    if (!answer) return false;
    
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    
    return true;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = calculateAssessmentResult(answers);
      onAssessmentComplete(result);
      setIsSubmitting(false);
    }, 1500);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-medical-500 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-right">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>

          {currentQuestion.type === 'radio' && (
            <RadioGroup
              value={answers[currentQuestion.id] as string || ''}
              onValueChange={handleRadioChange}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div className="flex items-center space-x-2" key={option.value}>
                    <RadioGroupItem
                      value={option.value}
                      id={`option-${option.value}`}
                      className="border-gray-400"
                    />
                    <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {currentQuestion.type === 'checkbox' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const currentValues = answers[currentQuestion.id] as string[] || [];
                return (
                  <div className="flex items-center space-x-2" key={option.value}>
                    <Checkbox
                      id={`option-${option.value}`}
                      checked={currentValues.includes(option.value)}
                      onCheckedChange={(checked) => {
                        handleCheckboxChange(option.value, checked === true);
                      }}
                      className="border-gray-400"
                    />
                    <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </Button>
          
          <Button
            type="button"
            className="bg-medical-500 hover:bg-medical-600"
            onClick={handleNext}
            disabled={!isQuestionAnswered() || isSubmitting}
          >
            {currentQuestionIndex < questions.length - 1
              ? 'Next Question'
              : isSubmitting
              ? 'Analyzing...'
              : 'Complete Assessment'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AssessmentForm;
