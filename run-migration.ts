
import { db } from "./lib/db";
import { sql } from "drizzle-orm";
import fs from "fs";
import path from "path";

async function main() {
    console.log("Running manual migration...");
    const migrationSql = fs.readFileSync(path.join(process.cwd(), "migration.sql"), "utf-8");

    // Split statements by semicolon and filter empty ones
    const statements = migrationSql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
        try {
            await db.execute(sql.raw(statement));
            console.log("Executed statement successfully.");
        } catch (e) {
            console.error("Error executing statement:", e);
        }
    }

    console.log("Manual migration complete.");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
