import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, LayoutDashboard, Settings, Globe, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    // Strict Role Check - Allow 'admin' only
    // Note: To test this, you must update your user role in the database to 'admin'
    const userRole = (session.user as any).role;
    if (userRole !== "admin") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                        WaaS<span className="text-primary-brand">Admin</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <Users className="w-4 h-4" />
                        Users
                    </Link>
                    <Link href="/admin/sites" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <Globe className="w-4 h-4" />
                        All Sites
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary-brand/10 flex items-center justify-center text-primary-brand font-bold text-xs">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{session.user.name}</p>
                            <p className="text-xs text-slate-500 truncate">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
