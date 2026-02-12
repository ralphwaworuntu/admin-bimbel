import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSiteById, updateSite } from "@/lib/db";
import { deploymentProvider } from "@/lib/deployment/vercel";
import { headers } from "next/headers";

export async function POST(request: Request) {
    try {
        // 1. Auth check
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { siteId } = body;

        if (!siteId) {
            return NextResponse.json({ error: "Site ID is required" }, { status: 400 });
        }

        // 2. Site ownership check
        const site = getSiteById(siteId);
        if (!site) {
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        if (site.user_id !== session.user.id && (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // 3. Trigger Deployment
        const result = await deploymentProvider.deploy(siteId, site.config);

        if (result.success && result.url) {
            updateSite(siteId, {
                status: "deployed",
                deployment_url: result.url
            });
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error("Deployment failed:", error);
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, { status: 500 });
    }
}
