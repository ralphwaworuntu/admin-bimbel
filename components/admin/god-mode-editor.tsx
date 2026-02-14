"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Eye, Code, Ghost, ExternalLink, RefreshCw } from "lucide-react";
import { updateSite } from "@/lib/db"; // we'll use a server action wrapper for this
import { impersonateUserAction } from "@/app/admin/actions";

interface GodModeProps {
    site: any;
    isOpen: boolean;
    onClose: () => void;
}

export function GodModeEditor({ site, isOpen, onClose }: GodModeProps) {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [customCode, setCustomCode] = useState(site?.config?.customCode || "");
    const [isSaving, setIsSaving] = useState(false);

    // Mock save function since we can't import server action directly in client component like this
    // In real implementation, this would call a specific server action
    const handleSave = async () => {
        setIsSaving(true);
        // await updateSiteConfigAction(site.id, { customCode });
        await new Promise(r => setTimeout(r, 1000)); // Mock delay
        setIsSaving(false);
    };

    const handleGhostLogin = async () => {
        if (confirm(`⚠️ GHOST LOGIN PROTOCOL\n\nYou are about to impersonate ${site.owner.email}.\nThis action will be logged in the immutable audit ledger.\n\nProceed?`)) {
            await impersonateUserAction(site.userId);
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-[90vw] max-w-4xl bg-slate-950 border-l border-white/10 shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/50">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-purple-500" />
                                        GOD MODE
                                    </h2>
                                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                                        Target: {site.name} ({site.subdomain})
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleGhostLogin}
                                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors border border-red-500/20"
                                >
                                    <Ghost className="w-4 h-4" />
                                    Impersonate Owner
                                </button>

                                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="h-12 border-b border-white/5 flex items-center px-6 gap-6 bg-black/20">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`h-full border-b-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 px-2 transition-colors ${activeTab === 'preview' ? 'border-purple-500 text-purple-500' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                            >
                                <ExternalLink className="w-4 h-4" /> Live Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`h-full border-b-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 px-2 transition-colors ${activeTab === 'code' ? 'border-purple-500 text-purple-500' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                            >
                                <Code className="w-4 h-4" /> Code Injector
                            </button>

                            <div className="flex-1" />

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-bold flex items-center gap-2"
                            >
                                {isSaving ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                Push Changes
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden relative bg-black">
                            {activeTab === 'preview' ? (
                                <iframe
                                    src={site.deploymentUrl || "about:blank"}
                                    className="w-full h-full border-none"
                                    title="Site Preview"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col">
                                    <textarea
                                        value={customCode}
                                        onChange={(e) => setCustomCode(e.target.value)}
                                        className="flex-1 w-full bg-[#1e1e1e] text-slate-300 font-mono text-sm p-6 resize-none focus:outline-none"
                                        placeholder="// Inject custom JS or CSS here..."
                                        spellCheck={false}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
