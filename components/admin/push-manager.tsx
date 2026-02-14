"use client";

import { useState, useEffect } from "react";
import { Bell, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PushManager() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
            // Show prompt if not yet granted or denied
            if (Notification.permission === 'default') {
                setTimeout(() => setIsVisible(true), 2000);
            }
        }
    }, []);

    const requestPermission = async () => {
        if (!('Notification' in window)) return;

        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === 'granted') {
            setIsVisible(false);
            // Optional: Send a test notification via SW
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                // Logic to subscribe to push service would go here
                console.log("Notifications granted");
            }
        }
    };

    if (permission === 'granted' || permission === 'denied' && !isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-2xl shadow-purple-900/20"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-500 shrink-0">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-sm mb-1">Enable Sovereign Alerts?</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                Get instant notifications for critical system events, security breaches, and revenue milestones.
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={requestPermission}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-colors"
                                >
                                    Enable
                                </button>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="px-4 py-2 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-colors"
                                >
                                    Later
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-slate-600 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
