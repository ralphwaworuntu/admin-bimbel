import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserCount, getSiteCount, getRecentUsers, getRecentSites } from "@/lib/db";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [totalUsers, totalSites, recentUsers, recentSites] = await Promise.all([
            getUserCount(),
            getSiteCount(),
            getRecentUsers(5),
            getRecentSites(5)
        ]);

        return NextResponse.json({
            stats: {
                totalUsers,
                totalSites,
                activeSessions: 1, // Placeholder for real session tracking
                growth: "+12%" // Placeholder
            },
            recentUsers,
            recentSites
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
