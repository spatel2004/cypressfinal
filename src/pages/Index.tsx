
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import ProblemCard from "@/components/ProblemCard";
import { mockProblems } from "@/data/mockProblems";
import { ProblemStatus } from "@/types/problem";

const Index = () => {
  // Get counts for various problem statuses
  const pendingCount = mockProblems.filter(p => p.status === "pending").length;
  const inProgressCount = mockProblems.filter(p => p.status === "in-progress").length;
  const resolvedCount = mockProblems.filter(p => p.status === "resolved").length;
  
  // Get the three most recent problems for the showcase
  const recentProblems = [...mockProblems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-b from-background to-muted">
        <div className="container px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Report problems in your community
            </h1>
            <p className="text-lg text-muted-foreground">
              Cypress helps you identify, report, and track issues in your neighborhood. 
              From potholes to broken street lights, your voice matters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/map">Report a Problem</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">View Reports</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 md:h-96 h-64 rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Community Map" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-primary text-white">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Making a difference together</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-4xl font-bold mb-2">{pendingCount}</h3>
              <p className="text-white/80">Problems Reported</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-4xl font-bold mb-2">{inProgressCount}</h3>
              <p className="text-white/80">In Progress</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-4xl font-bold mb-2">{resolvedCount}</h3>
              <p className="text-white/80">Problems Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent reports section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Recent Reports</h2>
            <Button variant="outline" asChild>
              <Link to="/map">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProblems.map(problem => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-muted">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report a Problem</h3>
              <p className="text-muted-foreground">
                Identify an issue in your community and place it on the map with details.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Follow the status of your reported problems and see when they're being addressed.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Problem Solved</h3>
              <p className="text-muted-foreground">
                Get notified when your reported issues have been resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to make your community better?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join our growing community of engaged citizens who are working together to improve their neighborhoods.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
