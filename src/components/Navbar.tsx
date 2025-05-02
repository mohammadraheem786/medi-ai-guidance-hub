
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" onClick={closeMenu}>
              <h1 className="text-xl font-bold text-medical-600">
                <span className="medical-text-gradient">MediAI</span>
              </h1>
            </Link>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  to="/" 
                  className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/') 
                    ? 'text-white bg-medical-500' 
                    : 'text-gray-600 hover:text-medical-600'
                  }`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
                
                {isAuthenticated && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/dashboard') 
                        ? 'text-white bg-medical-500' 
                        : 'text-gray-600 hover:text-medical-600'
                      }`}
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                    
                    <Link 
                      to="/symptom" 
                      className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/symptom') 
                        ? 'text-white bg-medical-500' 
                        : 'text-gray-600 hover:text-medical-600'
                      }`}
                      onClick={closeMenu}
                    >
                      Symptom Checker
                    </Link>
                    
                    <Link 
                      to="/health-tips" 
                      className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/health-tips') 
                        ? 'text-white bg-medical-500' 
                        : 'text-gray-600 hover:text-medical-600'
                      }`}
                      onClick={closeMenu}
                    >
                      Health Tips
                    </Link>
                  </>
                )}
                
                <Link 
                  to="/about" 
                  className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/about') 
                    ? 'text-white bg-medical-500' 
                    : 'text-gray-600 hover:text-medical-600'
                  }`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  className="text-gray-600 hover:text-medical-600"
                >
                  Logout
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => navigate('/login')}
                    variant="ghost" 
                    className="text-gray-600 hover:text-medical-600"
                  >
                    Login
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/register')}
                    variant="default" 
                    className="bg-medical-500 hover:bg-medical-600 text-white"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-medical-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
              ? 'text-white bg-medical-500' 
              : 'text-gray-600 hover:text-medical-600 hover:bg-gray-100'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/dashboard') 
                  ? 'text-white bg-medical-500' 
                  : 'text-gray-600 hover:text-medical-600 hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              
              <Link
                to="/symptom"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/symptom') 
                  ? 'text-white bg-medical-500' 
                  : 'text-gray-600 hover:text-medical-600 hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                Symptom Checker
              </Link>
              
              <Link
                to="/health-tips"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/health-tips') 
                  ? 'text-white bg-medical-500' 
                  : 'text-gray-600 hover:text-medical-600 hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                Health Tips
              </Link>
            </>
          )}
          
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') 
              ? 'text-white bg-medical-500' 
              : 'text-gray-600 hover:text-medical-600 hover:bg-gray-100'
            }`}
            onClick={closeMenu}
          >
            About
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="mt-3 px-2 space-y-1">
            {isAuthenticated ? (
              <Button
                className="block w-full text-left px-3 py-2"
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  className="block w-full text-left px-3 py-2 mb-2"
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    closeMenu();
                  }}
                >
                  Login
                </Button>
                
                <Button
                  className="block w-full text-left px-3 py-2 bg-medical-500"
                  onClick={() => {
                    navigate('/register');
                    closeMenu();
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
