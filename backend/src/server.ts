
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    if (!config.database_url) {
      throw new Error("Database URL is not provided in environment variables");
    }

    await mongoose.connect(config.database_url);
    console.log("✅ MongoDB connected");

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect:", err);
    process.exit(1);
  }
}

main();