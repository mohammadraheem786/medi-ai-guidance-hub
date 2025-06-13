
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';

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
      description: 'Select from our comprehensive list of symptoms to describe what you\'re experiencing.',
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

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Hero />
      
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">How MediAI Helps You</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our intelligent health platform is designed to provide guidance when you need it most.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md dark:shadow-gray-900/20 transition-all duration-300 bg-white dark:bg-gray-800 h-full">
                  <CardHeader>
                    <CardTitle className="dark:text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300 min-h-[80px]">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={feature.action}
                      className="w-full bg-medical-500 hover:bg-medical-600 dark:bg-medical-600 dark:hover:bg-medical-700"
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300">
              MediAI provides a simple, step-by-step process to help you understand your health concerns
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {howItWorks.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/40 transition-all"
                variants={cardVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="text-2xl font-bold text-medical-500 dark:text-medical-400 mb-3">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="bg-medical-500 hover:bg-medical-600 dark:bg-medical-600 dark:hover:bg-medical-700"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-medical-500 to-teal-500 dark:from-medical-600 dark:to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to take control of your health?
          </motion.h2>
          <motion.p 
            className="text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of users who rely on MediAI for health guidance and personalized recommendations.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={() => navigate('/register')} 
              size="lg"
              variant="secondary"
              className="hover-scale"
            >
              Sign Up - It's Free
            </Button>
            <Button 
              onClick={() => navigate('/about')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 hover-scale"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>
      
      <motion.footer 
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <motion.h2 
              className="text-2xl font-bold mb-6"
              whileHover={{ scale: 1.05 }}
            >
              MediAI
            </motion.h2>
            <p className="text-gray-400 text-center max-w-lg mb-6">
              MediAI provides informational health guidance only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always consult qualified healthcare providers.
            </p>
            <div className="flex flex-wrap space-x-6 justify-center">
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                Contact
              </motion.a>
            </div>
            <div className="mt-8 text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MediAI. All rights reserved.
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Index;
