[Folder setup](#create-the-backend-folder-structure)

---

[Install Dependencies](#install-dependencies)

---

[configure-typescript](#configure-typescript)

---

[server.ts + app.ts — Entry Points](#serverts--appts--entry-points)

---

[env](#env--srcconfigindexts)

---

[utility](#utility)

---

[middleware](#middleware)

---

## Table of content :

| 1            | 2                    | 3                          | 4       | 5          | 6                         | 7               | 8                               | 9                               | 10                        |
| ------------ | -------------------- | -------------------------- | ------- | ---------- | ------------------------- | --------------- | ------------------------------- | ------------------------------- | ------------------------- |
| Folder setup | Install Dependencies | configure-typescript + env | utility | middleware | Auth module + User module | Resource module | Review module + Bookmark module | Review module + Bookmark module | Auth module + User module |

# Create the backend folder structure

Set up all folders before writing any code

Run these commands in your terminal to create the project and all required folders:

### Step 1: Create backend folder

```bash
mkdir backend && cd backend
```

### Step 2: Initialize Node project

```bash
npm init -y
```

### Step 3: Create all required folders

```bash
mkdir -p src/models src/routes src/controllers src/middleware src/seed src/services
```

Preview:

```bash
backend/
src/
├── models/       # MongoDB schemas
├── routes/       # API route files
├── controllers/  # Business logic
├── middleware/   # Auth middleware
├── services/     # Gemini AI service
├── seed/         # Seed data
├── .env          # Environment variables
├── package.json
└── tsconfig.json

```

or

```bash
mkdir -p src/app/config
mkdir -p src/app/errors
mkdir -p src/app/middlewares
mkdir -p src/app/utils
mkdir -p src/app/routes
mkdir -p src/app/modules/Auth
mkdir -p src/app/modules/User
mkdir -p src/app/modules/Resource
mkdir -p src/app/modules/Review
mkdir -p src/app/modules/Bookmark
mkdir -p src/app/modules/AI
mkdir -p src/app/modules/Dashboard
mkdir -p src/seed
```

Preview:

```bash
backend/
├── src/
│   ├── server.ts                   ← starts server + connects DB
│   ├── app.ts                      ← express setup + middleware
│   └── app/
│       ├── config/
│       │   └── index.ts            ← all env variables in one place
│       ├── errors/
│       │   └── AppError.ts         ← custom error class
│       ├── middlewares/
│       │   ├── auth.ts             ← JWT protect, adminOnly, contributorOnly
│       │   ├── validateRequest.ts  ← Zod validation middleware
│       │   └── globalErrorHandler.ts← catches ALL errors
│       ├── utils/
│       │   ├── catchAsync.ts       ← removes try/catch from controllers
│       │   └── sendResponse.ts     ← standardises all responses
│       ├── routes/
│       │   └── index.ts            ← combines all module routes
│       └── modules/
│           ├── Auth/               ← register, login
│           ├── User/               ← user CRUD, role change
│           ├── Resource/           ← main item module
│           ├── Review/             ← reviews + ratings
│           ├── Bookmark/           ← saved resources (order module)
│           ├── AI/                 ← Gemini AI features
│           └── Dashboard/          ← admin analytics
├── src/seed/
│   └── seed.ts                     ← demo data
├── .env                            ← secrets
├── package.json
└── tsconfig.json

```

---

> [!NOTE]
>
> ### Folder structure explainer : Creating the Core Server Files
>
> Before building our data models, we need the "skeleton" of our server.
>
> #### 1. `src/app.ts` (The Application Setup)
>
> **Introduction:** This file is where you configure Express. You add "middlewares" (like CORS and JSON parsing) and set up your base routes. It defines _what_ the app does, but it doesn't start the server yet.
>
> #### 2. `src/server.ts` (The Server Entry Point)
>
> **Introduction:** This is the brain of your project. Its job is to:
>
> 1. Connect to your MongoDB database using Mongoose.
> 2. Start the Express app (`app.ts`) and listen for requests on a specific port.
>    **Why separate them?** It makes testing easier and keeps your code cleaner!

---

> [!NOTE]
>
> #### Step 5: Building the Folder Structure
>
> Now, we create the specialized folders that make up our MVC pattern.
>
> #### 1. src/config/
>
> Use Case: Centralizes all environment variables (API keys, DB URLs, Port numbers, JWT Secrets).
> Step: Create index.ts here to export your .env variables safely.
>
> #### 2. src/models/
>
> Use Case: Mongoose Schemas and Models.
> Step: Create your schemas here. This defines how your data (like Users or Events) is saved in MongoDB.
>
> #### 3. src/routes/
>
> Use Case: Defines the URL endpoints (e.g., /api/v1/users/login).

## Step: Create route files that map specific URLs to your Controller functions.

# Install Dependencies

We need several packages for building our server, handling types, and security.

### Step 1: Production dependencies

```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv multer zod http-status @google/generative-ai
```

### Step 2: Dev dependencies (TypeScript + types)

These are only needed during development (for TypeScript support and auto-reloading).

```bash
npm install -D typescript ts-node nodemon @types/express @types/node @types/bcryptjs @types/jsonwebtoken @types/cors @types/multer
```

| Core packages                                        |                                           Extra packages |
| :--------------------------------------------------- | -------------------------------------------------------: |
| express — web framework                              |                                    multer — file uploads |
| mongoose — MongoDB ODM                               |                        @google/generative-ai — Gemini AI |
| bcryptjs — password hashing                          |                                 typescript — type safety |
| jsonwebtoken — JWT auth                              |                                 ts-node — run TypeScript |
| cors — cross-origin requests                         |                                   nodemon — auto restart |
| dotenv — environment variables                       |                             @types/\* — type definitions |
| zod — request body validation                        | tsconfig.json — create this file : Run: `npx tsc --init` |
| http-status — named HTTP codes (httpStatus.OK = 200) |                              Then set outDir to "./dist" |
| \_                                                   |                                   and rootDir to "./src" |

# Configure TypeScript

### Step 1 : tsconfig.json

Generate the tsconfig.json file to tell the compiler how to handle our code.

```bash
npx tsc --init
```

### Step 2: Add scripts to tsconfig.json:

tsconfig.json — paste this exactly: // "target":"ES2016", or "target": "ES2020",

```bash
{
  "compilerOptions": {
    "target":         "ES2020",
    "module":         "commonjs",
    "outDir":         "./dist",
    "rootDir":        "./src",
    "strict":         true,
    "esModuleInterop":true,
    "skipLibCheck":   true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 3: How to Run Locally

To make development easy, we use ts-node-dev which restarts the server automatically when you save a file.

Add scripts to package.json:

```bash
"scripts": {
  "dev":   "nodemon --exec ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "seed":  "ts-node src/seed/seed.ts"
}
```

To start development mode:

```bash
npm run dev
```

### Explainer: How to Compile TypeScript to JavaScript

Browsers and Node.js (in production) don't run TypeScript directly; they run JavaScript. To convert your code:

1. **Run the Build Command:**

   ```bash
   npm run build
   ```

   This uses the `tsc` (TypeScript Compiler) to read your `tsconfig.json` and generate a `dist/` folder containing pure `.js` files.

2. **Run the Compiled Code:**
   ```bash
   npm start
   ```
   This runs the production-ready code from the `dist/` folder.

---
# server.ts + app.ts — Entry Points
## add src/app.ts
```bash
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './routes';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1', router);

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Event Management Server is running!');
});

// Not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
```
## add src/server.ts
```bash
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    if (!config.database_url) {
      throw new Error('Database URL is not provided in environment variables');
    }

    await mongoose.connect(config.database_url);
    console.log('Connected to MongoDB successfully');

    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

main();
```
# .env + src/config/index.ts

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/studynest
JWT_SECRET=studynest_super_secret_key_min_32_chars_long
JWT_EXPIRES_IN=30d
GEMINI_API_KEY=your_gemini_key_from_aistudio_google_com
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
BCRYPT_SALT_ROUNDS=12
```

> [!IMPORTANT]
> collect all the env information from necessary site

## src/config/index.ts

```bash
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.MONGODB_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  gemini_api_key: process.env.GEMINI_API_KEY,
};

```
---

# utility

# middleware
