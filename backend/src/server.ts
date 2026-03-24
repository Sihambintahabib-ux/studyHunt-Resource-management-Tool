import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";


async function main() {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("✅ MongoDB connected");
    app.listen(config.port, () =>
      console.log(`🚀 Server running on port ${config.port}`),
    );
  } catch (err) {
    console.error("❌ Failed to connect:", err);
    process.exit(1);
  }
}
main();
