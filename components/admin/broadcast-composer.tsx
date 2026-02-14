"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    X,
    Bell,
    AlertTriangle,
    Zap,
    ShieldCheck,
    Megaphone,
    Clock,
    CheckCircle2
} from "lucide-react";

interface BroadcastComposerProps {
    onSend: (data: any) => Promise<void>;
}

export function BroadcastComposer({ onSend }: BroadcastComposerProps) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("system");
    const [priority, setPriority] = useState("normal");
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        try {
            await onSend({ title, message, type, priority });
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setTitle("");
                setMessage("");
            }, 3000);
        } catch (error) {
            console.error("Broadcast failed", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-10 space-y-8 relative overflow-hidden">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Megaphone className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-black tracking-tight">Communication Nexus</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global System Broadcast</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Broadcast Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Scheduled Maintenance"
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-all font-bold text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-all font-black text-[10px] uppercase tracking-widest"
                            >
                                <option value="system">System</option>
                                <option value="alert">Alert</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-all font-black text-[10px] uppercase tracking-widest"
                            >
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Detailed Message</label>
                    <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe the update or alert in detail..."
                        rows={4}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-all font-bold text-sm resize-none"
                    />
                </div>

                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Clock className="w-3 h-3" />
                        Est. Distribution: 0.8s
                    </div>
                    <button
                        disabled={isSending || isSuccess}
                        type="submit"
                        className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl ${isSuccess
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white'
                            }`}
                    >
                        {isSending ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : isSuccess ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" /> Broadcast Sent
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" /> Initiate Broadcast
                            </>
                        )}
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-20 flex items-center justify-center p-10 text-center"
                    >
                        <div className="space-y-4">
                            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h4 className="text-2xl font-black">Broadcast Latency Minimized</h4>
                            <p className="text-xs font-bold text-slate-500 max-w-xs mx-auto">The message has been propagated through the Nexus lattice and is now visible to all Principals.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
