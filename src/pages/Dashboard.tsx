import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProblemCard from "@/components/ProblemCard";
import { AlertTriangle, CheckCircle, MapPin, RefreshCw, Bell, Settings, User, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Problem } from "@/types/problem";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const pendingProblems = problems.filter(p => p.status === "pending");
  const inProgressProblems = problems.filter(p => p.status === "in-progress");
  const resolvedProblems = problems.filter(p => p.status === "resolved");

  useEffect(() => {
    const fetchUserProblems = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Failed to fetch problems:", error);
          toast.error("Failed to fetch problems", {
            description: error.message
          });
          return;
        }
        
        if (!data) {
          console.log("No problems found");
          setProblems([]);
          return;
        }
        
        // Convert database problems to match the Problem type
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
    
    fetchUserProblems();
  }, [user]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track and manage your reported problems</p>
          </div>
          <Button asChild>
            <Link to="/map">
              <MapPin className="mr-2 h-4 w-4" /> Report New Problem
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{problems.length}</div>
              <p className="text-xs text-muted-foreground">
                All your reported problems
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-problem-pending" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProblems.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting review and action
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <RefreshCw className="h-4 w-4 text-problem-inProgress" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressProblems.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently being worked on
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-problem-resolved" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedProblems.length}</div>
              <p className="text-xs text-muted-foreground">
                Successfully resolved issues
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Problem List */}
          <div className="flex-1">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Problems</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-lg text-muted-foreground">Loading problems...</span>
                </div>
              ) : (
                <>
                  <TabsContent value="all">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {problems.length > 0 ? (
                        problems.map(problem => (
                          <ProblemCard key={problem.id} problem={problem} />
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                          <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">No problems reported yet</h3>
                          <p className="text-muted-foreground">Report your first problem to get started</p>
                          <Button className="mt-4" asChild>
                            <Link to="/map">Report a Problem</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pending">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pendingProblems.length > 0 ? (
                        pendingProblems.map(problem => (
                          <ProblemCard key={problem.id} problem={problem} />
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">No pending problems</h3>
                          <p className="text-muted-foreground">All caught up!</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="in-progress">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {inProgressProblems.length > 0 ? (
                        inProgressProblems.map(problem => (
                          <ProblemCard key={problem.id} problem={problem} />
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                          <RefreshCw className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">No problems in progress</h3>
                          <p className="text-muted-foreground">Check back later for updates.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resolved">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resolvedProblems.length > 0 ? (
                        resolvedProblems.map(problem => (
                          <ProblemCard key={problem.id} problem={problem} />
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                          <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">No resolved problems yet</h3>
                          <p className="text-muted-foreground">Your reported issues are still being processed.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>User Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="text-xl font-semibold">
                      {profile?.username ? profile.username.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{profile?.username || user?.email}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Notifications Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <span>Recent Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {problems.length > 0 ? (
                  <div className="space-y-4">
                    {problems.slice(0, 3).map((problem, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          problem.status === 'pending' ? 'bg-problem-pending' :
                          problem.status === 'in-progress' ? 'bg-problem-inProgress' : 'bg-problem-resolved'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium">
                            {problem.status === 'pending' ? 'Problem reported' :
                             problem.status === 'in-progress' ? 'Problem status updated' : 'Problem resolved'}
                          </p>
                          <p className="text-xs text-muted-foreground">{problem.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(problem.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No notifications yet</p>
                  </div>
                )}
                <Button variant="link" size="sm" className="mt-4 px-0">
                  View all notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
