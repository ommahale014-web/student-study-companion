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
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.replace("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse tracking-tight">Synchronizing Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-indigo-500/30">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Glassmorphism Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">StudyFlow</h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{user.email}</p>
              </div>
            </div>
          </div>

          <Button 
            variant="ghost" 
            className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-300"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.replace("/login");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Workspace Grid */}
      <section className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column: Pomodoro & Notes */}
          <div className="lg:col-span-8 space-y-8">
            {/* Pomodoro Card */}
            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-sm p-8 rounded-[2rem] overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                <Timer className="w-64 h-64 text-white" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-indigo-500" />
                  <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Focus Laboratory</h2>
                </div>
                <PomodoroTimer />
              </div>
            </Card>

            {/* Notes Card */}
            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-sm p-8 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <PenLine className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Knowledge Base</h2>
              </div>
              <StudyNotes />
            </Card>
          </div>

          {/* Sidebar: Goals */}
          <div className="lg:col-span-4">
            <Card className="sticky top-28 border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 rounded-[2rem] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-500/10 rounded-lg">
                    <Target className="w-5 h-5 text-rose-500" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Daily Goals</h2>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full uppercase font-black tracking-widest border border-slate-700">
                  Active
                </span>
              </div>
              <DailyGoals />
            </Card>
          </div>

        </div>
      </section>
    </main>
  );
}