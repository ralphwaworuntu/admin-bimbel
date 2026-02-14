
import { mysqlTable, serial, varchar, text, datetime, boolean, json, uniqueIndex, index, int } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// --- Users & Auth (Better-Auth Compatible) ---

export const users = mysqlTable("users", {
    id: varchar("id", { length: 36 }).primaryKey(), // UUID
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: datetime("createdAt").notNull(),
    updatedAt: datetime("updatedAt").notNull(),
    role: varchar("role", { length: 50 }).default("user"),
});

export const sessions = mysqlTable("sessions", {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("userId", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: datetime("expiresAt").notNull(),
    ipAddress: varchar("ipAddress", { length: 45 }),
    userAgent: text("userAgent"),
    createdAt: datetime("createdAt").notNull(),
    updatedAt: datetime("updatedAt").notNull(),
});

export const accounts = mysqlTable("accounts", {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("userId", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    accountId: varchar("accountId", { length: 255 }).notNull(),
    providerId: varchar("providerId", { length: 255 }).notNull(),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    accessTokenExpiresAt: datetime("accessTokenExpiresAt"),
    refreshTokenExpiresAt: datetime("refreshTokenExpiresAt"),
    scope: text("scope"),
    idToken: text("idToken"),
    password: text("password"),
    createdAt: datetime("createdAt").notNull(),
    updatedAt: datetime("updatedAt").notNull(),
});

export const verifications = mysqlTable("verifications", {
    id: varchar("id", { length: 36 }).primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    value: varchar("value", { length: 255 }).notNull(),
    expiresAt: datetime("expiresAt").notNull(),
    createdAt: datetime("createdAt").notNull(),
});

// --- Application Specific ---

export const sites = mysqlTable("sites", {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    subdomain: varchar("subdomain", { length: 63 }).unique(),
    templateId: varchar("template_id", { length: 50 }),
    config: json("config").notNull(),
    status: varchar("status", { length: 20 }).default("draft"),
    deploymentUrl: varchar("deployment_url", { length: 255 }),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
}, (table) => {
    return {
        userIdIdx: index("user_id_idx").on(table.userId),
        subdomainIdx: index("subdomain_idx").on(table.subdomain),
    };
});
export const broadcasts = mysqlTable("broadcasts", {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    type: varchar("type", { length: 20 }).default("system"), // system, alert, maintenance
    priority: varchar("priority", { length: 10 }).default("normal"), // normal, high, critical
    isActive: boolean("is_active").default(true),
    createdAt: datetime("created_at").notNull(),
    expiresAt: datetime("expires_at"),
});
export const auditLogs = mysqlTable("audit_logs", {
    id: varchar("id", { length: 36 }).primaryKey(),
    adminId: varchar("admin_id", { length: 36 }).notNull().references(() => users.id),
    action: varchar("action", { length: 100 }).notNull(), // delete_user, update_role, broadcast, etc.
    targetId: varchar("target_id", { length: 100 }),
    targetType: varchar("target_type", { length: 20 }), // user, site, template, broadcast
    metadata: json("metadata"),
    createdAt: datetime("created_at").notNull(),
});

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
    admin: one(users, {
        fields: [auditLogs.adminId],
        references: [users.id],
    }),
}));

export const oracleInsights = mysqlTable("oracle_insights", {
    id: varchar("id", { length: 36 }).primaryKey(),
    targetId: varchar("target_id", { length: 36 }).notNull(), // User or Site ID
    type: varchar("type", { length: 50 }).notNull(), // churn_risk, upgrade_opportunity, etc.
    score: int("score").notNull(), // 0-100
    payload: json("payload"),
    status: varchar("status", { length: 20 }).default("active"), // active, resolved, dismissed
    createdAt: datetime("created_at").notNull(),
});

export const subscriptions = mysqlTable("subscriptions", {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    tier: varchar("tier", { length: 20 }).default("free"), // free, pro, enterprise
    status: varchar("status", { length: 20 }).default("active"), // active, past_due, canceled
    currentPeriodEnd: datetime("current_period_end"),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
});

export const invoices = mysqlTable("invoices", {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    amount: int("amount").notNull(), // in cents
    currency: varchar("currency", { length: 3 }).default("usd"),
    status: varchar("status", { length: 20 }).default("paid"), // paid, void, open
    pdfUrl: varchar("pdf_url", { length: 255 }),
    createdAt: datetime("created_at").notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
    user: one(users, {
        fields: [subscriptions.userId],
        references: [users.id],
    }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
    user: one(users, {
        fields: [invoices.userId],
        references: [users.id],
    }),
}));
