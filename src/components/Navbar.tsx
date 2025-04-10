
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, User, List, X, LogIn, UserPlus, LogOut } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/home" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Cypress</span>
          </Link>
          <Badge variant="outline" className="hidden md:inline-flex">Beta</Badge>
        </div>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/home" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/map" className="text-sm font-medium hover:text-primary transition-colors">
            Map
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                My Problems
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {profile?.username || user.email}
                </span>
                <Button variant="default" className="gap-2" asChild>
                  <Link to="/dashboard">
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  <span>Log in</span>
                </Link>
              </Button>
              <Button variant="default" size="sm" className="gap-2" asChild>
                <Link to="/register">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign up</span>
                </Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden pb-4 animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/home" 
              className="px-2 py-1 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/map" 
              className="px-2 py-1 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Map
            </Link>
            <Link 
              to="/about" 
              className="px-2 py-1 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-2 py-1 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Problems
                </Link>
                <div className="pt-2 border-t">
                  <span className="px-2 text-sm text-muted-foreground">
                    {profile?.username || user.email}
                  </span>
                </div>
                <Button 
                  variant="default" 
                  className="gap-2 justify-start" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      window.location.href = "/dashboard";
                    }, 150);
                  }}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 justify-start" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="gap-2 w-full justify-center" 
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link to="/login">
                    <LogIn className="h-4 w-4" />
                    <span>Log in</span>
                  </Link>
                </Button>
                <Button 
                  variant="default" 
                  className="gap-2 w-full justify-center" 
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link to="/register">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign up</span>
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
