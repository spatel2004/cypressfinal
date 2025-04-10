
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { getProblemById } from "@/data/mockProblems";
import { Problem } from "@/types/problem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProblemStatusBadge from "@/components/ProblemStatusBadge";
import { Badge } from "@/components/ui/badge";
import { MapView } from "@/components";
import { MapPin, Calendar, ThumbsUp, ArrowLeft, MessageSquare, Image, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProblem = getProblemById(id);
      
      if (foundProblem) {
        setProblem(foundProblem);
      } else {
        toast.error("Problem not found");
        navigate("/map");
      }
      
      setLoading(false);
    }
  }, [id, navigate]);

  const formattedDate = problem 
    ? new Date(problem.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "";

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-24 h-24 rounded-full bg-muted animate-pulse-light mb-6" />
            <div className="w-64 h-8 bg-muted animate-pulse-light mb-4" />
            <div className="w-32 h-6 bg-muted animate-pulse-light" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!problem) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-3xl font-bold">{problem.title}</h1>
                <ProblemStatusBadge status={problem.status} className="text-sm" />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{problem.location.address || "No address"}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </Badge>
                <Badge variant="secondary">{problem.category}</Badge>
              </div>
            </div>
            
            {/* Problem image */}
            {problem.imageUrl && (
              <Card className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={problem.imageUrl} 
                    alt={problem.title} 
                    className="w-full h-auto"
                  />
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="absolute top-2 right-2 flex items-center gap-1.5"
                    onClick={() => toast.info("In a real app, this would open the image in full screen")}
                  >
                    <Image className="h-3.5 w-3.5" />
                    <span>View Full Image</span>
                  </Button>
                </div>
              </Card>
            )}
            
            {/* Problem description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {problem.description}
                </p>
                
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex items-center gap-1.5">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Upvote ({problem.upvotes})</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1.5">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Comments section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Discussion</span>
                </h2>
                
                <div className="space-y-4">
                  {/* Sample comments */}
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">Jane Doe</span>
                          <span className="text-xs text-muted-foreground">Yesterday</span>
                        </div>
                        <p className="text-sm">I noticed this problem too! It's been getting worse.</p>
                      </div>
                      <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                        <button className="hover:text-foreground">Reply</button>
                        <button className="hover:text-foreground">Like</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">John Smith</span>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm">I called the city about this last week.</p>
                      </div>
                      <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                        <button className="hover:text-foreground">Reply</button>
                        <button className="hover:text-foreground">Like</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add comment input */}
                  <div className="flex gap-3 mt-6">
                    <Avatar>
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="w-full p-3 bg-muted rounded-lg border border-transparent focus:border-primary outline-none"
                      />
                      <div className="flex justify-end mt-2">
                        <Button size="sm">Post</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and additional info */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="h-64">
                <MapView 
                  center={{
                    lat: problem?.location.lat || 40.7831,
                    lng: problem?.location.lng || -73.9712
                  }}
                  zoom={15} 
                  selectedProblem={problem} 
                  interactive={true}
                  markersClickable={false}
                />
              </div>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Updates</h2>
                
                <div className="space-y-4">
                  <div className="border-l-2 border-problem-resolved pl-4 pb-4 relative">
                    <div className="w-3 h-3 bg-problem-resolved rounded-full absolute -left-[7px] top-0" />
                    <div className="flex justify-between">
                      <h3 className="font-medium">Status Update</h3>
                      <span className="text-xs text-muted-foreground">3 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      City maintenance has been scheduled to address this issue.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-problem-pending pl-4 relative">
                    <div className="w-3 h-3 bg-problem-pending rounded-full absolute -left-[7px] top-0" />
                    <div className="flex justify-between">
                      <h3 className="font-medium">Problem Reported</h3>
                      <span className="text-xs text-muted-foreground">5 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      This problem has been submitted and is awaiting review.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Reported By</h2>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                    <AvatarFallback>RP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Robert Parker</p>
                    <p className="text-sm text-muted-foreground">Community Member</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProblemDetail;
