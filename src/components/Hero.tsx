
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Your AI-powered</span>{' '}
              <span className="block medical-text-gradient xl:inline">
                health assistant
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
              MediAI helps you analyze symptoms, assess severity, 
              and get personalized health guidance. Your health matters, 
              and we're here to help you understand it better.
            </p>
            <div className="mt-8 sm:mt-10">
              <div className="rounded-md shadow">
                {isAuthenticated ? (
                  <Button
                    onClick={() => navigate('/symptom')}
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-white bg-medical-500 hover:bg-medical-600 md:py-6 md:text-lg md:px-10"
                  >
                    Check My Symptoms
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/register')}
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-white bg-medical-500 hover:bg-medical-600 md:py-6 md:text-lg md:px-10"
                  >
                    Get Started
                  </Button>
                )}
              </div>
              <div className="mt-3">
                {isAuthenticated ? (
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-medical-600 bg-white hover:bg-gray-50 md:py-6 md:text-lg md:px-10"
                  >
                    My Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/about')}
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-medical-600 bg-white hover:bg-gray-50 md:py-6 md:text-lg md:px-10"
                  >
                    Learn More
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full h-full max-w-md">
              <div className="w-full h-full bg-gradient-to-tr from-medical-400 to-teal-400 rounded-3xl shadow-2xl animate-pulse-gentle p-1">
                <div className="bg-white rounded-3xl p-8 h-full">
                  <div className="space-y-6">
                    <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-100 rounded"></div>
                      <div className="h-4 bg-gray-100 rounded"></div>
                      <div className="h-4 bg-gray-100 rounded"></div>
                    </div>
                    <div className="h-10 bg-medical-100 rounded-lg w-full"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 bg-teal-50 rounded-lg flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-teal-100"></div>
                        </div>
                        <div className="h-16 bg-purple-50 rounded-lg flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100"></div>
                        </div>
                        <div className="h-16 bg-medical-50 rounded-lg flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-medical-100"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-10 bg-medical-500 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
