import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

// Create axios instance with base URL
// Using relative URL to make it work in both development and production
const api = axios.create({
  baseURL: 'http://localhost:5000/api/', // Replace with your actual base URL
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
    
    // Don't show network errors as toast to avoid spamming the user
    if (error.message !== 'Network Error') {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      });
    }
    
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
  register: async (userData: { 
    name: string, 
    email: string, 
    password: string,
    phone: string,
    gender: string,
    age?: number,
    address?: string,
    medicalHistory?: string
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role || 'user');
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  login: async (credentials: { email: string, password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role || 'user');
    }
    return response.data;
  },
  
  getCurrentUser: async () => {
    return api.get('/auth/me');
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },
  
  isAdmin: () => {
    return localStorage.getItem('userRole') === 'admin';
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

// Admin service
export const adminService = {
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  
  getUserById: async (id: string) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },
  
  getUserActivities: async (id: string) => {
    const response = await api.get(`/admin/users/${id}/activities`);
    return response.data;
  },
  
  getDoctors: async () => {
    const response = await api.get('/admin/doctors');
    return response.data;
  },
  
  addDoctor: async (doctor: {
    name: string,
    specialization: string,
    district: string,
    availability: string,
    experience: string,
    imageUrl?: string
  }) => {
    const response = await api.post('/admin/doctors', doctor);
    return response.data;
  },
  
  updateDoctor: async (id: string, doctor: {
    name: string,
    specialization: string,
    district: string,
    availability: string,
    experience: string,
    imageUrl?: string
  }) => {
    const response = await api.put(`/admin/doctors/${id}`, doctor);
    return response.data;
  },
  
  deleteDoctor: async (id: string) => {
    const response = await api.delete(`/admin/doctors/${id}`);
    return response.data;
  }
};

export default api;
