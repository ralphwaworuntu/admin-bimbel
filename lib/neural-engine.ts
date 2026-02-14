
import { getOracleInsights, getAllUsers, getAuditLogs } from "@/lib/db";

export type NeuralInsight = {
    type: 'data' | 'chart' | 'alert' | 'text';
    title: string;
    content: string;
    data?: any;
    priority?: 'normal' | 'high' | 'critical';
};

// Heuristic engine to simulate AI understanding
export async function processNeuralQuery(query: string): Promise<NeuralInsight> {
    const q = query.toLowerCase();

    // simulate "thinking" delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 1. User/Growth Queries
    if (q.includes("user") || q.includes("growth") || q.includes("signup")) {
        const users = await getAllUsers();
        const recentUsers = users.filter(u => {
            const date = new Date(u.createdAt);
            const now = new Date();
            return (now.getTime() - date.getTime()) < (7 * 24 * 60 * 60 * 1000);
        });

        return {
            type: 'data',
            title: 'User Growth Intelligence',
            content: `I found ${users.length} total users in the sovereign database. ${recentUsers.length} joined in the last 7 days.`,
            data: { total: users.length, recent: recentUsers.length },
            priority: 'normal'
        };
    }

    // 2. Revenue/MRR Queries
    if (q.includes("money") || q.includes("revenue") || q.includes("mrr") || q.includes("sales")) {
        // Mock data for now, would aggregate real invoices
        return {
            type: 'chart',
            title: 'Revenue Velocity',
            content: 'MRR is currently at $12,450, up 12.5% from last month. Pro tier adoption is driving growth.',
            data: [
                { name: 'Jan', value: 8500 },
                { name: 'Feb', value: 9200 },
                { name: 'Mar', value: 10400 },
                { name: 'Apr', value: 11100 },
                { name: 'May', value: 11800 },
                { name: 'Jun', value: 12450 },
            ],
            priority: 'high'
        };
    }

    // 3. Churn/Risk Queries
    if (q.includes("churn") || q.includes("risk") || q.includes("leave")) {
        const insights = await getOracleInsights();
        const riskAlerts = insights.filter(i => i.type === 'churn_risk' && i.status === 'active');

        return {
            type: 'alert',
            title: 'Churn Radar Protocol',
            content: `I've detected ${riskAlerts.length} users with high churn probability. Immediate retention action is recommended.`,
            data: riskAlerts.map(i => ({ id: i.targetId, score: i.score })),
            priority: 'critical'
        };
    }

    // 4. Audit/Security Queries
    if (q.includes("audit") || q.includes("log") || q.includes("security") || q.includes("who")) {
        const logs = await getAuditLogs(5);
        const lastAction = logs[0];

        return {
            type: 'text',
            title: 'Security Audit Manifest',
            content: `The last administrative action was performed by ${lastAction?.admin?.name || 'Unknown'} (${lastAction?.action}) on ${lastAction?.createdAt?.toLocaleDateString()}. System integrity is 100%.`,
            priority: 'normal'
        };
    }

    // Fallback
    return {
        type: 'text',
        title: 'Neural Link Active',
        content: "I'm listening, Administrator. You can ask me about Users, Revenue, Churn Risk, or System Audits.",
        priority: 'normal'
    };
}
