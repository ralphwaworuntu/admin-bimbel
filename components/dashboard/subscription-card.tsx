"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { manageSubscriptionAction } from "@/app/dashboard/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SubscriptionCardProps {
    plan: any;
    currentTier: string;
    userId: string;
}

export function SubscriptionCard({ plan, currentTier, userId }: SubscriptionCardProps) {
    const isCurrent = currentTier === plan.id;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleUpgrade = async () => {
        if (isCurrent) return;
        setIsLoading(true);
        await manageSubscriptionAction(userId, plan.id, 'upgrade');
        setIsLoading(false);
        router.refresh();
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`p-8 rounded-[2.5rem] border ${isCurrent ? 'border-purple-600 bg-purple-600/5 ring-4 ring-purple-600/10' : 'border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900'} relative overflow-hidden flex flex-col`}
        >
            {isCurrent && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    Active
                </div>
            )}

            <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">${plan.price / 100}</span>
                <span className="text-sm font-bold text-slate-400">/mo</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Check className="w-3 h-3" />
                    </div>
                    {plan.limits.sites} Site{plan.limits.sites > 1 ? 's' : ''}
                </li>
                {plan.limits.customDomain && (
                    <li className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Check className="w-3 h-3" />
                        </div>
                        Custom Domain
                    </li>
                )}
                <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                    <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                        <Check className="w-3 h-3" />
                    </div>
                    Sovereign Support
                </li>
            </ul>

            <button
                onClick={handleUpgrade}
                disabled={isCurrent || isLoading}
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isCurrent
                        ? "bg-slate-100 text-slate-400 cursor-default"
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105"
                    }`}
            >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isCurrent ? "Current Plan" : "Upgrade"}
            </button>
        </motion.div>
    );
}
