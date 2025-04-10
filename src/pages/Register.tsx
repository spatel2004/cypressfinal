
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Key, User, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    await signUp(email, password, name);
  };
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <MapPin className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold">Problem<span className="text-primary">Scout</span></span>
          </Link>
        </div>
        
        <Card className="border-none shadow-lg bg-white dark:bg-card/95 animate-fade-in">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Sign up to start reporting problems
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Full Name</span>
                </Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-muted focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Email</span>
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-muted focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-primary" />
                  <span>Password</span>
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-muted focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-primary" />
                  <span>Confirm Password</span>
                </Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-muted focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-6">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                <UserPlus className="mr-2 h-4 w-4" /> Create account
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
