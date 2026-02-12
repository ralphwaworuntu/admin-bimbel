"use client";

import { useWizard } from "./wizard-context";
import { IdentityForm } from "./steps/identity-form";
import { ContentForm } from "./steps/content-form";
import { FunctionalForm } from "./steps/functional-form";
import { ArchitectureForm } from "./steps/architecture-form";
import { SeoForm } from "./steps/seo-form";
import { SiteIntelligence } from "../dashboard/site-intelligence";
import { PreviewPane } from "./preview-pane";
import { PropagationPulse } from "./steps/propagation-pulse";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight, Loader2, Sparkles, Wand2, ShieldCheck, Zap, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { DeploymentMatrix } from "./deployment-matrix";
import { SovereignBrandReport } from "./brand-report";

export function WizardShell() {
    const { currentStep, nextStep, prevStep, totalSteps, isGenerated, setIsGenerated, config, updateConfig, isFocusMode, setIsFocusMode } = useWizard();
    const [isDeploying, setIsDeploying] = useState(false);
    const [isSeeding, setIsSeeding] = useState(true);
    const [seedInput, setSeedInput] = useState("");
    const [isProcessingSeed, setIsProcessingSeed] = useState(false);

    const handleDeploy = () => {
        setIsDeploying(true);
    };

    const finishDeployment = () => {
        // Save to localStorage for Dashboard sync
        const brandSlug = (config.identity.brandName || "site").toLowerCase().replace(/\s+/g, '-');
        const newSite = {
            id: Math.random().toString(36).substr(2, 9),
            name: config.identity.brandName || "Untitled Project",
            url: `${brandSlug}.instantengine.id`,
            status: "live",
            visits: "0",
            uptime: "100%",
            latency: `${Math.floor(Math.random() * 15) + 12}ms`,
            lastDeploy: new Date().toLocaleString(),
            lastEdited: "Just now",
            templateId: config.templateId,
            primaryColor: config.identity.colors.colors.primary,
            region: config.identity.region || "global",
            audience: config.identity.audience || "corporate",
            sections: config.content.sections || [],
            thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        };

        const existingSites = JSON.parse(localStorage.getItem('waas_sites') || '[]');
        // Prevent duplicates by URL
        const filtered = existingSites.filter((s: any) => s.url !== newSite.url);
        localStorage.setItem('waas_sites', JSON.stringify([newSite, ...filtered]));

        setIsDeploying(false);
        setIsGenerated(true);
    };

    const stepTitles = [
        { title: "Brand Identity", desc: "Logo & Colors" },
        { title: "SEO & Social", desc: "Keywords & Meta" },
        { title: "Hero Section", desc: "Main Content" },
        { title: "Business Desk", desc: "Contact & Hours" },
        { title: "Site Architect", desc: "Modular Layout" },
        { title: "Final Review", desc: "Ready to Launch" }
    ];

    if (isDeploying) {
        return <DeploymentMatrix onComplete={finishDeployment} />;
    }

    if (isGenerated) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-8 lg:p-20 overflow-y-auto custom-scrollbar selection:bg-primary-brand/30">
                <div className="max-w-6xl mx-auto space-y-20">
                    {/* Cinematic Header */}
                    <div className="text-center space-y-8">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 mx-auto"
                        >
                            <Check className="w-12 h-12" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h1 className="text-6xl font-black tracking-tighter leading-tight">Sovereign Deployment <br /> <span className="text-emerald-500">Successful.</span></h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-xl max-w-2xl mx-auto">
                                Your digital infrastructure is now globally distributed and optimized. Your brand <span className="text-slate-900 dark:text-white font-bold">{config.identity.brandName}</span> is online.
                            </p>
                        </motion.div>
                    </div>

                    {/* Sovereign Brand Report */}
                    <SovereignBrandReport />

                    {/* Mission Control Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
                    >
                        <Link href="/dashboard" passHref className="w-full sm:w-auto">
                            <Button className="w-full h-16 px-12 rounded-3xl font-black text-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl hover:scale-105 transition-all">
                                Go to Mission Control
                            </Button>
                        </Link>
                        <Link href="/" passHref className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full h-16 px-12 rounded-3xl font-black text-lg border-2 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-900 dark:hover:border-white transition-all">
                                Live Preview
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    const handleIntelligenceSeed = async () => {
        if (!seedInput.trim()) return;
        setIsProcessingSeed(true);
        // Simulate AI intelligence sweep
        await new Promise(resolve => setTimeout(resolve, 2000));

        updateConfig({
            identity: { brandName: seedInput.split(' ')[0] || seedInput },
            content: {
                hero: {
                    title: `Transforming ${seedInput} into a Global Powerhouse`,
                    subtitle: `The next generation of high-fidelity infrastructure for your ${seedInput} vision.`,
                    ctaText: "Explore Now"
                }
            },
            seo: {
                title: `${seedInput} | Professional Digital Infrastructure`,
                description: `Experience the future of ${seedInput} with our globally distributed, AI-native platform.`
            }
        });

        setIsProcessingSeed(false);
        setIsSeeding(false);
    };

    if (isSeeding) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#020617] text-white p-8 font-display selection:bg-primary-brand/30">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary-brand/10 blur-[150px] rounded-full animate-pulse"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full space-y-12 relative z-10"
                >
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                            <Sparkles className="w-5 h-5 text-primary-brand animate-spin-slow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Phase 7: System Seeding</span>
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter leading-[0.95]">The Intelligence <br /> <span className="text-primary-brand">Sweep.</span></h1>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed">
                            Tell us what you're building. Our AI will seed your entire workspace, infrastructure, and content stack in seconds.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-[2.5rem] shadow-2xl">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-1 w-full h-20 bg-black/40 rounded-3xl border border-white/10 flex items-center px-8 transition-all focus-within:border-primary-brand focus-within:ring-4 focus-within:ring-primary-brand/10">
                                <Wand2 className="w-6 h-6 text-primary-brand mr-4" />
                                <input
                                    autoFocus
                                    placeholder="Describe your brand or vision..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-lg font-bold placeholder-slate-600 outline-none"
                                    value={seedInput}
                                    onChange={(e) => setSeedInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleIntelligenceSeed()}
                                />
                            </div>
                            <Button
                                onClick={handleIntelligenceSeed}
                                disabled={isProcessingSeed || !seedInput}
                                className="h-20 px-12 bg-white text-slate-900 hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl flex items-center gap-3"
                            >
                                {isProcessingSeed ? <Loader2 className="w-5 h-5 animate-spin" /> : "Seed System"}
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-12 text-slate-500">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <ShieldCheck className="w-4 h-4" /> Global Edge
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <Zap className="w-4 h-4" /> 280ms Propagation
                        </div>
                        <button
                            onClick={() => setIsSeeding(false)}
                            className="bg-transparent border-none text-[10px] font-black uppercase tracking-[0.2em] text-primary-brand/60 hover:text-primary-brand transition-colors"
                        >
                            Skip Intelligence
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col bg-white dark:bg-background-dark overflow-hidden font-display selection:bg-primary-brand/30 selection:text-primary-brand">
            {/* Header */}
            <header className="h-16 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group transition-all">
                        <div className="bg-primary-brand p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-primary-brand/20">
                            <span className="material-icons text-white text-base">bolt</span>
                        </div>
                        <span className="font-black text-lg tracking-tight">
                            Instant<span className="text-primary-brand">Engine</span>
                        </span>
                    </Link>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</span>
                        <span className="material-icons text-xs text-slate-300">chevron_right</span>
                        <span className="text-xs font-black truncate max-w-[150px]">{config.identity.brandName || "New Project"}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        Auto-saving...
                    </div>
                    <button
                        onClick={() => {
                            const html = document.documentElement;
                            const isDark = html.classList.toggle('dark');
                            localStorage.setItem('theme', isDark ? 'dark' : 'light');
                        }}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-110 active:scale-95"
                        title="Toggle Dark Mode"
                    >
                        <Sun className="w-4 h-4 hidden dark:block" />
                        <Moon className="w-4 h-4 block dark:hidden" />
                    </button>
                    <Link href="/dashboard">
                        <Button variant="outline" className="h-10 px-5 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700">
                            Exit Editor
                        </Button>
                    </Link>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar Configuration */}
                <AnimatePresence>
                    {!isFocusMode && (
                        <motion.aside
                            initial={{ width: 450, opacity: 1 }}
                            animate={{ width: 450, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="w-[450px] flex-shrink-0 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/10 z-10 overflow-hidden"
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black tracking-tight">{stepTitles[currentStep - 1].title}</h2>
                                    <span className="text-[10px] font-black bg-primary-brand/10 text-primary-brand px-3 py-1.5 rounded-full uppercase tracking-widest">
                                        Step {currentStep} of {totalSteps}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalSteps }).map((_, i) => (
                                        <div key={i} className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    width: i + 1 < currentStep ? "100%" : i + 1 === currentStep ? "100%" : "0%",
                                                    backgroundColor: i + 1 <= currentStep ? "var(--color-primary-brand)" : "rgba(0,0,0,0)"
                                                }}
                                                className="h-full"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Brand Power Meter - Phase 14 */}
                                <div className="pt-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-1.5">
                                            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Strategic Brand Power
                                        </span>
                                        <span className="text-[10px] font-black text-primary-brand bg-primary-brand/5 px-2 py-0.5 rounded-md">
                                            {(() => {
                                                let score = 0;
                                                if (config.identity.brandName) score += 10;
                                                if (config.identity.audience) score += 10;
                                                if (config.content.hero.title) score += 10;
                                                if (config.content.hero.subtitle) score += 10;
                                                if (config.content.services?.length > 0) score += 10;
                                                if (config.content.sections?.length! > 0) score += 10;
                                                if (config.functional.whatsapp) score += 10;
                                                if (config.functional.email) score += 10;
                                                if (config.functional.address) score += 10;
                                                if (config.seo.keywords?.length > 0) score += 10;
                                                return score;
                                            })()}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${(() => {
                                                    let score = 0;
                                                    if (config.identity.brandName) score += 10;
                                                    if (config.identity.audience) score += 10;
                                                    if (config.content.hero.title) score += 10;
                                                    if (config.content.hero.subtitle) score += 10;
                                                    if (config.content.services?.length > 0) score += 10;
                                                    if (config.content.sections?.length! > 0) score += 10;
                                                    if (config.functional.whatsapp) score += 10;
                                                    if (config.functional.email) score += 10;
                                                    if (config.functional.address) score += 10;
                                                    if (config.seo.keywords?.length > 0) score += 10;
                                                    return score;
                                                })()}%`
                                            }}
                                            className="h-full bg-gradient-to-r from-amber-400 to-primary-brand shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="pb-10"
                                    >
                                        {currentStep === 1 && <IdentityForm />}
                                        {currentStep === 2 && <SeoForm />}
                                        {currentStep === 3 && <ContentForm />}
                                        {currentStep === 4 && <FunctionalForm />}
                                        {currentStep === 5 && <ArchitectureForm />}
                                        {currentStep === 6 && (
                                            <div className="space-y-8 pb-32">
                                                <div className="p-8 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                                                    <h2 className="text-3xl font-black mb-4 relative z-10">You're Ready to Launch!</h2>
                                                    <p className="text-slate-400 font-medium max-w-lg relative z-10">
                                                        We've prepared your high-performance infrastructure. Below is a preview of the <span className="text-white font-bold">Site Intelligence</span> you'll have access to once live.
                                                    </p>
                                                </div>

                                                <PropagationPulse />

                                                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                                            <Zap className="w-5 h-5" />
                                                        </div>
                                                        <h3 className="font-black text-xl">Pre-Launch Intelligence</h3>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {[
                                                            { label: "Core Identity", value: config.identity.brandName || "Loaded" },
                                                            { label: "SEO Metatags", value: "Optimized" },
                                                            { label: "Global Edge", value: "Provisioned" }
                                                        ].map((item, i) => (
                                                            <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
                                                                <span className="text-sm font-bold text-slate-500">{item.label}</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm font-black text-primary-brand">{item.value}</span>
                                                                    <Check className="w-4 h-4 text-emerald-500" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                                        <div>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Brand Identity</p>
                                                            <p className="text-sm font-black">{config.identity.brandName}</p>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                                            <Check className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                                        <div>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Primary Theme</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.identity.colors.colors.primary }}></div>
                                                                <p className="text-sm font-black uppercase tracking-tight">{config.identity.colors.colors.primary}</p>
                                                            </div>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                                            <Check className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                                <div className="flex gap-4">
                                    {currentStep > 1 && (
                                        <Button
                                            variant="outline"
                                            onClick={prevStep}
                                            className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                                        </Button>
                                    )}
                                    {currentStep < 5 ? (
                                        <Button
                                            onClick={nextStep}
                                            className="flex-1 h-14 bg-primary-brand hover:bg-primary-brand/90 text-white rounded-2xl shadow-xl shadow-primary-brand/20 font-black"
                                        >
                                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleDeploy}
                                            disabled={isDeploying}
                                            className="flex-1 h-14 bg-primary-brand hover:bg-primary-brand/90 text-white rounded-2xl shadow-2xl shadow-primary-brand/30 font-black"
                                        >
                                            {isDeploying ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Orchestrating...
                                                </>
                                            ) : (
                                                <>
                                                    Launch Website <Check className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 lg:p-10 overflow-hidden flex flex-col relative z-0">
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-brand/5 blur-[100px] rounded-full"></div>
                    </div>
                    <div className="relative z-10 h-full">
                        <PreviewPane />
                    </div>
                </main>
            </div >
        </div >
    );
}
