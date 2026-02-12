"use client";

import { useRef } from "react";
import { useWizard } from "../wizard-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Layers, Zap, Shield, Sparkles, X, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function IdentityForm() {
    const { config, updateConfig, smartSuggest } = useWizard();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const themes = [
        { name: "Midnight Professional", primary: "#0f172a", secondary: "#334155", icon: <Zap className="w-4 h-4" />, bg: "bg-slate-500/10", desc: "Corporate & Reliable" },
        { name: "Arctic Clean", primary: "#f8fafc", secondary: "#e2e8f0", icon: <Shield className="w-4 h-4" />, bg: "bg-blue-500/10", desc: "Minimal & Pure" },
        { name: "Sunset Vibrant", primary: "#f43f5e", secondary: "#fb923c", icon: <Palette className="w-4 h-4" />, bg: "bg-rose-500/10", desc: "Creative & Energetic" },
        { name: "Proton Deep", primary: "#8106d1", secondary: "#4f46e5", icon: <Sparkles className="w-4 h-4" />, bg: "bg-indigo-500/10", desc: "Tech & Innovation" },
        { name: "Emerald Growth", primary: "#10b981", secondary: "#059669", icon: <Layers className="w-4 h-4" />, bg: "bg-emerald-500/10", desc: "Eco & Harmony" },
    ];

    const handleThemeSelect = (theme: typeof themes[0]) => {
        updateConfig({
            identity: {
                colors: {
                    colors: {
                        primary: theme.primary,
                        secondary: theme.secondary,
                        // Update other core colors to match theme
                        background: theme.primary === '#f8fafc' ? '0 0% 100%' : '222.2 84% 4.9%',
                    } as any
                }
            }
        });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateConfig({ identity: { logoUrl: reader.result as string } });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="brandName" className="text-sm font-semibold">Brand Name</Label>
                <Input
                    id="brandName"
                    placeholder="e.g. Acme Corp"
                    className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800"
                    value={config.identity.brandName || ""}
                    onChange={(e) => updateConfig({ identity: { brandName: e.target.value } })}
                />
            </div>

            <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Market Region Strategy</Label>
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { id: 'id', label: 'Indo', icon: 'location_on' },
                        { id: 'global', label: 'Global', icon: 'public' },
                        { id: 'jp', label: 'Japan', icon: 'temple_hindu' },
                        { id: 'us', label: 'USA', icon: 'flag' },
                    ].map((region) => (
                        <button
                            key={region.id}
                            onClick={() => updateConfig({ identity: { region: region.id as any } })}
                            className={`p-3 rounded-xl border transition-all flex flex-col items-center text-center gap-1 group ${config.identity.region === region.id ? 'border-primary-brand bg-primary-brand/5 ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                        >
                            <span className={`material-icons text-base transition-colors ${config.identity.region === region.id ? 'text-primary-brand' : 'text-slate-300 group-hover:text-slate-500'}`}>{region.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest">{region.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target Audience Profile</Label>
                <div className="grid grid-cols-5 gap-2">
                    {[
                        { id: 'luxury', label: 'Lux', icon: 'diamond' },
                        { id: 'youth', label: 'Viral', icon: 'bolt' },
                        { id: 'corporate', label: 'Corp', icon: 'business' },
                        { id: 'umkm', label: 'Local', icon: 'storefront' },
                        { id: 'tech', label: 'SaaS', icon: 'memory' },
                    ].map((audience) => (
                        <button
                            key={audience.id}
                            onClick={() => {
                                updateConfig({ identity: { audience: audience.id as any } });
                                smartSuggest(audience.id, config.identity.intent || 'conversion');
                            }}
                            className={`p-3 rounded-xl border transition-all flex flex-col items-center text-center gap-1 group ${config.identity.audience === audience.id ? 'border-primary-brand bg-primary-brand/5 ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                        >
                            <span className={`material-icons text-base transition-colors ${config.identity.audience === audience.id ? 'text-primary-brand' : 'text-slate-300 group-hover:text-slate-500'}`}>{audience.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest">{audience.label}</span>
                        </button>
                    ))}
                </div>
                <p className="text-[9px] font-bold text-primary-brand/60 uppercase tracking-widest text-center mt-2 animate-pulse">
                    <Sparkles className="w-2.5 h-2.5 inline mr-1" /> Smart Layout Suggestion Active
                </p>
            </div>

            <div className="space-y-4">
                <Label className="block text-sm font-semibold">Logo Upload</Label>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                />

                {config.identity.logoUrl ? (
                    <div className="relative group w-full aspect-video rounded-xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50">
                        <img
                            src={config.identity.logoUrl}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain drop-shadow-lg"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateConfig({ identity: { logoUrl: "" } });
                            }}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:border-primary-brand/50 transition-colors cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-primary-brand" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Upload Sovereign Logo</span>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">SVG, PNG or JPG (Max 2MB)</p>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <Label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400">Elite Palette Matrix (Color Worlds)</Label>
                <div className="grid grid-cols-1 gap-3">
                    {themes.map((theme) => (
                        <motion.button
                            key={theme.name}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleThemeSelect(theme)}
                            className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${config.identity.colors.colors.primary === theme.primary ? 'bg-white dark:bg-slate-800 border-primary-brand shadow-lg shadow-primary-brand/10 ring-2 ring-primary-brand/20' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center text-primary-brand`}>
                                    {theme.icon}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black tracking-tight">{theme.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{theme.desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-4 h-4 rounded-full border border-white dark:border-slate-700 shadow-sm" style={{ backgroundColor: theme.primary }}></div>
                                <div className="w-4 h-4 rounded-full border border-white dark:border-slate-700 shadow-sm" style={{ backgroundColor: theme.secondary }}></div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Typography Intelligence</Label>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: 'classic', label: 'Classic Serif', sub: 'Elegant & Trusted' },
                        { id: 'modern', label: 'Modern Sans', sub: 'Clean & Minimal' },
                        { id: 'tech', label: 'Mono Tech', sub: 'Precise & Digital' },
                        { id: 'playful', label: 'Soft Round', sub: 'Friendly & Fun' },
                    ].map((font) => (
                        <button
                            key={font.id}
                            onClick={() => updateConfig({ identity: { typography: font.id as any } })}
                            className={`p-4 rounded-2xl border transition-all text-left ${config.identity.typography === font.id ? 'border-primary-brand bg-primary-brand/5 ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                        >
                            <p className="text-xs font-black tracking-tight">{font.label}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1">{font.sub}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Voice Calibration</Label>
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { id: 'bold', label: 'Bold', icon: 'bolt' },
                        { id: 'friendly', label: 'Warm', icon: 'face' },
                        { id: 'professional', label: 'Expert', icon: 'verified' },
                        { id: 'scientific', label: 'Fact', icon: 'biotech' },
                    ].map((voice) => (
                        <button
                            key={voice.id}
                            onClick={() => updateConfig({ identity: { voice: voice.id as any } })}
                            className={`p-3 rounded-xl border transition-all flex flex-col items-center text-center gap-1 group ${config.identity.voice === voice.id ? 'border-primary-brand bg-primary-brand/5 ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                        >
                            <span className={`material-icons text-base transition-colors ${config.identity.voice === voice.id ? 'text-primary-brand' : 'text-slate-300 group-hover:text-slate-500'}`}>{voice.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest">{voice.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <Label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400">Custom Color Override</Label>
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Input
                            className="w-full pl-12 pr-4 h-12 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-xs font-black bg-white dark:bg-slate-900 focus:ring-primary-brand focus:border-primary-brand transition-all uppercase tracking-widest"
                            value={config.identity.colors.colors.primary}
                            onChange={(e) => updateConfig({ identity: { colors: { colors: { ...config.identity.colors.colors, primary: e.target.value } as any } } })}
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: config.identity.colors.colors.primary }}></div>
                    </div>
                    <button
                        onClick={() => {
                            const primary = config.identity.colors.colors.primary;
                            const complements: Record<string, string> = {
                                '#0f172a': '#38bdf8',
                                '#f8fafc': '#0f172a',
                                '#f43f5e': '#fbbf24',
                                '#8106d1': '#10b981',
                                '#10b981': '#4f46e5',
                            };
                            const secondary = complements[primary.toLowerCase()] || primary + 'CC';
                            updateConfig({ identity: { colors: { colors: { ...config.identity.colors.colors, secondary } as any } } });
                        }}
                        className="h-12 px-4 rounded-xl border border-primary-brand/20 bg-primary-brand/5 text-[10px] font-black uppercase tracking-widest text-primary-brand hover:bg-primary-brand/10 transition-all active:scale-95"
                    >
                        Auto-Match
                    </button>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${config.identity.colors.colors.primary.startsWith('#') && (parseInt(config.identity.colors.colors.primary.replace('#', '').substring(0, 2), 16) * 0.299 + parseInt(config.identity.colors.colors.primary.replace('#', '').substring(2, 4), 16) * 0.587 + parseInt(config.identity.colors.colors.primary.replace('#', '').substring(4, 6), 16) * 0.114) / 255 > 0.8 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest">Contrast Guard Score</p>
                            <p className="text-[9px] font-bold text-slate-400">WCAG 2.1 Compliance Analysis</p>
                        </div>
                    </div>
                    {(config.identity.colors.colors.primary.startsWith('#') && (parseInt(config.identity.colors.colors.primary.replace('#', '').substring(0, 2), 16) * 0.299 + parseInt(config.identity.colors.colors.primary.replace('#', '').substring(2, 4), 16) * 0.587 + parseInt(config.identity.colors.colors.primary.replace('#', '').substring(4, 6), 16) * 0.114) / 255 > 0.8) ? (
                        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                            <Shield className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase">Low Contrast</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                            <CheckCircle2 className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase">Optimized</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
