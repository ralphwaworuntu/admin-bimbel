"use client";

import { motion } from "framer-motion";
import {
    Globe,
    Search,
    Plus,
    MoreVertical,
    ExternalLink,
    Settings,
    ChevronRight,
    Filter,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SitesManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sites, setSites] = useState([
        {
            id: "1",
            name: "Artisan Brew Coffee",
            url: "artisan-brew.waas.site",
            status: "live",
            visits: "1.2k",
            lastEdited: "2 hours ago",
            thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2470&auto=format&fit=crop"
        },
        {
            id: "2",
            name: "Lumina Studio",
            url: "lumina-visuals.waas.site",
            status: "draft",
            visits: "0",
            lastEdited: "1 day ago",
            thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: "3",
            name: "Quantum Tech",
            url: "quantum-tech.waas.site",
            status: "live",
            visits: "3.4k",
            lastEdited: "3 days ago",
            thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        }
    ]);

    useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('waas_sites');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Filter out duplicates if any
                setSites(prev => {
                    const existingIds = new Set(prev.map(s => s.id));
                    const newSites = parsed.filter((s: any) => !existingIds.has(s.id));
                    return [...newSites, ...prev];
                });
            }
        }
    });

    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 font-display">
            <header className="h-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard">
                        <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">Sites & Projects</h1>
                        <p className="text-xs font-bold text-slate-400">Manage and scale your digital portfolio</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/wizard">
                        <button className="px-8 py-3 bg-primary-brand text-white rounded-2xl text-xs font-black shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Create New Site
                        </button>
                    </Link>
                </div>
            </header>

            <main className="p-10 lg:p-14 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm">
                        <Search className="w-5 h-5 text-slate-400" />
                        <input
                            className="bg-transparent border-none outline-none w-full font-bold text-sm"
                            placeholder="Search sites by name or URL..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl font-black text-sm flex items-center gap-3 shadow-sm hover:bg-slate-50 transition-all">
                        <Filter className="w-4 h-4" /> Filter Status
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {sites.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((site, i) => (
                        <motion.div
                            key={site.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary-brand/5 transition-all"
                        >
                            <div className="aspect-[1.6/1] overflow-hidden relative">
                                <img src={site.thumbnail} alt={site.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <Link href="/dashboard/deployments" className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border backdrop-blur-md ${site.status === 'live' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/20 text-amber-500 border-amber-500/20'} hover:scale-105 transition-transform block`}>
                                        {site.status}
                                    </span>
                                </Link>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-black line-clamp-1">{site.name}</h3>
                                    <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                        <MoreVertical className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>
                                <p className="text-xs font-bold text-slate-400 mb-8 flex items-center gap-1.5 line-clamp-1">
                                    <Globe className="w-3.5 h-3.5" /> {site.url}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <Link href="/dashboard/analytics" className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-primary-brand/5 transition-colors">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visits</p>
                                        <p className="text-sm font-black">{site.visits}</p>
                                    </Link>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Edited</p>
                                        <p className="text-sm font-black">{site.lastEdited}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link href={`/dashboard/sites/${site.id}`} className="flex-1">
                                        <button className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-brand hover:text-white transition-all">
                                            Manage Project
                                        </button>
                                    </Link>
                                    <a
                                        href={`https://${site.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary-brand transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
