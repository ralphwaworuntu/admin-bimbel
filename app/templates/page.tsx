"use client";

import { motion, AnimatePresence } from "framer-motion";
import { templates } from "@/lib/mock-data";
import { Template } from "@/types/site";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    Star,
    ArrowRight,
    X,
    Zap,
    Globe,
    Eye,
    Filter,
    Sparkles,
    ArrowLeft,
    CheckCircle2,
    Mail,
    Shield,
    ExternalLink
} from "lucide-react";

const categoryLabels: Record<string, string> = {
    all: "All Templates",
    business: "Business",
    creative: "Creative",
    umkm: "UMKM",
    retail: "Retail",
};

export default function TemplatesPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

    const categories = ["all", ...Array.from(new Set(templates.map(t => t.category)))];

    const filtered = useMemo(() => {
        return templates.filter(t => {
            const matchCategory = category === "all" || t.category === category;
            const matchSearch = search === "" ||
                t.name.toLowerCase().includes(search.toLowerCase()) ||
                t.description.toLowerCase().includes(search.toLowerCase()) ||
                t.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
            return matchCategory && matchSearch;
        });
    }, [search, category]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-display selection:bg-primary-brand/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-primary-brand p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-primary-brand/20">
                                <span className="material-icons text-white text-base">bolt</span>
                            </div>
                            <span className="font-black text-lg tracking-tight">
                                Instant<span className="text-primary-brand">Engine</span>
                            </span>
                        </Link>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Template Gallery</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/wizard">
                            <button className="px-5 py-2.5 rounded-xl bg-primary-brand text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5" /> Start Building
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-12">
                {/* Hero */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-brand/5 border border-primary-brand/10"
                    >
                        <Sparkles className="w-4 h-4 text-primary-brand" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-brand">{templates.length} Premium Templates</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-6xl font-black tracking-tighter"
                    >
                        Choose Your <span className="text-primary-brand">Foundation</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto"
                    >
                        Hand-crafted templates for every industry. Each one is fully customizable and optimized for conversions.
                    </motion.p>
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search templates, tags, or categories..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-bold focus:ring-2 focus:ring-primary-brand/20 focus:border-primary-brand outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${category === cat
                                    ? "bg-primary-brand text-white shadow-lg shadow-primary-brand/20"
                                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary-brand/40"
                                    }`}
                            >
                                {categoryLabels[cat] || cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((template, i) => (
                            <motion.div
                                key={template.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={template.thumbnail}
                                        alt={template.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                                        <button
                                            onClick={() => setPreviewTemplate(template)}
                                            className="flex-1 px-4 py-3 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <Eye className="w-3.5 h-3.5" /> Preview
                                        </button>
                                        <Link
                                            href={`/wizard?template=${template.id}`}
                                            className="flex-1 px-4 py-3 bg-primary-brand rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-brand/90 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Zap className="w-3.5 h-3.5" /> Use
                                        </Link>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-white">
                                            {template.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-black text-lg tracking-tight">{template.name}</h3>
                                            <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">{template.description}</p>
                                        </div>
                                        {template.rating && (
                                            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg shrink-0">
                                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                <span className="text-[10px] font-black text-amber-700 dark:text-amber-400">{template.rating}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                                        {template.tags?.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-[9px] font-bold text-slate-500 border border-slate-100 dark:border-slate-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-bold">No templates match your search.</p>
                    </div>
                )}
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
                            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[200]"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            className="fixed inset-6 lg:inset-12 bg-white dark:bg-[#020617] rounded-[2.5rem] z-[201] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setPreviewTemplate(null)}
                                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </button>
                                    <div>
                                        <h2 className="font-black text-lg tracking-tight">{previewTemplate.name}</h2>
                                        <p className="text-[10px] font-bold text-slate-400">{previewTemplate.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/wizard?template=${previewTemplate.id}`}
                                        className="px-6 py-3 rounded-xl bg-primary-brand text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <Zap className="w-3.5 h-3.5" /> Use This Template
                                    </Link>
                                    <button
                                        onClick={() => setPreviewTemplate(null)}
                                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-0">
                                    {/* Preview Image */}
                                    <div className="xl:col-span-2 bg-slate-50 dark:bg-slate-900 p-8 flex items-center justify-center min-h-[400px]">
                                        <div className="w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                                            <div className="h-8 bg-slate-100 dark:bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-200 dark:border-slate-700">
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                                </div>
                                                <div className="flex-1 flex justify-center">
                                                    <div className="px-4 py-0.5 bg-white dark:bg-slate-900 rounded-md text-[9px] font-bold text-slate-400">
                                                        {previewTemplate.defaultConfig.identity.brandName?.toLowerCase().replace(/\s+/g, '-')}.instantengine.id
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={previewTemplate.thumbnail}
                                                alt={previewTemplate.name}
                                                className="w-full aspect-[16/10] object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Template Details */}
                                    <div className="p-8 space-y-8 border-l border-slate-100 dark:border-slate-800">
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-black tracking-tight">{previewTemplate.name}</h3>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{previewTemplate.description}</p>
                                            <div className="flex items-center gap-3">
                                                {previewTemplate.rating && (
                                                    <div className="flex items-center gap-1.5">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(previewTemplate.rating!) ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`} />
                                                        ))}
                                                        <span className="text-xs font-black text-slate-500 ml-1">{previewTemplate.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tags</span>
                                            <div className="flex flex-wrap gap-2">
                                                {previewTemplate.tags?.map((tag) => (
                                                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-primary-brand/5 text-[10px] font-bold text-primary-brand border border-primary-brand/10">
                                                        {tag}
                                                    </span>
                                                ))}
                                                <span className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-500 border border-slate-100 dark:border-slate-700">
                                                    {previewTemplate.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Default Configuration</span>
                                            <div className="space-y-2">
                                                {[
                                                    { label: "Brand", value: previewTemplate.defaultConfig.identity.brandName },
                                                    { label: "Theme", value: previewTemplate.defaultConfig.identity.colors.name },
                                                    { label: "Hero", value: previewTemplate.defaultConfig.content.hero.title },
                                                    { label: "CTA", value: previewTemplate.defaultConfig.content.hero.ctaText },
                                                ].map((item) => (
                                                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                                                        <span className="text-xs font-black truncate max-w-[150px]">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Included Features</span>
                                            <div className="space-y-2">
                                                {["Responsive Design", "SEO Optimized", "WhatsApp Integration", "Dark Mode Ready", "Multi-Section Layout"].map((feature) => (
                                                    <div key={feature} className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Link
                                            href={`/wizard?template=${previewTemplate.id}`}
                                            className="block w-full px-6 py-4 rounded-2xl bg-primary-brand text-white text-center text-xs font-black uppercase tracking-widest shadow-xl shadow-primary-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Use This Template →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
