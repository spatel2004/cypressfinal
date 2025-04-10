
import { Problem } from "../types/problem";

export const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole near the intersection of Main St and 5th Ave causing traffic issues.",
    category: "roads",
    status: "in-progress",
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "Main St & 5th Ave"
    },
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-18T14:20:00Z",
    userId: "user1",
    upvotes: 15
  },
  {
    id: "2",
    title: "Broken Street Light",
    description: "Street light at the corner of Elm St has been out for over a week, creating safety concerns.",
    category: "utilities",
    status: "pending",
    location: {
      lat: 40.7135,
      lng: -74.0046,
      address: "Elm St"
    },
    imageUrl: "https://images.unsplash.com/photo-1517231366-d05d9ea3492e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    createdAt: "2023-08-17T09:45:00Z",
    updatedAt: "2023-08-17T09:45:00Z",
    userId: "user2",
    upvotes: 8
  },
  {
    id: "3",
    title: "Overflowing Trash Bin",
    description: "Trash bin at Central Park entrance has been overflowing for days. Need immediate cleanup.",
    category: "environment",
    status: "resolved",
    location: {
      lat: 40.7649,
      lng: -73.9778,
      address: "Central Park, East Entrance"
    },
    imageUrl: "https://images.unsplash.com/photo-1623025976125-8d26a22c7f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    createdAt: "2023-08-10T15:20:00Z",
    updatedAt: "2023-08-14T11:10:00Z",
    userId: "user1",
    upvotes: 12
  },
  {
    id: "4",
    title: "Graffiti on Public Building",
    description: "Inappropriate graffiti on the wall of the public library. Needs to be removed.",
    category: "facilities",
    status: "pending",
    location: {
      lat: 40.7282,
      lng: -73.9942,
      address: "Public Library, Washington St"
    },
    imageUrl: "https://images.unsplash.com/photo-1583612802926-1ed907f325b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    createdAt: "2023-08-19T13:15:00Z",
    updatedAt: "2023-08-19T13:15:00Z",
    userId: "user3",
    upvotes: 5
  },
  {
    id: "5",
    title: "Damaged Park Bench",
    description: "Wooden park bench at Riverside Park is broken and poses a safety hazard.",
    category: "facilities",
    status: "in-progress",
    location: {
      lat: 40.8010,
      lng: -73.9709,
      address: "Riverside Park, near 78th St"
    },
    imageUrl: "https://images.unsplash.com/photo-1503627207773-962394b7ccc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    createdAt: "2023-08-16T10:00:00Z",
    updatedAt: "2023-08-18T09:30:00Z",
    userId: "user2",
    upvotes: 9
  },
  {
    id: "6",
    title: "Flooded Underpass",
    description: "The underpass on Broadway is flooded and impassable after recent rain.",
    category: "roads",
    status: "pending",
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: "Broadway Underpass"
    },
    imageUrl: "https://images.unsplash.com/photo-1629291656128-2dace5a27172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    createdAt: "2023-08-18T08:45:00Z",
    updatedAt: "2023-08-18T08:45:00Z",
    userId: "user3",
    upvotes: 18
  }
];

export const getUserProblems = (userId: string): Problem[] => {
  return mockProblems.filter(problem => problem.userId === userId);
};

export const getProblemById = (id: string): Problem | undefined => {
  return mockProblems.find(problem => problem.id === id);
};
