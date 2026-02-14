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
    CreditCard
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

function useWindowSize() {
    const [size, setSize] = useState<[number, number]>([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize, { passive: true });
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

interface AdminShellProps {
    children: React.ReactNode;
    session: any;
}

export function AdminShell({ children, session }: AdminShellProps) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isZenMode, setIsZenMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [width] = useWindowSize();
    const pathname = usePathname();
    const router = useRouter();
    const { locale, setLocale } = useTranslation();

    const isMobile = width < 1024;

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/admin" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: Globe, label: "All Sites", href: "/admin/sites" },
        { icon: LayoutDashboard, label: "Templates", href: "/admin/templates" },
        { icon: Megaphone, label: "Broadcast", href: "/admin/broadcast" },
        { icon: Brain, label: "Oracle", href: "/admin/oracle" },
        { icon: CreditCard, label: "Revenue", href: "/admin/billing" },
        { icon: Clock, label: "Audit Log", href: "/admin/audit" },
        { icon: Activity, label: "Analytics", href: "/admin/analytics" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname, isMobile]);

    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    };

    return (
        <div className={`flex min-h-screen font-sans selection:bg-primary-brand/20 transition-colors duration-700 ${isDarkMode ? 'dark bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* Admin Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isZenMode ? "80px" : "320px",
                    x: isMobile ? -320 : 0,
                    opacity: isMobile ? 0 : 1
                }}
                transition={SPRING_TRANSITION}
                className={`fixed inset-y-0 left-0 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 z-50 overflow-hidden select-none`}
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
                                    className={`w-full group flex items-center ${isZenMode ? "justify-center" : "justify-start gap-4"} p-4 rounded-2xl transition-all mb-1 relative overflow-hidden ${isActive ? "bg-purple-600/10 text-purple-600 shadow-sm" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
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

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                        <Link href="/dashboard">
                            <button
                                className={`w-full group flex items-center ${isZenMode ? "justify-center" : "justify-start gap-4"} p-4 rounded-2xl transition-all text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800`}
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

                <div className="p-6 space-y-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
                    <button
                        onClick={() => setIsZenMode(!isZenMode)}
                        className={`w-full h-12 rounded-xl flex items-center justify-center gap-3 text-slate-400 hover:text-purple-600 transition-all group overflow-hidden ${isZenMode ? "bg-purple-600/10 text-purple-600" : "bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"}`}
                    >
                        {isZenMode ? <Maximize2 className="w-4 h-4" /> : <Target className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        {!isZenMode && <span className="text-[10px] font-black uppercase tracking-widest">Zen Mode</span>}
                    </button>

                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 text-slate-400 hover:text-purple-600 transition-all group overflow-hidden"
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
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Access</p>
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
                    paddingTop: isMobile ? 80 : 0
                }}
                transition={SPRING_TRANSITION}
                className="flex-1 flex flex-col min-h-screen relative"
            >
                {/* Header */}
                <header className="h-24 px-8 lg:px-12 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-6">
                        {isMobile && (
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        )}
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 hidden sm:block">
                            Platform Control Center
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-100 dark:border-slate-800 mr-1">
                            <div className="text-right">
                                <p className="text-xs font-black">{session?.user?.name || "Admin"}</p>
                                <p className="text-[10px] font-bold text-slate-400">Superuser</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600 font-black text-sm">
                                {(session?.user?.name || "A").charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobile && isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -width }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -width }}
                            transition={SPRING_TRANSITION}
                            className="fixed inset-0 top-20 bg-white dark:bg-slate-950 z-[55] p-6 lg:p-8 overflow-y-auto"
                        >
                            <div className="space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link key={item.label} href={item.href}>
                                            <button
                                                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all ${isActive ? "bg-purple-600/10 text-purple-600" : "text-slate-400"}`}
                                            >
                                                <item.icon className="w-6 h-6 shrink-0" />
                                                <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
                                            </button>
                                        </Link>
                                    );
                                })}
                                <Link href="/dashboard">
                                    <button className="w-full flex items-center gap-4 p-5 rounded-2xl transition-all text-slate-400">
                                        <ArrowLeft className="w-6 h-6 shrink-0" />
                                        <span className="font-black text-sm uppercase tracking-widest">Back to Dashboard</span>
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <main className="flex-1 p-6 sm:p-10 lg:p-12">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-[1600px] mx-auto"
                    >
                        {children}
                    </motion.div>
                </main>

                <footer className="p-8 lg:p-12 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    <p>© 2026 EngineAdmin Sovereign</p>
                    <div className="flex gap-6">
                        <span>Platform v2.4.0</span>
                    </div>
                </footer>
            </motion.div>

            <PushNotificationManager />
        </div>
    );
}
