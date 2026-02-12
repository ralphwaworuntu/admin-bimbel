import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { sites, users } from "@/db/schema";

// --- Database Connection ---

const poolConnection = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "waas_builder",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const db = drizzle(poolConnection, { schema, mode: "default" });

// --- SITE OPERATIONS ---

export async function createSite(userId: string, name: string, config: any, templateId?: string) {
    const id = "site-" + Math.random().toString(36).substr(2, 9);
    const subdomain = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const deploymentUrl = `https://${subdomain}.waas.site`;
    const now = new Date();

    await db.insert(sites).values({
        id,
        userId,
        name,
        subdomain,
        templateId: templateId || undefined,
        config: config,
        status: "active",
        deploymentUrl,
        createdAt: now,
        updatedAt: now,
    });

    return { id, subdomain, deploymentUrl, status: "active" };
}

export async function getSitesByUser(userId: string) {
    return await db.query.sites.findMany({
        where: eq(sites.userId, userId),
        orderBy: [desc(sites.createdAt)],
    });
}

export async function getAllSites() {
    return await db.query.sites.findMany({
        orderBy: [desc(sites.createdAt)],
    });
}

export async function getSiteById(siteId: string) {
    return await db.query.sites.findFirst({
        where: eq(sites.id, siteId),
    });
}

// Partial update helper
export async function updateSite(siteId: string, updates: { name?: string; config?: any; status?: string; deployment_url?: string }) {
    const updateData: any = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.config) updateData.config = updates.config;
    if (updates.status) updateData.status = updates.status;
    if (updates.deployment_url) updateData.deploymentUrl = updates.deployment_url;

    // Manually update timestamp
    updateData.updatedAt = new Date();

    await db.update(sites)
        .set(updateData)
        .where(eq(sites.id, siteId));
}

export async function deleteSite(siteId: string) {
    await db.delete(sites).where(eq(sites.id, siteId));
}

// --- USER OPERATIONS ---

export async function getAllUsers() {
    return await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
    });
}

export async function updateUserRole(userId: string, role: string) {
    await db.update(users)
        .set({ role })
        .where(eq(users.id, userId));
}

export async function deleteUser(userId: string) {
    await db.delete(users).where(eq(users.id, userId));
}
