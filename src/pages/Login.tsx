
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Key, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    await signIn(email, password);
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
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to continue to Cypress
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
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
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" />
                    <span>Password</span>
                  </Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-muted focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-6">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                <LogIn className="mr-2 h-4 w-4" /> Sign in
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
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

export default Login;
