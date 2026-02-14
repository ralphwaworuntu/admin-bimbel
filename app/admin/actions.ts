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

export async function simulateOracleDataAction() {
    await generateMockOracleData();
    revalidatePath("/admin/oracle");
}
