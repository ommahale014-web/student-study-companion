"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/client";
import { Hexagon, Mail, Lock, Rocket, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { alert(error.message); return; }
    window.location.replace("/dashboard");
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) { alert(error.message); return; }
    alert("Signup successful. Check your email.");
  }

  useEffect(() => {
    setIsMounted(true);

    async function redirectIfLoggedIn() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) { window.location.replace("/dashboard"); }
    }
    redirectIfLoggedIn();

    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040a] font-sans">
      
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#051a14_0%,_#02040a_100%)]" />
        
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        >
          {isMounted && [...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
        </Link>

        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-4">
              <Hexagon className="w-8 h-8 text-white fill-white/10" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic text-center">
              Welcome <span className="text-emerald-500">Back</span>
            </h1>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                onClick={handleLogin}
              >
                LOGIN <Rocket className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                className="w-full bg-transparent border border-white/10 hover:bg-white/5 text-slate-300 font-bold py-4 rounded-2xl transition-all"
                onClick={handleSignup}
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} — <span className="text-slate-400">OM AJAY MAHALE</span>
            </p>
        </div>
      </div>
    </main>
  );
}