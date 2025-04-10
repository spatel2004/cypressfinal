
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { useReportProblem } from "@/hooks/useReportProblem";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProblemCategory } from "@/types/problem";

// Define the schema for problem reporting form
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["roads", "utilities", "environment", "safety", "facilities", "other"]),
  // Image upload is optional
});

type FormValues = z.infer<typeof formSchema>;

interface ReportProblemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: { lng: number; lat: number; address?: string };
  onSuccess?: () => void;
}

const ReportProblemDialog = ({ 
  open, 
  onOpenChange, 
  location,
  onSuccess 
}: ReportProblemDialogProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { reportProblem, isSubmitting } = useReportProblem();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "other",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const onSubmit = async (values: FormValues) => {
    // If no location is provided, use a default center or make it clear no location was selected
    const problemLocation = location || {
      lat: 0,
      lng: 0,
      address: "No specific location provided"
    };

    const result = await reportProblem({
      title: values.title,
      description: values.description,
      category: values.category,
      location: problemLocation,
      imageUrl: imagePreview || undefined,
    });

    if (result) {
      form.reset();
      setImagePreview(null);
      onOpenChange(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Don't navigate away if onSuccess is provided
      // as we want to stay on the map page to see the new problem
      if (!onSuccess) {
        navigate('/dashboard');
      }
    }
  };

  const handleCancel = () => {
    form.reset();
    setImagePreview(null);
    onOpenChange(false);
  };

  // Categories with user-friendly labels
  const categoryOptions: { value: ProblemCategory; label: string }[] = [
    { value: "roads", label: "Roads & Sidewalks" },
    { value: "utilities", label: "Utilities & Services" },
    { value: "environment", label: "Environment & Cleanliness" },
    { value: "safety", label: "Safety & Security" },
    { value: "facilities", label: "Public Facilities" },
    { value: "other", label: "Other" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-primary" />
            Report a Problem
          </DialogTitle>
          <DialogDescription>
            Help improve our community by reporting issues in your area.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief title describing the issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about the problem"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="image">Upload Image (Optional)</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {imagePreview ? "Change Image" : "Add Image"}
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {imagePreview && (
                <div className="relative mt-2">
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 w-full rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            {location && (
              <div className="rounded-md border p-3 bg-muted/40">
                <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Location Selected
                </h4>
                <p className="text-xs text-muted-foreground">
                  {location.address || `Latitude: ${location.lat.toFixed(6)}, Longitude: ${location.lng.toFixed(6)}`}
                </p>
              </div>
            )}
            
            {!location && (
              <div className="rounded-md border border-dashed p-3 bg-muted/20 text-center">
                <p className="text-sm text-muted-foreground">
                  No location selected. Your report will be created without a specific location.
                </p>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportProblemDialog;
