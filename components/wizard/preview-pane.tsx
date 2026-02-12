"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWizard } from "./wizard-context";
import {
    Monitor,
    Smartphone,
    Tablet,
    RefreshCcw,
    ExternalLink,
    Globe,
    Shield,
    Zap,
    Maximize2,
    Minimize2,
    Mail,
    Focus,
    LayoutGrid,
    CheckCircle2,
    Star,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PreviewPane() {
    const {
        config,
        updateConfig,
        currentStep,
        isFocusMode,
        setIsFocusMode,
        isHeatmapActive,
        setIsHeatmapActive
    } = useWizard();

    const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile" | "social" | "seo" | "grid">("desktop");
    const previewRef = useRef<HTMLDivElement>(null);

    // Phase 17: Conversion Oracle Scoring Engine
    const calculateConversionScore = () => {
        let score = 35; // Base credibility
        if (config.identity.brandName) score += 10;
        if (config.identity.logoUrl || config.identity.colors.colors.primary) score += 10;
        if (config.content.hero.title?.length > 20) score += 15;
        if (config.content.hero.subtitle?.length > 50) score += 15;
        if (config.content.sections?.includes('logos')) score += 10;
        if (config.content.sections?.includes('counter')) score += 10;
        if (config.growth?.magnetHeadline) score += 10;
        return Math.min(score, 100);
    };

    const conversionScore = calculateConversionScore();

    // Phase 17: Regional Pulse Localization
    const getRegionalMocks = () => {
        const region = config.identity.region || 'global';
        const mocks = {
            id: { currency: "Rp", suffix: "jt", locale: "id-ID", city: "Jakarta, ID" },
            global: { currency: "$", suffix: "k", locale: "en-US", city: "Global Edge" },
            jp: { currency: "¥", suffix: "m", locale: "ja-JP", city: "Tokyo, JP" },
            us: { currency: "$", suffix: "k", locale: "en-US", city: "New York, US" },
        };
        return mocks[region];
    };

    const regionData = getRegionalMocks();

    // Typography & Tone Mapping
    const fontFamilies = {
        classic: "'Playfair Display', serif",
        modern: "'Inter', sans-serif",
        tech: "'JetBrains Mono', monospace",
        playful: "'Outfit', sans-serif"
    };

    const voiceStyles = {
        bold: "font-black tracking-tight",
        friendly: "font-semibold tracking-normal",
        professional: "font-bold tracking-tight",
        scientific: "font-medium tracking-wide uppercase"
    };

    const currentFont = fontFamilies[config.identity.typography || 'modern'];
    const currentVoice = voiceStyles[config.identity.voice || 'professional'];
    const primaryColor = config.identity.colors.colors.primary;

    // Dynamic Google Fonts loader
    useEffect(() => {
        const fontMap: Record<string, string> = {
            classic: "Playfair+Display:wght@400;700;900",
            modern: "Inter:wght@400;500;700;900",
            tech: "JetBrains+Mono:wght@400;500;700",
            playful: "Outfit:wght@400;500;700;900",
        };
        const fontKey = config.identity.typography || 'modern';
        const fontParam = fontMap[fontKey];
        const linkId = `google-font-preview-${fontKey}`;
        if (!document.getElementById(linkId)) {
            const link = document.createElement("link");
            link.id = linkId;
            link.rel = "stylesheet";
            link.href = `https://fonts.googleapis.com/css2?family=${fontParam}&display=swap`;
            document.head.appendChild(link);
        }
    }, [config.identity.typography]);

    // Viewport width helper
    const getViewportWidth = () => {
        switch (viewport) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            case 'social': return '480px';
            case 'seo': return '680px';
            default: return '100%';
        }
    };

    // Help rendering the main site content across viewports
    const DeviceContent = () => (
        <div className="flex flex-col min-h-full bg-white dark:bg-slate-950" style={{ fontFamily: currentFont }}>
            {/* Header / Nav */}
            <nav id="brand-identity" className="h-24 px-12 flex items-center justify-between border-b border-slate-50 shrink-0 sticky top-0 bg-white/80 backdrop-blur-md z-40">
                <div className="flex items-center gap-3">
                    {config.identity.logoUrl ? (
                        <img src={config.identity.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                    ) : (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg" style={{ backgroundColor: primaryColor }}>
                            {config.identity.brandName?.charAt(0) || "B"}
                        </div>
                    )}
                    <span className="font-black text-xl tracking-tight">{config.identity.brandName || "Brand Name"}</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {config.content.sections?.includes('features') && <span>Features</span>}
                    {config.content.sections?.includes('pricing') && <span>Pricing</span>}
                    {config.content.sections?.includes('faq') && <span>FAQ</span>}
                    <button className="px-6 py-3 rounded-2xl text-white font-black text-xs transition-all shadow-xl" style={{ backgroundColor: primaryColor }}>
                        {config.content.hero.ctaText || "Portal Access"}
                    </button>
                </div>
            </nav>

            {/* Content Blocks */}
            <div className="space-y-32 py-10 pb-40">
                {/* Partner & Press Infrastructure */}
                {(config.content.sections?.includes('logos') || config.content.sections?.includes('press')) && (
                    <div id="trust-infra" className="px-12 py-16 border-y border-slate-50 overflow-hidden relative">
                        <div className="flex flex-col items-center gap-12">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                {config.content.sections?.includes('press') ? "Global Press & Media Recognition" : "Trusted by Industry Leaders"}
                            </p>
                            <div className="flex flex-wrap justify-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                                {config.content.sections?.includes('press') ? (
                                    ['FORBES', 'TECHCRUNCH', 'WIRED', 'VERGE', 'WSJ'].map(l => (
                                        <span key={l} className="font-serif italic text-2xl tracking-tighter cursor-default">{l}</span>
                                    ))
                                ) : (
                                    ['ZENITH', 'PRISM', 'NOVA', 'ORBIT', 'AXIS'].map(l => (
                                        <span key={l} className="font-black text-2xl tracking-tighter cursor-default">{l}</span>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <div id="hero" className="px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left relative min-h-[60vh]">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100"
                        >
                            <Shield className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Regional Pulse: {regionData.city}</span>
                        </motion.div>

                        <div className="relative">
                            <h1 className={`text-5xl md:text-7xl ${currentVoice} mb-8 leading-[1.05] tracking-tight transition-all ${isHeatmapActive ? 'ring-4 ring-amber-500/30 rounded-xl px-2' : ''}`}>
                                {config.content.hero.title || "The Ultimate Preview"}
                            </h1>
                            {isHeatmapActive && (
                                <div className="absolute -top-6 -right-6 bg-amber-500 text-white text-[8px] font-black py-1 px-2 rounded-md shadow-xl animate-bounce">VALUE PROP</div>
                            )}
                        </div>

                        <p className="text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-medium">
                            {config.content.hero.subtitle || "The all-in-one platform for modern builders."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 relative">
                            <button className={`w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-black text-lg shadow-2xl transition-all ${isHeatmapActive ? 'ring-8 ring-primary-brand/30 scale-105' : ''}`} style={{ backgroundColor: primaryColor, boxShadow: `0 20px 40px -10px ${primaryColor}40` }}>
                                {config.content.hero.ctaText || "Get Started"}
                            </button>
                        </div>
                    </div>

                    <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-slate-50 flex items-center justify-center">
                        {config.content.hero.image ? (
                            <img src={config.content.hero.image} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-slate-200">
                                <Maximize2 className="w-12 h-12" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Visual Asset Missing</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </div>

                {/* Feature Grid Layer */}
                {config.content.sections?.includes('features') && (
                    <div id="features" className="px-12 space-y-16">
                        <div className="text-center space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand">Core Infrastructure</p>
                            <h2 className={`text-4xl ${currentVoice}`}>Engineered for Impact</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Strategic Precision", desc: "Automated scaling based on market indicators." },
                                { title: "Deep Localization", desc: "Native experience in all regional pulse zones." },
                                { title: "Elite Analytics", desc: "Oracle-grade conversion engine built-in." }
                            ].map((f, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary-brand">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-lg">{f.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Team Infrastructure */}
                {config.content.sections?.includes('team') && (
                    <div id="team" className="px-12 space-y-16">
                        <div className="text-center space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand">Architects of Vision</p>
                            <h2 className={`text-4xl ${currentVoice}`}>Meet the Core Team</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { name: "Sarah Chen", role: "Chief Architect", icon: "architecture" },
                                { name: "Marcus Vane", role: "Logic Systems", icon: "precision_manufacturing" },
                                { name: "Elena Rossi", role: "UX Psychologist", icon: "psychology" },
                                { name: "David Stark", role: "Global Strategy", icon: "public" }
                            ].map((member, i) => (
                                <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-2xl hover:border-primary-brand/20 transition-all">
                                    <div className="w-20 h-20 rounded-[2rem] bg-white shadow-lg mx-auto mb-6 flex items-center justify-center text-primary-brand group-hover:scale-110 transition-transform">
                                        <span className="material-icons text-3xl">{member.icon}</span>
                                    </div>
                                    <h4 className="font-black text-lg">{member.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pricing Layer */}
                {config.content.sections?.includes('pricing') && (
                    <div id="pricing" className="px-12 space-y-16">
                        <div className="text-center space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand">Investment Tiers</p>
                            <h2 className={`text-4xl ${currentVoice}`}>Transparent Pricing</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Elite", price: "99", featured: false },
                                { name: "Pro", price: "199", featured: true },
                                { name: "Custom", price: "Call", featured: false }
                            ].map((p, i) => (
                                <div key={i} className={`p-10 rounded-[2.5rem] border ${p.featured ? 'border-primary-brand bg-white shadow-2xl scale-105 z-10' : 'border-slate-100 bg-slate-50'}`}>
                                    <h4 className="font-black text-xl mb-2">{p.name}</h4>
                                    <p className="text-4xl font-black mb-6">{regionData.currency}{p.price}</p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-2 text-xs font-medium text-slate-500"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Feature 01</li>
                                        <li className="flex items-center gap-2 text-xs font-medium text-slate-500"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Feature 02</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                {config.content.sections?.includes('faq') && (
                    <div id="faq" className="px-12 max-w-4xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-brand">Knowledge Base</p>
                            <h2 className={`text-4xl ${currentVoice}`}>Technical Manifest</h2>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-primary-brand/30 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-center gap-6">
                                        <h5 className="font-black text-slate-900 group-hover:text-primary-brand transition-colors">Frequently Asked Question {item}</h5>
                                        <RefreshCcw className="w-4 h-4 text-slate-300 group-hover:rotate-180 transition-transform duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact & Footer Section */}
                <div id="contact" className="mx-12 py-32 bg-slate-900 rounded-[4rem] text-center space-y-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="space-y-4 px-6 relative z-10">
                        <h3 className="text-white font-black text-4xl leading-tight">Ready to transform?</h3>
                        <div className="flex justify-center gap-8 text-slate-400">
                            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {config.functional.email || 'hello@waas.site'}</div>
                            <div className="flex items-center gap-2"><Zap className="w-4 h-4" /> {config.functional.whatsapp || '+62 800 0000'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full w-full relative group/pane" style={{ fontFamily: currentFont }}>

            {/* 1. Control Bar (Floating Glass) */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] h-14 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-slate-800/50 rounded-2xl flex items-center px-4 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] gap-6 opacity-0 group-hover/pane:opacity-100 transition-all duration-700 translate-y-2 group-hover/pane:translate-y-0">
                <div className="flex items-center gap-1">
                    {[
                        { id: 'desktop', icon: <Monitor className="w-3.5 h-3.5" />, label: 'Studio' },
                        { id: 'grid', icon: <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />, label: 'Omni' },
                        { id: 'tablet', icon: <Tablet className="w-3.5 h-3.5" />, label: 'Tablet' },
                        { id: 'mobile', icon: <Smartphone className="w-3.5 h-3.5" />, label: 'Phone' },
                        { id: 'social', icon: <Zap className="w-3.5 h-3.5 text-pink-500" />, label: 'Social' },
                        { id: 'seo', icon: <Globe className="w-3.5 h-3.5 text-blue-500" />, label: 'SEO' }
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setViewport(btn.id as any)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${viewport === btn.id ? 'bg-primary-brand text-white shadow-lg shadow-primary-brand/30 ring-2 ring-primary-brand/10' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            {btn.icon} <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">{btn.label}</span>
                        </button>
                    ))}
                </div>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsHeatmapActive(!isHeatmapActive)}
                        className={`p-2 rounded-xl transition-all ${isHeatmapActive ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:text-primary-brand hover:bg-white dark:hover:bg-slate-800'}`}
                        title="Strategic Heatmap"
                    >
                        <Zap className={`w-3.5 h-3.5 ${isHeatmapActive ? 'fill-white' : ''}`} />
                    </button>
                    <button
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        className={`p-2 rounded-xl transition-all ${isFocusMode ? 'bg-primary-brand text-white shadow-lg' : 'text-slate-400 hover:text-primary-brand hover:bg-white dark:hover:bg-slate-800'}`}
                        title="Immersive Focus Mode"
                    >
                        {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Conversion Oracle</span>
                            <span className={`text-[11px] font-black ${conversionScore > 80 ? 'text-emerald-500' : conversionScore > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                                {conversionScore}% Strength
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                            <motion.div animate={{ height: `${conversionScore}%` }} className="absolute bottom-0 left-0 right-0 bg-primary-brand/30" />
                            <Zap className="w-3.5 h-3.5 text-white relative z-10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Preview Canvas */}
            <div className={`flex-1 transition-all duration-700 mx-auto ${isFocusMode ? 'mt-0 rounded-none h-full' : 'mt-24 rounded-t-[3rem] h-[calc(100%-6rem)] mb-0'} bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] dark:bg-slate-950 border-x border-t border-slate-100 dark:border-slate-800 overflow-hidden relative`} style={{ width: viewport === 'grid' ? '100%' : getViewportWidth() }}>

                {/* --- SEO PREVIEW MODE --- */}
                {viewport === 'seo' && (
                    <div className="h-full bg-[#f8f9fa] flex items-center justify-center p-12">
                        <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl space-y-8">
                            <div className="flex items-center gap-4 text-slate-400">
                                <Globe className="w-5 h-5 text-blue-500" />
                                <span className="text-xs font-bold uppercase tracking-widest">Google Search Snippet</span>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[#1a0dab] text-2xl font-medium hover:underline cursor-pointer block truncate">
                                    {config.seo.title || (config.identity.brandName + ' | Official Site')}
                                </span>
                                <div className="flex items-center gap-1 text-[#006621] text-sm">
                                    <span>https://{config.identity.brandName?.toLowerCase().replace(/\s+/g, '-') || 'site'}.waas.site</span>
                                    <span className="material-icons text-[10px]">arrow_drop_down</span>
                                </div>
                                <p className="text-[#545454] text-sm leading-relaxed line-clamp-2">
                                    {config.seo.description || "Discover the next generation of infrastructure and design. Tailored for high-growth brands and elite digital presences."}
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex gap-4">
                                {['Overview', 'Pricing', 'Contact'].map(tag => (
                                    <span key={tag} className="text-[#1a0dab] text-xs font-medium hover:underline cursor-pointer">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- OMNI CANVAS GRID MODE --- */}
                {viewport === 'grid' && (
                    <div className="h-full bg-slate-50 dark:bg-slate-900/50 p-8 flex gap-8 overflow-x-auto custom-scrollbar">
                        {[
                            { id: 'desktop', width: '1200px', scale: 0.35, label: 'Desktop Infrastructure' },
                            { id: 'tablet', width: '820px', scale: 0.45, label: 'Tablet Pulse' },
                            { id: 'mobile', width: '375px', scale: 0.65, label: 'Mobile Edge' }
                        ].map((dev) => (
                            <div key={dev.id} className="flex flex-col gap-4 shrink-0">
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{dev.label}</span>
                                    <span className="text-[10px] font-bold text-primary-brand">{dev.width}</span>
                                </div>
                                <div
                                    className="bg-white dark:bg-slate-950 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 origin-top"
                                    style={{
                                        width: dev.width,
                                        height: '1200px',
                                        transform: `scale(${dev.scale})`,
                                        marginBottom: `calc(-1200px * (1 - ${dev.scale}))`,
                                        marginRight: `calc(-${dev.width} * (1 - ${dev.scale}))`
                                    }}
                                >
                                    <DeviceContent />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- SOCIAL PREVIEW MODE --- */}
                {viewport === 'social' && (
                    <div className="h-full bg-slate-900 flex items-center justify-center p-12">
                        <div className="max-w-md w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                {config.content.hero.image ? (
                                    <img src={config.content.hero.image} className="w-full h-full object-cover" alt="OG" />
                                ) : (
                                    <Zap className="w-12 h-12 text-slate-300" />
                                )}
                                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest">Shared link</div>
                            </div>
                            <div className="p-8 space-y-3 bg-[#f0f2f5]">
                                <span className="text-[10px] font-black text-[#65676b] uppercase tracking-widest">{(config.identity.brandName || 'site').toUpperCase()}.WAAS.SITE</span>
                                <h3 className="font-black text-slate-900 text-xl leading-tight line-clamp-2">
                                    {config.seo.title || config.content.hero.title || "Elite Digital Transformation"}
                                </h3>
                                <p className="text-sm font-medium text-slate-500 line-clamp-2">
                                    {config.seo.description || config.content.hero.subtitle || "The all-in-one platform for modern builders."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- STANDARD STUDIO / DEVICE VIEW --- */}
                {(viewport !== 'seo' && viewport !== 'social' && viewport !== 'grid') && (
                    <div ref={previewRef} className="h-full overflow-y-auto custom-scrollbar scroll-smooth">
                        <DeviceContent />
                    </div>
                )}
            </div>

            {/* Phase 17: Growth Magnet (Floating Bottom) */}
            <AnimatePresence>
                {config.growth?.magnetHeadline && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-lg z-50 px-4"
                    >
                        <div className="bg-white/90 backdrop-blur-xl border-2 border-primary-brand shadow-2xl p-6 rounded-[2.5rem] relative overflow-hidden flex items-center justify-between gap-6">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-brand/10 rounded-full blur-3xl opacity-50" />
                            <div className="relative z-10 flex-1">
                                <p className="text-[8px] font-black text-primary-brand uppercase tracking-[0.2em] mb-1">Growth Asset Unlocked</p>
                                <h4 className="font-black text-slate-900 text-sm mb-1">{config.growth.magnetHeadline}</h4>
                                <p className="text-[10px] font-medium text-slate-500 line-clamp-1">{config.growth.magnetDescription}</p>
                            </div>
                            <button className="px-6 py-3 rounded-xl bg-primary-brand text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-brand/20 whitespace-nowrap">
                                {config.growth.magnetCta || "Access Now"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Status Bar */}
            <div className="h-12 flex items-center justify-center bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <RefreshCcw className="w-3 h-3 animate-spin-slow" />
                    Strategic Preview Engine 2.0 (Phase 3)
                </p>
            </div>
        </div>
    );
}
