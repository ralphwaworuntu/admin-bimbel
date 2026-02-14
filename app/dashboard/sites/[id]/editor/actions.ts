"use server";

import { updateSite } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveSiteConfig(siteId: string, config: any) {
    try {
        await updateSite(siteId, { config });
        revalidatePath(`/dashboard/sites/${siteId}`);
        revalidatePath(`/dashboard/sites/${siteId}/editor`);
        return { success: true };
    } catch (error) {
        console.error("Failed to save site config:", error);
        return { success: false, error: "Failed to save changes" };
    }
}
