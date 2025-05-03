import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { User, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Define types for doctor data
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  district: string;
  availability: string;
  experience: string;
  imageUrl?: string;
}

// Telangana districts
const DISTRICTS = [
  "All Districts",
  "Hyderabad",
  "Warangal",
  "Nizamabad",
  "Karimnagar",
  "Khammam",
  "Adilabad",
  "Mahabubnagar",
  "Nalgonda",
  "Rangareddy",
  "Medak"
];

// Sample doctor data
const DOCTORS: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Priya Sharma",
    specialization: "Cardiologist",
    district: "Hyderabad",
    availability: "Mon-Fri, 9AM-5PM",
    experience: "15 years",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "doc2",
    name: "Dr. Rajesh Kumar",
    specialization: "Neurologist",
    district: "Hyderabad",
    availability: "Mon-Wed, 10AM-6PM",
    experience: "12 years",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "doc3",
    name: "Dr. Ananya Reddy",
    specialization: "Pediatrician",
    district: "Warangal",
    availability: "Tue-Sat, 9AM-4PM",
    experience: "10 years",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "doc4",
    name: "Dr. Suresh Rao",
    specialization: "Orthopedic",
    district: "Nizamabad",
    availability: "Mon-Thu, 11AM-7PM",
    experience: "18 years",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "doc5",
    name: "Dr. Meena Patel",
    specialization: "Gynecologist",
    district: "Karimnagar",
    availability: "Wed-Sun, 10AM-5PM",
    experience: "14 years",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "doc6",
    name: "Dr. Vikram Singh",
    specialization: "Dermatologist",
    district: "Khammam",
    availability: "Mon-Fri, 9AM-3PM",
    experience: "9 years",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "doc7",
    name: "Dr. Lakshmi Devi",
    specialization: "Psychiatrist",
    district: "Hyderabad",
    availability: "Tue-Sat, 12PM-8PM",
    experience: "11 years",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "doc8",
    name: "Dr. Arjun Reddy",
    specialization: "General Physician",
    district: "Warangal",
    availability: "Mon-Sun, 8AM-12PM",
    experience: "7 years",
    imageUrl: "/placeholder.svg"
  }
];

const Doctors = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All Districts");
  const { translate } = useLanguage();

  // Filter doctors based on selected district
  const filteredDoctors = useMemo(() => {
    if (selectedDistrict === "All Districts") {
      return DOCTORS;
    }
    return DOCTORS.filter(doctor => doctor.district === selectedDistrict);
  }, [selectedDistrict]);

  // Group doctors by district for display
  const doctorsByDistrict = useMemo(() => {
    if (selectedDistrict === "All Districts") {
      return DISTRICTS.slice(1).reduce((acc, district) => {
        const doctorsInDistrict = DOCTORS.filter(doctor => doctor.district === district);
        if (doctorsInDistrict.length > 0) {
          acc[district] = doctorsInDistrict;
        }
        return acc;
      }, {} as Record<string, Doctor[]>);
    }
    
    return {
      [selectedDistrict]: filteredDoctors
    };
  }, [selectedDistrict, filteredDoctors]);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-medical-600 dark:text-medical-400 mb-2">
          {translate("doctors.title", "Consult a Doctor")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {translate("doctors.description", "Connect with skilled healthcare professionals across Telangana. Filter by district to find doctors near you.")}
        </p>
      </motion.div>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-64">
          <Select
            value={selectedDistrict}
            onValueChange={(value) => setSelectedDistrict(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={translate("doctors.selectDistrict", "Select District")} />
            </SelectTrigger>
            <SelectContent>
              {DISTRICTS.map((district) => (
                <SelectItem key={district} value={district}>
                  {translate(`districts.${district.toLowerCase().replace(/\s+/g, '')}`, district)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          {translate("doctors.showing", "Showing")} {filteredDoctors.length} {translate("doctors.doctors", "doctors")}
        </div>
      </div>

      <div className="space-y-10">
        {Object.entries(doctorsByDistrict).map(([district, doctors]) => (
          <motion.div
            key={district}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <MapPin className="mr-2 text-medical-600 dark:text-medical-400" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {translate(`districts.${district.toLowerCase().replace(/\s+/g, '')}`, district)}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden h-full border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="bg-medical-50/50 dark:bg-gray-800/50 pb-3">
                      <div className="flex items-start space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          {doctor.imageUrl ? (
                            <img 
                              src={doctor.imageUrl} 
                              alt={doctor.name}
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-medical-600 dark:text-medical-400">
                            {doctor.name}
                          </CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-300 font-medium">
                            {doctor.specialization} • {doctor.experience}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{doctor.district}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{doctor.availability}</span>
                        </div>
                      </div>
                      <button 
                        className="mt-4 w-full bg-medical-500 hover:bg-medical-600 text-white py-2 rounded-md transition-colors"
                      >
                        {translate("doctors.bookAppointment", "Book Appointment")}
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
