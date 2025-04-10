
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, MapPin } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Cypress</span>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Log In</span>
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Report and track problems in your community
          </h1>
          <p className="text-lg text-muted-foreground">
            Cypress makes it easy to identify, report, and follow up on issues in your neighborhood.
            Help make your community better by reporting problems and tracking their resolution.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1611605645802-c21be743c321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
            alt="ProblemScout Map" 
            className="rounded-lg shadow-xl max-w-full h-auto max-h-96 object-cover"
          />
        </div>
      </main>

      <footer className="container mx-auto py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Cypress. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
