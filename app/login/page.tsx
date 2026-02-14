"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import {
    Zap, Mail, Lock, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff,
    Github, Chrome as GoogleIcon, CheckCircle, ShieldCheck, Activity, Quote, Wand2
} from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginMode, setLoginMode] = useState<'password' | 'magic-link'>('password');
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (emailRef.current) emailRef.current.focus();
    }, []);

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
                // Check user role for redirect
                if ((result.data?.user as any)?.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
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
                {/* Dynamic Background Elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-brand/10 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -45, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(129,6,209,0.15),transparent_60%)]" />

                {/* Glassy Grid overlay */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />

                <div className="relative z-10 max-w-lg space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-12">
                            <div className="bg-primary-brand p-2.5 rounded-2xl shadow-2xl shadow-primary-brand/30">
                                <Zap className="w-6 h-6 text-white fill-white" />
                            </div>
                            <span className="text-white font-black text-2xl tracking-tighter">
                                Instant<span className="text-primary-brand">Engine</span>
                            </span>
                        </div>

                        <h2 className="text-5xl font-black text-white tracking-tighter leading-[0.95] mb-6">
                            Secure Your
                            <br />
                            <span className="text-primary-brand">Sovereign Asset</span>
                        </h2>

                        <div className="relative mt-12 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary-brand/20" />
                            <p className="text-slate-300 font-medium italic leading-relaxed relative z-10">
                                "The speed of deployment and the fidelity of the sovereign ecosystems saved us months of R&D. Highly recommended for elite digital ops."
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-primary-brand font-black text-xs">
                                    AV
                                </div>
                                <div>
                                    <p className="text-white text-xs font-black">Alex Vance</p>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Director, Nexus Operations</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10"
                        >
                            {[
                                { value: "99.99%", label: "Uptime", icon: <Activity className="w-4 h-4 text-emerald-500" /> },
                                { value: "<250ms", label: "Latency", icon: <Zap className="w-4 h-4 text-amber-500" /> },
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {stat.icon}
                                        <p className="text-white font-black text-2xl tracking-tight">{stat.value}</p>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        <div className="flex items-center gap-4 text-slate-500">
                            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                                <ShieldCheck className="w-3 h-3 text-emerald-500" /> AES-256 Encrypted
                            </div>
                            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                                <Sparkles className="w-3 h-3 text-primary-brand" /> AI-Native Auth
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel — Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-950 relative overflow-hidden">
                {/* Mobile Background decoration */}
                <div className="lg:hidden absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,6,209,0.05),transparent_50%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md space-y-10 relative z-10"
                >
                    {/* Status Signal */}
                    <div className="absolute -top-12 left-0 right-0 flex justify-center lg:justify-start">
                        <div className="px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">All Systems Operational</span>
                        </div>
                    </div>

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="bg-primary-brand p-1.5 rounded-xl shadow-lg shadow-primary-brand/20">
                            <Zap className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="font-black text-xl tracking-tighter">
                            Instant<span className="text-primary-brand">Engine</span>
                        </span>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h1 className="text-4xl font-black tracking-tight">Welcome Back</h1>
                            <Wand2 className="w-6 h-6 text-primary-brand/20" />
                        </div>
                        <p className="text-slate-500 font-medium">Identify synchronization required.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-brand transition-colors" />
                                <input
                                    ref={emailRef}
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-bold focus:ring-4 focus:ring-primary-brand/10 focus:border-primary-brand outline-none transition-all"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {loginMode === 'password' ? (
                                <motion.div
                                    key="password-field"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-brand transition-colors" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required={loginMode === 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-bold focus:ring-4 focus:ring-primary-brand/10 focus:border-primary-brand outline-none transition-all"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-primary-brand border-primary-brand' : 'border-slate-300 dark:border-slate-700'}`}>
                                                {rememberMe && <CheckCircle className="w-3 h-3 text-white" />}
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={rememberMe}
                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Remember for 30 days</span>
                                        </label>
                                        <Link href="/forgot-password" title="Mock Link" className="text-[10px] font-black uppercase tracking-widest text-primary-brand hover:underline">
                                            Forgot Access?
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="magic-link-field"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 rounded-2xl bg-primary-brand/5 border border-primary-brand/10"
                                >
                                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center">
                                        We'll send a strategic access link directly to your inbox. No credentials required.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 rounded-2xl bg-primary-brand text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary-brand/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {loginMode === 'password' ? "Establish Link" : "Send Magic Link"} <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setLoginMode(loginMode === 'password' ? 'magic-link' : 'password')}
                                className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-brand transition-colors text-center"
                            >
                                {loginMode === 'password' ? "Switch to Magic Link" : "Back to Password Login"}
                            </button>
                        </div>
                    </form>

                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                                <span className="bg-white dark:bg-slate-950 px-4 text-slate-400">Social Synchronization</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: <GoogleIcon className="w-5 h-5" />, label: "Google" },
                                { icon: <Github className="w-5 h-5" />, label: "GitHub" },
                                { icon: <span className="font-bold">Discord</span>, label: "Discord" }
                            ].map((social) => (
                                <button
                                    key={social.label}
                                    type="button"
                                    className="flex items-center justify-center h-14 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-200 transition-all active:scale-95"
                                >
                                    {social.icon}
                                </button>
                            ))}
                        </div>
                    </div>

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
