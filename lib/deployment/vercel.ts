import { DeploymentProvider, DeploymentResult } from "./adapter";
import { SiteConfig } from "@/types/site";

export class VercelMockProvider implements DeploymentProvider {
    name = "Vercel (Mock)";

    async deploy(siteId: string, config: SiteConfig): Promise<DeploymentResult> {
        console.log(`[VercelMock] Starting deployment for site ${siteId}...`);

        // Simulate build time
        await new Promise(resolve => setTimeout(resolve, 2500));

        const subdomain = config.identity.brandName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const url = `https://${subdomain}.waas.site`;

        return {
            success: true,
            deploymentId: "dpl_" + Math.random().toString(36).substr(2, 9),
            url,
            logs: [
                "Cloning repository...",
                "Installing dependencies...",
                "Building Next.js app...",
                "Optimizing static assets...",
                "Deployment complete!"
            ]
        };
    }

    async getStatus(deploymentId: string): Promise<"building" | "ready" | "error"> {
        return "ready";
    }
}

export const deploymentProvider = new VercelMockProvider();
