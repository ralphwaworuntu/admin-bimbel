"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Zap,
    TrendingUp,
    ShieldCheck,
    Globe,
    ChevronRight,
    X,
    Cpu
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Prophecy {
    id: string;
    title: string;
    description: string;
    type: "growth" | "scaling" | "security" | "optimization";
    icon: any;
    priority: "high" | "medium";
    action: string;
}

const initialProphecies: Prophecy[] = [
    {
        id: "1",
        title: "Warp Speed: Tokyo Surge",
        description: "Significant traffic spike detected in AP-NORTHEAST-1. High latency risk.",
        type: "scaling",
        icon: Globe,
        priority: "high",
        action: "Scale Edge Nodes"
    },
    {
        id: "2",
        title: "Conversion Optimization",
        description: "Luxury Estate v2 funnel is leaking. Suggest PXP hyper-personalization.",
        type: "growth",
        icon: TrendingUp,
        priority: "high",
        action: "Apply Hyper-PXP"
    },
];

export function ProphecyEngine() {
    const [visibleProphecies, setVisibleProphecies] = useState<Prophecy[]>([]);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisibleProphecies([initialProphecies[0]]);
        }, 3000);

        const timer2 = setTimeout(() => {
            setVisibleProphecies(prev => [...prev, initialProphecies[1]]);
        }, 6000);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    const dismiss = (id: string) => {
        setVisibleProphecies(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="fixed top-24 lg:top-auto lg:bottom-12 left-4 right-4 lg:left-12 lg:right-auto z-[45] lg:w-[400px] pointer-events-none space-y-4">
            <AnimatePresence>
                {visibleProphecies.map((prophecy) => (
                    <motion.div
                        key={prophecy.id}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="pointer-events-auto group bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden"
                    >
                        {/* Priority Gradient */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${prophecy.priority === 'high' ? 'bg-primary-brand' : 'bg-slate-300 dark:bg-slate-700'}`} />

                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center shrink-0 ${prophecy.priority === 'high' ? 'bg-primary-brand/10 text-primary-brand' : 'bg-slate-50 dark:bg-white/5 text-slate-400'}`}>
                                <prophecy.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                            </div>
                            <div className="flex-1 min-w-0 pr-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="w-3 h-3 text-primary-brand" />
                                    <h4 className="text-xs lg:text-sm font-black tracking-tight truncate">{prophecy.title}</h4>
                                </div>
                                <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 leading-relaxed mb-3 lg:mb-4 line-clamp-2">{prophecy.description}</p>
                                <button
                                    onClick={() => {
                                        if (prophecy.type === 'scaling') router.push('/dashboard/deployments');
                                        if (prophecy.type === 'growth') router.push('/dashboard/analytics');
                                        dismiss(prophecy.id);
                                    }}
                                    className="w-full py-2.5 rounded-xl bg-primary-brand text-white text-[9px] lg:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    {prophecy.action} <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                            <button
                                onClick={() => dismiss(prophecy.id)}
                                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-slate-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <Cpu className="w-24 h-24 lg:w-32 lg:h-32" />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {visibleProphecies.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center lg:justify-start"
                >
                    <div className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary-brand animate-pulse"></div>
                        <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Oracle Analysis Live</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
