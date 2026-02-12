"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Zap, Shield, Globe, Rocket, ArrowRight, Layout, Cpu, Gauge, Star,
  Filter, Search, ChevronDown, CheckCircle2, Globe2, Network, Radio,
  Layers, Lock, Database, Server, Smartphone, Monitor, Code, Sparkles,
  ArrowsUpFromLine
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import React from "react";
import { templates } from "@/lib/mock-data";
const ENVATO_GREEN = "#82B440";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [demoBrandName, setDemoBrandName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Stats for real-time ticker
  const [tickerIndex, setTickerIndex] = useState(0);
  const launches = [
    { brand: "Zenith Flow", location: "Singapore", time: "2m ago" },
    { brand: "Solaris Labs", location: "San Francisco", time: "5m ago" },
    { brand: "Vertex AI", location: "London", time: "8m ago" },
    { brand: "Prism Dev", location: "Tokyo", time: "12m ago" },
    { brand: "Nova Soft", location: "Berlin", time: "15m ago" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % launches.length);
    }, 4000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter((t: any) => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? t.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: "umkm", label: "Local Shop", icon: <Layout className="w-4 h-4" /> },
    { id: "business", label: "Corporate", icon: <Server className="w-4 h-4" /> },
    { id: "creative", label: "Creative", icon: <Layers className="w-4 h-4" /> },
    { id: "retail", label: "Real Estate", icon: <Database className="w-4 h-4" /> },
  ];

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white relative font-display selection:bg-primary-brand/30 selection:text-primary-brand overflow-x-hidden">
      {/* Texture Layer */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Real-time Ticker */}
      <div className="fixed bottom-10 left-10 z-[100] hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={tickerIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Global Deployment</p>
              <p className="text-xs font-black tracking-tight">{launches[tickerIndex].brand} <span className="text-slate-400 font-medium whitespace-nowrap">just launched in</span> {launches[tickerIndex].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-brand/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Top Navigation Bar (ThemeForest Style) */}
      <nav className={`fixed top-0 left-0 w-full h-16 z-[100] px-6 lg:px-12 flex items-center justify-between transition-all duration-300 border-b ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200 dark:border-slate-800' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#82B440] p-1.5 rounded-md">
              <Zap className="text-white w-5 h-5 fill-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
              Instant<span className="text-[#82B440]">Engine</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {["Market", "Forums", "Licenses", "Help"].map((item) => (
              <Link key={item} href={item === "Market" ? "#marketplace" : "#"} className="text-xs font-semibold text-slate-500 hover:text-[#82B440] transition-colors uppercase tracking-wider">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Sign In</Link>
          <Link href="/wizard">
            <button className="bg-[#82B440] hover:bg-[#719d37] text-white px-5 py-2 rounded-md text-xs font-bold transition-all shadow-sm">
              Start Building
            </button>
          </Link>
        </div>
      </nav>

      <main className="pt-16 max-w-full mx-auto relative z-10">
        {/* Section 1: Hero & Search (ThemeForest Style) */}
        <section className="bg-slate-900 py-24 relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
            <h1 className="text-4xl lg:text-6xl font-light text-white leading-tight">
              Professional Website Templates & <br />
              <span className="font-bold text-[#82B440]">AI Infrastructures.</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium">
              Join 50,000+ creators building on the world's most advanced deployment engine.
            </p>

            <div className="mt-12 group">
              <div className={`relative flex items-center bg-white rounded-md shadow-2xl transition-all ${isSearchFocused ? 'ring-4 ring-[#82B440]/20' : ''}`}>
                <div className="pl-6 pointer-events-none">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Portfolio Template, SaaS Engine..."
                  className="w-full h-16 bg-transparent border-none focus:ring-0 text-lg px-6 font-medium text-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button className="h-full bg-[#82B440] hover:bg-[#719d37] text-white px-10 py-5 rounded-r-md font-bold transition-colors">
                  Search
                </button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Popular:</span>
                {["WordPress", "HTML", "Shopify", "React", "Agency"].map(tag => (
                  <button key={tag} className="hover:text-white transition-colors">{tag}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.5: Category Grid (ThemeForest Icons) */}
        <section className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { id: "wordpress", label: "WordPress", icon: <Globe2 /> },
                { id: "html", label: "HTML", icon: <Code /> },
                { id: "creative", label: "Marketing", icon: <Sparkles /> },
                { id: "business", label: "CMS", icon: <Server /> },
                { id: "retail", label: "eCommerce", icon: <Database /> },
                { id: "ui", label: "UI Templates", icon: <Smartphone /> },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`flex flex-col items-center gap-4 p-6 rounded-xl transition-all border ${selectedCategory === cat.id ? 'bg-[#82B440]/5 border-[#82B440] text-[#82B440]' : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 group'}`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center transition-transform group-hover:-translate-y-1`}>
                    {typeof cat.icon === 'string' ? cat.icon : React.cloneElement(cat.icon as any, { className: "w-8 h-8" })}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Weekly Bestsellers (Marketplace Style) */}
        <section id="marketplace" className="py-24 bg-slate-50 dark:bg-slate-900/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-2xl text-left">
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mb-4">Weekly Bestsellers</h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed font-display">
                  The most popular items from the last week, verified for quality and performance.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 bg-[#82B440] text-white rounded-md text-xs font-bold uppercase tracking-widest shadow-sm hover:brightness-110">All Items</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
              {filteredTemplates.map((template: any, i: number) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[1.5/1] bg-slate-100 dark:bg-slate-900 relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
                    <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button className="bg-white text-slate-950 px-6 py-3 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-[#82B440] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">Live Preview</button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-[#82B440] transition-colors truncate">
                          {template.name}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">by <span className="text-slate-600 dark:text-slate-300">Genesis Labs</span> in {template.category}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-900 pt-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3 h-3 ${s <= Math.round(template.rating || 0) ? 'fill-amber-500' : 'fill-slate-200 dark:fill-slate-800'}`} />
                            ))}
                            <span className="text-[10px] font-black text-slate-300 ml-1">({template.rating})</span>
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-wider">{((template.id.length * 13) % 400) + 100} Sales</span>
                        </div>
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">${template.price || 49}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Speed Battle */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30 rounded-[4rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-brand mb-6">Unrivaled Velocity</h2>
            <p className="text-5xl font-black tracking-tighter">Instant is the new standard.</p>
          </div>

          <div className="max-w-4xl mx-auto px-6 space-y-10">
            <div className="relative p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Legacy CMS Hosting</span>
                <span className="text-sm font-black text-red-500">8.4s TTFB</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "80%" }}
                  transition={{ duration: 8.4, ease: "linear" }}
                  className="h-full bg-slate-400"
                />
              </div>
              <div className="mt-6 flex gap-8 opacity-40">
                <div className="flex items-center gap-2 text-[10px] font-bold"><Layers className="w-3 h-3" /> Cold Server Start</div>
                <div className="flex items-center gap-2 text-[10px] font-bold"><Database className="w-3 h-3" /> DB Handshake</div>
              </div>
            </div>

            <div className="relative p-10 bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] border-2 border-primary-brand/30 shadow-2xl shadow-primary-brand/10 transform scale-105">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary-brand flex items-center gap-2">
                  <Zap className="w-4 h-4 fill-primary-brand" /> Instant Engine Edge
                </span>
                <span className="text-sm font-black text-emerald-500">280ms Full Load</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary-brand to-indigo-500 shadow-[0_0_20px_rgba(129,6,209,0.4)]"
                />
              </div>
              <div className="mt-6 flex gap-10">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> 312 Edge Nodes</div>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Static Propagation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Value Props (ThemeForest Style) */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: "Quality Vetted", icon: <CheckCircle2 />, desc: "Every item in our collection is manually reviewed by our engineering experts." },
                { title: "Elite Support", icon: <Lock />, desc: "Get specialized assistance directly from the developers who built the infrastructure." },
                { title: "LifeTime Access", icon: <ArrowsUpFromLine />, desc: "Purchase once and get unlimited access to all future version updates." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-[#82B440]">
                    {React.cloneElement(item.icon as any, { className: "w-8 h-8 font-display" })}
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed font-display">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Marketplace Stats (Confidence Booster) */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[#82B440]/50 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-20"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left space-y-4">
              <h2 className="text-4xl font-bold leading-tight tracking-tight">Access the world's <br /> premier AI asset market.</h2>
              <p className="text-slate-400 font-medium font-display">Over 50,000 professional templates and sovereign modules at your fingertips.</p>
            </div>
            <div className="grid grid-cols-2 gap-12 text-center">
              <div>
                <p className="text-5xl font-black text-[#82B440]">52,142</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mt-2">Active Items</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[#82B440]">1.2M+</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mt-2">Annual Sales</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Global Map (Resilience) */}
        <section className="py-24 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
          {/* Section content remains but adapted for marketplace context if needed */}
        </section>

        {/* Section 6: CTA Bottom (ThemeForest Style) */}
        <section className="py-32 bg-slate-50 dark:bg-slate-900/50 text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-10">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight font-display">
              Ready to start building <br /> with the best in the market?
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed font-display">
              Join our community of world-class developers and agencies. Get started today.
            </p>
            <div className="pt-6">
              <Link href="/wizard">
                <button className="bg-[#82B440] hover:bg-[#719d37] text-white px-12 py-5 rounded-md font-bold text-lg transition-all shadow-xl shadow-[#82B440]/20">
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 7: Final Footer Information (Marketplace Multi-Column) */}
        <footer className="bg-slate-900 text-slate-400 py-20 px-6 lg:px-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 text-left">
            <div className="lg:col-span-2 space-y-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-[#82B440] p-1.5 rounded-md">
                  <Zap className="text-white w-5 h-5 fill-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">
                  Instant<span className="text-[#82B440]">Engine</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed max-w-sm font-display">
                Instant Engine is part of the sovereign infrastructure network. We provide professional AI-native website templates and globally distributed deployment engines for the modern creator.
              </p>
            </div>

            {[
              { title: "Envato Market", links: ["Marketplace", "Top Items", "Newest", "Bestsellers"] },
              { title: "Help & Support", links: ["Help Center", "Authors", "Licenses", "Changelog"] },
              { title: "Community", links: ["Forums", "Blog", "Affiliates", "Legal"] },
            ].map((col) => (
              <div key={col.title} className="space-y-6">
                <h5 className="text-white font-bold text-sm">{col.title}</h5>
                <div className="flex flex-col gap-4 font-display">
                  {col.links.map(l => (
                    <Link key={l} href="#" className="text-sm hover:text-white transition-colors">{l}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <p className="text-xs font-display">© 2024 Instant Engine Pty Ltd. Trademarks belong to their respective owners.</p>
            <div className="flex gap-8 font-display">
              {["Terms", "Privacy", "Cookies", "Sitemap"].map(link => (
                <Link key={link} href={link === "Privacy" ? "/privacy" : "#"} className="text-xs hover:text-white transition-colors">{link}</Link>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* Global CSS for custom animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap');
        
        body {
          font-family: 'Outfit', sans-serif;
          letter-spacing: -0.01em;
        }

        .font-display {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }

        ::selection {
          background: #82B440;
          color: white;
        }

        h1, h2, h3, h4, h5, h6 {
           letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  );
}
