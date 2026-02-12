"use server";

import { deleteUser, updateUserRole, deleteSite } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function checkAdmin() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || (session.user as any).role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
    }
    return session;
}

export async function deleteUserAction(userId: string) {
    await checkAdmin();
    deleteUser(userId);
    revalidatePath("/admin/users");
    revalidatePath("/admin");
}

export async function toggleAdminRoleAction(userId: string, currentRole: string) {
    await checkAdmin();
    const newRole = currentRole === "admin" ? "user" : "admin";
    updateUserRole(userId, newRole);
    revalidatePath("/admin/users");
}

export async function deleteSiteAction(siteId: string) {
    await checkAdmin();
    deleteSite(siteId);
    revalidatePath("/admin/sites");
    revalidatePath("/admin");
}
