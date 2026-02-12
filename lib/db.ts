import Database from "better-sqlite3";
import path from "path";

// Reuse the same SQLite database as Better Auth
const dbPath = path.join(process.cwd(), "auth.db");

let db: ReturnType<typeof Database> | null = null;

function getDb() {
    if (!db) {
        db = new Database(dbPath);
        db.pragma("journal_mode = WAL");
        initTables();
    }
    return db;
}

function initTables() {
    const database = db!;

    database.exec(`
        CREATE TABLE IF NOT EXISTS sites (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            name TEXT NOT NULL,
            subdomain TEXT,
            template_id TEXT,
            config TEXT NOT NULL,
            status TEXT DEFAULT 'draft',
            deployment_url TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now'))
        )
    `);
}

// CRUD Operations
export function createSite(userId: string, name: string, config: any, templateId?: string) {
    const database = getDb();
    const id = "site-" + Math.random().toString(36).substr(2, 9);
    const subdomain = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const deploymentUrl = `https://${subdomain}.waas.site`;

    const stmt = database.prepare(`
        INSERT INTO sites (id, user_id, name, subdomain, template_id, config, status, deployment_url)
        VALUES (?, ?, ?, ?, ?, ?, 'active', ?)
    `);

    stmt.run(id, userId, name, subdomain, templateId || null, JSON.stringify(config), deploymentUrl);

    return { id, subdomain, deploymentUrl, status: "active" };
}

export function getSitesByUser(userId: string) {
    const database = getDb();
    const stmt = database.prepare("SELECT * FROM sites WHERE user_id = ? ORDER BY created_at DESC");
    const rows = stmt.all(userId) as any[];

    return rows.map((row) => ({
        ...row,
        config: JSON.parse(row.config),
    }));
}

export function getSiteById(siteId: string) {
    const database = getDb();
    const stmt = database.prepare("SELECT * FROM sites WHERE id = ?");
    const row = stmt.get(siteId) as any;
    if (!row) return null;

    return {
        ...row,
        config: JSON.parse(row.config),
    };
}

export function updateSite(siteId: string, updates: { name?: string; config?: any; status?: string }) {
    const database = getDb();
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name) {
        fields.push("name = ?");
        values.push(updates.name);
    }
    if (updates.config) {
        fields.push("config = ?");
        values.push(JSON.stringify(updates.config));
    }
    if (updates.status) {
        fields.push("status = ?");
        values.push(updates.status);
    }

    fields.push("updated_at = datetime('now')");
    values.push(siteId);

    const stmt = database.prepare(`UPDATE sites SET ${fields.join(", ")} WHERE id = ?`);
    return stmt.run(...values);
}

export function deleteSite(siteId: string) {
    const database = getDb();
    const stmt = database.prepare("DELETE FROM sites WHERE id = ?");
    return stmt.run(siteId);
}
