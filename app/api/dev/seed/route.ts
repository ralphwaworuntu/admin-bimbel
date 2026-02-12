import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateUserRole, getAllUsers } from "@/lib/db";

// WARNING: This route is for DEVELOPMENT ONLY.
export async function GET() {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Not available in production" }, { status: 403 });
    }

    try {
        let users = await getAllUsers();
        let targetUser;
        let createdNew = false;

        if (users.length === 0) {
            console.log("No users found. Creating demo admin...");
            // Attempt to create a demo user
            try {
                // We use a mock request context or pass headers
                const ctxHeaders = await headers();

                const result = await auth.api.signUpEmail({
                    body: {
                        email: "admin@demo.com",
                        password: "password123",
                        name: "Demo Admin",
                    },
                    headers: ctxHeaders
                });

                if (result?.user) {
                    targetUser = result.user;
                    createdNew = true;
                } else {
                    throw new Error("Failed to create user object");
                }
            } catch (authError: any) {
                console.error("Auto-creation failed:", authError);
                return NextResponse.json({
                    error: "Failed to auto-create demo user. Please register manually at /register then refresh this page.",
                    details: authError?.message || String(authError)
                }, { status: 500 });
            }
        } else {
            targetUser = users[0];
        }

        if (!targetUser) {
            return NextResponse.json({ error: "No user available to promote." }, { status: 404 });
        }

        await updateUserRole(targetUser.id, "admin");

        return NextResponse.json({
            success: true,
            action: createdNew ? "CREATED_AND_PROMOTED" : "PROMOTED_EXISTING",
            message: createdNew
                ? "Created demo user (admin@demo.com / password123) and promoted to ADMIN."
                : `Promoted existing user ${targetUser.email} to ADMIN.`,
            user: {
                id: targetUser.id,
                email: targetUser.email,
                role: "admin"
            },
            credentials: createdNew ? { email: "admin@demo.com", password: "password123" } : undefined
        });

    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Internal Error", details: error?.message }, { status: 500 });
    }
}
