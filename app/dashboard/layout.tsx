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
    TrendingUp,
    Target,
    Maximize2,
    Menu,
    X,
    LogOut,
    CreditCard,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { NotificationPanel } from "@/components/notifications-panel";
import { CommandHUD } from "@/components/dashboard/command-hud";
import { ProphecyEngine } from "@/components/dashboard/prophecy-engine";
import { useSession, signOut } from "@/lib/auth-client";
import { useTranslation } from "@/lib/i18n";

// Shared Transition Orbit for perfect synchronization
const SPRING_TRANSITION = {
    type: "spring" as const,
    stiffness: 260,
    damping: 30,
    mass: 1,
    restDelta: 0.001
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isZenMode, setIsZenMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const { locale, setLocale } = useTranslation();

    // Auth guard — redirect to login if not authenticated
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
        { icon: Globe, label: "Deployments", href: "/dashboard/deployments" },
        { icon: Activity, label: "Analytics", href: "/dashboard/analytics" },
        { icon: Users, label: "Customers", href: "/dashboard/customers" },
        { icon: Shield, label: "Guardian", href: "/dashboard/guardian" },
        { icon: TrendingUp, label: "Economics", href: "/dashboard/economics" },
        { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ];

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    };

    return (
        <div className={`flex min-h-screen font-sans selection:bg-primary-brand/20 transition-colors duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
            <CommandHUD />
            <ProphecyEngine />

            {/* Sidebar Navigation - Fixed on Desktop, Adaptive Width via CSS */}
            <motion.aside
                initial={false}
                animate={{
                    width: isZenMode ? "80px" : "320px",
                }}
                transition={SPRING_TRANSITION}
                className={`hidden lg:flex fixed inset-y-0 left-0 border-r border-zinc-200 dark:border-zinc-800 flex-col bg-white dark:bg-zinc-900 z-50 overflow-hidden select-none`}
            >
                <div className={`p-8 flex items-center ${isZenMode ? "justify-center" : "gap-3"} shrink-0 h-28 transition-all`}>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-2xl bg-primary-brand flex items-center justify-center text-white shadow-[0_0_25px_rgba(129,6,209,0.3)] shrink-0"
                    >
                        <Zap className="w-6 h-6 fill-white" />
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
                                Engine<span className="text-primary-brand font-black">AI</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-1 px-6 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.label} href={item.href}>
                                <button
                                    className={`w-full group flex items-center ${isZenMode ? "justify-center" : "justify-start gap-4"} p-4 rounded-2xl transition-all mb-1 relative overflow-hidden ${isActive ? "bg-primary-brand/10 text-primary-brand shadow-sm" : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
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
                </nav>

                <div className="p-6 space-y-3 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                    <button
                        onClick={() => setIsZenMode(!isZenMode)}
                        className={`w-full h-12 rounded-xl flex items-center justify-center gap-3 text-zinc-400 hover:text-primary-brand transition-all group overflow-hidden ${isZenMode ? "bg-primary-brand/10 text-primary-brand" : "bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700"}`}
                    >
                        <div className="shrink-0">
                            {isZenMode ? <Maximize2 className="w-4 h-4" /> : <Target className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        </div>
                        <AnimatePresence initial={false}>
                            {!isZenMode && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={SPRING_TRANSITION}
                                    className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                                >
                                    Zen Mode
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center gap-3 text-zinc-400 hover:text-primary-brand transition-all group overflow-hidden"
                    >
                        <div className="shrink-0">
                            {isDarkMode ? <Sun className="w-4 h-4 group-hover:rotate-90 transition-transform" /> : <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform" />}
                        </div>
                        <AnimatePresence initial={false}>
                            {!isZenMode && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={SPRING_TRANSITION}
                                    className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                                >
                                    Toggle Vision
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        onClick={() => setLocale(locale === "en" ? "id" : "en")}
                        className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center gap-3 text-zinc-400 hover:text-primary-brand transition-all group overflow-hidden"
                    >
                        <div className="shrink-0">
                            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </div>
                        <AnimatePresence initial={false}>
                            {!isZenMode && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={SPRING_TRANSITION}
                                    className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                                >
                                    {locale === "en" ? "Bahasa ID" : "English"}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <AnimatePresence initial={false}>
                        {!isZenMode && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={SPRING_TRANSITION}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 overflow-hidden"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary-brand/10 flex items-center justify-center text-primary-brand shrink-0">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div className="whitespace-nowrap">
                                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Status</p>
                                    <p className="text-xs font-black">Elite</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>

            {/* Mobile / Tablet Header */}
            <div className={`fixed top-0 left-0 right-0 h-20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 z-[60] flex items-center justify-between px-6 lg:hidden`}>
                <Zap className="w-6 h-6 text-primary-brand fill-primary-brand" />
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsNotifOpen(true)}
                        className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-500"
                    >
                        <Bell className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={SPRING_TRANSITION}
                        className="fixed inset-0 top-20 bg-white dark:bg-zinc-950 z-[55] p-6 lg:p-8 overflow-y-auto lg:hidden"
                    >
                        <div className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.label} href={item.href}>
                                        <button
                                            className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all ${isActive ? "bg-primary-brand/10 text-primary-brand" : "text-zinc-400"}`}
                                        >
                                            <item.icon className="w-6 h-6 shrink-0" />
                                            <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
                                        </button>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-1 text-zinc-400"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                <span className="text-[9px] font-black uppercase tracking-widest">Vision</span>
                            </button>
                            <Link href="/wizard" className="h-16 rounded-2xl bg-primary-brand text-white flex flex-col items-center justify-center gap-1 shadow-lg shadow-primary-brand/20">
                                <Plus className="w-5 h-5" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Build Site</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area - Responsive CSS Padding */}
            <div
                className={`flex-1 flex flex-col min-h-screen relative transition-all duration-300 ${isZenMode ? 'lg:pl-[80px]' : 'lg:pl-[320px]'} pt-20 lg:pt-0`}
            >
                {/* Desktop Top Header - Intelligent Visibility */}
                <header className="hidden lg:flex h-24 px-8 lg:px-12 items-center justify-between bg-white/50 dark:bg-zinc-900/50 backdrop-blur-3xl sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-6 flex-1 max-w-xl">
                        <AnimatePresence mode="wait" initial={false}>
                            {!isZenMode ? (
                                <motion.div
                                    key="search"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={SPRING_TRANSITION}
                                    className="relative w-full group cursor-pointer"
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-command-hud'))}
                                >
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-hover:text-primary-brand transition-colors" />
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="Command Center (Cmd+K)"
                                        className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary-brand/20 transition-all outline-none cursor-pointer group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700"
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="zen"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={SPRING_TRANSITION}
                                    className="flex items-center gap-4"
                                >
                                    <Target className="w-4 h-4 text-primary-brand animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Deep Focus Orchestration</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsNotifOpen(true)}
                            className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-primary-brand transition-all relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-brand rounded-full border-2 border-white dark:border-zinc-800"></span>
                        </button>
                        <div className="h-6 w-px bg-zinc-100 dark:bg-zinc-800 mx-1"></div>
                        <div className="hidden xl:flex items-center gap-3 pr-4 border-r border-zinc-200 dark:border-zinc-800 mr-1 group/profile cursor-pointer relative">
                            {!isZenMode && (
                                <div className="text-right">
                                    <p className="text-xs font-black group-hover/profile:text-primary-brand transition-colors">{session?.user?.name || "User"}</p>
                                    <p className="text-[10px] font-bold text-zinc-400">{session?.user?.email || ""}</p>
                                </div>
                            )}
                            <div className="w-10 h-10 rounded-xl border border-zinc-100 dark:border-zinc-700 overflow-hidden shrink-0 group-hover/profile:ring-2 group-hover/profile:ring-primary-brand/20 transition-all bg-primary-brand/10 flex items-center justify-center">
                                <span className="text-sm font-black text-primary-brand">{(session?.user?.name || "U").charAt(0).toUpperCase()}</span>
                            </div>

                            {/* Profile Dropdown */}
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:translate-y-0 group-hover/profile:pointer-events-auto transition-all z-50 p-2">
                                <Link href="/dashboard/settings">
                                    <div className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                        <Users className="w-3.5 h-3.5" /> Profile Settings
                                    </div>
                                </Link>
                                <button
                                    onClick={async () => {
                                        await signOut();
                                        router.push("/login");
                                    }}
                                    className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500"
                                >
                                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                                </button>
                            </div>
                        </div>
                        <Link href="/wizard">
                            <button className="bg-primary-brand text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-xl shadow-primary-brand/20 hover:scale-105 active:scale-95 transition-all">
                                <Plus className="w-4 h-4" /> Build
                            </button>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden p-6 sm:p-10 lg:p-12 xl:p-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname + (isZenMode ? '-zen' : '')}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-[1600px] mx-auto"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                <footer className="p-8 lg:p-12 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 gap-6 text-center sm:text-left overflow-hidden">
                    <p className="truncate flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        © 2026 EngineAI Sovereign Infrastructure
                    </p>
                    <div className="flex items-center gap-6 lg:gap-8 shrink-0 relative">
                        <Link href="/dashboard/settings/security">
                            <button className="hover:text-primary-brand transition-colors relative group/footer">
                                Security
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-zinc-900 text-white rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/footer:opacity-100 group-hover/footer:translate-y-0 transition-all normal-case tracking-normal text-left">
                                    <p className="font-black text-[9px] uppercase tracking-widest mb-2 text-primary-brand">Vault Status</p>
                                    <p className="text-[10px] font-medium leading-relaxed">Infrastructure is protected by Sovereign Guardian (L7 Protection). All nodes synchronized.</p>
                                </div>
                            </button>
                        </Link>
                        <Link href="/privacy">
                            <button className="hover:text-primary-brand transition-colors">Privacy</button>
                        </Link>
                        <Link href="/nexus">
                            <button className="hover:text-primary-brand transition-colors">Nexus</button>
                        </Link>
                    </div>
                </footer>
            </div>

            <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>
    );
}
