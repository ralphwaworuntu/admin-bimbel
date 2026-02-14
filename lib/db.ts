import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { sites, users, oracleInsights, subscriptions, invoices } from "@/db/schema";

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

export async function getAllSitesWithOwners() {
    return await db.select({
        id: sites.id,
        name: sites.name,
        subdomain: sites.subdomain,
        status: sites.status,
        createdAt: sites.createdAt,
        updatedAt: sites.updatedAt,
        config: sites.config,
        deploymentUrl: sites.deploymentUrl,
        owner: {
            id: users.id,
            name: users.name,
            email: users.email
        }
    })
        .from(sites)
        .innerJoin(users, eq(sites.userId, users.id))
        .orderBy(desc(sites.createdAt));
}

export async function getSiteById(siteId: string) {
    return await db.query.sites.findFirst({
        where: eq(sites.id, siteId),
    });
}

// Partial update helper
export async function updateSite(siteId: string, updates: { name?: string; config?: any; status?: string; deploymentUrl?: string }) {
    const updateData: any = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.config) updateData.config = updates.config;
    if (updates.status) updateData.status = updates.status;
    if (updates.deploymentUrl) updateData.deploymentUrl = updates.deploymentUrl;

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

// --- ADMIN STATS ---

export async function getUserCount() {
    const allUsers = await db.select().from(users);
    return allUsers.length;
}

export async function getSiteCount() {
    const allSites = await db.select().from(sites);
    return allSites.length;
}

export async function getRecentUsers(limit: number = 5) {
    return await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
        limit,
    });
}

export async function getRecentSites(limit: number = 5) {
    return await db.query.sites.findMany({
        orderBy: [desc(sites.createdAt)],
        limit,
    });
}

export async function getTemplateAdoptionStats() {
    const allSites = await db.select({ templateId: sites.templateId }).from(sites);
    const stats: Record<string, number> = {};

    allSites.forEach(site => {
        if (site.templateId) {
            stats[site.templateId] = (stats[site.templateId] || 0) + 1;
        }
    });

    return stats;
}

// --- BROADCAST OPERATIONS ---

import { broadcasts } from "@/db/schema";

export async function createBroadcast(data: { title: string; message: string; type?: string; priority?: string }) {
    const id = "bc-" + Math.random().toString(36).substr(2, 9);
    const now = new Date();

    await db.insert(broadcasts).values({
        id,
        title: data.title,
        message: data.message,
        type: data.type || "system",
        priority: data.priority || "normal",
        isActive: true,
        createdAt: now,
    });

    return id;
}

export async function getActiveBroadcasts() {
    return await db.query.broadcasts.findMany({
        where: eq(broadcasts.isActive, true),
        orderBy: [desc(broadcasts.createdAt)],
    });
}

// --- AUDIT OPERATIONS ---

import { auditLogs } from "@/db/schema";

export async function createAuditLog(data: { adminId: string; action: string; targetId?: string; targetType?: string; metadata?: any }) {
    const id = "log-" + Math.random().toString(36).substr(2, 9);
    await db.insert(auditLogs).values({
        id,
        ...data,
        createdAt: new Date(),
    });
}

export async function getAuditLogs(limit: number = 50) {
    const logs = await db.select({
        id: auditLogs.id,
        adminId: auditLogs.adminId,
        action: auditLogs.action,
        targetId: auditLogs.targetId,
        targetType: auditLogs.targetType,
        metadata: auditLogs.metadata,
        createdAt: auditLogs.createdAt,
        adminName: users.name,
        adminEmail: users.email,
        adminImage: users.image,
    })
        .from(auditLogs)
        .leftJoin(users, eq(auditLogs.adminId, users.id))
        .orderBy(desc(auditLogs.createdAt))
        .limit(limit);

    // Map to expected format to maintain compatibility
    return logs.map(log => ({
        ...log,
        admin: {
            name: log.adminName,
            email: log.adminEmail,
            image: log.adminImage
        }
    }));
}



// --- ORACLE OPERATIONS ---

export async function createOracleInsight(data: { targetId: string; type: string; score: number; payload?: any }) {
    const id = "oracle-" + Math.random().toString(36).substr(2, 9);
    await db.insert(oracleInsights).values({
        id,
        targetId: data.targetId,
        type: data.type,
        score: data.score,
        payload: data.payload,
        status: "active",
        createdAt: new Date(),
    });
}

export async function getOracleInsights(limit: number = 50) {
    return await db.query.oracleInsights.findMany({
        orderBy: [desc(oracleInsights.createdAt)],
        limit,
    });
}

export async function getOracleInsightByTarget(targetId: string) {
    return await db.query.oracleInsights.findFirst({
        where: eq(oracleInsights.targetId, targetId),
        orderBy: [desc(oracleInsights.createdAt)],
    });
}

// --- BILLING OPERATIONS ---

export async function getUserSubscription(userId: string) {
    return await db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, userId),
    });
}

export async function upsertSubscription(data: { userId: string; tier: string; status: string; stripeCustomerId?: string; stripeSubscriptionId?: string; currentPeriodEnd?: Date }) {
    const existing = await getUserSubscription(data.userId);
    const now = new Date();

    if (existing) {
        await db.update(subscriptions)
            .set({
                ...data,
                updatedAt: now
            })
            .where(eq(subscriptions.id, existing.id));
        return existing.id;
    } else {
        const id = "sub-" + Math.random().toString(36).substr(2, 9);
        await db.insert(subscriptions).values({
            id,
            ...data,
            createdAt: now,
            updatedAt: now,
        });
        return id;
    }
}

export async function createInvoice(data: { userId: string; amount: number; status: string; pdfUrl?: string }) {
    const id = "inv-" + Math.random().toString(36).substr(2, 9);
    await db.insert(invoices).values({
        id,
        ...data,
        currency: "usd",
        createdAt: new Date(),
    });
    return id;
}

export async function getUserInvoices(userId: string) {
    return await db.query.invoices.findMany({
        where: eq(invoices.userId, userId),
        orderBy: [desc(invoices.createdAt)],
    });
}
