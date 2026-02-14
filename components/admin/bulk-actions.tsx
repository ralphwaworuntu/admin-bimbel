"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, PauseCircle, Archive, ShieldAlert, X } from "lucide-react";
import { useState } from "react";
import { bulkUpdateSitesAction, bulkDeleteSitesAction } from "@/app/admin/actions";

interface BulkActionsProps {
    selectedIds: string[];
    onClearSelection: () => void;
}

export function BulkActions({ selectedIds, onClearSelection }: BulkActionsProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAction = async (action: 'suspend' | 'archive' | 'delete') => {
        if (!confirm(`Are you sure you want to ${action} ${selectedIds.length} sites?`)) return;

        setIsProcessing(true);
        try {
            if (action === 'delete') {
                await bulkDeleteSitesAction(selectedIds);
            } else {
                const status = action === 'suspend' ? 'suspended' : 'archived';
                await bulkUpdateSitesAction(selectedIds, { status });
            }
            onClearSelection();
        } catch (e) {
            console.error(e);
            alert("Operation failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <AnimatePresence>
            {selectedIds.length > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 dark:bg-white/90 backdrop-blur-xl border border-white/10 shadow-2xl text-white dark:text-slate-900"
                >
                    <div className="pl-4 pr-2 font-black text-xs uppercase tracking-widest flex items-center gap-2 border-r border-white/10 dark:border-black/10 mr-2">
                        <span className="bg-purple-600 text-white px-2 py-0.5 rounded-md min-w-[24px] text-center">
                            {selectedIds.length}
                        </span>
                        <span>Selected</span>
                    </div>

                    <button
                        onClick={() => handleAction('suspend')}
                        disabled={isProcessing}
                        className="p-2 rounded-xl hover:bg-white/10 dark:hover:bg-black/10 transition-colors tooltip tooltip-top"
                        title="Suspend Sites"
                    >
                        <PauseCircle className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => handleAction('archive')}
                        disabled={isProcessing}
                        className="p-2 rounded-xl hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                        title="Archive Sites"
                    >
                        <Archive className="w-5 h-5" />
                    </button>

                    <div className="w-px h-6 bg-white/10 dark:bg-black/10 mx-1" />

                    <button
                        onClick={() => handleAction('delete')}
                        disabled={isProcessing}
                        className="p-2 rounded-xl hover:bg-red-500/20 text-red-500 transition-colors"
                        title="Delete Sites"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <button
                        onClick={onClearSelection}
                        className="ml-2 p-1 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {isProcessing && (
                        <div className="absolute inset-0 bg-black/50 dark:bg-white/50 rounded-2xl flex items-center justify-center backdrop-blur-[2px]">
                            <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
