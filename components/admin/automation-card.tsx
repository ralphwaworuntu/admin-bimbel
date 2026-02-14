"use client";

import { motion } from "framer-motion";
import { AutomationRule, toggleAutomation } from "@/lib/automation-engine";
import { useState } from "react";
import {
    Zap,
    Mail,
    AlertTriangle,
    DollarSign,
    UserPlus,
    Slack,
    Flag,
    ArrowRight,
    Power,
    CheckCircle2
} from "lucide-react";
import { useRouter } from "next/navigation";

const ICON_MAP: Record<string, any> = {
    'USER_SIGNUP': UserPlus,
    'CHURN_RISK_DETECTED': AlertTriangle,
    'REVENUE_MILESTONE': DollarSign,
    'SYSTEM_ALERT': Zap,
    'SEND_EMAIL': Mail,
    'GRANT_CREDITS': DollarSign,
    'SLACK_ALERT': Slack,
    'FLAG_ACCOUNT': Flag,
    'WEBHOOK_TRIGGER': Zap
};

const COLOR_MAP: Record<string, string> = {
    'USER_SIGNUP': 'text-blue-500 bg-blue-500/10',
    'CHURN_RISK_DETECTED': 'text-red-500 bg-red-500/10',
    'REVENUE_MILESTONE': 'text-emerald-500 bg-emerald-500/10',
    'SYSTEM_ALERT': 'text-amber-500 bg-amber-500/10',
};

export function AutomationCard({ rule }: { rule: AutomationRule }) {
    const [isActive, setIsActive] = useState(rule.isActive);
    const [isToggling, setIsToggling] = useState(false);
    const router = useRouter();

    const TriggerIcon = ICON_MAP[rule.trigger] || Zap;
    const ActionIcon = ICON_MAP[rule.action] || Zap;

    const handleToggle = async () => {
        setIsToggling(true);
        const newState = await toggleAutomation(rule.id, isActive);
        setIsActive(newState);
        setIsToggling(false);
        router.refresh();
    };

    return (
        <motion.div
            layout
            className={`
                group relative overflow-hidden rounded-[2rem] border transition-all duration-300
                ${isActive
                    ? 'bg-white dark:bg-slate-900 border-purple-500/20 shadow-lg shadow-purple-900/5'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 opacity-60 grayscale'}
            `}
        >
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-bold text-lg mb-1">{rule.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[280px]">
                            {rule.description}
                        </p>
                    </div>
                    <button
                        onClick={handleToggle}
                        disabled={isToggling}
                        className={`
                            w-12 h-7 rounded-full transition-colors relative flex items-center p-1
                            ${isActive ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'}
                        `}
                    >
                        <motion.div
                            layout
                            className={`
                                w-5 h-5 rounded-full bg-white shadow-sm
                            `}
                            animate={{ x: isActive ? 20 : 0 }}
                        />
                    </button>
                </div>

                {/* Flow Visual */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5">
                    <div className={`p-2 rounded-lg ${COLOR_MAP[rule.trigger] || 'text-slate-500 bg-slate-500/10'}`}>
                        <TriggerIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="relative z-10 bg-white dark:bg-slate-900 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Then
                        </div>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        <ActionIcon className="w-5 h-5" />
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Executed {rule.runCount} times
                    </div>
                    {rule.lastRun && (
                        <span>Last: {rule.lastRun.toLocaleDateString()}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
