
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden pt-16">
      <div className="relative max-w-7xl mx-auto pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex flex-col justify-center"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              <span className="block xl:inline">Your AI-powered</span>{' '}
              <span className="block medical-text-gradient xl:inline">
                health assistant
              </span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl"
              variants={itemVariants}
            >
              MediAI helps you analyze symptoms, assess severity, 
              and get personalized health guidance. Your health matters, 
              and we're here to help you understand it better.
            </motion.p>
            <motion.div 
              className="mt-8 sm:mt-10"
              variants={itemVariants}
            >
              <div className="rounded-md shadow">
                {isAuthenticated ? (
                  <Button
                    onClick={() => navigate('/symptom')}
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-white bg-medical-500 hover:bg-medical-600 dark:bg-medical-600 dark:hover:bg-medical-700 md:py-6 md:text-lg md:px-10"
                  >
                    Check My Symptoms
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/register')}
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-white bg-medical-500 hover:bg-medical-600 dark:bg-medical-600 dark:hover:bg-medical-700 md:py-6 md:text-lg md:px-10"
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
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-medical-600 dark:text-medical-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-6 md:text-lg md:px-10"
                  >
                    My Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/about')}
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-medical-600 dark:text-medical-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-6 md:text-lg md:px-10"
                  >
                    Learn More
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            variants={itemVariants}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-float"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute top-0 -right-4 w-72 h-72 bg-teal-300 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-float"
                animate={{
                  y: [0, 10, 0],
                  x: [0, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute -bottom-8 left-20 w-72 h-72 bg-medical-300 dark:bg-medical-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-float"
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
              
              {/* Main content - Updated to show project information */}
              <motion.div 
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                  <motion.h3 
                    className="text-xl font-bold mb-4 text-medical-600 dark:text-medical-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    About MediAI
                  </motion.h3>
                  
                  <motion.div 
                    className="space-y-4 text-sm text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p>
                      MediAI is an advanced, AI-powered platform revolutionizing healthcare by 
                      enhancing diagnostic accuracy, streamlining clinical workflows, and enabling 
                      personalized patient care.
                    </p>
                    
                    <p>
                      By leveraging cutting-edge machine learning algorithms, natural language 
                      processing, and real-time data analytics, MediAI supports medical professionals 
                      in making informed decisions.
                    </p>
                    
                    <p>
                      The system integrates with electronic health records, medical imaging tools, 
                      and wearable health devices to provide a comprehensive, data-driven approach 
                      to healthcare delivery.
                    </p>
                    
                    <motion.div 
                      className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="flex items-center gap-2 text-medical-500 dark:text-medical-400 font-semibold">
                        <div className="w-2 h-2 bg-medical-500 dark:bg-medical-400 rounded-full"></div>
                        Diagnostic Accuracy
                      </div>
                      <div className="flex items-center gap-2 text-purple-500 dark:text-purple-400 font-semibold mt-2">
                        <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                        Clinical Workflow Optimization
                      </div>
                      <div className="flex items-center gap-2 text-teal-500 dark:text-teal-400 font-semibold mt-2">
                        <div className="w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                        Personalized Patient Care
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
