import { NextResponse } from "next/server";
import { SiteConfig } from "@/types/site";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const config: SiteConfig = body;

        // Validation logic (simple example)
        if (!config.identity.brandName) {
            return NextResponse.json(
                { error: "Brand name is required" },
                { status: 400 }
            );
        }

        // Mock Database Save
        console.log("Saving site config to DB:", JSON.stringify(config, null, 2));

        // Simulate DB delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            siteId: "mock-site-id-" + Math.random().toString(36).substr(2, 9),
            message: "Site configuration saved successfully",
            deploymentUrl: `https://${config.identity.brandName.toLowerCase().replace(/\s+/g, '-')}.waas.site`
        });

    } catch (error) {
        console.error("Error creating site:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
