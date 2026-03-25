import { Schema, model } from "mongoose";
import { IResource } from "../../types/resource.interface";

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    type: {
      type: String,
      enum: ["pdf", "video", "notes", "cheatsheet", "test"],
      required: true,
    },
    subject: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    tags: [String],
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Resource = model<IResource>("Resource", resourceSchema);
