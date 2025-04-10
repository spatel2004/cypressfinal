
import { Badge } from "@/components/ui/badge";
import { ProblemStatus } from "@/types/problem";
import { CheckCircle, Clock, RefreshCw } from "lucide-react";

interface ProblemStatusBadgeProps {
  status: ProblemStatus;
  className?: string;
}

const ProblemStatusBadge = ({ status, className = "" }: ProblemStatusBadgeProps) => {
  switch (status) {
    case "resolved":
      return (
        <Badge className={`bg-problem-resolved text-white ${className} flex gap-1 items-center`}>
          <CheckCircle className="h-3 w-3" /> Resolved
        </Badge>
      );
    case "in-progress":
      return (
        <Badge className={`bg-problem-inProgress text-black ${className} flex gap-1 items-center`}>
          <RefreshCw className="h-3 w-3" /> In Progress
        </Badge>
      );
    case "pending":
    default:
      return (
        <Badge className={`bg-problem-pending text-white ${className} flex gap-1 items-center`}>
          <Clock className="h-3 w-3" /> Pending
        </Badge>
      );
  }
};

export default ProblemStatusBadge;
