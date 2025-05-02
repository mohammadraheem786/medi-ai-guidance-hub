
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HealthCard from '@/components/HealthCard';
import { ChevronLeft, Search } from 'lucide-react';

const allHealthTips = [
  // General Wellness
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Water is essential for your body to function properly.',
    category: 'General Wellness',
    importance: 'high' as const,
    tips: [
      'Aim for 8 glasses (about 2 liters) of water per day.',
      'Increase intake during hot weather or when exercising.',
      'Watch for signs of dehydration: dark urine, dry mouth, fatigue, dizziness.',
      'Herbal teas and water-rich fruits contribute to daily fluid intake.'
    ],
    source: 'Mayo Clinic'
  },
  {
    id: '2',
    title: 'Sleep Hygiene',
    description: 'Quality sleep is vital for physical and mental health.',
    category: 'General Wellness',
    importance: 'high' as const,
    tips: [
      'Aim for 7-9 hours of sleep per night.',
      'Maintain a consistent sleep schedule, even on weekends.',
      'Create a restful environment: dark, quiet, and cool.',
      'Avoid screens, caffeine, and large meals before bedtime.'
    ],
    source: 'Sleep Foundation'
  },
  {
    id: '3',
    title: 'Regular Exercise',
    description: 'Physical activity is crucial for maintaining good health.',
    category: 'General Wellness',
    importance: 'high' as const,
    tips: [
      'Aim for at least 150 minutes of moderate activity weekly.',
      'Include both cardio and strength training exercises.',
      'Find activities you enjoy to stay motivated.',
      'Even short bursts of activity throughout the day are beneficial.'
    ],
    source: 'American Heart Association'
  },
  
  // Nutrition
  {
    id: '4',
    title: 'Balanced Diet',
    description: 'Proper nutrition provides energy and reduces disease risk.',
    category: 'Nutrition',
    importance: 'medium' as const,
    tips: [
      'Eat plenty of fruits, vegetables, and whole grains.',
      'Choose lean proteins and limit processed meats.',
      'Include healthy fats like olive oil, nuts, and avocados.',
      'Limit added sugars, salt, and highly processed foods.'
    ],
    source: 'Harvard School of Public Health'
  },
  {
    id: '5',
    title: 'Portion Control',
    description: 'Managing serving sizes helps maintain a healthy weight.',
    category: 'Nutrition',
    importance: 'medium' as const,
    tips: [
      'Use smaller plates to help control portions.',
      'Pay attention to hunger and fullness cues.',
      'Read nutrition labels to understand serving sizes.',
      'Be mindful of restaurant portions, which are often oversized.'
    ],
    source: 'CDC'
  },
  {
    id: '6',
    title: 'Mindful Eating',
    description: 'Being present during meals improves digestion and satisfaction.',
    category: 'Nutrition',
    importance: 'low' as const,
    tips: [
      'Eat slowly and without distractions.',
      'Pay attention to flavors, textures, and your body's signals.',
      'Avoid eating when stressed or emotional.',
      'Appreciate and enjoy your food.'
    ],
    source: 'Harvard Medical School'
  },
  
  // Stress Management
  {
    id: '7',
    title: 'Stress Reduction',
    description: 'Managing stress is important for mental and physical health.',
    category: 'Mental Health',
    importance: 'high' as const,
    tips: [
      'Practice deep breathing or meditation daily.',
      'Engage in regular physical activity.',
      'Prioritize activities you enjoy and that help you relax.',
      'Consider professional help if stress becomes overwhelming.'
    ],
    source: 'American Psychological Association'
  },
  {
    id: '8',
    title: 'Social Connections',
    description: 'Strong relationships contribute to better health and longevity.',
    category: 'Mental Health',
    importance: 'medium' as const,
    tips: [
      'Make time for friends and family regularly.',
      'Join groups or classes to meet new people with similar interests.',
      'Be present and engaged during social interactions.',
      'Consider volunteering to build community connections.'
    ],
    source: 'National Institute on Aging'
  },
  {
    id: '9',
    title: 'Digital Detox',
    description: 'Taking breaks from technology improves mental wellbeing.',
    category: 'Mental Health',
    importance: 'low' as const,
    tips: [
      'Set aside specific times to be screen-free.',
      'Turn off notifications to reduce distractions.',
      'Establish phone-free zones or times at home.',
      'Use technology mindfully rather than habitually.'
    ],
    source: 'Mental Health Foundation'
  },
  
  // Preventative Care
  {
    id: '10',
    title: 'Regular Check-ups',
    description: 'Preventive care helps catch health issues early.',
    category: 'Preventative Care',
    importance: 'high' as const,
    tips: [
      'Schedule annual physical exams with your doctor.',
      'Keep up with recommended screenings for your age and risk factors.',
      'Stay current on immunizations.',
      'Don't ignore new or concerning symptoms.'
    ],
    source: 'American Academy of Family Physicians'
  },
  {
    id: '11',
    title: 'Dental Health',
    description: 'Oral health is connected to overall physical health.',
    category: 'Preventative Care',
    importance: 'medium' as const,
    tips: [
      'Brush teeth twice daily and floss once daily.',
      'Replace your toothbrush every 3-4 months.',
      'Visit your dentist regularly for cleanings and check-ups.',
      'Limit sugary foods and beverages.'
    ],
    source: 'American Dental Association'
  },
  {
    id: '12',
    title: 'Sun Protection',
    description: 'Protecting your skin from UV damage prevents skin cancer.',
    category: 'Preventative Care',
    importance: 'medium' as const,
    tips: [
      'Use broad-spectrum sunscreen with SPF 30+ daily.',
      'Wear protective clothing and seek shade when outdoors.',
      'Avoid peak sun hours (10am-4pm) when possible.',
      'Check your skin regularly for new or changing moles.'
    ],
    source: 'American Academy of Dermatology'
  },
];

const HealthTips = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', ...new Set(allHealthTips.map(tip => tip.category))];
  
  const filteredTips = allHealthTips.filter(tip => {
    const matchesSearch = 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.tips.some(tipItem => tipItem.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Health Tips & Guidance</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Browse recommendations to maintain and improve your health
          </p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search health tips..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
          <TabsList className="overflow-x-auto flex w-full flex-nowrap">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category === 'all' ? 'All Tips' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map(tip => (
              <HealthCard
                key={tip.id}
                title={tip.title}
                description={tip.description}
                category={tip.category}
                importance={tip.importance}
                tips={tip.tips}
                source={tip.source}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No health tips match your search.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Clear search
            </Button>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p>
            These health tips are for informational purposes only and do not constitute medical advice.
            <br />Always consult with a healthcare provider for personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
