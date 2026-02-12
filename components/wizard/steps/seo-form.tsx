"use client";

import { useWizard } from "../wizard-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Search, Share2, Sparkles, Wand2, RefreshCcw, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SeoForm() {
    const { config, updateConfig } = useWizard();
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSeoMetadata = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 1200));

        const brand = config.identity.brandName || "Your Brand";
        const audience = config.identity.audience || "corporate";
        const region = config.identity.region || "global";
        const services = config.content.services || [];
        const hero = config.content.hero;

        // Region-aware location suffix
        const locationMap: Record<string, string> = {
            id: "Indonesia",
            global: "Worldwide",
            jp: "Japan",
            us: "United States",
        };
        const location = locationMap[region] || "Worldwide";

        // Service keyword mapping
        const serviceKeywords: Record<string, string[]> = {
            booking: ["online booking", "appointment scheduling", "book consultation"],
            shop: ["digital shop", "online store", "e-commerce"],
            portfolio: ["portfolio", "creative showcase", "design gallery"],
            catalog: ["product catalog", "service listing", "digital catalog"],
        };

        // Audience-aware title templates
        const titleTemplates: Record<string, string> = {
            luxury: `${brand} — Exclusive Premium Services | ${location}`,
            tech: `${brand} — Next-Gen Digital Solutions | ${location}`,
            corporate: `${brand} — Professional Business Services | ${location}`,
            umkm: `${brand} — Solusi Digital Terpercaya | ${location}`,
            youth: `${brand} — The Future Starts Here | ${location}`,
        };

        // Audience-aware description templates
        const descTemplates: Record<string, string> = {
            luxury: `Discover ${brand}'s elite digital experience. We deliver bespoke, world-class services tailored for the most discerning clients in ${location}. Request your private consultation today.`,
            tech: `${brand} engineers scalable, high-performance solutions for the modern enterprise. Deploy lightning-fast infrastructure with our cutting-edge platform serving ${location}.`,
            corporate: `${brand} provides strategic, results-driven business solutions in ${location}. Our expert team transforms your vision into measurable outcomes. Get started today.`,
            umkm: `${brand} hadir untuk membantu UMKM di ${location} berkembang secara digital. Solusi lengkap, mudah digunakan, dan profesional untuk bisnis Anda.`,
            youth: `${brand} is where the next generation builds its future. Fresh ideas, bold execution, and zero limits — join the movement in ${location}.`,
        };

        // Compile keywords
        const baseKeywords = [brand.toLowerCase(), location.toLowerCase()];
        services.forEach((s: string) => {
            if (serviceKeywords[s]) {
                baseKeywords.push(...serviceKeywords[s]);
            }
        });
        if (hero.title) baseKeywords.push(...hero.title.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3));

        const uniqueKeywords = [...new Set(baseKeywords)].slice(0, 10);

        updateConfig({
            seo: {
                title: titleTemplates[audience] || titleTemplates.corporate,
                description: descTemplates[audience] || descTemplates.corporate,
                keywords: uniqueKeywords.join(", "),
            },
        });

        setIsGenerating(false);
    };

    // SEO Score Calculator
    const calculateSeoScore = () => {
        let score = 0;
        const checks: { label: string; pass: boolean; tip: string }[] = [];

        // Title length check
        const titleLen = config.seo.title.length;
        const titlePass = titleLen >= 30 && titleLen <= 65;
        checks.push({ label: "Title Length", pass: titlePass, tip: titlePass ? `${titleLen} chars ✓` : `${titleLen}/60 chars` });
        if (titlePass) score += 25;

        // Description length check
        const descLen = config.seo.description.length;
        const descPass = descLen >= 100 && descLen <= 165;
        checks.push({ label: "Description", pass: descPass, tip: descPass ? `${descLen} chars ✓` : `${descLen}/160 chars` });
        if (descPass) score += 25;

        // Keywords check
        const kwCount = config.seo.keywords.split(",").filter((k: string) => k.trim()).length;
        const kwPass = kwCount >= 3;
        checks.push({ label: "Keywords", pass: kwPass, tip: kwPass ? `${kwCount} keywords ✓` : `${kwCount}/3 minimum` });
        if (kwPass) score += 25;

        // Brand name in title
        const brandInTitle = config.seo.title.toLowerCase().includes((config.identity.brandName || "").toLowerCase()) && config.identity.brandName.length > 0;
        checks.push({ label: "Brand in Title", pass: brandInTitle, tip: brandInTitle ? "Found ✓" : "Missing" });
        if (brandInTitle) score += 25;

        return { score, checks };
    };

    const { score, checks } = calculateSeoScore();
    const scoreColor = score >= 75 ? "text-emerald-500" : score >= 50 ? "text-amber-500" : "text-rose-500";
    const scoreBg = score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-rose-500";

    return (
        <div className="space-y-8">
            {/* AI SEO Auto-Pilot Banner */}
            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-black text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                            <Search className="w-4 h-4" /> SEO Auto-Pilot Engine
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Auto-generate optimized metadata from your brand identity and content strategy.
                        </p>
                    </div>
                    <button
                        onClick={generateSeoMetadata}
                        disabled={isGenerating}
                        className={`px-4 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 ${isGenerating ? 'opacity-50' : ''}`}
                    >
                        {isGenerating ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                        {isGenerating ? 'Analyzing...' : 'Auto-Generate'}
                    </button>
                </div>
            </div>

            {/* Live SEO Score */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live SEO Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-2xl font-black ${scoreColor}`}>{score}</span>
                        <span className="text-[10px] font-bold text-slate-400">/100</span>
                    </div>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                        className={`h-full ${scoreBg} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {checks.map((check, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-bold">
                            {check.pass ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            ) : (
                                <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
                            )}
                            <span className="text-slate-500">{check.label}:</span>
                            <span className={check.pass ? "text-emerald-600" : "text-amber-600"}>{check.tip}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="seoTitle" className="text-sm font-semibold flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-slate-400" /> Meta Title
                    </Label>
                    <Input
                        id="seoTitle"
                        placeholder="e.g. Best Digital Agency in New York | Acme Corp"
                        className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 font-medium"
                        value={config.seo.title}
                        onChange={(e) => updateConfig({ seo: { title: e.target.value } })}
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold text-slate-400">Recommended: 50-60 characters</p>
                        <p className={`text-[10px] font-bold ${config.seo.title.length > 60 ? 'text-amber-500' : config.seo.title.length >= 30 ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {config.seo.title.length} chars
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="seoDescription" className="text-sm font-semibold flex items-center gap-2">
                        <Share2 className="w-3.5 h-3.5 text-slate-400" /> Meta Description
                    </Label>
                    <Textarea
                        id="seoDescription"
                        placeholder="Describe your business in a few sentences..."
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none resize-none font-medium"
                        value={config.seo.description}
                        onChange={(e) => updateConfig({ seo: { description: e.target.value } })}
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold text-slate-400">Recommended: 150-160 characters</p>
                        <p className={`text-[10px] font-bold ${config.seo.description.length > 160 ? 'text-amber-500' : config.seo.description.length >= 100 ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {config.seo.description.length} chars
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="seoKeywords" className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400" /> Focus Keywords
                    </Label>
                    <Input
                        id="seoKeywords"
                        placeholder="e.g. digital agency, nyc marketing, web design"
                        className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 font-medium"
                        value={config.seo.keywords}
                        onChange={(e) => updateConfig({ seo: { keywords: e.target.value } })}
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold text-slate-400 italic">Separate keywords with commas</p>
                        <p className="text-[10px] font-bold text-slate-400">
                            {config.seo.keywords.split(",").filter((k: string) => k.trim()).length} keywords
                        </p>
                    </div>
                </div>
            </div>

            {/* Google Search Preview */}
            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 shadow-inner">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Google Search Preview</p>
                <div className="space-y-1">
                    <p className="text-[#1a0dab] dark:text-blue-400 text-lg hover:underline cursor-pointer font-medium truncate">
                        {config.seo.title || (config.identity.brandName ? `${config.identity.brandName} - Business Website` : "Your Page Title Here")}
                    </p>
                    <p className="text-[#006621] dark:text-emerald-500 text-xs truncate">
                        https://{config.subdomain || "yourbrand"}.instantengine.id
                    </p>
                    <p className="text-[#545454] dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {config.seo.description || "Set your meta description to see how your site will appear in Google search results. A good description increases click-through rates."}
                    </p>
                </div>
            </div>
        </div>
    );
}
