import { Request, Response } from "express";
import { Resource } from "../modules/Resource/resource.model";

// Create Resource
const createResource = async (req: Request, res: Response) => {
  try {
    const savedResource = await Resource.create(req.body);
    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: savedResource,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create Resource",
      error: err.message,
    });
  }
};

// Get all Resource
const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({
      success: true,
      message: "Resources.. fetched successfully",
      data: resources,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resources",
      error: err.message,
    });
  }
};

// Get single resource
const getResourceById = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "resource not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "resource fetched successfully",
      data: resource,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resource",
      error: err.message,
    });
  }
};

// Update resource
const updateResource = async (req: Request, res: Response) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedResource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      data: updatedResource,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update Resource",
      error: err.message,
    });
  }
};

// Delete Resource
const deleteResource = async (req: Request, res: Response) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Resource",
      error: err.message,
    });
  }
};

export const resourceControllers = {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
};
