
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { authService } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  gender?: string;
  age?: number;
  address?: string;
  medicalHistory?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  age?: number;
  address?: string;
  medicalHistory?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Export AuthProvider as a named function component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    
    setIsAdmin(userRole === 'admin');
    
    if (storedToken) {
      setToken(storedToken);
      
      // Fetch current user
      authService.getCurrentUser()
        .then(response => {
          const userData = response.data;
          setUser({
            id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            phone: userData.phone,
            gender: userData.gender,
            age: userData.age,
            address: userData.address,
            medicalHistory: userData.medicalHistory
          });
          
          setIsAdmin(userData.role === 'admin');
        })
        .catch(() => {
          // If token is invalid, remove it
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          setToken(null);
          setIsAdmin(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      
      setToken(response.token);
      setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role
      });
      
      setIsAdmin(response.user.role === 'admin');
      
      // Store the token in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userRole", response.user.role || 'user');
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.user.name}!`,
      });
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    
    try {
      const response = await authService.register(data);
      
      setToken(response.token);
      setUser({
        id: response.user.id || response.id,
        name: response.user.name || data.name,
        email: response.user.email || data.email,
        role: response.user.role || 'user',
        phone: data.phone,
        gender: data.gender,
        age: data.age,
        address: data.address,
        medicalHistory: data.medicalHistory
      });
      
      setIsAdmin(false); // New users are never admins
      
      // Store the token in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userRole", response.user.role || 'user');
      
      toast({
        title: "Registration Successful",
        description: `Welcome to MediAI, ${data.name}!`,
      });
      
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMsg,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    token,
    isLoading,
    isAdmin,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
