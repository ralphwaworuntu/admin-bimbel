"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeConfig } from "@/types/theme";

interface ThemeContextType {
    theme: ThemeConfig;
    setTheme: (theme: ThemeConfig) => void;
    applyTheme: (theme: ThemeConfig) => void;
}

const defaultTheme: ThemeConfig = {
    name: "default",
    colors: {
        background: "0 0% 100%",
        foreground: "222.2 84% 4.9%",
        primary: "221.2 83.2% 53.3%",
        primaryForeground: "210 40% 98%",
        secondary: "210 40% 96.1%",
        secondaryForeground: "222.2 47.4% 11.2%",
        accent: "210 40% 96.1%",
        accentForeground: "222.2 47.4% 11.2%",
        muted: "210 40% 96.1%",
        mutedForeground: "215.4 16.3% 46.9%",
        card: "0 0% 100%",
        cardForeground: "222.2 84% 4.9%",
        border: "214.3 31.8% 91.4%",
        input: "214.3 31.8% 91.4%",
        ring: "221.2 83.2% 53.3%",
    },
    radius: 0.5,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

    const applyTheme = (newTheme: ThemeConfig) => {
        const root = document.documentElement;

        // Set colors
        Object.entries(newTheme.colors).forEach(([key, value]) => {
            // Convert camelCase to kebab-case for CSS variables
            const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
            root.style.setProperty(cssVar, value);
        });

        // Set radius
        root.style.setProperty("--radius", `${newTheme.radius}rem`);
    };

    // Apply default theme on mount
    useEffect(() => {
        applyTheme(theme);
    }, []);

    // Re-apply when theme state changes
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, applyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
