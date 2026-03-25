import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || "5000",
  database_url: process.env.MONGO_URI!,
  jwt_secret: process.env.JWT_SECRET!,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "30d",
  geminiKey: process.env.GEMINI_API_KEY!,
  frontendUrl: process.env.FRONTEND_URL!,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || "12",
};
