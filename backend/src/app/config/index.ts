import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || "5000",
  databaseUrl: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
  geminiKey: process.env.GEMINI_API_KEY!,
  frontendUrl: process.env.FRONTEND_URL!,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS||"12",
};
