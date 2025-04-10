
import Layout from "@/components/Layout";
import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProblemCard from "@/components/ProblemCard";
import { useEffect, useState } from "react";
import { Problem } from "@/types/problem";
import { MapPin, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ReportProblemDialog from "@/components/ReportProblemDialog";
import { supabase } from "@/integrations/supabase/client";

const MapPage = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<{ lng: number; lat: number; address?: string } | undefined>(undefined);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Failed to fetch problems:", error);
          toast.error("Failed to fetch problems", {
            description: error.message
          });
          return;
        }
        
        if (!data) {
          setProblems([]);
          return;
        }
        
        const formattedProblems: Problem[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category as any,
          status: item.status as any,
          location: item.location as any,
          imageUrl: item.image_url,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          upvotes: item.upvotes,
          userId: item.user_id
        }));
        
        setProblems(formattedProblems);
      } catch (error: any) {
        console.error("An error occurred:", error);
        toast.error("An error occurred", {
          description: error.message
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProblems();
  }, []);
  
  const filteredProblems = problems.filter(problem => 
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (problem.location.address && problem.location.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleMapClick = (lngLat: { lng: number; lat: number }) => {
    setClickedLocation(lngLat);
    setIsReportDialogOpen(true);
  };

  const handleReportButtonClick = () => {
    setClickedLocation(undefined);
    setIsReportDialogOpen(true);
  };

  const handleReportSuccess = () => {
    // Refresh problems list after successful report
    const fetchProblems = async () => {
      try {
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error || !data) return;
        
        const formattedProblems: Problem[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category as any,
          status: item.status as any,
          location: item.location as any,
          imageUrl: item.image_url,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          upvotes: item.upvotes,
          userId: item.user_id
        }));
        
        setProblems(formattedProblems);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    
    fetchProblems();
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-13rem)]">
          <Card className="overflow-hidden lg:col-span-1">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-2">Reported Problems</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">
                  {filteredProblems.length} problems found
                </span>
                <Button size="sm" variant="outline" className="flex gap-1 items-center">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-18rem)]">
              <div className="p-4 grid gap-4">
                {isLoading ? (
                  <div className="col-span-full flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredProblems.length > 0 ? (
                  filteredProblems.map(problem => (
                    <div key={problem.id} onClick={() => setSelectedProblem(problem)}>
                      <ProblemCard problem={problem} compact />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No problems found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try a different search term or report a new problem.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          <div className="lg:col-span-2 h-full">
            <Card className="h-full p-0 overflow-hidden">
              <MapView 
                selectedProblem={selectedProblem} 
                onMapClick={handleMapClick}
                problems={problems}
              />
              
              <div className="absolute bottom-6 right-6 z-10">
                <Button 
                  size="lg" 
                  className="rounded-full shadow-lg flex gap-2 items-center"
                  onClick={handleReportButtonClick}
                >
                  <MapPin className="h-5 w-5" />
                  <span>Report a Problem</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ReportProblemDialog 
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        location={clickedLocation}
        onSuccess={handleReportSuccess}
      />
    </Layout>
  );
};

export default MapPage;
