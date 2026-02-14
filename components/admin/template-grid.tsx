"use client";

import { motion } from "framer-motion";
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

interface TemplateCardProps {
    template: any;
    adoptionCount: number;
}

export function TemplateCard({ template, adoptionCount }: TemplateCardProps) {
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
                    <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
                    <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors">
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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {templates.map((template) => (
                <TemplateCard
                    key={template.id}
                    template={template}
                    adoptionCount={adoptionStats[template.id] || 0}
                />
            ))}
        </div>
    );
}
