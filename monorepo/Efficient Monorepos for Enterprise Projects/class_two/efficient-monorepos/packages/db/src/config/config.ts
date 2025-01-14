import { config } from "dotenv";
import type { Config } from "drizzle-kit";
import path from "path";

config({ path: path.join(__dirname, "../../.env") });

export default {
  schema: "../schemas/index.ts",
  out: "../drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  
  },
} satisfies Config;
