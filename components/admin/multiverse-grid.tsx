"use client";

import { useState } from "react";
import { Link2, MoreHorizontal, ExternalLink, Shield, Eye } from "lucide-react";
import Link from "next/link";
import { BulkActions } from "./bulk-actions";
import { GodModeEditor } from "./god-mode-editor"; // Import Editor

interface Site {
    id: string;
    name: string;
    subdomain: string | null;
    status: string | null;
    deploymentUrl: string | null;
    createdAt: Date;
    owner: {
        id: string; // Needed for impersonation
        name: string | null;
        email: string;
    };
}

export function MultiverseGrid({ sites }: { sites: Site[] }) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [godModeSite, setGodModeSite] = useState<Site | null>(null); // State for active site

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const toggleAll = () => {
        if (selectedIds.size === sites.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(sites.map(s => s.id)));
        }
    };

    const isAllSelected = sites.length > 0 && selectedIds.size === sites.length;
    const isIndeterminate = selectedIds.size > 0 && selectedIds.size < sites.length;

    return (
        <div className="relative">
            {/* Editor Modal */}
            <GodModeEditor
                site={godModeSite}
                isOpen={!!godModeSite}
                onClose={() => setGodModeSite(null)}
            />

            <div className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-950 text-xs uppercase font-black text-slate-500 tracking-wider">
                            <tr>
                                <th className="p-6 w-16">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            ref={input => { if (input) input.indeterminate = isIndeterminate; }}
                                            onChange={toggleAll}
                                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                                        />
                                    </div>
                                </th>
                                <th className="p-6">Nexus Identity</th>
                                <th className="p-6">Sovereign Owner</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Deployed At</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {sites.map((site) => (
                                <tr
                                    key={site.id}
                                    className={`
                                        group transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/10
                                        ${selectedIds.has(site.id) ? 'bg-purple-50/50 dark:bg-purple-900/20' : ''}
                                    `}
                                >
                                    <td className="p-6">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(site.id)}
                                            onChange={() => toggleSelection(site.id)}
                                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                                        />
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 dark:text-white">{site.name}</span>
                                            <span className="text-xs text-slate-400 font-mono">{site.subdomain}.waas.site</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                                {(site.owner.name || "U").charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{site.owner.name || "Unknown"}</span>
                                                <span className="text-xs text-slate-400">{site.owner.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`
                                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize
                                            ${site.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                                                site.status === 'suspended' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}
                                        `}>
                                            {site.status}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-slate-500 font-medium">
                                            {new Date(site.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setGodModeSite(site)} // Open God Mode
                                                className="p-2 rounded-lg hover:bg-purple-600 hover:text-white text-purple-600 bg-purple-50 dark:bg-purple-900/20 transition-colors"
                                                title="Enter God Mode"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-purple-600 transition-colors">
                                                <Shield className="w-4 h-4" />
                                            </button>
                                            <a
                                                href={site.deploymentUrl || "#"}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-purple-600 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <BulkActions
                selectedIds={Array.from(selectedIds)}
                onClearSelection={() => setSelectedIds(new Set())}
            />
        </div>
    );
}
