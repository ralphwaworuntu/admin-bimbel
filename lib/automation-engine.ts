
export type TriggerType = 'USER_SIGNUP' | 'CHURN_RISK_DETECTED' | 'REVENUE_MILESTONE' | 'SYSTEM_ALERT';
export type ActionType = 'SEND_EMAIL' | 'GRANT_CREDITS' | 'SLACK_ALERT' | 'WEBHOOK_TRIGGER' | 'FLAG_ACCOUNT';

export interface AutomationRule {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    trigger: TriggerType;
    condition?: {
        field: string;
        operator: '>' | '<' | '==' | 'contains';
        value: any;
    };
    action: ActionType;
    lastRun?: Date;
    runCount: number;
}

export const MOCK_AUTOMATIONS: AutomationRule[] = [
    {
        id: 'auto-001',
        name: 'High Churn Intervention',
        description: 'Automatically send a retention offer if churn risk exceeds 80%.',
        isActive: true,
        trigger: 'CHURN_RISK_DETECTED',
        condition: { field: 'score', operator: '>', value: 80 },
        action: 'SEND_EMAIL',
        lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        runCount: 142
    },
    {
        id: 'auto-002',
        name: 'VIP Onboarding',
        description: 'Flag new accounts with "enterprise" email domains for manual review.',
        isActive: true,
        trigger: 'USER_SIGNUP',
        condition: { field: 'email', operator: 'contains', value: '@enterprise.com' },
        action: 'FLAG_ACCOUNT',
        lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        runCount: 12
    },
    {
        id: 'auto-003',
        name: 'Revenue Celebration',
        description: 'Post to Slack when MRR crosses a $1000 increment.',
        isActive: false,
        trigger: 'REVENUE_MILESTONE',
        action: 'SLACK_ALERT',
        runCount: 0
    }
];

// Mock evaluation engine
export async function toggleAutomation(id: string, currentState: boolean) {
    // In a real app, this would update the DB
    console.log(`Toggling automation ${id} to ${!currentState}`);
    return !currentState; // return new state
}

export async function createAutomation(data: Partial<AutomationRule>) {
    console.log("Creating new automation", data);
    return {
        id: `auto-${Math.random().toString(36).substr(2, 9)}`,
        ...data,
        isActive: true,
        runCount: 0
    } as AutomationRule;
}
