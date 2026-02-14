
import { getUserSubscription, getUserInvoices } from "@/lib/db";
import { PLANS } from "@/lib/billing";
import { auth } from "@/lib/auth"; // Assuming auth helper
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";
import { InvoiceList } from "@/components/dashboard/invoice-list";

export default async function BillingPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/login");

    const subscription = await getUserSubscription(session.user.id);
    const invoices = await getUserInvoices(session.user.id);

    const currentTier = subscription?.status === 'active' ? subscription.tier : 'free';

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <header>
                <h1 className="text-3xl font-black tracking-tight mb-2">Sovereign Billing</h1>
                <p className="text-slate-500 font-medium">Manage your subscription and invoices</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.values(PLANS).map((plan) => (
                    <SubscriptionCard
                        key={plan.id}
                        plan={plan}
                        currentTier={currentTier || 'free'}
                        userId={session.user.id}
                    />
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 lg:p-12">
                <h2 className="text-xl font-black mb-6">Invoice History</h2>
                <InvoiceList invoices={invoices} />
            </div>
        </div>
    );
}
