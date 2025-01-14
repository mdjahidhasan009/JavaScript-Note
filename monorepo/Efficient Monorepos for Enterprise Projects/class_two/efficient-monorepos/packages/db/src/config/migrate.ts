import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "dotenv";
import path from "path";

// Load env from the db package directory
config({ path: path.join(__dirname, "../../.env") });

const connectionString = process.env.DATABASE_URL!;

console.log("connectionString", connectionString)

// for migrations
const migrationClient = postgres(connectionString, { max: 1 });

const db = drizzle(migrationClient);

const main = async () => {
  console.log("migration started");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("migration completed");
  process.exit(0);
};

main().catch((err) => {
  console.error("migration failed", err);
  process.exit(1);
});