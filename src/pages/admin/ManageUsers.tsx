
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { 
  Search, 
  User, 
  MoreHorizontal, 
  Eye, 
  MailPlus, 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Loader2 
} from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  _id: string;
  userId: string;
  action: string;
  details: any;
  timestamp: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  gender: string;
  age?: number;
  phone?: string;
  address?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const ManageUsers = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [viewingActivities, setViewingActivities] = useState(false);
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminService.getUsers
  });

  const { data: activities, isLoading: loadingActivities } = useQuery({
    queryKey: ['user-activities', selectedUser?._id],
    queryFn: () => adminService.getUserActivities(selectedUser?._id!),
    enabled: !!selectedUser && viewingActivities
  });

  const toggleStatusMutation = useMutation({
    mutationFn: adminService.toggleUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        description: `User ${selectedUser?.isActive ? 'deactivated' : 'activated'} successfully`
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: 'Failed to update user status'
      });
    }
  });

  const toggleUserStatus = (user: UserData) => {
    setSelectedUser(user);
    toggleStatusMutation.mutate(user._id);
  };

  const viewUserActivities = (user: UserData) => {
    setSelectedUser(user);
    setViewingActivities(true);
  };

  const filteredUsers = users?.filter((user: UserData) => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl">Manage Users</CardTitle>
              <CardDescription>View and manage all registered users</CardDescription>
            </div>
            <div className="relative mt-4 md:mt-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="w-full md:w-[250px] pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.length > 0 ? (
                    filteredUsers.map((user: UserData) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge variant={user.isActive ? "success" : "destructive"}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => viewUserActivities(user)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Activities
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MailPlus className="h-4 w-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toggleUserStatus(user)}>
                                {user.isActive ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-2 text-destructive" />
                                    <span className="text-destructive">Deactivate User</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                    <span className="text-green-500">Activate User</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Activities Dialog */}
      <Dialog open={viewingActivities} onOpenChange={setViewingActivities}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {selectedUser?.name}'s Activities
            </DialogTitle>
            <DialogDescription>
              Recent system activities for this user
            </DialogDescription>
          </DialogHeader>

          {loadingActivities ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : activities?.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity: Activity) => (
                <div 
                  key={activity._id} 
                  className="flex items-start space-x-4 border-b pb-4 last:border-0"
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    {getActivityIcon(activity.action)}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(activity.timestamp), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.details && JSON.stringify(activity.details)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">No Activities Found</h3>
              <p className="text-muted-foreground">
                This user has no recorded activities yet.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const getActivityIcon = (action: string) => {
  if (action.includes("login") || action.includes("login")) return <User className="h-4 w-4 text-blue-500" />;
  if (action.includes("symptom") || action.includes("check")) return <Shield className="h-4 w-4 text-green-500" />;
  if (action.includes("assessment")) return <CheckCircle2 className="h-4 w-4 text-purple-500" />;
  return <Clock className="h-4 w-4 text-gray-500" />;
};

export default ManageUsers;
