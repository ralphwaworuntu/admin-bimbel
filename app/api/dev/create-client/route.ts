
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Not available in production" }, { status: 403 });
    }

    try {
        const ctxHeaders = await headers();
        const email = "client@demo.com";
        const password = "password123";
        const name = "Demo Client";

        // Check if user exists first might be good, but signUpEmail returns error if exists
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
                // role: "client" // Better Auth might not allow setting role in signUp directly without admin plugin or configuration, but let's try or update after.
            },
            headers: ctxHeaders
        });

        if (result?.user) {
            // If we need to enforce a specific role 'client' distinct from 'user':
            // await updateUserRole(result.user.id, "client"); 
            // But for now, default 'user' role is fine as it falls into the 'else' block of login redirect.

            return NextResponse.json({
                success: true,
                message: `Created client user (${email}).`,
                user: result.user
            });
        }

        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });

    } catch (error: any) {
        console.error("API Error Creating Client:", error);
        return NextResponse.json({
            error: "Registration failed",
            details: error?.message || String(error)
        }, { status: 500 });
    }
}
