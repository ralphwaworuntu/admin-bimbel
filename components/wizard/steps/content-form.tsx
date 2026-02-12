"use client";

import { useWizard } from "../wizard-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Wand2, RefreshCcw, Plus, Trash2, Users, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function ContentForm() {
    const { config, updateConfig } = useWizard();
    const [activeAiField, setActiveAiField] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateMagicCopy = async (field: 'title' | 'subtitle') => {
        setIsGenerating(true);
        // Simulate "Thinking"
        await new Promise(resolve => setTimeout(resolve, 1500));

        const brand = config.identity.brandName || "Your Brand";
        const audience = config.identity.audience || "umkm";
        const voice = config.identity.voice || "professional";

        const templates = {
            title: {
                luxury: [`The Sovereign Standard of ${brand}`, `Exclusivity Redefined for ${brand}`, `The Art of Elite ${brand}`],
                tech: [`The ${brand} Neural Interface`, `Scalable Systems by ${brand}`, `Next-Gen Logic: ${brand}`],
                corporate: [`${brand}: Strategic Enterprise Solutions`, `Global Efficiency for ${brand}`, `The ${brand} Advisory`],
                umkm: [`Tumbuh Bersama ${brand}`, `Solusi UMKM Juara dari ${brand}`, `Berdaya dengan ${brand}`],
                youth: [`Level Up with ${brand}`, `No Cap: ${brand} is Here`, `The ${brand} Hype`],
            },
            subtitle: {
                bold: `We don't follow trends. We set the pulse. ${brand} is the ultimate disruptor in your market.`,
                friendly: `Hi there! We're here to make ${brand} work for you. Let's build something amazing together.`,
                professional: `Engineered for excellence. ${brand} delivers high-performance results for serious builders.`,
                scientific: `Based on rigorous data analysis, ${brand} optimizes your deployment with 99.9% precision.`
            }
        };

        const fieldTemplates = field === 'title'
            ? templates.title[audience as keyof typeof templates.title]
            : [templates.subtitle[voice as keyof typeof templates.subtitle]];

        const result = fieldTemplates[Math.floor(Math.random() * fieldTemplates.length)];

        if (field === 'title') {
            updateConfig({ content: { hero: { ...config.content.hero, title: result } } });
        } else {
            updateConfig({ content: { hero: { ...config.content.hero, subtitle: result } } });
        }
        setIsGenerating(false);
    };

    const aiSuggestions = {
        title: [
            `Transform your ${config.identity.brandName || 'Business'} with Excellence`,
            `The Future of ${config.identity.brandName || 'Service'} is Here`,
            `Premium Solutions for ${config.identity.brandName || 'Growth'}`,
            `Modernize your ${config.identity.brandName || 'Brand'} Instantly`
        ],
        subtitle: [
            "Experience the next generation of professional services tailored just for you.",
            "We combine innovation with expertise to deliver results that matter.",
            "Industry-leading standards meeting cutting-edge technology.",
            "Join thousands of satisfied clients who trust our vision."
        ]
    };

    return (
        <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-black text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> AI Content Assistant
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Need inspiration? Let the AI Architect craft your narrative.
                        </p>
                    </div>
                    <button
                        onClick={() => generateMagicCopy('title')}
                        disabled={isGenerating}
                        className={`px-4 py-2 rounded-xl bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${isGenerating ? 'opacity-50' : ''}`}
                    >
                        {isGenerating ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                        {isGenerating ? 'Thinking...' : 'Magic Gen'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <Label htmlFor="title" className="text-sm font-semibold">Hero Headline</Label>
                        <button
                            onClick={() => setActiveAiField(activeAiField === 'title' ? null : 'title')}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-purple-500 hover:text-purple-600 transition-colors"
                        >
                            <Wand2 className="w-3 h-3" /> Magic Write
                        </button>
                    </div>
                    <Input
                        id="title"
                        placeholder="Main headline..."
                        className="px-4 py-6 border border-slate-200 dark:border-slate-800 rounded-2xl text-lg font-bold bg-white dark:bg-slate-900 focus:ring-primary-brand focus:border-primary-brand"
                        value={config.content.hero.title}
                        onChange={(e) => updateConfig({ content: { hero: { ...config.content.hero, title: e.target.value } } })}
                    />

                    <AnimatePresence>
                        {activeAiField === 'title' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 gap-2 overflow-hidden"
                            >
                                {aiSuggestions.title.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            updateConfig({ content: { hero: { ...config.content.hero, title: s } } });
                                            setActiveAiField(null);
                                        }}
                                        className="text-left p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <Label htmlFor="subtitle" className="text-sm font-semibold">Sub-headline</Label>
                        <button
                            onClick={() => setActiveAiField(activeAiField === 'subtitle' ? null : 'subtitle')}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-purple-500 hover:text-purple-600 transition-colors"
                        >
                            <Wand2 className="w-3 h-3" /> Enhance
                        </button>
                    </div>
                    <Textarea
                        id="subtitle"
                        placeholder="Supporting text..."
                        rows={4}
                        className="w-full px-4 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium bg-white dark:bg-slate-900 resize-none focus:ring-primary-brand"
                        value={config.content.hero.subtitle}
                        onChange={(e) => updateConfig({ content: { hero: { ...config.content.hero, subtitle: e.target.value } } })}
                    />

                    <AnimatePresence>
                        {activeAiField === 'subtitle' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 gap-2 overflow-hidden"
                            >
                                {aiSuggestions.subtitle.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            updateConfig({ content: { hero: { ...config.content.hero, subtitle: s } } });
                                            setActiveAiField(null);
                                        }}
                                        className="text-left p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed transition-all"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <Label className="text-sm font-semibold">Narrative Tone</Label>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Persona</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'professional', label: 'Pro', icon: 'verified' },
                            { id: 'friendly', label: 'Chill', icon: 'face' },
                            { id: 'bold', label: 'Bold', icon: 'bolt' }
                        ].map((tone) => (
                            <button
                                key={tone.id}
                                onClick={() => updateConfig({ identity: { voice: tone.id as any } })}
                                className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-1 group ${config.identity.voice === tone.id ? 'border-primary-brand bg-primary-brand/5 ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800 hover:border-primary-brand/30 hover:bg-slate-50'}`}
                            >
                                <span className={`material-icons text-base transition-colors ${config.identity.voice === tone.id ? 'text-primary-brand' : 'text-slate-400 group-hover:text-primary-brand'}`}>{tone.icon}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest">{tone.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <Wand2 className="w-3 h-3 text-purple-500" /> Image Intelligence (Unsplash)
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2274&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2340&auto=format&fit=crop"
                        ].map((img, i) => (
                            <button
                                key={i}
                                onClick={() => updateConfig({ content: { hero: { ...config.content.hero, image: img } } })}
                                className={`aspect-video rounded-xl border-2 transition-all bg-cover bg-center overflow-hidden active:scale-95 ${config.content.hero.image === img ? 'border-primary-brand ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800'}`}
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Strategic Intent
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'conversion', label: 'Sell Now', icon: 'shopping_cart' },
                            { id: 'content', label: 'Story', icon: 'auto_stories' },
                            { id: 'service', label: 'Booking', icon: 'event_available' }
                        ].map((intent) => (
                            <button
                                key={intent.id}
                                onClick={() => updateConfig({ identity: { intent: intent.id as any } })}
                                className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all ${config.identity.intent === intent.id ? 'border-amber-500 bg-amber-500/5 ring-4 ring-amber-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-primary-brand/30 hover:bg-slate-50'}`}
                            >
                                <span className={`material-icons text-base transition-colors ${config.identity.intent === intent.id ? 'text-amber-500' : 'text-slate-400'}`}>{intent.icon}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest">{intent.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ctaType" className="text-sm font-semibold">Primary Action (CTA)</Label>
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            id="ctaType"
                            className="w-full col-span-2 px-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary-brand/20"
                            value={config.content.hero.ctaType || "started"}
                            onChange={(e) => updateConfig({ content: { hero: { ...config.content.hero, ctaType: e.target.value as any } } })}
                        >
                            <option value="started">Get Started</option>
                            <option value="booking">Book Appointment</option>
                            <option value="waitlist">Join Waitlist</option>
                            <option value="shop">Shop Catalog</option>
                            <option value="consultation">Free Consultation</option>
                        </select>
                        <Input
                            id="ctaText"
                            placeholder="Custom Label..."
                            value={config.content.hero.ctaText}
                            onChange={(e) => updateConfig({ content: { hero: { ...config.content.hero, ctaText: e.target.value } } })}
                            className="px-4 py-4 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold col-span-2"
                        />
                    </div>
                </div>

                {/* About Us Section */}
                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-blue-500" /> About Us Section
                    </Label>
                    <div className="space-y-3">
                        <Input
                            placeholder="About Title (e.g. Our Story)"
                            className="px-4 py-4 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold"
                            value={config.content.about?.title || ""}
                            onChange={(e) => updateConfig({ content: { about: { ...config.content.about, title: e.target.value, description: config.content.about?.description || "" } } as any })}
                        />
                        <Textarea
                            placeholder="Tell your brand story... What makes you unique?"
                            rows={4}
                            className="w-full px-4 py-4 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium bg-white dark:bg-slate-900 resize-none"
                            value={config.content.about?.description || ""}
                            onChange={(e) => updateConfig({ content: { about: { ...config.content.about, title: config.content.about?.title || "About Us", description: e.target.value } } as any })}
                        />
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <Users className="w-3 h-3 text-purple-500" /> Client Testimonials
                        </Label>
                        <button
                            onClick={() => {
                                const current = config.content.testimonials || [];
                                const newTestimonial = {
                                    id: `t-${Date.now()}`,
                                    name: "",
                                    role: "",
                                    content: "",
                                };
                                updateConfig({ content: { testimonials: [...current, newTestimonial] } as any });
                            }}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-purple-500 hover:text-purple-600 transition-colors"
                        >
                            <Plus className="w-3 h-3" /> Add Review
                        </button>
                    </div>

                    <AnimatePresence>
                        {(config.content.testimonials || []).map((t: any, i: number) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 relative group"
                            >
                                <button
                                    onClick={() => {
                                        const updated = (config.content.testimonials || []).filter((_: any, idx: number) => idx !== i);
                                        updateConfig({ content: { testimonials: updated } as any });
                                    }}
                                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        placeholder="Client Name"
                                        className="px-3 py-2 border border-slate-100 dark:border-slate-800 rounded-lg text-xs font-bold"
                                        value={t.name}
                                        onChange={(e) => {
                                            const updated = [...(config.content.testimonials || [])];
                                            updated[i] = { ...updated[i], name: e.target.value };
                                            updateConfig({ content: { testimonials: updated } as any });
                                        }}
                                    />
                                    <Input
                                        placeholder="Role (e.g. CEO)"
                                        className="px-3 py-2 border border-slate-100 dark:border-slate-800 rounded-lg text-xs font-bold"
                                        value={t.role || ""}
                                        onChange={(e) => {
                                            const updated = [...(config.content.testimonials || [])];
                                            updated[i] = { ...updated[i], role: e.target.value };
                                            updateConfig({ content: { testimonials: updated } as any });
                                        }}
                                    />
                                </div>
                                <Textarea
                                    placeholder="What did this client say about your service?"
                                    rows={2}
                                    className="w-full px-3 py-2 border border-slate-100 dark:border-slate-800 rounded-lg text-xs font-medium resize-none"
                                    value={t.content}
                                    onChange={(e) => {
                                        const updated = [...(config.content.testimonials || [])];
                                        updated[i] = { ...updated[i], content: e.target.value };
                                        updateConfig({ content: { testimonials: updated } as any });
                                    }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {(!config.content.testimonials || config.content.testimonials.length === 0) && (
                        <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No testimonials yet</p>
                            <p className="text-[9px] font-bold text-slate-300 mt-1">Click "Add Review" to add social proof</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
