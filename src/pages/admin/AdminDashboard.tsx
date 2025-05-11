
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services/api';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  UserCog, 
  Stethoscope, 
  ActivitySquare,
  AlertTriangle, 
  BarChart3, 
  ArrowUpRight,
  Clipboard, 
  ClipboardCheck,
  Loader2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: adminService.getAnalytics
  });

  // Placeholder data for charts
  const userGrowthData = [
    { month: 'Jan', users: 20 },
    { month: 'Feb', users: 35 },
    { month: 'Mar', users: 45 },
    { month: 'Apr', users: 60 },
    { month: 'May', users: 75 },
    { month: 'Jun', users: 90 }
  ];

  const statCards = [
    {
      title: 'Total Users',
      value: analytics?.totalUsers || 0,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+12%',
      changeDirection: 'up'
    },
    {
      title: 'Active Users',
      value: analytics?.activeUsers || 0,
      icon: <UserCheck className="h-8 w-8 text-green-500" />,
      color: 'bg-green-50 dark:bg-green-900/20',
      change: '+8%',
      changeDirection: 'up'
    },
    {
      title: 'Inactive Users',
      value: analytics?.inactiveUsers || 0,
      icon: <UserMinus className="h-8 w-8 text-orange-500" />,
      color: 'bg-orange-50 dark:bg-orange-900/20',
      change: '-2%',
      changeDirection: 'down'
    },
    {
      title: 'Total Doctors',
      value: analytics?.totalDoctors || 0,
      icon: <Stethoscope className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+5%',
      changeDirection: 'up'
    },
    {
      title: 'Symptoms',
      value: analytics?.totalSymptoms || 0,
      icon: <Clipboard className="h-8 w-8 text-teal-500" />,
      color: 'bg-teal-50 dark:bg-teal-900/20',
      change: '+3%',
      changeDirection: 'up'
    },
    {
      title: 'Conditions',
      value: analytics?.totalConditions || 0,
      icon: <ClipboardCheck className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-50 dark:bg-indigo-900/20',
      change: '+7%',
      changeDirection: 'up'
    }
  ];

  const renderChangeIndicator = (change: string, direction: string) => {
    return (
      <div className={`flex items-center text-xs font-medium ${
        direction === 'up' ? 'text-green-500' : 'text-red-500'
      }`}>
        {direction === 'up' ? (
          <ArrowUpRight className="h-3 w-3 mr-1" />
        ) : (
          <ArrowUpRight className="h-3 w-3 mr-1 transform rotate-180" />
        )}
        <span>{change} from last month</span>
      </div>
    );
  };

  const renderPlaceholder = () => (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
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

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard data...
          </p>
        </div>
        {renderPlaceholder()}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the MediAI admin dashboard. View and manage your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-300">
                  <CardContent className={`p-6 ${card.color}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{card.value}</h3>
                        {renderChangeIndicator(card.change, card.changeDirection)}
                      </div>
                      {card.icon}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>View detailed {card.title.toLowerCase()} statistics</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[250px] flex items-end justify-between">
              {userGrowthData.map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className="bg-primary/80 hover:bg-primary rounded-t w-12 transition-all" 
                    style={{ height: `${item.users * 2}px` }}
                  ></div>
                  <span className="text-xs mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ActivitySquare className="h-5 w-5 mr-2 text-primary" /> 
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.recentActivities ? (
                analytics.recentActivities.map((activity: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4 p-2 hover:bg-muted/50 rounded-md">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ActivitySquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        User ID: {activity.userId}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(activity.timestamp), 'MMM dd, HH:mm')}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-muted-foreground">
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  <p>No recent activities found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
