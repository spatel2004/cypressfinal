
import { Problem } from "@/types/problem";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import ProblemStatusBadge from "./ProblemStatusBadge";

interface ProblemCardProps {
  problem: Problem;
  compact?: boolean;
}

const ProblemCard = ({ problem, compact = false }: ProblemCardProps) => {
  const formattedDate = new Date(problem.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow animate-fade-in">
      {!compact && problem.imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={problem.imageUrl} 
            alt={problem.title} 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <CardHeader className={compact ? "p-4" : ""}>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className={`${compact ? "text-base" : "text-xl"}`}>{problem.title}</CardTitle>
          <ProblemStatusBadge status={problem.status} />
        </div>
        <CardDescription className="flex items-center gap-1 mt-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{problem.location.address || "Location unavailable"}</span>
        </CardDescription>
        {!compact && (
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">{problem.category}</Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              {problem.upvotes}
            </Badge>
          </div>
        )}
      </CardHeader>
      {!compact && (
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {problem.description}
          </p>
        </CardContent>
      )}
      <CardFooter className={compact ? "p-4 pt-0" : ""}>
        <Button asChild variant="outline" size={compact ? "sm" : "default"} className="w-full mt-2">
          <Link to={`/problem/${problem.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
