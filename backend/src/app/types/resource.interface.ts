import { Schema } from "mongoose";

export interface IResource {
  title: string;
  description: string;
  fileUrl: string;
  thumbnail?: string;
  type: "pdf" | "video" | "notes" | "cheatsheet" | "test";
  subject: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  uploadedBy: Schema.Types.ObjectId | string;
  downloads?: number;
  views?: number;
  averageRating?: number;
  reviewCount?: number;
  status?: "pending" | "approved" | "rejected";
}
