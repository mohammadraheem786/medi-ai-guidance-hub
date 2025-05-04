
import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight 
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 px-4 py-2 flex items-center justify-between border-b dark:border-gray-700">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <span className="ml-2 font-semibold text-lg text-medical-600 dark:text-medical-400">
            Admin Panel
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut size={20} />
        </Button>
      </div>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-gray-800/50 dark:bg-gray-900/80 backdrop-blur-sm" onClick={toggleSidebar}>
          <div className="fixed top-12 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={toggleSidebar}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-medical-100 text-medical-700 dark:bg-medical-900 dark:text-medical-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="mr-3">{item.icon}</div>
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="h-full flex flex-col">
          <div className="flex items-center h-16 px-6 border-b dark:border-gray-700">
            <span className="font-semibold text-xl text-medical-600 dark:text-medical-400">
              Admin Panel
            </span>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-medical-100 text-medical-700 dark:bg-medical-900 dark:text-medical-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="mr-3">{item.icon}</div>
                  {item.name}
                  {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              ))}
            </div>
          </div>
          <div className="p-4 border-t dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:pt-0 pt-12 overflow-hidden">
        <div className="max-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
