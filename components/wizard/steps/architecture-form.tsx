"use client";

import { useWizard } from "../wizard-context";
import { Label } from "@/components/ui/label";
import {
    Layout,
    Zap,
    MessageSquare,
    CreditCard,
    Users,
    HelpCircle,
    Mail,
    Shield,
    Check,
    CheckCircle2,
    ChevronRight,
    Play,
    GripVertical
} from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

export function ArchitectureForm() {
    const { config, toggleSection, updateConfig } = useWizard();

    const mainSections = [
        { id: 'features', label: 'Feature Grid', icon: Zap, desc: 'Highlight key benefits' },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, desc: 'Build customer trust' },
        { id: 'pricing', label: 'Pricing Tables', icon: CreditCard, desc: 'Showcase your plans' },
        { id: 'team', label: 'Team Members', icon: Users, desc: 'Introduce your experts' },
        { id: 'faq', label: 'FAQ Section', icon: HelpCircle, desc: 'Answer common questions' },
        { id: 'contact', label: 'Contact Form', icon: Mail, desc: 'Direct lead generation' },
    ];

    const trustSections = [
        { id: 'logos', label: 'Partner Trust Logos', icon: Shield, desc: 'Showcase associated brands.' },
        { id: 'counter', label: 'Impact Counter', icon: Play, desc: 'Growth statistics & numbers.' },
        { id: 'press', label: 'Press Mentions', icon: ChevronRight, desc: 'Editorial credibility.' },
    ];

    return (
        <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="font-black text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <Layout className="w-4 h-4" /> Site Architect
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Assemble your global infrastructure. High-conversion blocks designed for performance.
                </p>
            </div>

            {/* Section Stack Visualizer — Drag to Reorder */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Infrastructure Stack</Label>
                    <span className="text-[10px] font-black text-primary-brand">{(config.content.sections?.length || 0)} BLOCKS</span>
                </div>
                {(config.content.sections?.length || 0) > 0 ? (
                    <Reorder.Group
                        axis="y"
                        values={config.content.sections || []}
                        onReorder={(newOrder) => updateConfig({ content: { sections: newOrder } } as any)}
                        className="space-y-2"
                    >
                        {config.content.sections?.map((sectionId) => {
                            const section = [...mainSections, ...trustSections].find(s => s.id === sectionId);
                            if (!section) return null;
                            return (
                                <Reorder.Item
                                    key={sectionId}
                                    value={sectionId}
                                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors"
                                    whileDrag={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                                >
                                    <GripVertical className="w-3 h-3 text-slate-600 shrink-0" />
                                    <section.icon className="w-3 h-3 text-primary-brand shrink-0" />
                                    <span className="text-[10px] font-bold text-slate-300 flex-1">{section.label}</span>
                                    <button
                                        onClick={() => toggleSection(sectionId)}
                                        className="hover:text-rose-500 transition-colors text-slate-500"
                                    >
                                        <CheckCircle2 className="w-3 h-3" />
                                    </button>
                                </Reorder.Item>
                            );
                        })}
                    </Reorder.Group>
                ) : (
                    <p className="text-[10px] font-medium text-slate-600 italic">No blocks selected yet. Build your stack below.</p>
                )}
                {(config.content.sections?.length || 0) > 1 && (
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest text-center pt-1">↕ Drag to reorder sections</p>
                )}
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Core Content Blocks</Label>
                    <div className="grid grid-cols-1 gap-2">
                        {mainSections.map((section) => {
                            const isSelected = config.content.sections?.includes(section.id);
                            return (
                                <motion.button
                                    key={section.id}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleSection(section.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 relative overflow-hidden group ${isSelected ? 'border-primary-brand bg-primary-brand/5 ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-primary-brand text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-primary-brand'}`}>
                                        <section.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black tracking-tight">{section.label}</p>
                                        <p className="text-[9px] font-bold text-slate-400">{section.desc}</p>
                                    </div>
                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-primary-brand" />}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                        <Shield className="w-3 h-3" /> Deep Trust Library
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                        {trustSections.map((section) => {
                            const isSelected = config.content.sections?.includes(section.id);
                            return (
                                <motion.button
                                    key={section.id}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleSection(section.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 relative overflow-hidden group ${isSelected ? 'border-emerald-500/20 bg-emerald-500/5 ring-4 ring-emerald-500/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-emerald-500'}`}>
                                        <section.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black tracking-tight">{section.label}</p>
                                        <p className="text-[9px] font-bold text-slate-400">{section.desc}</p>
                                    </div>
                                    {isSelected && <Check className="w-4 h-4 text-emerald-500" />}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
