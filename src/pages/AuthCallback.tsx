
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const [message, setMessage] = useState("Processing your authentication...");
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setMessage("Authentication error. Please try again.");
          toast.error("Authentication failed", {
            description: error.message
          });
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        if (data.session) {
          // Successfully authenticated
          toast.success("Authentication successful", {
            description: "You are now logged in."
          });
          
          // Check if we need to create a profile for this user
          const { data: user } = await supabase.auth.getUser();
          if (user && user.user) {
            // Check if profile exists
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.user.id)
              .single();
              
            if (profileError && profileError.code === 'PGRST116') {
              // Profile doesn't exist, create it using the RPC
              await (supabase as any).rpc('create_profile', { 
                user_id: user.user.id,
                user_email: user.user.email,
                user_name: user.user.user_metadata.name || user.user.email?.split('@')[0] || null
              });
            }
          }
          
          navigate("/home");
        } else {
          setMessage("No session found. Please log in.");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error: any) {
        console.error("Error in auth callback:", error);
        setMessage("Authentication error. Please try again.");
        toast.error("Authentication failed", {
          description: error.message || "An unexpected error occurred"
        });
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-primary/5 p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default AuthCallback;
