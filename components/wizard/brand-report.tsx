"use client";

import React from "react";
import { useWizard } from "./wizard-context";
import { motion } from "framer-motion";
import { Shield, Palette, Type, MessageSquare, Download, CheckCircle2, AlertCircle, Globe, Target, Zap, BarChart3 } from "lucide-react";

export function SovereignBrandReport() {
    const { config, getContrastScore } = useWizard();

    // Calculate content completeness
    const calculateCompleteness = () => {
        const fields = [
            config.identity.brandName,
            config.identity.logoUrl,
            config.identity.audience,
            config.identity.typography,
            config.identity.voice,
            config.identity.region,
            config.content.hero.title,
            config.content.hero.subtitle,
            config.content.hero.ctaText,
            config.seo.title,
            config.seo.description,
            config.seo.keywords,
            config.functional.email,
            config.functional.whatsapp,
            config.functional.address,
        ];
        const filled = fields.filter((f) => f && String(f).trim().length > 0).length;
        return Math.round((filled / fields.length) * 100);
    };

    // Calculate conversion score
    const calculateConversionScore = () => {
        let score = 0;
        if (config.content.hero.ctaText) score += 20;
        if (config.content.sections?.includes('pricing')) score += 15;
        if (config.content.sections?.includes('faq')) score += 10;
        if (config.content.sections?.includes('testimonials')) score += 15;
        if (config.functional.whatsapp) score += 15;
        if (config.functional.email) score += 10;
        if (config.seo.title && config.seo.description) score += 15;
        return Math.min(score, 100);
    };

    const completeness = calculateCompleteness();
    const conversionScore = calculateConversionScore();
    const contrastLevel = getContrastScore();

    const reportItems = [
        {
            icon: <Palette className="w-5 h-5" />,
            label: "Elite Palette Matrix",
            value: config.identity.colors.name,
            sub: `Primary: ${config.identity.colors.colors.primary}`,
            color: config.identity.colors.colors.primary
        },
        {
            icon: <Type className="w-5 h-5" />,
            label: "Typography System",
            value: config.identity.typography?.toUpperCase() || "MODERN",
            sub: "Optimized for global legibility"
        },
        {
            icon: <MessageSquare className="w-5 h-5" />,
            label: "Strategic Voice",
            value: config.identity.voice?.toUpperCase() || "PROFESSIONAL",
            sub: "Cognitive resonance: High"
        },
        {
            icon: <Globe className="w-5 h-5" />,
            label: "Market Strategy",
            value: config.identity.region?.toUpperCase() || "GLOBAL",
            sub: "Regional Pulse Engine Active"
        }
    ];

    const scoreItems = [
        {
            icon: <BarChart3 className="w-4 h-4" />,
            label: "Content Completeness",
            value: `${completeness}%`,
            color: completeness >= 75 ? "text-emerald-500" : completeness >= 50 ? "text-amber-500" : "text-rose-500",
            bg: completeness >= 75 ? "bg-emerald-500" : completeness >= 50 ? "bg-amber-500" : "bg-rose-500",
            percent: completeness,
        },
        {
            icon: <Target className="w-4 h-4" />,
            label: "Conversion Potential",
            value: `${conversionScore}%`,
            color: conversionScore >= 60 ? "text-emerald-500" : conversionScore >= 40 ? "text-amber-500" : "text-rose-500",
            bg: conversionScore >= 60 ? "bg-emerald-500" : conversionScore >= 40 ? "bg-amber-500" : "bg-rose-500",
            percent: conversionScore,
        },
        {
            icon: <Shield className="w-4 h-4" />,
            label: "Accessibility (WCAG)",
            value: contrastLevel === 'high' ? "AA Pass" : "Needs Review",
            color: contrastLevel === 'high' ? "text-emerald-500" : "text-amber-500",
            bg: contrastLevel === 'high' ? "bg-emerald-500" : "bg-amber-500",
            percent: contrastLevel === 'high' ? 100 : 40,
        },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto space-y-10">
            {/* Scores Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scoreItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="text-slate-400">{item.icon}</div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                        </div>
                        <p className={`text-2xl font-black ${item.color} mb-2`}>{item.value}</p>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${item.bg} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percent}%` }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Brand Identity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group"
                    >
                        {item.color && (
                            <div
                                className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
                                style={{ backgroundColor: item.color }}
                            />
                        )}
                        <div className="relative z-10 flex items-start justify-between">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-brand transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{item.label}</p>
                                    <h4 className="text-xl font-black">{item.value}</h4>
                                    <p className="text-xs font-bold text-slate-500 mt-1">{item.sub}</p>
                                </div>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Completeness Warning */}
            {completeness < 75 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start gap-3"
                >
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs font-black text-amber-700 dark:text-amber-400">Content Incomplete ({completeness}%)</p>
                        <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-0.5">Fill in more fields to maximize your site&apos;s effectiveness. Go back to previous steps and complete missing information.</p>
                    </div>
                </motion.div>
            )}

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 hover:border-slate-900 dark:hover:text-white dark:hover:border-white transition-all flex items-center justify-center gap-3 group"
            >
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Download Full Brand Strategy Report (.PDF)</span>
            </motion.button>
        </div>
    );
}
