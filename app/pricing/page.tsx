"use client";

import Link from "next/link";
import { Check, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";

export default function PricingPage() {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary-brand/30">
                {/* Navbar */}
                <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="text-xl font-black tracking-tighter flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-brand rounded-lg flex items-center justify-center text-white">
                                <Zap className="w-5 h-5 fill-current" />
                            </div>
                            InstantEngine
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-brand transition-colors">
                                Sign In
                            </Link>
                            <Link href="/register" className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="pt-32 pb-20 px-6">
                    {/* Hero */}
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
                            Simple pricing for <span className="text-primary-brand">scaling brands</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Launch your high-performance website today. Upgrade as you grow. No hidden fees.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {/* Starter */}
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-brand/30 transition-all hover:shadow-xl relative group">
                            <h3 className="text-xl font-bold mb-2">Starter</h3>
                            <p className="text-slate-500 text-sm mb-6">Perfect for side projects and MVPs.</p>
                            <div className="mb-6">
                                <span className="text-4xl font-black">$0</span>
                                <span className="text-slate-400">/mo</span>
                            </div>
                            <Link href="/register?plan=starter">
                                <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                                    Start for Free
                                </button>
                            </Link>
                            <ul className="mt-8 space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> 1 Published Site</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> InstantEngine Wizard</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> Standard Templates</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> Community Support</li>
                            </ul>
                        </div>

                        {/* Pro */}
                        <div className="p-8 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-900 dark:border-white shadow-2xl relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary-brand text-white text-xs font-bold uppercase tracking-widest rounded-full">
                                Most Popular
                            </div>
                            <h3 className="text-xl font-bold mb-2">Pro Agency</h3>
                            <p className="opacity-80 text-sm mb-6">For serious brands and agencies.</p>
                            <div className="mb-6">
                                <span className="text-4xl font-black">$29</span>
                                <span className="text-opacity-60 text-current">/mo</span>
                            </div>
                            <Link href="/register?plan=pro">
                                <button className="w-full py-3 rounded-xl bg-primary-brand text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                                    Get Started
                                </button>
                            </Link>
                            <ul className="mt-8 space-y-4 text-sm font-medium opacity-90">
                                <li className="flex items-center gap-3"><div className="bg-white/20 rounded-full p-1"><Check className="w-3 h-3" /></div> Unlimited Sites</li>
                                <li className="flex items-center gap-3"><div className="bg-white/20 rounded-full p-1"><Check className="w-3 h-3" /></div> Custom Domains</li>
                                <li className="flex items-center gap-3"><div className="bg-white/20 rounded-full p-1"><Check className="w-3 h-3" /></div> Remove Branding</li>
                                <li className="flex items-center gap-3"><div className="bg-white/20 rounded-full p-1"><Check className="w-3 h-3" /></div> Advanced Analytics</li>
                                <li className="flex items-center gap-3"><div className="bg-white/20 rounded-full p-1"><Check className="w-3 h-3" /></div> Priority Support</li>
                            </ul>
                        </div>

                        {/* Enterprise */}
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-brand/30 transition-all hover:shadow-xl relative group">
                            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                            <p className="text-slate-500 text-sm mb-6">Custom solutions for large orgs.</p>
                            <div className="mb-6">
                                <span className="text-4xl font-black">Custom</span>
                            </div>
                            <Link href="mailto:sales@instantengine.ai">
                                <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
                                    Contact Sales
                                </button>
                            </Link>
                            <ul className="mt-8 space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> SSO / SAML</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> Dedicated Success Manager</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> Custom SLA</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary-brand" /> On-premise Deployment</li>
                            </ul>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto py-20 border-t border-slate-200 dark:border-slate-800">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-8">
                            {[
                                { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing cycle." },
                                { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee if you're not satisfied with our Pro plan." },
                                { q: "Can I use my own domain?", a: "Yes, Custom Domains are included in the Pro and Enterprise plans." },
                            ].map((faq, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
                                    <h3 className="font-bold mb-2">{faq.q}</h3>
                                    <p className="text-slate-500 text-sm">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary-brand rounded-md flex items-center justify-center text-white">
                                <Zap className="w-4 h-4 fill-current" />
                            </div>
                            <span className="font-bold text-white">InstantEngine</span>
                        </div>
                        <p className="text-xs">© 2026 InstantEngine Inc. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}
