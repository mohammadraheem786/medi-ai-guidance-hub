
import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  gender: z.enum(['Male', 'Female', 'Other']),
  age: z.coerce.number().min(1, { message: 'Age must be a positive number' }).optional(),
  address: z.string().optional(),
  medicalHistory: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isAuthenticated, isLoading, isAdmin } = useAuth();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      gender: 'Other',
      age: undefined,
      address: '',
      medicalHistory: ''
    },
  });

  const onSubmit = async (values: FormValues) => {
    setError('');
    setIsSubmitting(true);
    
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        gender: values.gender,
        age: values.age,
        address: values.address || '',
        medicalHistory: values.medicalHistory || ''
      });
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10 text-medical-500" />
      </div>
    );
  }

  if (isAuthenticated) {
    return isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10"
    >
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="shadow-lg border-medical-200 dark:border-medical-800">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                <span className="medical-text-gradient">Create your MediAI account</span>
              </CardTitle>
              <CardDescription className="text-center dark:text-gray-400">
                Enter your details to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              type="text" 
                              {...field} 
                              disabled={isSubmitting}
                              className="bg-white dark:bg-gray-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              type="email" 
                              {...field} 
                              disabled={isSubmitting}
                              className="bg-white dark:bg-gray-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Create a password" 
                              type="password" 
                              {...field} 
                              disabled={isSubmitting}
                              className="bg-white dark:bg-gray-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your phone number" 
                              type="tel" 
                              {...field} 
                              disabled={isSubmitting}
                              className="bg-white dark:bg-gray-800"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value} 
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white dark:bg-gray-800">
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your age" 
                              type="number" 
                              {...field} 
                              disabled={isSubmitting}
                              className="bg-white dark:bg-gray-800"
                              onChange={(e) => {
                                const value = e.target.value === '' ? undefined : parseInt(e.target.value);
                                field.onChange(value);
                              }}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your address" 
                            type="text" 
                            {...field} 
                            disabled={isSubmitting}
                            className="bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="medicalHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical History (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter any relevant medical history" 
                            {...field} 
                            disabled={isSubmitting}
                            className="bg-white dark:bg-gray-800 min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-medical-500 hover:bg-medical-600 dark:bg-medical-600 dark:hover:bg-medical-500" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader className="animate-spin mr-2" size={16} /> : null}
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center">
              <div className="text-sm dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-medical-600 hover:underline dark:text-medical-400">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
