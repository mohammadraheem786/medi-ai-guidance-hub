import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { translate } = useLanguage();

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-medical-600 dark:text-medical-400">MediAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-medical-600 dark:hover:text-medical-400 transition-colors">
              {translate("nav.home")}
            </Link>
            <Link to="/about" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-medical-600 dark:hover:text-medical-400 transition-colors">
              {translate("nav.about")}
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-medical-600 dark:hover:text-medical-400 transition-colors">
                {translate("nav.dashboard")}
              </Link>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            <LanguageSelector />
            <ThemeToggle />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">{translate("nav.dashboard")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    {translate("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">{translate("nav.login")}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{translate("nav.register")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {translate("nav.home")}
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {translate("nav.about")}
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {translate("nav.dashboard")}
              </Link>
            )}
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full justify-start"
                variant="ghost"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {translate("nav.logout")}
              </Button>
            ) : (
              <div className="space-y-2 pt-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={closeMobileMenu}>{translate("nav.login")}</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register" onClick={closeMobileMenu}>{translate("nav.register")}</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
