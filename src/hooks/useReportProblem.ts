
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export interface ReportProblemData {
  title: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  imageUrl?: string;
}

export const useReportProblem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const reportProblem = async (data: ReportProblemData) => {
    if (!user) {
      toast.error("You must be logged in to report a problem", {
        description: "Please sign in or create an account to continue"
      });
      return false;
    }

    try {
      setIsSubmitting(true);
      console.log('Reporting problem with user ID:', user.id);
      
      // Generate a unique ID for the problem
      const problemId = uuidv4();
      
      // Prepare problem data
      const problemData = {
        id: problemId,
        user_id: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        image_url: data.imageUrl,
        status: 'pending',
        upvotes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Insert problem into Supabase
      const { data: insertedProblem, error } = await supabase
        .from('problems')
        .insert(problemData)
        .select()
        .single();

      if (error) {
        console.error('Error reporting problem:', error);
        toast.error("Failed to report problem", {
          description: error.message
        });
        return false;
      }

      console.log('Problem reported successfully:', insertedProblem);
      toast.success("Problem reported successfully", {
        description: "Thank you for helping improve your community!"
      });
      return insertedProblem;
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error("An unexpected error occurred", {
        description: error.message
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { reportProblem, isSubmitting };
};

export default useReportProblem;
