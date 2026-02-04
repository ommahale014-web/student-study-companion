"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import PomodoroTimer from "@/components/PomodoroTimer";
import DailyGoals from "@/components/DailyGoals";
import StudyNotes from "@/components/StudyNotes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Layout, Timer, Target, PenLine } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      setUser(session?.user ?? null);
      setLoading(false);
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <p className="text-slate-400">Loading…</p>
      </div>
    );
  }

  // ✅ REDIRECT TO LANDING PAGE (NOT LOGIN)
  if (!user) {
    window.location.replace("/");
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold">StudyFlow</p>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">
                {user.email}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="text-slate-400 hover:text-rose-400"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.replace("/");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-8 bg-slate-900/40 border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Timer className="w-4 h-4 text-indigo-400" />
              <h2 className="font-bold">Pomodoro Focus</h2>
            </div>
            <PomodoroTimer />
          </Card>

          <Card className="p-8 bg-slate-900/40 border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <PenLine className="w-4 h-4 text-emerald-400" />
              <h2 className="font-bold">Study Notes</h2>
            </div>
            <StudyNotes />
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-8 bg-slate-900/40 border-slate-800 rounded-2xl sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-400" />
                <h2 className="font-bold">Daily Goals</h2>
              </div>

              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-black tracking-widest">
                ACTIVE
              </span>
            </div>

            <DailyGoals />
          </Card>
        </div>
      </section>
    </main>
  );
}
