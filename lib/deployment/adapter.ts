import { SiteConfig } from "@/types/site";

export interface DeploymentResult {
    success: boolean;
    deploymentId?: string;
    url?: string;
    logs: string[];
    error?: string;
}

export interface DeploymentProvider {
    name: string;
    deploy(siteId: string, config: SiteConfig): Promise<DeploymentResult>;
    getStatus(deploymentId: string): Promise<"building" | "ready" | "error">;
}
