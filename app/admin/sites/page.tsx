import { getAllSites } from "@/lib/db";
import { deleteSiteAction } from "../actions";
import { Trash2, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";

export default async function AdminSitesPage() {
    const sites = await getAllSites();

    return (
        <div className="p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Sites Directory</h1>
                    <p className="text-slate-500">Manage all sites created on the platform.</p>
                </div>
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium">
                    Total: {sites.length}
                </div>
            </header>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Site Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Subdomain</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Created</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {sites.map((site) => (
                            <tr key={site.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{site.name}</p>
                                            <p className="text-xs text-slate-500">ID: {site.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                                    {site.subdomain}.waas.site
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 capitalize">
                                        {site.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {site.createdAt ? new Date(site.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/dashboard/sites/${site.id}`}
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-primary-brand transition-colors"
                                            title="View Details"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>

                                        <form action={deleteSiteAction.bind(null, site.id)}>
                                            <button
                                                title="Force Delete Site"
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {sites.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No sites found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
