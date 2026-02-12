import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSite, getSitesByUser } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(request: Request) {
    try {
        // Get authenticated user
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const config = body;

        if (!config.identity?.brandName) {
            return NextResponse.json(
                { error: "Brand name is required" },
                { status: 400 }
            );
        }

        const brandName = config.identity.brandName;
        const templateId = config.templateId;

        const result = createSite(session.user.id, brandName, config, templateId);

        return NextResponse.json({
            success: true,
            siteId: result.id,
            message: "Site configuration saved successfully",
            deploymentUrl: result.deploymentUrl,
        });
    } catch (error) {
        console.error("Error creating site:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const sites = getSitesByUser(session.user.id);

        return NextResponse.json({ sites });
    } catch (error) {
        console.error("Error fetching sites:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
