
import { upsertSubscription, createInvoice, getUserSubscription } from "@/lib/db";

export const PLANS = {
    free: {
        id: "free",
        name: "Free Tier",
        price: 0,
        limits: { sites: 1, customDomain: false }
    },
    pro: {
        id: "pro",
        name: "Pro Sovereign",
        price: 2900, // in cents
        limits: { sites: 5, customDomain: true }
    },
    enterprise: {
        id: "enterprise",
        name: "Enterprise Matrix",
        price: 9900, // in cents
        limits: { sites: 999, customDomain: true }
    }
};

export async function subscribeUser(userId: string, tierId: string) {
    // 1. Validate Tier
    const plan = PLANS[tierId as keyof typeof PLANS];
    if (!plan) throw new Error("Invalid plan tier");

    // 2. Simulate Stripe processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // 3. Update DB
    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setMonth(now.getMonth() + 1);

    await upsertSubscription({
        userId,
        tier: tierId,
        status: "active",
        currentPeriodEnd: nextMonth,
        stripeCustomerId: `cus_${Math.random().toString(36).substr(2, 9)}`,
        stripeSubscriptionId: `sub_${Math.random().toString(36).substr(2, 9)}`,
    });

    // 4. Generate Invoice (if paid)
    if (plan.price > 0) {
        await createInvoice({
            userId,
            amount: plan.price,
            status: "paid",
            pdfUrl: "#", // Mock PDF
        });
    }

    return { success: true, message: `Successfully upgraded to ${plan.name}` };
}

export async function cancelSubscription(userId: string) {
    // 1. Get current sub
    const sub = await getUserSubscription(userId);
    if (!sub) throw new Error("No active subscription");

    // 2. Update to cancel at period end
    await upsertSubscription({
        userId,
        tier: sub.tier || "free",
        status: "canceled",
        currentPeriodEnd: sub.currentPeriodEnd || new Date(),
    });

    return { success: true, message: "Subscription canceled. Access remains until period end." };
}

export async function getBillingPortalLink(userId: string) {
    // Return a mock link for now
    return "/dashboard/billing";
}
