"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Command,
    Settings,
    Globe,
    User,
    Shield,
    CreditCard,
    Plus,
    ArrowRight,
    Zap,
    Layout,
    History
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandItem {
    id: string;
    title: string;
    description: string;
    icon: any;
    category: "General" | "Settings" | "Projects";
    href: string;
}

const commands: CommandItem[] = [
    { id: "ov", title: "Overview", description: "View your agency dashboard", icon: Layout, category: "General", href: "/dashboard" },
    { id: "ns", title: "New Site", description: "Create a new platform", icon: Plus, category: "General", href: "/wizard" },
    { id: "nx", title: "Nexus Hub", description: "AI orchestration & intelligence", icon: Zap, category: "General", href: "/nexus" },
    { id: "dp", title: "Deployments", description: "Review infrastructure status", icon: Globe, category: "Projects", href: "/dashboard/deployments" },
    { id: "an", title: "Analytics", description: "Performance & traffic data", icon: Layout, category: "Projects", href: "/dashboard/analytics" },
    { id: "gd", title: "Guardian", description: "Security & threat intelligence", icon: Shield, category: "Projects", href: "/dashboard/guardian" },
    { id: "ec", title: "Economics", description: "Financial metrics & MRR", icon: CreditCard, category: "Projects", href: "/dashboard/economics" },
    { id: "cu", title: "Customers", description: "Manage user relationships", icon: User, category: "Projects", href: "/dashboard/customers" },
    { id: "bs", title: "Billing", description: "Manage subscriptions & invoices", icon: CreditCard, category: "Settings", href: "/dashboard/billing" },
    { id: "br", title: "Branding", description: "Visual identity & logos", icon: Zap, category: "Settings", href: "/dashboard/settings/branding" },
    { id: "tm", title: "Team", description: "Manage collaborators", icon: User, category: "Settings", href: "/dashboard/settings/team" },
    { id: "sc", title: "Security", description: "2FA & audit logs", icon: Shield, category: "Settings", href: "/dashboard/settings/security" },
    { id: "dm", title: "Domains", description: "Manage custom domains", icon: Globe, category: "Settings", href: "/dashboard/settings/branding" },
];

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const filteredCommands = commands.filter(cmd =>
        cmd.title.toLowerCase().includes(query.toLowerCase()) ||
        cmd.description.toLowerCase().includes(query.toLowerCase())
    );

    const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                togglePalette();
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [togglePalette]);

    const handleSelect = (href: string) => {
        router.push(href);
        setIsOpen(false);
        setQuery("");
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
                        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl z-[101] overflow-hidden overflow-y-auto max-h-[60vh] custom-scrollbar"
                    >
                        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                            <Search className="w-6 h-6 text-primary-brand" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search projects, settings, and commands..."
                                className="w-full bg-transparent border-none outline-none font-bold text-lg placeholder:text-slate-400"
                            />
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-black text-slate-400">
                                <Command className="w-3 h-3" /> K
                            </div>
                        </div>

                        <div className="p-4">
                            {filteredCommands.length > 0 ? (
                                <div className="space-y-6">
                                    {["General", "Settings", "Projects"].map((category) => {
                                        const categoryItems = filteredCommands.filter(cmd => cmd.category === category);
                                        if (categoryItems.length === 0) return null;

                                        return (
                                            <div key={category} className="space-y-2">
                                                <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                    {category}
                                                </h3>
                                                <div className="grid grid-cols-1 gap-1">
                                                    {categoryItems.map((item) => (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => handleSelect(item.href)}
                                                            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-primary-brand/5 group transition-all text-left"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-brand group-hover:bg-primary-brand/10 transition-colors">
                                                                    <item.icon className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-black group-hover:text-primary-brand transition-colors">{item.title}</p>
                                                                    <p className="text-[10px] font-bold text-slate-400">{item.description}</p>
                                                                </div>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-20 text-center">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 text-slate-300">
                                        <History className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-lg font-black mb-2">No commands found</h4>
                                    <p className="text-sm font-bold text-slate-400">Try searching for "billing", "new site" or "team".</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5"><ArrowRight className="w-3 h-3 rotate-90" /> Select</span>
                                <span className="flex items-center gap-1.5"><Command className="w-3 h-3" /> Navigation</span>
                            </div>
                            <span className="flex items-center gap-1.5">ESC to close</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
