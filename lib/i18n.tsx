"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Locale = "id" | "en";

// Translation dictionary — ID (Indonesian) and EN (English)
const translations: Record<Locale, Record<string, string>> = {
    id: {
        // Navigation
        "nav.home": "Beranda",
        "nav.wizard": "Wizard",
        "nav.templates": "Template",
        "nav.dashboard": "Dasbor",
        "nav.settings": "Pengaturan",
        "nav.community": "Komunitas",
        "nav.enterprise": "Enterprise",
        "nav.login": "Masuk",
        "nav.register": "Daftar",
        "nav.signOut": "Keluar",

        // Wizard
        "wizard.title": "Wizard Pembuat Situs",
        "wizard.step1": "Identitas Brand",
        "wizard.step2": "Arsitektur",
        "wizard.step3": "Konten",
        "wizard.step4": "Fungsional",
        "wizard.step5": "SEO",
        "wizard.step6": "Pratinjau & Deploy",
        "wizard.next": "Selanjutnya",
        "wizard.prev": "Sebelumnya",
        "wizard.generate": "Generate Situs",
        "wizard.deploy": "Deploy Sekarang",

        // Identity Form
        "identity.brandName": "Nama Brand",
        "identity.brandName.placeholder": "Masukkan nama brand",
        "identity.region": "Region",
        "identity.audience": "Target Audiens",
        "identity.colors": "Palet Warna",
        "identity.typography": "Tipografi",
        "identity.voice": "Suara Brand",
        "identity.logo": "Logo",
        "identity.contrastScore": "Skor Kontras",

        // Content Form
        "content.hero.title": "Judul Hero",
        "content.hero.subtitle": "Sub Judul Hero",
        "content.hero.cta": "Teks Tombol CTA",
        "content.testimonials": "Testimoni",
        "content.about": "Tentang",
        "content.services": "Layanan",

        // Functional Form
        "functional.whatsapp": "Nomor WhatsApp",
        "functional.email": "Email Bisnis",
        "functional.address": "Alamat",
        "functional.hours": "Jam Operasional",
        "functional.socials": "Media Sosial",

        // SEO Form
        "seo.title": "Judul SEO",
        "seo.description": "Deskripsi SEO",
        "seo.keywords": "Kata Kunci",
        "seo.autopilot": "Auto-pilot SEO",

        // Dashboard
        "dashboard.overview": "Ringkasan",
        "dashboard.deployments": "Deployment",
        "dashboard.analytics": "Analitik",
        "dashboard.customers": "Pelanggan",
        "dashboard.guardian": "Guardian",
        "dashboard.economics": "Ekonomi",
        "dashboard.settings": "Pengaturan",
        "dashboard.buildSite": "Buat Situs",
        "dashboard.totalSites": "Total Situs",
        "dashboard.weeklyReach": "Jangkauan Mingguan",
        "dashboard.uptime": "Waktu Aktif",
        "dashboard.performance": "Performa",
        "dashboard.quickActions": "Aksi Cepat",
        "dashboard.recentActivity": "Aktivitas Terakhir",
        "dashboard.zenMode": "Mode Zen",
        "dashboard.toggleVision": "Ganti Tampilan",

        // Auth
        "auth.welcomeBack": "Selamat Datang",
        "auth.signIn": "Masuk",
        "auth.signInDesc": "Masuk ke ekosistem sovereign Anda",
        "auth.createAccount": "Buat Akun",
        "auth.createAccountDesc": "Mulai bangun ekosistem digital Anda",
        "auth.email": "Alamat Email",
        "auth.password": "Kata Sandi",
        "auth.fullName": "Nama Lengkap",
        "auth.noAccount": "Belum punya akun?",
        "auth.hasAccount": "Sudah punya akun?",

        // Templates
        "templates.title": "Pilih Fondasi Anda",
        "templates.subtitle": "Template handmade untuk setiap industri",
        "templates.search": "Cari template...",
        "templates.preview": "Pratinjau",
        "templates.use": "Gunakan",
        "templates.useThis": "Gunakan Template Ini",

        // Brand Report
        "report.title": "Laporan Brand Sovereign",
        "report.exportJson": "Ekspor JSON",
        "report.exportHtml": "Ekspor HTML",

        // General
        "general.loading": "Memuat...",
        "general.save": "Simpan",
        "general.cancel": "Batal",
        "general.delete": "Hapus",
        "general.edit": "Edit",
        "general.search": "Cari",
        "general.language": "Bahasa",
        "general.poweredBy": "Didukung oleh InstantEngine WaaS Builder",
    },

    en: {
        // Navigation
        "nav.home": "Home",
        "nav.wizard": "Wizard",
        "nav.templates": "Templates",
        "nav.dashboard": "Dashboard",
        "nav.settings": "Settings",
        "nav.community": "Community",
        "nav.enterprise": "Enterprise",
        "nav.login": "Sign In",
        "nav.register": "Register",
        "nav.signOut": "Sign Out",

        // Wizard
        "wizard.title": "Site Builder Wizard",
        "wizard.step1": "Brand Identity",
        "wizard.step2": "Architecture",
        "wizard.step3": "Content",
        "wizard.step4": "Functional",
        "wizard.step5": "SEO",
        "wizard.step6": "Preview & Deploy",
        "wizard.next": "Next",
        "wizard.prev": "Previous",
        "wizard.generate": "Generate Site",
        "wizard.deploy": "Deploy Now",

        // Identity Form
        "identity.brandName": "Brand Name",
        "identity.brandName.placeholder": "Enter brand name",
        "identity.region": "Region",
        "identity.audience": "Target Audience",
        "identity.colors": "Color Palette",
        "identity.typography": "Typography",
        "identity.voice": "Brand Voice",
        "identity.logo": "Logo",
        "identity.contrastScore": "Contrast Score",

        // Content Form
        "content.hero.title": "Hero Title",
        "content.hero.subtitle": "Hero Subtitle",
        "content.hero.cta": "CTA Button Text",
        "content.testimonials": "Testimonials",
        "content.about": "About",
        "content.services": "Services",

        // Functional Form
        "functional.whatsapp": "WhatsApp Number",
        "functional.email": "Business Email",
        "functional.address": "Address",
        "functional.hours": "Business Hours",
        "functional.socials": "Social Media",

        // SEO Form
        "seo.title": "SEO Title",
        "seo.description": "SEO Description",
        "seo.keywords": "Keywords",
        "seo.autopilot": "SEO Auto-pilot",

        // Dashboard
        "dashboard.overview": "Overview",
        "dashboard.deployments": "Deployments",
        "dashboard.analytics": "Analytics",
        "dashboard.customers": "Customers",
        "dashboard.guardian": "Guardian",
        "dashboard.economics": "Economics",
        "dashboard.settings": "Settings",
        "dashboard.buildSite": "Build Site",
        "dashboard.totalSites": "Total Sites",
        "dashboard.weeklyReach": "Weekly Reach",
        "dashboard.uptime": "Uptime",
        "dashboard.performance": "Performance",
        "dashboard.quickActions": "Quick Actions",
        "dashboard.recentActivity": "Recent Activity",
        "dashboard.zenMode": "Zen Mode",
        "dashboard.toggleVision": "Toggle Vision",

        // Auth
        "auth.welcomeBack": "Welcome Back",
        "auth.signIn": "Sign In",
        "auth.signInDesc": "Sign in to your sovereign ecosystem",
        "auth.createAccount": "Create Account",
        "auth.createAccountDesc": "Start building your sovereign ecosystem",
        "auth.email": "Email Address",
        "auth.password": "Password",
        "auth.fullName": "Full Name",
        "auth.noAccount": "Don't have an account?",
        "auth.hasAccount": "Already have an account?",

        // Templates
        "templates.title": "Choose Your Foundation",
        "templates.subtitle": "Hand-crafted templates for every industry",
        "templates.search": "Search templates...",
        "templates.preview": "Preview",
        "templates.use": "Use",
        "templates.useThis": "Use This Template",

        // Brand Report
        "report.title": "Sovereign Brand Report",
        "report.exportJson": "Export JSON",
        "report.exportHtml": "Export HTML",

        // General
        "general.loading": "Loading...",
        "general.save": "Save",
        "general.cancel": "Cancel",
        "general.delete": "Delete",
        "general.edit": "Edit",
        "general.search": "Search",
        "general.language": "Language",
        "general.poweredBy": "Powered by InstantEngine WaaS Builder",
    },
};

// Context
interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("en");

    // Load saved locale
    useEffect(() => {
        const saved = localStorage.getItem("waas_locale") as Locale;
        if (saved && (saved === "id" || saved === "en")) {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem("waas_locale", newLocale);
    }, []);

    const t = useCallback((key: string): string => {
        return translations[locale][key] || key;
    }, [locale]);

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error("useTranslation must be used within an I18nProvider");
    }
    return context;
}

// Standalone helper for non-component usage
export function getTranslation(locale: Locale, key: string): string {
    return translations[locale][key] || key;
}
