"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/LoginModal";
import {
  Timer,
  Target,
  ArrowRight,
  Hexagon,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => setMounted(true), []);

  // 🔒 browser back closes modal ONLY (no navigation)
  useEffect(() => {
    if (!showLogin) return;

    window.history.pushState({ modal: true }, "");
    const onPop = () => setShowLogin(false);
    window.addEventListener("popstate", onPop);

    return () => window.removeEventListener("popstate", onPop);
  }, [showLogin]);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 selection:bg-emerald-500/30 font-sans overflow-hidden relative">
      
      {/* ===== LIVE MOVING UNIVERSE (UNCHANGED) ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#051a14_0%,_#02040a_100%)]" />
        {mounted &&
          [...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
              }}
            />
          ))}
      </div>

      {/* ===== NAV BAR (UNCHANGED) ===== */}
      <div className="relative z-10 h-screen overflow-y-auto">
        <header className="sticky top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:rotate-12 transition-transform">
                <Hexagon className="w-5 h-5 text-white fill-white/10" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white uppercase italic">
                Study<span className="text-emerald-500 font-black">AI</span>
              </span>
            </div>

            <Button
              onClick={() => setShowLogin(true)}
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-emerald-600 hover:text-white text-white rounded-full px-8 transition-all"
            >
              Sign In
            </Button>
          </div>
        </header>

        {/* ===== HERO (UNCHANGED) ===== */}
        <main className="pt-32 pb-20">
          <section className="max-w-5xl mx-auto px-6 text-center mb-40">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase mb-10">
              <Rocket className="w-3 h-3" /> Systems Operational
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85]">
              BEYOND <br />
              <span className="text-emerald-500 drop-shadow-[0_10px_40px_rgba(16,185,129,0.3)]">
                LIMITS.
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              A high-speed study ecosystem built for the top 1%.
              Eliminate distractions and dominate your curriculum.
            </p>

            <Button
              size="lg"
              onClick={() => setShowLogin(true)}
              className="h-16 px-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-emerald-900/50 hover:-translate-y-2 transition-all"
            >
              ENTER WORKSPACE <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </section>

          {/* ===== BENTO GRID (UNCHANGED) ===== */}
          <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[3rem] p-12 hover:bg-white/[0.05] transition-all relative">
              <Timer className="absolute top-10 right-10 w-32 h-32 text-emerald-500/10" />
              <h3 className="text-3xl font-black uppercase mb-4">
                Focus Engine
              </h3>
              <p className="text-slate-400 text-lg max-w-sm">
                Precision timed sessions designed to lock you into peak mental performance.
              </p>
            </div>

            <div className="md:col-span-5 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[3rem] p-12 hover:bg-white/[0.05] transition-all">
              <Target className="w-12 h-12 text-rose-500 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4">
                Missions
              </h3>
              <p className="text-slate-400">
                Tactical objective tracking for every academic milestone.
              </p>
            </div>
          </section>
        </main>

        {/* ===== FOOTER (UNCHANGED) ===== */}
        <footer className="mt-40 border-t border-white/5 bg-black/60 backdrop-blur-2xl py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Hexagon className="w-5 h-5 text-emerald-500" />
                  <span className="font-black uppercase italic">
                    Study AI
                  </span>
                </div>
                <p className="text-slate-500 text-sm">
                  Command Center for Professional Students.
                </p>
              </div>

              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-2">
                  Designed & Developed by
                </p>
                <p className="text-2xl font-black text-white uppercase">
                  Om Ajay Mahale
                </p>
              </div>

              <div className="flex gap-8 text-xs uppercase font-black tracking-widest text-slate-500">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Secure
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Fast
                </span>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-[11px] uppercase tracking-[0.4em] text-slate-600 font-bold">
                © {currentYear} — OM AJAY MAHALE — ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ===== LOGIN MODAL (PREMIUM UI, REUSED) ===== */}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  );
}
