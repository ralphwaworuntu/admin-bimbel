"use client";

import { runOracleAnalysisAction, simulateOracleDataAction } from "@/app/admin/actions";
import { RefreshCw, Zap } from "lucide-react";
import { useState } from "react";

export function OracleControls() {
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalysis = async () => {
        setIsLoading(true);
        await runOracleAnalysisAction();
        setIsLoading(false);
    };

    const handleSimulation = async () => {
        setIsLoading(true);
        await simulateOracleDataAction();
        setIsLoading(false);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={handleSimulation}
                disabled={isLoading}
                className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all disabled:opacity-50"
            >
                Simulate Data
            </button>
            <button
                onClick={handleAnalysis}
                disabled={isLoading}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-2xl shadow-lg shadow-purple-600/20 flex items-center gap-3 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                    {isLoading ? "Processing..." : "Run Analysis"}
                </span>
            </button>
        </div>
    );
}
