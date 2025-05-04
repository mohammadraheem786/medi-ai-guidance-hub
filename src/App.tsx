
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Loader from "@/components/ui/loader";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SymptomPage from "./pages/SymptomPage";
import Assessment from "./pages/Assessment";
import HealthTips from "./pages/HealthTips";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Suspense, lazy } from "react";

// Admin routes - lazy loaded
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const ManageDoctors = lazy(() => import('./pages/admin/ManageDoctors'));

// Admin route protection
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  return isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen bg-background transition-colors duration-300">
                  <Suspense fallback={
                    <div className="flex items-center justify-center w-full h-screen">
                      <Loader size="large" text="Loading..." />
                    </div>
                  }>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<><Navbar /><Index /></>} />
                      <Route path="/login" element={<><Navbar /><Login /></>} />
                      <Route path="/register" element={<><Navbar /><Register /></>} />
                      <Route path="/about" element={<><Navbar /><About /></>} />
                      <Route path="/doctors" element={<><Navbar /><Doctors /></>} />
                      
                      {/* Protected User Routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
                        <Route path="/symptom" element={<><Navbar /><SymptomPage /></>} />
                        <Route path="/assessment" element={<><Navbar /><Assessment /></>} />
                        <Route path="/health-tips" element={<><Navbar /><HealthTips /></>} />
                      </Route>
                      
                      {/* Admin Routes */}
                      <Route path="/admin" element={
                        <AdminRoute>
                          <AdminLayout>
                            <Navigate to="/admin/dashboard" replace />
                          </AdminLayout>
                        </AdminRoute>
                      } />
                      <Route path="/admin/dashboard" element={
                        <AdminRoute>
                          <AdminLayout>
                            <AdminDashboard />
                          </AdminLayout>
                        </AdminRoute>
                      } />
                      <Route path="/admin/users" element={
                        <AdminRoute>
                          <AdminLayout>
                            <ManageUsers />
                          </AdminLayout>
                        </AdminRoute>
                      } />
                      <Route path="/admin/doctors" element={
                        <AdminRoute>
                          <AdminLayout>
                            <ManageDoctors />
                          </AdminLayout>
                        </AdminRoute>
                      } />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
