"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Login failed. Please check your credentials.");
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-display">
            {/* Left Panel — Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-950 relative overflow-hidden items-center justify-center p-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(129,6,209,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />

                <div className="relative z-10 max-w-lg space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-12">
                            <div className="bg-primary-brand p-2 rounded-xl shadow-lg shadow-primary-brand/30">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-white font-black text-xl tracking-tight">
                                Instant<span className="text-primary-brand">Engine</span>
                            </span>
                        </div>

                        <h2 className="text-4xl font-black text-white tracking-tight leading-tight mb-4">
                            Build Sovereign
                            <br />
                            <span className="text-primary-brand">Digital Ecosystems</span>
                        </h2>
                        <p className="text-slate-400 text-base font-medium leading-relaxed">
                            Deploy high-conversion websites in minutes. AI-powered wizard,
                            real-time preview, and enterprise-grade infrastructure.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-6 pt-8 border-t border-white/10"
                    >
                        {[
                            { value: "2.4M+", label: "Weekly Reach" },
                            { value: "99.99%", label: "Uptime" },
                            { value: "42", label: "Edge Nodes" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-white font-black text-xl">{stat.value}</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right Panel — Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-[#020617]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md space-y-8"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-4">
                        <div className="bg-primary-brand p-1.5 rounded-lg shadow-lg shadow-primary-brand/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tight">
                            Instant<span className="text-primary-brand">Engine</span>
                        </span>
                    </div>

                    <div>
                        <h1 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-slate-500 font-medium">Sign in to your sovereign ecosystem</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center gap-3"
                        >
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-bold focus:ring-2 focus:ring-primary-brand/20 focus:border-primary-brand outline-none transition-all"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-bold focus:ring-2 focus:ring-primary-brand/20 focus:border-primary-brand outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-2xl bg-primary-brand text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center space-y-4">
                        <p className="text-sm text-slate-500 font-medium">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-primary-brand font-black hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                            <Sparkles className="w-3 h-3" /> Powered by InstantEngine WaaS Builder
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
