"use client";

import React, { useState, useEffect } from "react";
import { SiteConfig } from "@/types/site";
import { EditableText } from "./editable-text";
import { MediaPicker } from "./media-picker";
import { Button } from "@/components/ui/button";
import {
    Save,
    Eye,
    Layout,
    Monitor,
    Smartphone,
    Tablet,
    CheckCircle2,
    ArrowLeft,
    Loader2,
    Zap,
    ImagePlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { saveSiteConfig } from "@/app/dashboard/sites/[id]/editor/actions";
import { toast } from "sonner"; // Assuming sonner is used, or console.log fallback

interface VisualBuilderProps {
    siteId: string;
    initialConfig: SiteConfig;
}

export function VisualBuilder({ siteId, initialConfig }: VisualBuilderProps) {
    const [config, setConfig] = useState<SiteConfig>(initialConfig);
    const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Media Picker State
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const [activeImageTarget, setActiveImageTarget] = useState<string | null>(null);

    // Update specific parts of the config
    const updateContent = (path: string, value: any) => {
        setConfig(prev => {
            const newConfig = { ...prev };
            // Simple path traversal for demo (e.g., "content.hero.title")
            const parts = path.split('.');
            let current: any = newConfig;
            for (let i = 0; i < parts.length - 1; i++) {
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
            return newConfig;
        });
        setHasChanges(true);
    };

    const toggleSection = (sectionId: string) => {
        const sections = config.content.sections || [];
        const newSections = sections.includes(sectionId)
            ? sections.filter(s => s !== sectionId)
            : [...sections, sectionId];
        updateContent("content.sections", newSections);
    };

    const handleImageClick = (targetPath: string) => {
        setActiveImageTarget(targetPath);
        setIsMediaPickerOpen(true);
    };

    const handleImageSelect = (url: string) => {
        if (activeImageTarget) {
            updateContent(activeImageTarget, url);
        }
        setIsMediaPickerOpen(false);
        setActiveImageTarget(null);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await saveSiteConfig(siteId, config);
        setIsSaving(false);
        if (result.success) {
            setHasChanges(false);
            // Show toast if available, or alert
            // toast.success("Changes saved successfully");
        } else {
            // toast.error("Failed to save changes");
            alert("Failed to save changes");
        }
    };

    // Viewport width helper
    const getViewportWidth = () => {
        switch (viewport) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    const currentFont = config.identity.typography === 'classic' ? "'Playfair Display', serif"
        : config.identity.typography === 'tech' ? "'JetBrains Mono', monospace"
            : config.identity.typography === 'playful' ? "'Outfit', sans-serif"
                : "'Inter', sans-serif";

    const colors = config.identity.colors?.colors || initialConfig.identity.colors.colors;

    return (
        <div className="flex flex-col h-screen bg-[#F0F2F5] dark:bg-slate-950 overflow-hidden font-sans">
            <MediaPicker
                isOpen={isMediaPickerOpen}
                onClose={() => setIsMediaPickerOpen(false)}
                onSelect={handleImageSelect}
                siteId={siteId}
                currentImage={activeImageTarget ? (
                    activeImageTarget.split('.').reduce((o: any, i) => o[i], config)
                ) : undefined}
            />

            {/* Top Bar */}
            <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-50 relative">
                <div className="flex items-center gap-4">
                    <Link href={`/dashboard/sites/${siteId}`}>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visual Editor</span>
                        <span className="font-black text-sm">{config.identity.brandName}</span>
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {[
                        { id: 'desktop', icon: Monitor },
                        { id: 'tablet', icon: Tablet },
                        { id: 'mobile', icon: Smartphone },
                    ].map(dev => (
                        <button
                            key={dev.id}
                            onClick={() => setViewport(dev.id as any)}
                            className={`p-2 rounded-md transition-all ${viewport === dev.id ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-brand' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <dev.icon className="w-4 h-4" />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity ${hasChanges ? 'text-amber-500 opacity-100' : 'opacity-0'}`}>
                        Unsaved Changes
                    </span>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving || !hasChanges}
                        className="bg-primary-brand text-white font-bold rounded-xl shadow-lg shadow-primary-brand/20"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Controls */}
                <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-4">Sections</h3>
                        <div className="space-y-2">
                            {['hero', 'features', 'pricing', 'faq', 'team', 'contact'].map(sec => (
                                <div key={sec} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <span className="text-xs font-bold capitalize">{sec}</span>
                                    <button
                                        onClick={() => toggleSection(sec)}
                                        className={`w-10 h-6 rounded-full transition-colors relative ${config.content.sections?.includes(sec) ? 'bg-primary-brand' : 'bg-slate-200 dark:bg-slate-700'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${config.content.sections?.includes(sec) ? 'translate-x-4' : ''}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Canvas */}
                <main className="flex-1 overflow-auto bg-[#F0F2F5] dark:bg-slate-950 p-8 flex justify-center">
                    <motion.div
                        layout
                        className="bg-white dark:bg-slate-900 shadow-2xl transition-all duration-300 origin-top"
                        style={{
                            width: getViewportWidth(),
                            minHeight: '100%',
                            fontFamily: currentFont // Apply font globally to canvas
                        }}
                    >
                        {/* --- SITE CONTENT (Based on PreviewPane) --- */}

                        {/* Header */}
                        <nav className="h-24 px-8 flex items-center justify-between border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-md z-30">
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => handleImageClick("identity.logoUrl")}
                                    className="relative group/logo cursor-pointer"
                                >
                                    {config.identity.logoUrl ? (
                                        <img src={config.identity.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded-xl" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg" style={{ backgroundColor: colors.primary }}>
                                            {config.identity.brandName?.charAt(0) || "B"}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                        <ImagePlus className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <EditableText
                                    as="span"
                                    value={config.identity.brandName}
                                    onChange={(v) => updateContent("identity.brandName", v)}
                                    className="font-black text-xl tracking-tight"
                                />
                            </div>
                            <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                <button className="px-6 py-3 rounded-2xl text-white font-black text-xs shadow-xl" style={{ backgroundColor: colors.primary }}>
                                    <EditableText
                                        as="span"
                                        value={config.content.hero.ctaText || "Get Started"}
                                        onChange={(v) => updateContent("content.hero.ctaText", v)}
                                    />
                                </button>
                            </div>
                        </nav>

                        {/* Hero */}
                        {config.content.sections?.includes('hero') !== false && (
                            <section className="px-12 py-20 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit">
                                        <Zap className="w-3 h-3" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Live Editor Active</span>
                                    </div>
                                    <EditableText
                                        as="h1"
                                        multiline
                                        value={config.content.hero.title}
                                        onChange={(v) => updateContent("content.hero.title", v)}
                                        className="text-5xl md:text-6xl font-black leading-tight tracking-tight"
                                        placeholder="Enter your headline..."
                                    />
                                    <EditableText
                                        as="p"
                                        multiline
                                        value={config.content.hero.subtitle}
                                        onChange={(v) => updateContent("content.hero.subtitle", v)}
                                        className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg"
                                        placeholder="Enter your subtitle..."
                                    />
                                    <div className="pt-4">
                                        <button className="px-8 py-4 rounded-2xl text-white font-black text-lg shadow-xl hover:scale-105 transition-transform" style={{ backgroundColor: colors.primary }}>
                                            {config.content.hero.ctaText || "Get Started"}
                                        </button>
                                    </div>
                                </div>
                                <div className="relative group/image cursor-pointer">
                                    <div
                                        onClick={() => handleImageClick("content.hero.image")}
                                        className="aspect-square bg-slate-50 rounded-[3rem] relative overflow-hidden flex items-center justify-center text-slate-300 ring-4 ring-transparent hover:ring-primary-brand transition-all"
                                    >
                                        {config.content.hero.image ? (
                                            <img src={config.content.hero.image} className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <Layout className="w-12 h-12" />
                                                <span className="text-[10px] font-black uppercase">Hero Image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2">
                                                <ImagePlus className="w-4 h-4" /> Change Image
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Features */}
                        {config.content.sections?.includes('features') && (
                            <section className="px-12 py-20 bg-slate-50">
                                <div className="text-center mb-12">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand mb-4">Features</p>
                                    <h2 className="text-4xl font-black">Why Choose Us</h2>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="p-8 bg-white rounded-[2rem] shadow-sm">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 mb-6" />
                                            <h4 className="font-black text-xl mb-3">Feature {i}</h4>
                                            <p className="text-sm text-slate-500">Click to edit this feature description. It's fully interactive.</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Pricing */}
                        {config.content.sections?.includes('pricing') && (
                            <section className="px-12 py-20">
                                <div className="text-center mb-12">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand mb-4">Pricing</p>
                                    <h2 className="text-4xl font-black">Simple Plans</h2>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                                        <h4 className="font-black text-xl mb-2">Starter</h4>
                                        <p className="text-4xl font-black mb-6">$99</p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl scale-105">
                                        <h4 className="font-black text-xl mb-2 text-primary-brand">Pro</h4>
                                        <p className="text-4xl font-black mb-6">$199</p>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                                        <h4 className="font-black text-xl mb-2">Enterprise</h4>
                                        <p className="text-4xl font-black mb-6">Call</p>
                                    </div>
                                </div>
                            </section>
                        )}

                    </motion.div>
                </main>
            </div>
        </div>
    );
}
