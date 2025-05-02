
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">
              <span className="medical-text-gradient">About MediAI</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empowering users with AI-assisted health guidance and information
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Making healthcare information accessible and understandable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                MediAI was created to bridge the gap between medical symptoms and healthcare decisions. 
                We understand that navigating health concerns can be overwhelming and confusing.
              </p>
              <p>
                Our platform uses intelligent algorithms to help users identify potential causes for their symptoms, 
                assess the severity of their condition, and receive appropriate guidance on next steps.
              </p>
              <p>
                While no digital tool can replace professional medical care, MediAI serves as a helpful first step 
                in understanding your symptoms and determining when to seek professional help.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Our symptom analysis tool matches your reported symptoms with a database of medical conditions 
                  to provide potential matches and relevant information.
                </p>
                <Link to="/symptom">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Severity Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Answer a series of questions about your symptoms to help determine the urgency of your situation 
                  and receive appropriate guidance on seeking care.
                </p>
                <Link to="/assessment">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Health Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Access a comprehensive library of health tips and recommendations to help you maintain wellness 
                  and manage common health conditions effectively.
                </p>
                <Link to="/health-tips">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800">
                  <strong>MediAI is not a substitute for professional medical advice, diagnosis, or treatment.</strong>
                </p>
                <p className="mt-2 text-yellow-700">
                  Always seek the advice of your physician or other qualified health provider with any questions
                  you may have regarding a medical condition. Never disregard professional medical advice or delay
                  in seeking it because of something you have read on this website.
                </p>
                <p className="mt-2 text-yellow-700">
                  If you think you may have a medical emergency, call your doctor or emergency services immediately.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Link to="/">
              <Button className="bg-medical-500 hover:bg-medical-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
