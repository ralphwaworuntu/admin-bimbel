
import { db } from '../lib/db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    console.log("Checking for client@demo.com...");
    try {
        const foundUsers = await db.select().from(users).where(eq(users.email, 'client@demo.com'));
        if (foundUsers.length > 0) {
            console.log("User FOUND. You can log in.");
        } else {
            console.log("User NOT FOUND. Please register 'client@demo.com' via the /register page.");
        }
    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}

main();
