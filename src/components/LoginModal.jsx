"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/client";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Rocket,
  Hexagon,
} from "lucide-react";

export default function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => setMounted(false), 300);
    }
  }, [open]);

  async function handleLogin() {
    if (!email || !password) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onClose();
    window.location.replace("/dashboard");
  }

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-6 rounded-[3rem] border border-white/10 bg-[#02040a]/90 backdrop-blur-2xl p-10 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4">
            <Hexagon className="w-8 h-8 text-white fill-white/10" />
          </div>
          <h2 className="text-2xl font-black text-white">
            Enter Workspace
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Focus begins here
          </p>
        </div>

        {/* ✅ FORM WITH SUBMIT BLOCKED */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault(); // 🔑 THIS LINE FIXES EVERYTHING
            handleLogin();
          }}
        >
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xl shadow-emerald-900/50 transition-all"
          >
            {loading ? "Authenticating..." : "Launch Session"}
            <Rocket className="inline ml-2 w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
