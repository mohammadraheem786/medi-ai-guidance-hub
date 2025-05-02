
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Hero from '@/components/Hero';

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Symptom Analysis',
      description: 'Input your symptoms and receive potential condition matches along with relevant recommendations.',
      action: () => navigate('/symptom'),
    },
    {
      title: 'Severity Assessment',
      description: 'Answer questions to determine the urgency of your condition and get appropriate guidance.',
      action: () => navigate('/assessment'),
    },
    {
      title: 'Health Tips',
      description: 'Access a library of health recommendations to maintain wellness and manage conditions.',
      action: () => navigate('/health-tips'),
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create an Account',
      description: 'Sign up to access all features and save your health information securely.',
    },
    {
      step: '02',
      title: 'Enter Your Symptoms',
      description: 'Select from our comprehensive list of symptoms to describe what you're experiencing.',
    },
    {
      step: '03',
      title: 'Get Insights',
      description: 'Receive AI-powered analysis, severity assessment, and personalized recommendations.',
    },
    {
      step: '04',
      title: 'Take Action',
      description: 'Follow guidance on when to seek medical care and how to manage your symptoms.',
    },
  ];

  return (
    <>
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How MediAI Helps You</h2>
            <p className="text-gray-600">
              Our intelligent health platform is designed to provide guidance when you need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 min-h-[80px]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={feature.action}
                    className="w-full bg-medical-500 hover:bg-medical-600"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              MediAI provides a simple, step-by-step process to help you understand your health concerns
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-medical-500 mb-3">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="bg-medical-500 hover:bg-medical-600"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-medical-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of users who rely on MediAI for health guidance and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate('/register')} 
              size="lg"
              variant="secondary"
            >
              Sign Up - It's Free
            </Button>
            <Button 
              onClick={() => navigate('/about')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">MediAI</h2>
            <p className="text-gray-400 text-center max-w-lg mb-6">
              MediAI provides informational health guidance only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always consult qualified healthcare providers.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
            <div className="mt-8 text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MediAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
