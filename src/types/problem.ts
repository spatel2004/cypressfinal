
export type ProblemStatus = 'pending' | 'in-progress' | 'resolved';

export type ProblemCategory = 
  | 'roads' 
  | 'utilities' 
  | 'environment' 
  | 'safety' 
  | 'facilities' 
  | 'other';

export interface ProblemLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: ProblemCategory;
  status: ProblemStatus;
  location: ProblemLocation;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  upvotes: number;
}
