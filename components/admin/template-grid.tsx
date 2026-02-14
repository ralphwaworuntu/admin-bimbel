"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Layout,
    Star,
    Users,
    Zap,
    MoreHorizontal,
    Eye,
    EyeOff,
    Edit3,
    BarChart3,
    ArrowUpRight
} from "lucide-react";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is used, or alert fallback

interface TemplateCardProps {
    template: any;
    adoptionCount: number;
    onPreview: (template: any) => void;
}

export function TemplateCard({ template, adoptionCount, onPreview }: TemplateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* Thumbnail/Preview */}
            <div className="aspect-[16/10] overflow-hidden relative">
                <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button
                        onClick={() => onPreview(template)}
                        className="w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-purple-50"
                    >
                        Visual Preview
                    </button>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black text-white">{template.rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-purple-600 bg-purple-600/10 px-2 py-1 rounded-md">
                            {template.category}
                        </span>
                        <div className="flex gap-1">
                            {template.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <h3 className="text-lg font-black tracking-tight group-hover:text-purple-600 transition-colors uppercase">{template.name}</h3>
                    <p className="text-[10px] font-bold text-slate-500 leading-relaxed mt-2 line-clamp-2 italic">
                        {template.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50 dark:border-white/5">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Users className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Adoption</span>
                        </div>
                        <p className="text-sm font-black">{adoptionCount} Units</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Zap className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Efficiency</span>
                        </div>
                        <p className="text-sm font-black text-emerald-500">98%</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                    <div className="flex gap-2">
                        <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-purple-600 transition-all border border-transparent hover:border-purple-600/20">
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-purple-600 transition-all border border-transparent hover:border-purple-600/20">
                            <EyeOff className="w-4 h-4" />
                        </button>
                    </div>
                    <button
                        onClick={() => toast.info("Deep Analytics Module coming in Phase 20.")}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors"
                    >
                        Analytics <ArrowUpRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

interface TemplateGridProps {
    templates: any[];
    adoptionStats: Record<string, number>;
}

export function TemplateGrid({ templates, adoptionStats }: TemplateGridProps) {
    const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {templates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        adoptionCount={adoptionStats[template.id] || 0}
                        onPreview={setPreviewTemplate}
                    />
                ))}
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewTemplate && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPreviewTemplate(null)}
                            className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-4 md:inset-20 bg-slate-900 rounded-[2rem] border border-white/10 z-[101] overflow-hidden flex flex-col shadow-2xl"
                        >
                            <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20">
                                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-3">
                                    <Layout className="w-5 h-5 text-purple-600" />
                                    {previewTemplate.name}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <button className="px-6 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-colors">
                                        Use Blueprint
                                    </button>
                                    <button
                                        onClick={() => setPreviewTemplate(null)}
                                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-950 relative flex items-center justify-center p-12">
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <Search className="w-32 h-32 text-slate-700" />
                                </div>
                                <img
                                    src={previewTemplate.thumbnail}
                                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5 relative z-10"
                                    alt="Full Preview"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
