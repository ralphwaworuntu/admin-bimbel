import { mysqlTable, serial, varchar, text, datetime, boolean, json, uniqueIndex, index } from "drizzle-orm/mysql-core";

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
