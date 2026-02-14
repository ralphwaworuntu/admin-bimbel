"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    X,
    Zap,
    UserPlus,
    CreditCard,
    AlertCircle,
    CheckCircle2,
    Trash2,
    ChevronRight,
    Settings
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "alert" | "team" | "billing" | "system";
    isRead: boolean;
}

const initialNotifications: Notification[] = [
    { id: "1", title: "New Team Member", description: "Sarah Chen joined the Nexus Digital Agency.", time: "2m ago", type: "team", isRead: false },
    { id: "2", title: "Site Deployed", description: "Portfolio Site v2.0 is now live on Engine-NY.", time: "1h ago", type: "system", isRead: false },
    { id: "3", title: "Invoice Paid", description: "Payment for $299.00 processed successfully.", time: "5h ago", type: "billing", isRead: true },
    { id: "4", title: "High Traffic Alert", description: "Your site 'StoreMax' is experiencing 200% more traffic.", time: "1d ago", type: "alert", isRead: true },
];

export function NotificationPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [notifications, setNotifications] = useState<any[]>(initialNotifications);

    useEffect(() => {
        if (isOpen) {
            fetch("/api/broadcasts")
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const broadcasts = data.map(bc => ({
                            id: bc.id,
                            title: bc.title,
                            description: bc.message,
                            time: "Just now", // In a real app, calculate relative time
                            type: bc.type || "system",
                            isRead: false
                        }));
                        setNotifications([...broadcasts, ...initialNotifications]);
                    }
                })
                .catch(err => console.error("Failed to sync notifications", err));
        }
    }, [isOpen]);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[70] border-l border-slate-100 dark:border-slate-800 flex flex-col"
                    >
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black flex items-center gap-2">
                                    Notifications <span className="bg-primary-brand text-white text-[10px] px-2 py-0.5 rounded-full">{notifications.filter(n => !n.isRead).length}</span>
                                </h3>
                                <p className="text-xs font-bold text-slate-400 mt-1">Stay updated with your agency events</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <div className="flex items-center justify-between px-4 mb-6">
                                <div className="flex gap-2">
                                    {["All", "Alerts", "Team"].map(tab => (
                                        <button key={tab} className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${tab === 'All' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={markAllAsRead} className="text-[10px] font-black text-primary-brand uppercase tracking-widest hover:underline">Mark all as read</button>
                            </div>

                            <div className="space-y-4">
                                {notifications.length > 0 ? (
                                    notifications.map((n) => (
                                        <Link
                                            key={n.id}
                                            href={
                                                n.type === 'team' ? '/dashboard/settings/team' :
                                                    n.type === 'system' ? '/dashboard/deployments' :
                                                        n.type === 'billing' ? '/dashboard/billing' : '/dashboard/analytics'
                                            }
                                            onClick={onClose}
                                            className={`p-5 rounded-[2rem] border transition-all group relative block ${n.isRead ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800' : 'bg-primary-brand/5 border-primary-brand/10 dark:bg-primary-brand/5'}`}
                                        >
                                            <div className="flex gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${n.type === 'team' ? 'bg-indigo-500/10 text-indigo-500' :
                                                    n.type === 'system' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        n.type === 'billing' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    {n.type === 'team' && <UserPlus className="w-5 h-5" />}
                                                    {n.type === 'system' && <Zap className="w-5 h-5" />}
                                                    {n.type === 'billing' && <CreditCard className="w-5 h-5" />}
                                                    {n.type === 'alert' && <AlertCircle className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="text-sm font-black">{n.title}</h4>
                                                        <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                                                    </div>
                                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{n.description}</p>
                                                </div>
                                            </div>

                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        deleteNotification(n.id);
                                                    }}
                                                    className="p-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-400 hover:text-red-500 shadow-sm transition-all"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="py-20 text-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 text-slate-300">
                                            <Bell className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-lg font-black mb-2">No new notifications</h4>
                                        <p className="text-sm font-bold text-slate-400">We'll notify you when something important happens.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-8 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                            <Link href="/dashboard/settings" onClick={onClose}>
                                <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black shadow-xl hover:bg-primary-brand hover:text-white dark:hover:bg-primary-brand dark:hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Settings className="w-4 h-4" /> Notification Settings
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
