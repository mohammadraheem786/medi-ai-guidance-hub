
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminService } from '@/services/api';
import { Users, User, CalendarCheck, AlertTriangle } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalDoctors: number;
  totalAppointments: number;
  pendingIssues: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingIssues: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch users and doctors
        const [users, doctors] = await Promise.all([
          adminService.getUsers(),
          adminService.getDoctors()
        ]);
        
        setStats({
          totalUsers: users.length,
          totalDoctors: doctors.length,
          totalAppointments: 8, // Placeholder
          pendingIssues: 2 // Placeholder
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: <User className="h-8 w-8 text-green-500" />,
      color: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Appointments',
      value: stats.totalAppointments,
      icon: <CalendarCheck className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Pending Issues',
      value: stats.pendingIssues,
      icon: <AlertTriangle className="h-8 w-8 text-orange-500" />,
      color: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const renderPlaceholder = () => (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the MediAI admin dashboard. View and manage your site.
        </p>
      </div>

      {loading ? (
        renderPlaceholder()
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800">
              <CardContent className={`p-6 ${card.color}`}>
                <div className="flex items-center space-x-4">
                  {card.icon}
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{card.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              Recent users will appear here. This is a placeholder for future functionality.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              System activity logs will appear here. This is a placeholder for future functionality.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
