
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
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  User, 
  CalendarRange, 
  MapPin,
  Briefcase,
  Loader
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  district: string;
  availability: string;
  experience: string;
  imageUrl?: string;
  createdAt: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  specialization: z.string().min(2, { message: 'Specialization is required' }),
  district: z.string().min(2, { message: 'District is required' }),
  availability: z.string().min(2, { message: 'Availability is required' }),
  experience: z.string().min(1, { message: 'Experience is required' }),
  imageUrl: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      specialization: '',
      district: '',
      availability: '',
      experience: '',
      imageUrl: '/placeholder.svg'
    }
  });

  const editForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      specialization: '',
      district: '',
      availability: '',
      experience: '',
      imageUrl: '/placeholder.svg'
    }
  });

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await adminService.getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast({
        title: "Error",
        description: "Failed to load doctors data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(search.toLowerCase()) || 
    doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
    doctor.district.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDoctor = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await adminService.addDoctor(data);
      setIsAddDialogOpen(false);
      addForm.reset();
      toast({
        title: "Success",
        description: "Doctor added successfully",
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast({
        title: "Error",
        description: "Failed to add doctor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditDoctor = async (data: FormValues) => {
    if (!selectedDoctor) return;
    
    setIsSubmitting(true);
    try {
      await adminService.updateDoctor(selectedDoctor._id, data);
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Doctor updated successfully",
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast({
        title: "Error",
        description: "Failed to update doctor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDoctor = async () => {
    if (!selectedDoctor) return;
    
    setIsSubmitting(true);
    try {
      await adminService.deleteDoctor(selectedDoctor._id);
      setIsDeleteAlertOpen(false);
      toast({
        title: "Success",
        description: "Doctor deleted successfully",
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast({
        title: "Error",
        description: "Failed to delete doctor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    editForm.reset({
      name: doctor.name,
      specialization: doctor.specialization,
      district: doctor.district,
      availability: doctor.availability,
      experience: doctor.experience,
      imageUrl: doctor.imageUrl
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteAlert = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteAlertOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Doctors</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add, edit, or remove doctors from the platform.
        </p>
      </div>
      
      <Card className="border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
            <div>
              <CardTitle>Doctors</CardTitle>
              <CardDescription>
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} registered
              </CardDescription>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search doctors..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Doctor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Doctor</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new doctor.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...addForm}>
                    <form onSubmit={addForm.handleSubmit(handleAddDoctor)} className="space-y-4">
                      <FormField
                        control={addForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doctor's full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="specialization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specialization</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., Cardiologist" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={addForm.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <FormControl>
                                <Input placeholder="E.g., Hyderabad" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addForm.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Experience</FormLabel>
                              <FormControl>
                                <Input placeholder="E.g., 10 years" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={addForm.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Availability</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., Mon-Fri, 9AM-5PM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="/placeholder.svg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                          Add Doctor
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
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
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead className="text-right w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No doctors found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDoctors.map((doctor, index) => (
                      <TableRow key={doctor._id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              {doctor.imageUrl ? (
                                <img 
                                  src={doctor.imageUrl} 
                                  alt={doctor.name}
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <User className="w-6 h-6 text-gray-500" />
                              )}
                            </div>
                            <span>{doctor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                          {doctor.specialization}
                        </TableCell>
                        <TableCell className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          {doctor.district}
                        </TableCell>
                        <TableCell className="flex items-center">
                          <CalendarRange className="h-4 w-4 mr-2 text-gray-500" />
                          {doctor.availability}
                        </TableCell>
                        <TableCell>{doctor.experience}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(doctor)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive/90"
                              onClick={() => openDeleteAlert(doctor)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
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

      {/* Edit Doctor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
            <DialogDescription>
              Update the doctor's information.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditDoctor)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Doctor Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {selectedDoctor?.name} from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteDoctor}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageDoctors;
