import { getActiveBroadcasts } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const broadcasts = await getActiveBroadcasts();
        return NextResponse.json(broadcasts);
    } catch (error) {
        console.error("Failed to fetch broadcasts", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
