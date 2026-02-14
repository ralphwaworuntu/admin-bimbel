"use server";

import { subscribeUser, cancelSubscription } from "@/lib/billing";
import { revalidatePath } from "next/cache";

export async function manageSubscriptionAction(userId: string, tierId: string, action: 'upgrade' | 'cancel') {
    try {
        if (action === 'cancel') {
            await cancelSubscription(userId);
        } else {
            await subscribeUser(userId, tierId);
        }
        revalidatePath("/dashboard/billing");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
