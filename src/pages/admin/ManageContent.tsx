
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, symptomsService } from '@/services/api';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Edit,
  Save,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle,
  FileQuestion,
  PlusCircle,
  Loader2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Symptom {
  _id: string;
  name: string;
  description: string;
  bodyPart: string;
  severity: 'mild' | 'moderate' | 'severe';
  personalizedAdvice?: string;
  possibleCauses?: string[];
  whenToSeekHelp?: string;
}

interface Condition {
  _id: string;
  name: string;
  symptoms: string[];
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  specificSymptomAdvice?: { symptom: string; advice: string }[];
}

const ManageContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSymptom, setCurrentSymptom] = useState<Symptom | null>(null);
  const [currentCondition, setCurrentCondition] = useState<Condition | null>(null);
  const [isSymptomDialogOpen, setIsSymptomDialogOpen] = useState(false);
  const [isConditionDialogOpen, setIsConditionDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: symptoms, isLoading: isLoadingSymptoms } = useQuery({
    queryKey: ['symptoms'],
    queryFn: symptomsService.getAllSymptoms
  });

  const updateSymptomMutation = useMutation({
    mutationFn: (data: { id: string, updates: Partial<Symptom> }) => 
      adminService.updateSymptom(data.id, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symptoms'] });
      toast({ description: "Symptom updated successfully" });
      setIsSymptomDialogOpen(false);
    }
  });

  const updateConditionMutation = useMutation({
    mutationFn: (data: { id: string, updates: Partial<Condition> }) => 
      adminService.updateCondition(data.id, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conditions'] });
      toast({ description: "Condition updated successfully" });
      setIsConditionDialogOpen(false);
    }
  });

  const editSymptom = (symptom: Symptom) => {
    setCurrentSymptom(symptom);
    setIsSymptomDialogOpen(true);
  };

  const editCondition = (condition: Condition) => {
    setCurrentCondition(condition);
    setIsConditionDialogOpen(true);
  };

  const handleSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSymptom?._id) return;

    const { _id, ...updates } = currentSymptom;
    updateSymptomMutation.mutate({
      id: _id,
      updates
    });
  };

  const handleConditionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCondition?._id) return;

    const { _id, ...updates } = currentCondition;
    updateConditionMutation.mutate({
      id: _id,
      updates
    });
  };

  const addPossibleCause = () => {
    if (!currentSymptom) return;
    setCurrentSymptom({
      ...currentSymptom,
      possibleCauses: [...(currentSymptom.possibleCauses || []), '']
    });
  };

  const updatePossibleCause = (index: number, value: string) => {
    if (!currentSymptom?.possibleCauses) return;
    const updatedCauses = [...currentSymptom.possibleCauses];
    updatedCauses[index] = value;
    setCurrentSymptom({
      ...currentSymptom,
      possibleCauses: updatedCauses
    });
  };

  const removePossibleCause = (index: number) => {
    if (!currentSymptom?.possibleCauses) return;
    const updatedCauses = [...currentSymptom.possibleCauses];
    updatedCauses.splice(index, 1);
    setCurrentSymptom({
      ...currentSymptom,
      possibleCauses: updatedCauses
    });
  };

  const addRecommendation = () => {
    if (!currentCondition) return;
    setCurrentCondition({
      ...currentCondition,
      recommendations: [...currentCondition.recommendations, '']
    });
  };

  const updateRecommendation = (index: number, value: string) => {
    if (!currentCondition?.recommendations) return;
    const updatedRecs = [...currentCondition.recommendations];
    updatedRecs[index] = value;
    setCurrentCondition({
      ...currentCondition,
      recommendations: updatedRecs
    });
  };

  const removeRecommendation = (index: number) => {
    if (!currentCondition?.recommendations) return;
    const updatedRecs = [...currentCondition.recommendations];
    updatedRecs.splice(index, 1);
    setCurrentCondition({
      ...currentCondition,
      recommendations: updatedRecs
    });
  };

  const addSpecificAdvice = () => {
    if (!currentCondition) return;
    setCurrentCondition({
      ...currentCondition,
      specificSymptomAdvice: [
        ...(currentCondition.specificSymptomAdvice || []),
        { symptom: '', advice: '' }
      ]
    });
  };

  const updateSpecificAdvice = (index: number, field: 'symptom' | 'advice', value: string) => {
    if (!currentCondition?.specificSymptomAdvice) return;
    const updatedAdvice = [...currentCondition.specificSymptomAdvice];
    updatedAdvice[index] = { ...updatedAdvice[index], [field]: value };
    setCurrentCondition({
      ...currentCondition,
      specificSymptomAdvice: updatedAdvice
    });
  };

  const removeSpecificAdvice = (index: number) => {
    if (!currentCondition?.specificSymptomAdvice) return;
    const updatedAdvice = [...currentCondition.specificSymptomAdvice];
    updatedAdvice.splice(index, 1);
    setCurrentCondition({
      ...currentCondition,
      specificSymptomAdvice: updatedAdvice
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'moderate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'severe': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return '';
    }
  };

  const filteredSymptoms = symptoms?.filter(
    (symptom: Symptom) => symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Manage Content</h1>
      <p className="text-muted-foreground mb-6">Edit and update medical information and FAQs</p>
      
      <Tabs defaultValue="symptoms" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Symptoms</span>
          </TabsTrigger>
          <TabsTrigger value="conditions" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Conditions</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4" />
            <span>FAQs</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="symptoms">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Symptoms</CardTitle>
                  <CardDescription>Manage symptom information and advice</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search symptoms..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingSymptoms ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredSymptoms?.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredSymptoms.map((symptom: Symptom) => (
                    <AccordionItem key={symptom._id} value={symptom._id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span>{symptom.name}</span>
                          <Badge className={getSeverityColor(symptom.severity)} variant="outline">
                            {symptom.severity}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-muted/30 rounded-md">
                          <div>
                            <h4 className="font-medium mb-1">Description</h4>
                            <p className="text-sm text-muted-foreground">{symptom.description}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Body Part</h4>
                            <p className="text-sm text-muted-foreground">{symptom.bodyPart}</p>
                          </div>
                          {symptom.personalizedAdvice && (
                            <div>
                              <h4 className="font-medium mb-1">Personalized Advice</h4>
                              <p className="text-sm text-muted-foreground">{symptom.personalizedAdvice}</p>
                            </div>
                          )}
                          {symptom.possibleCauses && symptom.possibleCauses.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-1">Possible Causes</h4>
                              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                {symptom.possibleCauses.map((cause, index) => (
                                  <li key={index}>{cause}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {symptom.whenToSeekHelp && (
                            <div>
                              <h4 className="font-medium mb-1">When To Seek Help</h4>
                              <p className="text-sm text-muted-foreground">{symptom.whenToSeekHelp}</p>
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => editSymptom(symptom)}
                            className="mt-2"
                          >
                            <Edit className="h-4 w-4 mr-2" /> Edit Symptom
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg">No symptoms found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchTerm ? 'Try a different search term' : 'No symptoms have been added yet'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conditions">
          <Card>
            <CardHeader>
              <CardTitle>Health Conditions</CardTitle>
              <CardDescription>Manage condition information and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center p-8">
                <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground ml-4">Condition management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Manage FAQ entries and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center p-8">
                <FileQuestion className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground ml-4">FAQ management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Symptom Dialog */}
      <Dialog open={isSymptomDialogOpen} onOpenChange={setIsSymptomDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Symptom Information</DialogTitle>
            <DialogDescription>
              Update the symptom details and guidance information
            </DialogDescription>
          </DialogHeader>
          
          {currentSymptom && (
            <form onSubmit={handleSymptomSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Symptom Name</label>
                  <Input
                    id="name"
                    value={currentSymptom.name}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={currentSymptom.description}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="bodyPart">Body Part</label>
                    <Input
                      id="bodyPart"
                      value={currentSymptom.bodyPart}
                      onChange={(e) => setCurrentSymptom({...currentSymptom, bodyPart: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="severity">Severity</label>
                    <Select
                      value={currentSymptom.severity}
                      onValueChange={(value) => setCurrentSymptom({
                        ...currentSymptom, 
                        severity: value as 'mild' | 'moderate' | 'severe'
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="personalizedAdvice">Personalized Advice</label>
                  <Textarea
                    id="personalizedAdvice"
                    rows={4}
                    value={currentSymptom.personalizedAdvice || ''}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, personalizedAdvice: e.target.value})}
                    placeholder="Enter personalized advice for this symptom"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label>Possible Causes</label>
                    <Button type="button" variant="outline" size="sm" onClick={addPossibleCause}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Cause
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {currentSymptom.possibleCauses?.map((cause, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={cause}
                          onChange={(e) => updatePossibleCause(index, e.target.value)}
                          placeholder={`Cause ${index + 1}`}
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removePossibleCause(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="whenToSeekHelp">When To Seek Help</label>
                  <Textarea
                    id="whenToSeekHelp"
                    rows={3}
                    value={currentSymptom.whenToSeekHelp || ''}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, whenToSeekHelp: e.target.value})}
                    placeholder="Enter guidance for when to seek medical attention"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsSymptomDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateSymptomMutation.isPending}>
                  {updateSymptomMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Condition Dialog */}
      <Dialog open={isConditionDialogOpen} onOpenChange={setIsConditionDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Condition Information</DialogTitle>
            <DialogDescription>
              Update condition details and recommendations
            </DialogDescription>
          </DialogHeader>
          
          {currentCondition && (
            <form onSubmit={handleConditionSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Condition Name</label>
                  <Input
                    id="name"
                    value={currentCondition.name}
                    onChange={(e) => setCurrentCondition({...currentCondition, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={currentCondition.description}
                    onChange={(e) => setCurrentCondition({...currentCondition, description: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label>Related Symptoms</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentCondition.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label>Recommendations</label>
                    <Button type="button" variant="outline" size="sm" onClick={addRecommendation}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Recommendation
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {currentCondition.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={rec}
                          onChange={(e) => updateRecommendation(index, e.target.value)}
                          placeholder={`Recommendation ${index + 1}`}
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeRecommendation(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label>Specific Symptom Advice</label>
                    <Button type="button" variant="outline" size="sm" onClick={addSpecificAdvice}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Advice
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {currentCondition.specificSymptomAdvice?.map((item, index) => (
                      <div key={index} className="grid gap-2 p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <label className="font-medium">Symptom-Specific Advice #{index + 1}</label>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeSpecificAdvice(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <AlertCircle className="h-4 w-4 mr-2" /> Remove
                          </Button>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor={`symptom-${index}`} className="text-sm">Symptom</label>
                          <Input
                            id={`symptom-${index}`}
                            value={item.symptom}
                            onChange={(e) => updateSpecificAdvice(index, 'symptom', e.target.value)}
                            placeholder="Enter symptom name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor={`advice-${index}`} className="text-sm">Advice</label>
                          <Textarea
                            id={`advice-${index}`}
                            rows={2}
                            value={item.advice}
                            onChange={(e) => updateSpecificAdvice(index, 'advice', e.target.value)}
                            placeholder="Enter specific advice for this symptom"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsConditionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateConditionMutation.isPending}>
                  {updateConditionMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageContent;
