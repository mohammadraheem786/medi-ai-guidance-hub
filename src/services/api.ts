
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'An error occurred';
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive'
    });
    
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  register: async (userData: { name: string, email: string, password: string }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  login: async (credentials: { email: string, password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  getCurrentUser: async () => {
    return api.get('/auth/me');
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  }
};

// Symptoms service
export const symptomsService = {
  getAllSymptoms: async () => {
    const response = await api.get('/symptoms');
    return response.data;
  },
  
  analyzeSymptoms: async (symptoms: string[]) => {
    const response = await api.post('/symptoms/analyze', { symptoms });
    return response.data;
  },
  
  getSymptomByName: async (name: string) => {
    const response = await api.get(`/symptoms/${encodeURIComponent(name)}`);
    return response.data;
  }
};

// Assessments service
export const assessmentsService = {
  submitAssessment: async (answers: any[]) => {
    const response = await api.post('/assessments', { answers });
    return response.data;
  },
  
  getUserAssessments: async () => {
    const response = await api.get('/assessments');
    return response.data;
  },
  
  getAssessmentById: async (id: string) => {
    const response = await api.get(`/assessments/${id}`);
    return response.data;
  }
};

// Health tips service
export const healthTipsService = {
  getAllHealthTips: async () => {
    const response = await api.get('/health-tips');
    return response.data;
  },
  
  getHealthTipsByCategory: async (category: string) => {
    const response = await api.get(`/health-tips/category/${category}`);
    return response.data;
  },
  
  searchHealthTips: async (query: string) => {
    const response = await api.get(`/health-tips/search?query=${query}`);
    return response.data;
  },
  
  getPersonalizedHealthTips: async () => {
    const response = await api.get('/health-tips/personalized');
    return response.data;
  }
};

export default api;
