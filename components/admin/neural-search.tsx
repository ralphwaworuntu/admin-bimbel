"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Send, Activity, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { askOracleAction } from "@/app/admin/actions";

interface NeuralInsight {
    type: 'data' | 'chart' | 'alert' | 'text';
    title: string;
    content: string;
    data?: any;
    priority?: 'normal' | 'high' | 'critical';
}

export function NeuralSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [insight, setInsight] = useState<NeuralInsight | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsThinking(true);
        setInsight(null);

        // Server Action call
        const result = await askOracleAction(query);

        setInsight(result as NeuralInsight);
        setIsThinking(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative z-50">
            <motion.div
                layout
                onClick={() => setIsOpen(true)}
                className={`
                    relative overflow-hidden bg-white dark:bg-slate-900 
                    border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]
                    ${isOpen ? 'rounded-[2rem]' : 'rounded-full h-16 cursor-text'}
                    transition-all duration-500 ease-out
                `}
            >
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 animate-pulse pointer-events-none" />

                <div className="relative z-10 p-1">
                    <form onSubmit={handleSubmit} className="flex items-center gap-4 px-4 h-14">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                            ${isThinking ? 'bg-purple-500 animate-pulse' : 'bg-purple-500/10 text-purple-500'}
                        `}>
                            {isThinking ? <Sparkles className="w-5 h-5 text-white" /> : <Search className="w-5 h-5" />}
                        </div>

                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask the Oracle (e.g., 'Show me high risk users')..."
                            className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-slate-400"
                            onFocus={() => setIsOpen(true)}
                        />

                        {isOpen && query && (
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                type="submit"
                                className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 transition-colors"
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </motion.button>
                        )}
                    </form>

                    <AnimatePresence>
                        {isOpen && (insight || isThinking) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-slate-100 dark:border-white/5"
                            >
                                <div className="p-6">
                                    {isThinking ? (
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                                            </div>
                                            <span className="text-sm font-medium">Consulting Neural Network...</span>
                                        </div>
                                    ) : insight && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                {insight.type === 'alert' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                                                {insight.type === 'chart' && <TrendingUp className="w-5 h-5 text-emerald-500" />}
                                                {insight.type === 'data' && <Users className="w-5 h-5 text-blue-500" />}
                                                {insight.type === 'text' && <Activity className="w-5 h-5 text-slate-500" />}

                                                <h3 className={`font-black uppercase tracking-widest text-xs
                                                    ${insight.priority === 'critical' ? 'text-red-500' :
                                                        insight.priority === 'high' ? 'text-emerald-500' : 'text-slate-500'}
                                                `}>
                                                    {insight.title}
                                                </h3>
                                            </div>

                                            <p className="text-lg font-medium leading-relaxed">
                                                {insight.content}
                                            </p>

                                            {/* Data Visualization Placeholder */}
                                            {insight.data && (
                                                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 text-xs font-mono text-slate-400">
                                                    {JSON.stringify(insight.data, null, 2)}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Backdrop to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0 bg-transparent"
                    onClick={() => {
                        if (!query) setIsOpen(false);
                    }}
                />
            )}
        </div>
    );
}
