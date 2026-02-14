"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Globe,
    Trash2,
    X,
    ExternalLink,
    Calendar,
    Settings,
    User,
    Activity,
    Code,
    ChevronRight,
    SearchX
} from "lucide-react";
import { deleteSiteAction } from "@/app/admin/actions";
import Link from "next/link";

interface SitesTableProps {
    sites: any[];
}

export function SitesTable({ sites: initialSites }: SitesTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedSite, setSelectedSite] = useState<any | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const filteredSites = initialSites.filter(site => {
        const matchesSearch = site.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            site.subdomain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            site.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || site.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'live':
                return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'draft':
                return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'provisioning':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters Header */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Nexus deployments..."
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {['all', 'active', 'draft', 'provisioning'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${statusFilter === status
                                    ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20"
                                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Deployment Unit</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Owner Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Operational Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Finalized At</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredSites.map((site) => (
                                <tr
                                    key={site.id}
                                    className="group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors cursor-pointer"
                                    onClick={() => setSelectedSite(site)}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-white/10 group-hover:text-amber-500 transition-colors">
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black group-hover:text-amber-600 transition-colors">{site.name}</p>
                                                <p className="text-[10px] font-mono text-slate-400">{site.subdomain}.waas.site</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
                                                {site.owner?.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest">{site.owner?.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400">{site.owner?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getStatusColor(site.status)}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${site.status === 'active' || site.status === 'live' ? 'bg-emerald-500 animate-pulse' : 'bg-current opacity-50'}`} />
                                            {site.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {site.createdAt ? new Date(site.createdAt).toLocaleDateString() : 'Historical'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/dashboard/sites/${site.id}`}
                                                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-600/10 transition-all border border-transparent hover:border-amber-600/20"
                                                title="Sovereign View"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setConfirmDelete(site.id)}
                                                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                                                title="Force Purge"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredSites.length === 0 && (
                    <div className="p-24 text-center">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <SearchX className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black mb-1">No deployments found</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nexus lattice is awaiting unit synchronization</p>
                    </div>
                )}
            </div>

            {/* Interaction Modals & Drawers */}
            <AnimatePresence>
                {selectedSite && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedSite(null)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white dark:bg-[#020617] border-l border-slate-100 dark:border-white/10 z-[101] flex flex-col shadow-[-30px_0_100px_rgba(0,0,0,0.3)]"
                        >
                            <div className="p-12 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                                        <Globe className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight">{selectedSite.name}</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sovereign Unit Manifest</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedSite(null)} className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-amber-500 transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Deployment URL</p>
                                        <p className="text-xs font-black truncate">{selectedSite.subdomain}.waas.site</p>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Unit Status</p>
                                        <p className="text-xs font-black uppercase text-amber-500">{selectedSite.status}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                                        <User className="w-4 h-4" /> Principal Identity
                                    </h3>
                                    <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-50 dark:border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <User className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black">{selectedSite.owner?.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{selectedSite.owner?.email}</p>
                                            </div>
                                        </div>
                                        <Link href={`/admin/users?q=${selectedSite.owner?.email}`}>
                                            <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-amber-500 transition-all border border-transparent hover:border-amber-500/20">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                                        <Code className="w-4 h-4" /> Configuration Lattice
                                    </h3>
                                    <div className="bg-slate-950 rounded-[1.5rem] p-6 font-mono text-[10px] text-amber-500/80 overflow-auto border border-white/5 max-h-[400px]">
                                        <pre>{JSON.stringify(selectedSite.config, null, 2)}</pre>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Delete Confirmation */}
            <AnimatePresence>
                {confirmDelete && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 flex items-center justify-center z-[201] p-6"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-12 max-w-md w-full shadow-2xl">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-8">
                                    <Trash2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-center mb-4 italic overflow-hidden">Sever Connection?</h3>
                                <p className="text-slate-500 text-center text-sm leading-relaxed mb-10">
                                    Confirm sovereign unit termination. This operation will definitively purge the deployment manifest from the Nexus lattice.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setConfirmDelete(null)}
                                        className="py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                                    >
                                        Abort
                                    </button>
                                    <form
                                        className="w-full"
                                        action={async () => {
                                            await deleteSiteAction(confirmDelete);
                                            setConfirmDelete(null);
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="w-full py-4 rounded-2xl bg-red-600 text-white shadow-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Confirm
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
