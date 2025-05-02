
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { getSymptomHistory } from '@/services/symptoms';
import { getAssessmentHistory } from '@/services/assessment';

const Dashboard = () => {
  const { user } = useAuth();
  const [symptomHistory, setSymptomHistory] = useState<any[]>([]);
  const [assessmentHistory, setAssessmentHistory] = useState<any[]>([]);
  
  useEffect(() => {
    // Load history from localStorage
    setSymptomHistory(getSymptomHistory());
    setAssessmentHistory(getAssessmentHistory());
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'mild':
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'moderate':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch(severity) {
      case 'mild':
      case 'low':
        return 'Low Risk';
      case 'moderate':
      case 'medium':
        return 'Medium Risk';
      case 'severe':
      case 'high':
        return 'High Risk';
      default:
        return 'Unknown';
    }
  };

  const healthTips = [
    {
      id: '1',
      title: 'Stay Hydrated',
      description: 'Drinking enough water each day is crucial for many reasons.',
      tip: 'Aim to drink at least 8 glasses of water daily, more during hot weather or when exercising.'
    },
    {
      id: '2',
      title: 'Prioritize Sleep',
      description: 'Quality sleep is essential for physical health and emotional wellbeing.',
      tip: 'Target 7-9 hours of sleep per night in a dark, quiet, and cool environment.'
    },
    {
      id: '3',
      title: 'Regular Exercise',
      description: 'Physical activity improves cardiovascular health and mental wellbeing.',
      tip: 'Aim for at least 150 minutes of moderate-intensity activity each week.'
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, <span className="medical-text-gradient">{user?.email.split('@')[0]}</span>
          </h1>
          <p className="text-gray-600 mt-2">Here's an overview of your health information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Symptom Checker</CardTitle>
              <CardDescription>Analyze your symptoms and get insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Input your symptoms to receive possible conditions and recommendations.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/symptom" className="w-full">
                <Button className="w-full bg-medical-500 hover:bg-medical-600">Check Symptoms</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Severity Assessment</CardTitle>
              <CardDescription>Assess the severity of your condition</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Answer questions about your symptoms to determine if you need medical attention.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/assessment" className="w-full">
                <Button className="w-full bg-medical-500 hover:bg-medical-600">Start Assessment</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Health Tips</CardTitle>
              <CardDescription>Personalized health guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Browse recommendations and tips to maintain and improve your health.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/health-tips" className="w-full">
                <Button className="w-full bg-medical-500 hover:bg-medical-600">View Health Tips</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Health History</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="space-y-4 mt-6">
            {symptomHistory.length === 0 && assessmentHistory.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No History Yet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You haven't used any of our tools yet. Start by checking your symptoms or taking an assessment.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {symptomHistory.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Symptom Analysis History</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {symptomHistory.slice().reverse().slice(0, 4).map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">
                                {item.results.length > 0 ? 
                                  item.results[0].condition : 
                                  'Inconclusive'
                                }
                              </CardTitle>
                              <Badge className={
                                item.results.length > 0 ? 
                                getSeverityColor(item.results[0].severity) : 
                                'bg-gray-100 text-gray-800'
                              }>
                                {item.results.length > 0 ? 
                                  getSeverityLabel(item.results[0].severity) : 
                                  'Unknown'
                                }
                              </Badge>
                            </div>
                            <CardDescription>{formatDate(item.date)}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="text-sm">
                              <strong>Symptoms:</strong>{' '}
                              <span className="text-gray-600">
                                {item.symptoms.join(', ')}
                              </span>
                            </div>
                            {item.results.length > 0 && (
                              <div className="text-sm mt-2">
                                <strong>Probability:</strong>{' '}
                                <span className="text-gray-600">
                                  {item.results[0].probability}%
                                </span>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Link to={`/symptom?id=${item.id}`} className="text-xs text-medical-600 hover:underline">
                              View details
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {assessmentHistory.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Assessment History</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assessmentHistory.slice().reverse().slice(0, 4).map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">
                                {item.title}
                              </CardTitle>
                              <Badge className={getSeverityColor(item.severity)}>
                                {getSeverityLabel(item.severity)}
                              </Badge>
                            </div>
                            <CardDescription>{formatDate(item.created)}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="text-sm">
                              <strong>Score:</strong>{' '}
                              <span className="text-gray-600">
                                {item.score}/100
                              </span>
                            </div>
                            <div className="text-sm mt-2 line-clamp-2">
                              {item.description}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Link to={`/assessment?id=${item.id}`} className="text-xs text-medical-600 hover:underline">
                              View details
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthTips.map(tip => (
                <Card key={tip.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{tip.tip}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/health-tips" className="text-sm text-medical-600 hover:underline">
                      Learn more
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
