"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Timer, Target, ArrowRight, Hexagon, Zap, Shield, Rocket } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 selection:bg-emerald-500/30 font-sans overflow-hidden relative">
      
      {/* --- LIVE MOVING UNIVERSE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#051a14_0%,_#02040a_100%)]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.05)_0%,_transparent_50%)] animate-[spin_60s_linear_infinite]" />
        
        {/* Only render random stars after mounting to prevent Hydration Error */}
        {mounted && (
          <>
            <div className="absolute inset-0 animate-[pulse_8s_ease-in-out_infinite]">
              {[...Array(50)].map((_, i) => (
                <div
                  key={`star-slow-${i}`}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: '1px',
                    height: '1px',
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 animate-[slide_120s_linear_infinite]">
               <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                 {[...Array(24)].map((_, i) => (
                   <div
                     key={`star-moving-${i}`}
                     className="w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"
                     style={{
                       marginTop: `${Math.random() * 100}px`,
                       marginLeft: `${Math.random() * 100}px`,
                       animationDelay: `${Math.random() * 5}s`,
                       opacity: Math.random(),
                     }}
                   />
                 ))}
               </div>
            </div>
          </>
        )}

        <div className="absolute inset-0 animate-[float_40s_linear_infinite] opacity-40">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide {
          from { transform: translateY(0); }
          to { transform: translateY(-1000px); }
        }
        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* --- UI CONTENT --- */}
      <div className="relative z-10 h-screen overflow-y-auto">
        <header className="sticky top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:rotate-12 transition-transform">
                <Hexagon className="w-5 h-5 text-white fill-white/10" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white uppercase italic">Study<span className="text-emerald-500 font-black">AI</span></span>
            </div>
            <Link href="/login">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-emerald-600 hover:text-white text-white rounded-full px-8 transition-all">
                Sign In
              </Button>
            </Link>
          </div>
        </header>

        <main className="pt-32 pb-20">
          <section className="max-w-5xl mx-auto px-6 text-center mb-40">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase mb-10 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
              <Rocket className="w-3 h-3 animate-bounce" /> Systems Operational
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85]">
              BEYOND <br /> 
              <span className="text-emerald-500 drop-shadow-[0_10px_40px_rgba(16,185,129,0.3)]">LIMITS.</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              A high-speed study ecosystem built for the top 1%. 
              Eliminate distractions and dominate your curriculum.
            </p>

            <Link href="/login">
              <Button size="lg" className="h-16 px-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-3xl shadow-emerald-900/50 hover:-translate-y-2 transition-all active:scale-95 group">
                ENTER WORKSPACE <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </section>

          {/* BENTO GRID (Fixed String Constants) */}
          <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[3rem] p-12 hover:bg-white/[0.05] transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Timer className="w-40 h-40 text-emerald-500" />
               </div>
               <h3 className="text-3xl font-black text-white mb-4 italic uppercase">Focus Engine</h3>
               <p className="text-slate-400 text-lg max-w-sm">Precision timed sessions designed to lock you into peak mental performance.</p>
            </div>

            <div className="md:col-span-5 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[3rem] p-12 hover:bg-white/[0.05] transition-all group">
               <Target className="w-12 h-12 text-rose-500 mb-6 group-hover:scale-125 transition-transform" />
               <h3 className="text-2xl font-black text-white mb-4 uppercase">Missions</h3>
               <p className="text-slate-400">Tactical objective tracking for every academic milestone.</p>
            </div>
          </section>
        </main>

        <footer className="mt-40 border-t border-white/5 bg-black/60 backdrop-blur-2xl py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Hexagon className="w-6 h-6 text-emerald-500" />
                  <span className="font-black text-2xl text-white tracking-tighter uppercase italic">Study AI</span>
                </div>
                <p className="text-slate-500 text-sm font-medium tracking-wide">Command Center for Professional Students.</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-3">Designed & Developed by</p>
                <h4 className="text-3xl font-black text-white tracking-tight hover:text-emerald-500 transition-colors cursor-default uppercase">
                  Om Ajay Mahale
                </h4>
              </div>

              <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
                 <span className="flex items-center gap-2"><Shield className="w-4 h-4"/> Secure</span>
                 <span className="flex items-center gap-2"><Zap className="w-4 h-4"/> 12ms Latency</span>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-white/5 text-center">
              <p suppressHydrationWarning className="text-[12px] text-slate-600 font-bold uppercase tracking-[0.6em]">
                © {currentYear} — <span className="text-slate-300">Om Ajay Mahale</span> — ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}