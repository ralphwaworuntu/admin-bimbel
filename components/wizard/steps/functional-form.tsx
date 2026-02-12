"use client";

import { useWizard } from "../wizard-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Calendar,
    ShoppingBag,
    BookOpen,
    Image,
    Mail,
    Instagram,
    Linkedin,
    Twitter,
    Facebook,
    MapPin,
    Clock,
    Contact,
    CheckCircle2,
    MessageCircle,
    Zap,
    Sparkles,
    Maximize2
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FunctionalForm() {
    const { config, updateConfig, toggleService } = useWizard();

    const services = [
        { id: 'booking', label: 'Online Booking', icon: Calendar, desc: 'Allow clients to book appointments' },
        { id: 'shop', label: 'Digital Shop', icon: ShoppingBag, desc: 'Sell products or digital downloads' },
        { id: 'portfolio', label: 'Portfolio', icon: Image, desc: 'Showcase your best creative work' },
        { id: 'catalog', label: 'Product Catalog', icon: BookOpen, desc: 'Display a list of items/services' },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Service Selection Grid */}
            <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" /> Core Business Features
                </Label>
                <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => {
                        const isSelected = config.content.services?.includes(service.id);
                        return (
                            <motion.button
                                key={service.id}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleService(service.id)}
                                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${isSelected ? 'border-primary-brand bg-primary-brand/5 ring-4 ring-primary-brand/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200'}`}
                            >
                                <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary-brand text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-slate-600'}`}>
                                    <service.icon className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-black tracking-tight mb-1">{service.label}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{service.desc}</p>
                                {isSelected && (
                                    <div className="absolute top-2 right-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary-brand" />
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Business Contacts */}
            <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Contact className="w-3 h-3" /> Business Logistics
                </Label>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="openTime" className="text-xs font-bold text-slate-500">Opening</Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                id="openTime"
                                type="time"
                                className="pl-9 h-12 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl font-bold text-xs"
                                value={config.functional.businessHours?.open}
                                onChange={(e) => updateConfig({ functional: { businessHours: { ...config.functional.businessHours, open: e.target.value } as any } })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="closeTime" className="text-xs font-bold text-slate-500">Closing</Label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                id="closeTime"
                                type="time"
                                className="pl-9 h-12 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl font-bold text-xs"
                                value={config.functional.businessHours?.close}
                                onChange={(e) => updateConfig({ functional: { businessHours: { ...config.functional.businessHours, close: e.target.value } as any } })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs font-bold text-slate-500">Physical Location</Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input
                            id="address"
                            className="pl-9 h-12 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl font-bold text-xs"
                            placeholder={config.identity.region === 'id' ? "e.g. Jl. Sudirman No. 1, Jakarta" : "e.g. 123 Luxury Ave, New York"}
                            value={config.functional.address}
                            onChange={(e) => updateConfig({ functional: { address: e.target.value } })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-slate-500 flex justify-between">
                        Direct Contact Email
                        {config.functional.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.functional.email) && (
                            <span className="text-[9px] text-rose-500 font-black animate-pulse">INVALID FORMAT</span>
                        )}
                    </Label>
                    <div className="relative group/input">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within/input:text-primary-brand transition-colors" />
                        <Input
                            id="email"
                            type="email"
                            className={`pl-9 h-12 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl font-bold text-xs transition-all ${config.functional.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.functional.email) ? 'ring-2 ring-rose-500/20' : 'focus:ring-2 focus:ring-primary-brand/20'}`}
                            placeholder="hello@yourbrand.com"
                            value={config.functional.email}
                            onChange={(e) => updateConfig({ functional: { email: e.target.value } })}
                        />
                        <div className="absolute -bottom-8 left-0 opacity-0 group-hover/input:opacity-100 transition-opacity bg-slate-900 text-white text-[8px] font-bold px-2 py-1 rounded pointer-events-none z-50 uppercase tracking-widest">
                            Required for customer trust & inquiry automated routing
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Ecosystem */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Social Ecosystem</Label>
                <div className="grid grid-cols-1 gap-3">
                    {[
                        { id: 'instagram', icon: Instagram, placeholder: 'instagram.com/brand', color: 'hover:text-pink-500' },
                        { id: 'linkedin', icon: Linkedin, placeholder: 'linkedin.com/company/brand', color: 'hover:text-blue-600' },
                        { id: 'twitter', icon: Twitter, placeholder: 'x.com/brand', color: 'hover:text-slate-900' },
                        { id: 'facebook', icon: Facebook, placeholder: 'facebook.com/brand', color: 'hover:text-blue-500' },
                    ].map((platform) => {
                        const social = config.functional.socials.find(s => s.platform === platform.id);
                        return (
                            <div key={platform.id} className="relative group/social">
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${platform.color} text-slate-300`}>
                                    <platform.icon className="w-4 h-4" />
                                </div>
                                <Input
                                    placeholder={platform.placeholder}
                                    className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:ring-primary-brand/20 transition-all hover:border-slate-200"
                                    value={social?.url || ""}
                                    onChange={(e) => {
                                        const otherSocials = config.functional.socials.filter(s => s.platform !== platform.id);
                                        updateConfig({
                                            functional: {
                                                socials: [...otherSocials, { platform: platform.id as any, url: e.target.value }]
                                            }
                                        });
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Strategic Integrations */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-amber-500" /> Strategic Integrations
                </Label>
                <div className="space-y-3">
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        <Input
                            placeholder="Calendly Link (e.g. calendly.com/brand/15min)"
                            className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-primary-brand/20 transition-all"
                            value={config.functional.calendlyUrl || ""}
                            onChange={(e) => updateConfig({ functional: { calendlyUrl: e.target.value } })}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Live Booking</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        <Input
                            placeholder={config.identity.region === 'id' ? "WhatsApp Number (e.g. +62812...)" : "WhatsApp Number (e.g. +1...)"}
                            className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-primary-brand/20 transition-all"
                            value={config.functional.whatsapp}
                            onChange={(e) => updateConfig({ functional: { whatsapp: e.target.value } })}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Chat Bot</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conversion Growth Lab */}
            <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800 pb-32">
                <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-brand/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-brand/30 transition-all" />
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-brand/20 flex items-center justify-center text-primary-brand">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="font-black text-white text-xl">Conversion Growth Lab</h3>
                        </div>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed">
                            Deploy high-fidelity lead magnets to capture intent. Your site will be provisioned at:
                            <span className="text-primary-brand font-bold ml-1">{(config.identity.brandName || "site").toLowerCase().replace(/\s+/g, '-')}.waas.site</span>
                        </p>
                        <button
                            onClick={() => {
                                const url = `${(config.identity.brandName || "site").toLowerCase().replace(/\s+/g, '-')}.waas.site`;
                                navigator.clipboard.writeText(url);
                                alert("Site URL copied to clipboard!");
                            }}
                            className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <Maximize2 className="w-3 h-3" /> Copy Site URL
                        </button>
                        <Button
                            className="w-full h-14 bg-primary-brand hover:bg-primary-brand/90 text-white rounded-2xl shadow-xl shadow-primary-brand/20 font-black text-xs uppercase tracking-widest"
                            onClick={() => alert("Optimization Engines Engaged. Conversion paths are being calculated...")}
                        >
                            Configure Lead Flow
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
