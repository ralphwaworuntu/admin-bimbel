"use server";

import { createBroadcast } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function sendBroadcastAction(data: { title: string; message: string; type: string; priority: string }) {
    await createBroadcast(data);
    revalidatePath("/admin/broadcast");
    revalidatePath("/dashboard"); // Future synchronization
}

import { deleteSite, updateUserRole, deleteUser } from "@/lib/db";

export async function deleteSiteAction(siteId: string) {
    await deleteSite(siteId);
    revalidatePath("/admin/sites");
}

export async function toggleAdminRoleAction(userId: string, currentRole: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await updateUserRole(userId, newRole);
    revalidatePath("/admin/users");
}

export async function deleteUserAction(userId: string) {
    await deleteUser(userId);
    revalidatePath("/admin/users");
}

import { runOracleAnalysis, generateMockOracleData } from "@/lib/oracle";

export async function runOracleAnalysisAction() {
    await runOracleAnalysis();
    revalidatePath("/admin/oracle");
}


import { processNeuralQuery } from "@/lib/neural-engine";

export async function simulateOracleDataAction() {
    await generateMockOracleData();
    revalidatePath("/admin/oracle");
}


export async function askOracleAction(query: string) {
    return await processNeuralQuery(query);
}

import { updateSite } from "@/lib/db";

export async function bulkUpdateSitesAction(siteIds: string[], data: { status?: string }) {
    // In a real app, use a transaction or batch update
    for (const id of siteIds) {
        await updateSite(id, data);
    }
    revalidatePath("/admin/multiverse");
    revalidatePath("/admin/sites");
}

export async function bulkDeleteSitesAction(siteIds: string[]) {
    for (const id of siteIds) {
        await deleteSite(id);
    }
    revalidatePath("/admin/multiverse");
    revalidatePath("/admin/sites");
}

export async function impersonateUserAction(userId: string) {
    console.log(`[SECURITY] Admin initiating GHOST LOGIN for user ${userId}`);
    // Mock success for prototype
    return { success: true };
}
