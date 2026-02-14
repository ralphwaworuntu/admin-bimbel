"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Globe,
    Settings,
    Activity,
    Users,
    Zap,
    Plus,
    Bell,
    Search,
    Shield,
    Sun,
    Moon,
    Maximize2,
    Target,
    Menu,
    X,
    LogOut,
    ExternalLink,
    ChevronRight,
    ArrowLeft,
    Megaphone,
    Clock,
    Brain,
    CreditCard,
    Workflow
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { signOut } from "@/lib/auth-client";
import { useTranslation } from "@/lib/i18n";
import { PushManager as PushNotificationManager } from "./push-manager";

const SPRING_TRANSITION = {
    type: "spring" as const,
    stiffness: 260,
    damping: 30,
    mass: 1,
    restDelta: 0.001
};

export function AdminShell({ children, session }: { children: React.ReactNode; session: any }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isZenMode, setIsZenMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const pathname = usePathname();
    const router = useRouter();
    const { locale, setLocale } = useTranslation();

    // Hydration-safe window size
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width < 1024 && width > 0; // Ensure we don't default to mobile on server

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
                e.preventDefault();
                setIsZenMode(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/admin" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: Globe, label: "Multi-Verse", href: "/admin/multiverse" },
        { icon: LayoutDashboard, label: "Templates", href: "/admin/templates" },
        { icon: Megaphone, label: "Broadcast", href: "/admin/broadcast" },
        { icon: Brain, label: "Oracle", href: "/admin/oracle" },
        { icon: CreditCard, label: "Revenue", href: "/admin/billing" },
        { icon: Workflow, label: "Protocols", href: "/admin/automations" },
        { icon: Clock, label: "Audit Log", href: "/admin/audit" },
        { icon: Activity, label: "Analytics", href: "/admin/analytics" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    };

    return (
        <div className={`flex min-h-screen font-sans selection:bg-primary-brand/20 transition-colors duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>

            {/* Admin Sidebar - Desktop */}
            <motion.aside
                initial={false}
                animate={{
                    width: isZenMode ? "80px" : "320px",
                    x: 0,
                    opacity: 1
                }}
                transition={SPRING_TRANSITION}
                className={`hidden lg:flex fixed inset-y-0 left-0 border-r border-zinc-200 dark:border-zinc-800 flex-col bg-white dark:bg-zinc-900 z-50 overflow-hidden select-none`}
            >
                <div className={`p-8 flex items-center ${isZenMode ? "justify-center" : "gap-3"} shrink-0 h-28 transition-all`}>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(147,51,234,0.3)] shrink-0"
                    >
                        <Shield className="w-6 h-6 fill-white" />
                    </motion.div>
                    <AnimatePresence initial={false}>
                        {!isZenMode && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={SPRING_TRANSITION}
                                className="text-xl font-black tracking-tight whitespace-nowrap overflow-hidden"
                            >
                                Engine<span className="text-purple-600 font-black">Admin</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-1 px-6 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.label} href={item.href}>
                                <button
                                    className={`w-full group flex items-center ${isZenMode ? "justify-center" : "justify-start gap-4"} p-4 rounded-2xl transition-all mb-1 relative overflow-hidden ${isActive ? "bg-purple-600/10 text-purple-600 shadow-sm" : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                                >
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    <AnimatePresence initial={false}>
                                        {!isZenMode && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={SPRING_TRANSITION}
                                                className="font-black text-xs uppercase tracking-widest truncate whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <Link href="/dashboard">
                            <button
                                className={`w-full group flex items-center ${isZenMode ? "justify-center" : "justify-start gap-4"} p-4 rounded-2xl transition-all text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800`}
                            >
                                <ArrowLeft className="w-5 h-5 shrink-0" />
                                {!isZenMode && (
                                    <span className="font-black text-xs uppercase tracking-widest truncate whitespace-nowrap">
                                        Back to App
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>
                </nav>

                <div className="p-6 space-y-3 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                    <button
                        onClick={() => setIsZenMode(!isZenMode)}
                        className={`w-full h-12 rounded-xl flex items-center justify-center gap-3 text-zinc-400 hover:text-purple-600 transition-all group overflow-hidden ${isZenMode ? "bg-purple-600/10 text-purple-600" : "bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700"}`}
                        title="Toggle Zen Mode (Ctrl+B)"
                    >
                        {isZenMode ? <Maximize2 className="w-4 h-4" /> : <Target className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        {!isZenMode && <span className="text-[10px] font-black uppercase tracking-widest">Zen Mode</span>}
                    </button>

                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center gap-3 text-zinc-400 hover:text-purple-600 transition-all group overflow-hidden"
                    >
                        {isDarkMode ? <Sun className="w-4 h-4 group-hover:rotate-90 transition-transform" /> : <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform" />}
                        {!isZenMode && <span className="text-[10px] font-black uppercase tracking-widest">Vision</span>}
                    </button>

                    <AnimatePresence initial={false}>
                        {!isZenMode && (
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple-600/5 border border-purple-600/10 overflow-hidden">
                                <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600 shrink-0">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div className="whitespace-nowrap">
                                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Access</p>
                                    <p className="text-xs font-black text-purple-600">Administrator</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <motion.div
                animate={{
                    paddingLeft: isMobile ? 0 : (isZenMode ? 80 : 320),
                    paddingTop: 0 // Removed explicit top padding as header is sticky
                }}
                transition={SPRING_TRANSITION}
                className="flex-1 flex flex-col min-h-screen relative w-full"
            >
                {/* Header */}
                <header className="h-20 sm:h-24 px-4 sm:px-8 lg:px-12 flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Hamburger - Visible on lg or smaller AND when split screen makes width small */}
                        <div className="lg:hidden block">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-purple-600 hover:border-purple-600/30 transition-all"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>

                        <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400 hidden xs:block">
                            Platform Control Center
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-zinc-200 dark:border-zinc-800 mr-1">
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-black">{session?.user?.name || "Admin"}</p>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase">Superuser</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600 font-black text-sm border border-purple-600/20">
                                {(session?.user?.name || "A").charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 sm:p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                {/* Mobile/Tablet Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[55] lg:hidden"
                            />
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={SPRING_TRANSITION}
                                className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-zinc-950 z-[60] flex flex-col border-r border-zinc-200 dark:border-white/10 lg:hidden shadow-2xl"
                            >
                                <div className="p-8 flex items-center gap-4 border-b border-zinc-200 dark:border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                                        <Shield className="w-5 h-5 fill-white" />
                                    </div>
                                    <span className="text-lg font-black tracking-tight">Engine<span className="text-purple-600">Admin</span></span>
                                </div>
                                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                                <button
                                                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${isActive ? "bg-purple-600/10 text-purple-600" : "text-zinc-400 font-medium"}`}
                                                >
                                                    <item.icon className="w-5 h-5 shrink-0" />
                                                    <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                                                </button>
                                            </Link>
                                        );
                                    })}
                                    <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-white/5">
                                        <Link href="/dashboard">
                                            <button className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-zinc-400">
                                                <ArrowLeft className="w-5 h-5 shrink-0" />
                                                <span className="font-bold text-xs uppercase tracking-widest">Back to Dashboard</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full max-w-[100vw] overflow-x-hidden">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-[1600px] mx-auto w-full"
                    >
                        {children}
                    </motion.div>
                </main>

                <footer className="p-6 sm:p-8 lg:p-12 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 gap-4">
                    <p>© 2026 EngineAdmin Sovereign</p>
                    <div className="flex gap-6">
                        <span>Platform v2.4.1</span>
                    </div>
                </footer>
            </motion.div>

            <PushNotificationManager />
        </div>
    );
}
