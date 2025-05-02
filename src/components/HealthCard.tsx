
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthCardProps {
  title: string;
  description: string;
  category: string;
  importance: 'low' | 'medium' | 'high';
  tips: string[];
  source?: string;
}

const HealthCard = ({ title, description, category, importance, tips, source }: HealthCardProps) => {
  const importanceColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };
  
  const importanceLabels = {
    low: "General Advice",
    medium: "Important",
    high: "Essential"
  };

  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-gray-800">{title}</CardTitle>
            <CardDescription className="text-gray-500 mt-1">{description}</CardDescription>
          </div>
          <Badge className={`${importanceColors[importance]}`}>{importanceLabels[importance]}</Badge>
        </div>
        <Badge variant="outline" className="mt-2">{category}</Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-2 pl-5 list-disc">
          {tips.map((tip, index) => (
            <li key={index} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </CardContent>
      {source && (
        <CardFooter className="text-xs text-gray-500 pt-2 border-t">
          Source: {source}
        </CardFooter>
      )}
    </Card>
  );
};

export default HealthCard;
