
import { db } from "@/lib/db";
import { users, sites, oracleInsights } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export interface OracleScore {
    userId: string;
    score: number;
    riskFactor: "low" | "medium" | "high";
    insights: string[];
}

export async function runOracleAnalysis() {
    const allUsers = await db.select().from(users);
    let processed = 0;

    for (const user of allUsers) {
        let score = 50; // Base neutral score
        const insights = [];

        // 1. Engagement Analysis (Time Decay)
        const lastActive = new Date(user.updatedAt).getTime();
        const now = new Date().getTime();
        const daysSinceActive = (now - lastActive) / (1000 * 60 * 60 * 24);

        if (daysSinceActive > 30) {
            score -= 30;
            insights.push("Dormant: Indirect activity > 30 days");
        } else if (daysSinceActive < 3) {
            score += 15;
            insights.push("High Velocity: Active in last 72h");
        }

        // 2. Asset Valuation (Sites)
        const userSites = await db.select().from(sites).where(eq(sites.userId, user.id));

        if (userSites.length === 0) {
            score -= 10;
            insights.push("Zero Asset: No sites created");
        } else {
            score += (userSites.length * 5);
            const deployed = userSites.filter(s => s.status === "deployed").length;
            if (deployed > 0) {
                score += 20;
                insights.push(`Production Ready: ${deployed} deployed sites`);
            }
        }

        // 3. Admin Status
        if (user.role === 'admin') {
            score = 100;
            insights.push("Sovereign Principal");
        }

        // Clamp Score
        score = Math.max(0, Math.min(100, score));

        // Determine Insight Type
        let type = "neutral";
        if (score < 40) type = "churn_risk";
        if (score > 80) type = "upgrade_opportunity";

        // Persist to Lattice
        await db.insert(oracleInsights).values({
            id: `oracle-${Date.now()}-${user.id.substring(0, 8)}`,
            targetId: user.id,
            type: type,
            score: score,
            payload: {
                reasons: insights,
                analyzedAt: new Date().toISOString()
            },
            status: "active",
            createdAt: new Date(),
        });

        processed++;
    }

    return { processed, timestamp: new Date() };
}

// Simulation for demo purposes if no real data exists
export async function generateMockOracleData() {
    const mockInsights = [
        { type: "churn_risk", score: 15, payload: { reasons: ["No login 45 days", "0 Sites"] } },
        { type: "upgrade_opportunity", score: 85, payload: { reasons: ["High traffic velocity", "3 deployed sites"] } },
        { type: "performance_alert", score: 60, payload: { reasons: ["API Latency spike detected"] } },
        { type: "churn_risk", score: 30, payload: { reasons: ["Failed build attempts"] } },
        { type: "upgrade_opportunity", score: 92, payload: { reasons: ["Viral content detected", "Enterprise usage"] } }
    ];

    const allUsers = await db.select().from(users);

    // Distribute mock insights to users
    for (let i = 0; i < allUsers.length; i++) {
        const insight = mockInsights[i % mockInsights.length];
        await db.insert(oracleInsights).values({
            id: `mock-${Date.now()}-${i}`,
            targetId: allUsers[i].id,
            type: insight.type,
            score: insight.score,
            payload: insight.payload,
            status: "active",
            createdAt: new Date(Date.now() - (i * 10000000)), // Spread out over time
        });
    }
}
