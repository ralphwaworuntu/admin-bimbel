import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateUserRole, getAllUsers } from "@/lib/db";

// WARNING: This route is for DEVELOPMENT ONLY.
// In production, this should be disabled or protected by a secret key.
export async function GET() {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Not available in production" }, { status: 403 });
    }

    try {
        const users = getAllUsers();
        if (users.length === 0) {
            return NextResponse.json({ message: "No users found. Register a user first at /register, then visit this route again." });
        }

        const firstUser = users[0];
        updateUserRole(firstUser.id, "admin");

        return NextResponse.json({
            success: true,
            message: `User ${firstUser.email} promoted to ADMIN.`,
            user: firstUser
        });

    } catch (error) {
        return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
    }
}
