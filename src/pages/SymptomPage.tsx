
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SymptomForm from '@/components/SymptomForm';
import { SymptomMatch, getSymptomHistory } from '@/services/symptoms';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const SymptomPage = () => {
  const [searchParams] = useSearchParams();
  const historyId = searchParams.get('id');
  const { translate } = useLanguage();
  
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{translate("symptom.title")}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {translate("symptom.description")}
          </p>
        </motion.div>

        {!hasCompletedAnalysis ? (
          <div className="max-w-2xl mx-auto">
            <SymptomForm onAnalysisComplete={handleAnalysisComplete} />
          </div>
        ) : (
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>{translate("symptom.title")}</CardTitle>
                  <CardDescription>
                    Based on your symptoms: {selectedSymptoms.join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analysisResults.length > 0 ? (
                    <div className="space-y-6">
                      {analysisResults.map((result, index) => (
                        <motion.div 
                          key={result.condition} 
                          className={`p-4 rounded-lg ${index === 0 ? 'bg-gray-50 dark:bg-gray-800 border' : ''}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-medium">{result.condition}</h3>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                  Match probability: {result.probability}%
                                </span>
                                <Badge className={getSeverityColor(result.severity)}>
                                  {getSeverityLabel(result.severity)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{result.description}</p>
                          
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Recommendations:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {result.recommendations.map((recommendation, i) => (
                                <li key={i} className="text-gray-700 dark:text-gray-300">{recommendation}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {result.severity === 'severe' && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                              <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                                Warning: These symptoms may indicate a serious condition. Please seek medical advice promptly.
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      
                      <motion.div 
                        className="flex items-center gap-4 justify-center pt-4 border-t"
                        variants={itemVariants}
                      >
                        <Button variant="outline" onClick={handleStartOver}>
                          Check Different Symptoms
                        </Button>
                        <Link to="/assessment">
                          <Button className="bg-medical-500 hover:bg-medical-600">
                            Take Severity Assessment
                          </Button>
                        </Link>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
                        variants={itemVariants}
                      >
                        <p>
                          This analysis is for informational purposes only and does not constitute medical advice.
                          <br />Always consult with a healthcare provider for proper diagnosis and treatment.
                        </p>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-700 dark:text-gray-300">
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
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SymptomPage;
