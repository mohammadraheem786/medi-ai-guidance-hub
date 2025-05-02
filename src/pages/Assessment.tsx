
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult, getAssessmentHistory } from '@/services/assessment';
import AssessmentForm from '@/components/AssessmentForm';
import { ChevronLeft } from 'lucide-react';

const Assessment = () => {
  const [searchParams] = useSearchParams();
  const historyId = searchParams.get('id');
  
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [assessmentType, setAssessmentType] = useState<string>('general');

  useEffect(() => {
    // If historyId is provided, load that specific assessment
    if (historyId) {
      const history = getAssessmentHistory();
      const historicalAssessment = history.find((item: AssessmentResult) => item.id === historyId);
      
      if (historicalAssessment) {
        setResult(historicalAssessment);
      }
    }
  }, [historyId]);

  const handleAssessmentComplete = (assessmentResult: AssessmentResult) => {
    setResult(assessmentResult);
  };

  const handleStartOver = () => {
    setResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Severity Assessment</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Answer questions to determine the severity of your condition
          </p>
        </div>

        {!result ? (
          <div className="max-w-2xl mx-auto">
            {!historyId && (
              <div className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Assessment Type</CardTitle>
                    <CardDescription>Select the most relevant option for your symptoms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Button
                        variant={assessmentType === 'general' ? 'default' : 'outline'}
                        className={assessmentType === 'general' ? 'bg-medical-500' : ''}
                        onClick={() => setAssessmentType('general')}
                      >
                        General
                      </Button>
                      <Button
                        variant={assessmentType === 'headache' ? 'default' : 'outline'}
                        className={assessmentType === 'headache' ? 'bg-medical-500' : ''}
                        onClick={() => setAssessmentType('headache')}
                      >
                        Headache
                      </Button>
                      <Button
                        variant={assessmentType === 'chest' ? 'default' : 'outline'}
                        className={assessmentType === 'chest' ? 'bg-medical-500' : ''}
                        onClick={() => setAssessmentType('chest')}
                      >
                        Chest Pain
                      </Button>
                      <Button
                        variant={assessmentType === 'abdominal' ? 'default' : 'outline'}
                        className={assessmentType === 'abdominal' ? 'bg-medical-500' : ''}
                        onClick={() => setAssessmentType('abdominal')}
                      >
                        Abdominal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <AssessmentForm 
              type={assessmentType}
              onAssessmentComplete={handleAssessmentComplete} 
            />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{result.title}</CardTitle>
                    <CardDescription className="mt-1">{result.description}</CardDescription>
                  </div>
                  <Badge className={getSeverityColor(result.severity)} className="text-sm px-3 py-1">
                    {result.severity === 'high' ? 'High Risk' : 
                     result.severity === 'medium' ? 'Medium Risk' : 'Low Risk'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Severity Score</span>
                    <span className="text-sm font-medium">{result.score}%</span>
                  </div>
                  <Progress value={result.score} className={`h-2 ${getScoreColor(result.score)}`} />
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Recommendations:</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {result.severity === 'high' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700 font-medium">
                      Warning: Your symptoms suggest a potentially serious condition. 
                      Please seek immediate medical attention.
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4 border-t">
                  <Button variant="outline" onClick={handleStartOver}>
                    Take Another Assessment
                  </Button>
                  <Link to="/health-tips">
                    <Button className="bg-medical-500 hover:bg-medical-600">
                      View Health Tips
                    </Button>
                  </Link>
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>
                    This assessment is for informational purposes only and does not constitute medical advice.
                    <br />Always consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
