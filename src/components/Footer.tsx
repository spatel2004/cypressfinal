
import { Link } from "react-router-dom";
import { MapPin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Cypress</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Report and track local problems in your community.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Map
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@problemscout.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@cypress.com</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/problemscout" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cypress. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
