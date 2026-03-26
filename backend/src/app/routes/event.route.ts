import express from "express";
import { resourceControllers } from "../controllers/event.controller";

const router = express.Router();
// Get all events
router.get("/", resourceControllers.getResources);
// Get single event
router.get("/:id", resourceControllers.getResourceById);
// Create event
router.post("/", resourceControllers.createResource);
// Update event
router.put("/:id", resourceControllers.updateResource);
// Delete event
router.delete("/:id", resourceControllers.deleteResource);

export const ResourceRoutes = router;
