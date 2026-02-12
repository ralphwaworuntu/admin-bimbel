
import { db } from '../lib/db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    console.log("Checking for admin@demo.com...");
    try {
        const foundUsers = await db.select().from(users).where(eq(users.email, 'admin@demo.com'));
        if (foundUsers.length > 0) {
            console.log("User FOUND:");
            console.log(JSON.stringify(foundUsers[0], null, 2));
        } else {
            console.log("User NOT FOUND.");
        }
    } catch (e) {
        console.error("Error querying database:", e);
    }
    process.exit(0);
}

main();
