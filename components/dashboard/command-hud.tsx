"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Command,
    Globe,
    Activity,
    Users,
    Settings,
    Zap,
    Plus,
    X,
    ChevronRight,
    Terminal,
    Sparkles,
    Brain,
    Shield,
    TrendingUp,
    Clock,
    Megaphone
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandItem {
    id: string;
    label: string;
    icon: any;
    href?: string;
    action?: () => void;
    category: string;
}

export function CommandHUD() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const commands: CommandItem[] = [
        { id: "overview", label: "Dashboard Overview", icon: Command, href: "/dashboard", category: "Navigation" },
        { id: "deployments", label: "Infrastructure Master", icon: Globe, href: "/dashboard/deployments", category: "Navigation" },
        { id: "analytics", label: "Intelligence Hub", icon: Activity, href: "/dashboard/analytics", category: "Navigation" },
        { id: "customers", label: "Sovereign CRM", icon: Users, href: "/dashboard/customers", category: "Navigation" },
        { id: "guardian", label: "Guardian Terminal", icon: Shield, href: "/dashboard/guardian", category: "Navigation" },
        { id: "economics", label: "Economic Matrix", icon: TrendingUp, href: "/dashboard/economics", category: "Navigation" },
        { id: "settings", label: "Platform Settings", icon: Settings, href: "/dashboard/settings", category: "Navigation" },
        { id: "build", label: "Build New Site", icon: Plus, href: "/wizard", category: "Actions" },
        { id: "logs", label: "Global Event Logs", icon: Terminal, href: "/dashboard/guardian", category: "Infrastructure" },
        { id: "ai", label: "AI Oracle Simulation", icon: Sparkles, href: "/nexus", category: "Intelligence" },
        { id: "profile", label: "Profile Settings", icon: Users, href: "/dashboard/settings", category: "Account" },
        { id: "logout", label: "Terminate Session", icon: X, href: "/", category: "Account" },

        // Tactical Admin Protocols (Phase 10)
        { id: "admin-analytics", label: "Nexus Analytics Pulse", icon: Activity, href: "/admin/analytics", category: "Tactical Admin" },
        { id: "admin-broadcast", label: "Initiate Global Broadcast", icon: Megaphone, href: "/admin/broadcast", category: "Tactical Admin" },
        { id: "admin-oracle", label: "Consult AI Oracle", icon: Brain, href: "/admin/oracle", category: "Tactical Admin" },
        { id: "admin-audit", label: "Inspect Audit Manifest", icon: Clock, href: "/admin/audit", category: "Tactical Admin" },
        { id: "admin-users", label: "Principal Management", icon: Users, href: "/admin/users", category: "Tactical Admin" },
    ];

    const toggleHUD = useCallback(() => setIsOpen(prev => !prev), []);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        const handleOpen = () => setIsOpen(true);

        window.addEventListener('toggle-command-hud', handleToggle);
        window.addEventListener('open-command-hud', handleOpen);

        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggleHUD();
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener('toggle-command-hud', handleToggle);
            window.removeEventListener('open-command-hud', handleOpen);
        };
    }, [toggleHUD]);

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (cmd: CommandItem) => {
        if (cmd.href) {
            router.push(cmd.href);
            setIsOpen(false);
        } else if (cmd.action) {
            cmd.action();
            setIsOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] cursor-default"
                    />
                    <div className="fixed inset-0 z-[101] pointer-events-none flex items-start justify-center pt-[8vh] lg:pt-[15vh] px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] pointer-events-auto overflow-hidden flex flex-col"
                        >
                            <div className="p-5 lg:p-8 border-b border-slate-100 dark:border-white/5 relative shrink-0">
                                <Search className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Execute command..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-transparent border-none text-base lg:text-xl font-black focus:ring-0 outline-none pl-10 lg:pl-12 placeholder:text-slate-300 dark:placeholder:text-slate-600 truncate"
                                />
                                <div className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ESC</span>
                                </div>
                            </div>

                            <div className="max-h-[60vh] lg:max-h-[450px] overflow-y-auto p-2 lg:p-4 custom-scrollbar">
                                {filteredCommands.length === 0 ? (
                                    <div className="p-8 lg:p-12 text-center space-y-4">
                                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-300">
                                            <X className="w-6 h-6 lg:w-8 lg:h-8" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-400">No commands found.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 lg:space-y-6 p-2 lg:p-4">
                                        {Array.from(new Set(filteredCommands.map(c => c.category))).map(category => (
                                            <div key={category} className="space-y-2">
                                                <h3 className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">{category}</h3>
                                                <div className="space-y-1">
                                                    {filteredCommands.filter(c => c.category === category).map(cmd => (
                                                        <button
                                                            key={cmd.id}
                                                            onClick={() => handleSelect(cmd)}
                                                            className="w-full group flex items-center justify-between p-3 lg:p-4 rounded-xl lg:rounded-2xl hover:bg-primary-brand/5 dark:hover:bg-white/5 transition-all text-left"
                                                        >
                                                            <div className="flex items-center gap-3 lg:gap-4">
                                                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary-brand/10 group-hover:text-primary-brand transition-all">
                                                                    <cmd.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                                                                </div>
                                                                <span className="text-xs lg:text-sm font-black tracking-tight">{cmd.label}</span>
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 lg:p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="hidden sm:flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 rounded bg-slate-200 dark:bg-white/10 uppercase font-black text-[9px] min-w-[20px] text-center">↑↓</div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Navigate</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 rounded bg-slate-200 dark:bg-white/10 uppercase font-black text-[9px] min-w-[20px] text-center">↵</div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Execute</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-primary-brand mx-auto sm:mx-0">
                                    <Zap className="w-3 h-3 fill-primary-brand" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Sovereign Engine</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
