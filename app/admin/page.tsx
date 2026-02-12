
export default function AdminPage() {
    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Platform Overview</h1>
                <p className="text-slate-500">Welcome back, Administrator. Here's what's happening on the platform.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Users</p>
                    <p className="text-3xl font-bold">128</p>
                    <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                        +12% this month
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Active Sites</p>
                    <p className="text-3xl font-bold">42</p>
                    <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                        +5 this week
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">$12,450</p>
                    <div className="mt-2 text-xs text-green-500 flex items-center gap-1">
                        +8% vs last month
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold">Recent Deployments</h3>
                </div>
                <div className="p-6 text-center text-slate-500 italic">
                    No recent deployments found.
                </div>
            </div>
        </div>
    );
}
