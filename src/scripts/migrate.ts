import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "../config/database";

async function runMigrations() {
    try {
        await migrate(db, { migrationsFolder: "./migrations" });
        console.log("Migrations applied successfully.");
    } catch (error) {
        console.error("Migration error:", error);
    }
}

runMigrations();