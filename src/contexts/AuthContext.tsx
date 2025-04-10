
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change event:", event);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        // Fetch user profile after sign in
        setTimeout(() => {
          if (session?.user) {
            fetchProfile(session.user.id);
          }
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string | undefined) => {
    if (!userId) return;
    
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log("Profile not found, creating a new one");
          await createProfile(userId);
        }
        return;
      }
      
      console.log("Profile data retrieved:", data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      // Get user metadata
      const { data: userData } = await supabase.auth.getUser();
      const metadata = userData?.user?.user_metadata || {};
      const email = userData?.user?.email;
      
      console.log("Creating new profile for user:", userId, "with data:", metadata);
      
      // Insert directly using custom RPC function to bypass RLS
      const { data, error } = await (supabase as any).rpc('create_profile', { 
        user_id: userId,
        user_email: email,
        user_name: metadata.name || email?.split('@')[0] || null
      });

      if (error) {
        console.error('Error creating profile via RPC:', error);
        toast.error("Profile setup failed", {
          description: "There was an issue setting up your profile."
        });
        return;
      }

      console.log("Profile created successfully:", data);
      // Fetch the profile again to update state
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (fetchError) {
        console.error('Error fetching created profile:', fetchError);
        return;
      }
      
      setProfile(profile);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Login failed", {
          description: error.message,
        });
        return;
      }

      toast.success("Login successful", {
        description: "Welcome back to ProblemScout!",
      });
      navigate("/home");
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      // Get the current URL to use as the redirect URL
      const currentOrigin = window.location.origin;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
          emailRedirectTo: `${currentOrigin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("Registration failed", {
          description: error.message,
        });
        return;
      }
      
      if (data.session) {
        // If session exists, user is automatically signed in
        toast.success("Registration successful", {
          description: "Welcome to ProblemScout! You can now start reporting problems.",
        });
        navigate("/home");
      } else {
        // If no session, email confirmation is required
        toast.info("Check your email", {
          description: "Please check your email to confirm your registration.",
        });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error("Sign out failed", {
          description: error.message,
        });
        return;
      }
      
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Sign out failed", {
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
