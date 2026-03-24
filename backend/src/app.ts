import express from "express";
import cors from "cors";
import config from "./app/config";
import router from "./app/routes";
// import globalError from "./app/middlewares/globalErrorHandler";

const app = express();

// Middleware
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All API routes under /api
app.use("/api", router);

// Health check
app.get("/health", (req, res) => res.json({ status: "OK", time: new Date() }));

// Global error handler — MUST be last
// app.use(globalError);

export default app;
