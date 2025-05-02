
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SymptomForm from '@/components/SymptomForm';
import { SymptomMatch, getSymptomHistory } from '@/services/symptoms';
import { ChevronLeft } from 'lucide-react';

const SymptomPage = () => {
  const [searchParams] = useSearchParams();
  const historyId = searchParams.get('id');
  
  const [analysisResults, setAnalysisResults] = useState<SymptomMatch[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hasCompletedAnalysis, setHasCompletedAnalysis] = useState(false);

  useEffect(() => {
    // If historyId is provided, load that specific analysis
    if (historyId) {
      const history = getSymptomHistory();
      const historicalAnalysis = history.find((item: any) => item.id === historyId);
      
      if (historicalAnalysis) {
        setSelectedSymptoms(historicalAnalysis.symptoms);
        setAnalysisResults(historicalAnalysis.results);
        setHasCompletedAnalysis(true);
      }
    }
  }, [historyId]);

  const handleAnalysisComplete = (results: SymptomMatch[], symptoms: string[]) => {
    setAnalysisResults(results);
    setSelectedSymptoms(symptoms);
    setHasCompletedAnalysis(true);
  };

  const handleStartOver = () => {
    setAnalysisResults([]);
    setSelectedSymptoms([]);
    setHasCompletedAnalysis(false);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch(severity) {
      case 'mild':
        return 'Low Risk';
      case 'moderate':
        return 'Medium Risk';
      case 'severe':
        return 'High Risk';
      default:
        return 'Unknown';
    }
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
            <h1 className="text-2xl font-bold">Symptom Analysis</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Input your symptoms to receive potential condition matches and recommendations
          </p>
        </div>

        {!hasCompletedAnalysis ? (
          <div className="max-w-2xl mx-auto">
            <SymptomForm onAnalysisComplete={handleAnalysisComplete} />
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  Based on your symptoms: {selectedSymptoms.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResults.length > 0 ? (
                  <div className="space-y-6">
                    {analysisResults.map((result, index) => (
                      <div 
                        key={result.condition} 
                        className={`p-4 rounded-lg ${index === 0 ? 'bg-gray-50 border' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-medium">{result.condition}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500 mr-2">
                                Match probability: {result.probability}%
                              </span>
                              <Badge className={getSeverityColor(result.severity)}>
                                {getSeverityLabel(result.severity)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{result.description}</p>
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Recommendations:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {result.recommendations.map((recommendation, i) => (
                              <li key={i} className="text-gray-700">{recommendation}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {result.severity === 'severe' && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 text-sm font-medium">
                              Warning: These symptoms may indicate a serious condition. Please seek medical advice promptly.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex items-center gap-4 justify-center pt-4 border-t">
                      <Button variant="outline" onClick={handleStartOver}>
                        Check Different Symptoms
                      </Button>
                      <Link to="/assessment">
                        <Button className="bg-medical-500 hover:bg-medical-600">
                          Take Severity Assessment
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="text-center text-sm text-gray-500 mt-6">
                      <p>
                        This analysis is for informational purposes only and does not constitute medical advice.
                        <br />Always consult with a healthcare provider for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-700">
                      We couldn't find any conditions matching your symptoms. 
                      This could mean your symptoms are very general or unrelated.
                    </p>
                    <Button onClick={handleStartOver} className="mt-4">
                      Try Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomPage;
