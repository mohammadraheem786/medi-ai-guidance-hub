
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, AlertTriangle, Info, AlertCircle, Trash2, PlusCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  importance: 'info' | 'warning' | 'critical';
  createdAt: string;
  expiresAt?: string;
}

const ManageAnnouncements = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    importance: 'info' as 'info' | 'warning' | 'critical',
    expiresAt: ''
  });

  const queryClient = useQueryClient();

  const { data: announcements, isLoading, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: adminService.getAnnouncements
  });

  const createMutation = useMutation({
    mutationFn: adminService.createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ description: "Announcement created successfully" });
      setIsDialogOpen(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ description: "Announcement deleted successfully" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const announcementData = {
      ...newAnnouncement,
      expiresAt: newAnnouncement.expiresAt ? new Date(newAnnouncement.expiresAt) : undefined
    };

    createMutation.mutate(announcementData);
  };

  const resetForm = () => {
    setNewAnnouncement({
      title: '',
      content: '',
      importance: 'info',
      expiresAt: ''
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      deleteMutation.mutate(id);
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading announcements...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500">
        <AlertCircle className="h-8 w-8 mr-2" />
        <span>Error loading announcements</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Announcements</h1>
          <p className="text-muted-foreground">Create and manage system announcements for users</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Create a new announcement that will be shown to all users of the system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="content">Content</label>
                  <Textarea
                    id="content"
                    placeholder="Announcement content..."
                    rows={4}
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="importance">Importance</label>
                  <Select
                    value={newAnnouncement.importance}
                    onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, importance: value as 'info' | 'warning' | 'critical' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select importance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="expiryDate">Expiry Date (Optional)</label>
                  <Input
                    id="expiryDate"
                    type="datetime-local"
                    value={newAnnouncement.expiresAt}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, expiresAt: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Announcement
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements?.length > 0 ? (
          announcements.map((announcement: Announcement) => (
            <Card key={announcement._id} className={`shadow-sm border ${getImportanceClass(announcement.importance)}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {getImportanceIcon(announcement.importance)}
                    <CardTitle className="ml-2 text-xl">{announcement.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(announcement._id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription>
                  Created on {format(new Date(announcement.createdAt), 'MMM dd, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{announcement.content}</p>
              </CardContent>
              {announcement.expiresAt && (
                <CardFooter className="text-xs text-muted-foreground">
                  Expires on {format(new Date(announcement.expiresAt), 'MMM dd, yyyy, HH:mm')}
                </CardFooter>
              )}
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-10 bg-muted/40 rounded-lg">
            <h3 className="font-medium text-xl mb-2">No announcements found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first announcement to notify users about important updates.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>Create Announcement</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
