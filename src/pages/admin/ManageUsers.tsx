
import { useEffect, useState } from 'react';
import { adminService } from '@/services/api';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Search, ArrowUpDown, File, Loader } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  age?: number;
  createdAt: string;
}

interface UserDetails extends User {
  address?: string;
  medicalHistory?: string;
  activities?: Array<{
    activity: string;
    timestamp: string;
  }>;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortBy) return 0;
    
    let valueA, valueB;
    
    if (sortBy === 'name') {
      valueA = a.name;
      valueB = b.name;
    } else if (sortBy === 'email') {
      valueA = a.email;
      valueB = b.email;
    } else if (sortBy === 'createdAt') {
      valueA = new Date(a.createdAt).getTime();
      valueB = new Date(b.createdAt).getTime();
    } else {
      return 0;
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const viewUserDetails = async (userId: string) => {
    setLoadingUserDetails(true);
    try {
      const userDetails = await adminService.getUserById(userId);
      const userActivities = await adminService.getUserActivities(userId);
      
      setSelectedUser({
        ...userDetails,
        activities: userActivities
      });
      setIsDetailsOpen(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoadingUserDetails(false);
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Users</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all registered users on the platform.
        </p>
      </div>
      
      <Card className="border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
            <div>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>
                {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} registered
              </CardDescription>
            </div>
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="h-8 w-8 text-medical-500 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        {sortBy === 'name' && (
                          <ArrowUpDown size={16} className={sortDirection === 'asc' ? 'transform rotate-180' : ''} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                      <div className="flex items-center space-x-1">
                        <span>Email</span>
                        {sortBy === 'email' && (
                          <ArrowUpDown size={16} className={sortDirection === 'asc' ? 'transform rotate-180' : ''} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer">
                      <div className="flex items-center space-x-1">
                        <span>Registered On</span>
                        {sortBy === 'createdAt' && (
                          <ArrowUpDown size={16} className={sortDirection === 'asc' ? 'transform rotate-180' : ''} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedUsers.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone || '-'}</TableCell>
                        <TableCell>{user.gender || '-'}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => viewUserDetails(user._id)}
                            disabled={loadingUserDetails}
                          >
                            {loadingUserDetails ? (
                              <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">View details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Full Name:</span>
                    <span className="font-medium">{selectedUser.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <span className="font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <span className="font-medium">{selectedUser.phone || '-'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Gender:</span>
                    <span className="font-medium">{selectedUser.gender || '-'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Age:</span>
                    <span className="font-medium">{selectedUser.age || '-'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Registered:</span>
                    <span className="font-medium">{formatDate(selectedUser.createdAt)}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Address</h3>
                <p className="border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  {selectedUser.address || 'No address provided'}
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Medical History</h3>
                <p className="border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  {selectedUser.medicalHistory || 'No medical history provided'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">User Activity</h3>
                {selectedUser.activities && selectedUser.activities.length > 0 ? (
                  <div className="space-y-2">
                    {selectedUser.activities.map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-2 border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <File className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{activity.activity}</p>
                          <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No activity recorded yet</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
