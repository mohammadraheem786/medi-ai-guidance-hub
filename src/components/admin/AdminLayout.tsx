
import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useMediaQuery } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  BellRing,
  FileText,
  BarChart3,
  Settings,
  MoonStar,
  Sun
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    // Close sidebar on mobile when route changes
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  useEffect(() => {
    // Update sidebar state based on screen size
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/admin/dashboard',
      active: location.pathname === '/admin/dashboard',
    },
    {
      name: 'Manage Users',
      icon: <Users className="h-5 w-5" />,
      href: '/admin/users',
      active: location.pathname === '/admin/users',
    },
    {
      name: 'Manage Doctors',
      icon: <UserCog className="h-5 w-5" />,
      href: '/admin/doctors',
      active: location.pathname === '/admin/doctors',
    },
    {
      name: 'Announcements',
      icon: <BellRing className="h-5 w-5" />,
      href: '/admin/announcements',
      active: location.pathname === '/admin/announcements',
    },
    {
      name: 'Content & FAQs',
      icon: <FileText className="h-5 w-5" />,
      href: '/admin/content',
      active: location.pathname === '/admin/content',
    },
    {
      name: 'Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      href: '/admin/analytics',
      active: location.pathname === '/admin/analytics',
    },
    {
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/admin/settings',
      active: location.pathname === '/admin/settings',
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar - desktop */}
      <div
        className={`${
          sidebarOpen ? 'lg:w-64 w-64' : 'lg:w-20 w-0'
        } fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out lg:relative`}
      >
        <div className={`h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm flex flex-col ${
          !sidebarOpen && "lg:items-center"
        }`}>
          {/* Header */}
          <div className="flex items-center h-16 px-4 border-b dark:border-gray-700">
            <div className="flex-1 flex items-center justify-between">
              {sidebarOpen && (
                <span className="font-bold text-lg text-medical-600 dark:text-medical-400">
                  MediAI Admin
                </span>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="ml-auto"
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-grow overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-medical-100 text-medical-700 dark:bg-medical-900 dark:text-medical-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  } ${!sidebarOpen && "justify-center"}`}
                >
                  <div className="mr-3">{item.icon}</div>
                  {sidebarOpen && <span>{item.name}</span>}
                  {sidebarOpen && item.active && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex flex-col space-y-2">
              {sidebarOpen && (
                <Button
                  variant="ghost"
                  className="justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 mr-3" />
                  ) : (
                    <MoonStar className="h-5 w-5 mr-3" />
                  )}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
              )}

              <Button
                variant="ghost"
                className={`text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
                  sidebarOpen ? "justify-start" : "justify-center"
                }`}
                onClick={handleLogout}
              >
                <LogOut className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} />
                {sidebarOpen && "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        {/* Mobile header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu size={20} />
            </Button>
            <span className="font-semibold text-lg text-medical-600 dark:text-medical-400">
              MediAI Admin
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-screen">
          <div className="container mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
