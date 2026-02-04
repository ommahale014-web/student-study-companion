"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Target, Trash2 } from "lucide-react";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyGoals() {
  const [goalText, setGoalText] = useState("");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------- Progress (Derived State) ---------- */
  const completedCount = goals.filter((g) => g.completed === true).length;
  const completionPercent =
    goals.length === 0
      ? 0
      : Math.round((completedCount / goals.length) * 100);

  /* ---------- Load Goals ---------- */
  async function loadGoals() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("daily_goals")
      .select("*")
      .eq("goal_date", todayISO())
      .order("created_at", { ascending: true });

    setGoals(data ?? []);
  }

  useEffect(() => {
    loadGoals();
  }, []);

  /* ---------- Add Goal ---------- */
  async function addGoal() {
    if (!goalText.trim()) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setLoading(false);

    await supabase.from("daily_goals").insert({
      user_id: user.id,
      text: goalText,
      goal_date: todayISO(),
    });

    setGoalText("");
    setLoading(false);
    loadGoals();
  }

  /* ---------- Toggle ---------- */
  async function toggleGoal(id, completed) {
    await supabase
      .from("daily_goals")
      .update({ completed })
      .eq("id", id);

    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed } : g))
    );
  }

  /* ---------- Delete ---------- */
  async function deleteGoal(id) {
    await supabase.from("daily_goals").delete().eq("id", id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl p-6 space-y-6">

      {/* ---------- Header (Minimal, Non-Repetitive) ---------- */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">
              Daily Goals
            </h3>
          </div>

          <span className="text-[10px] font-mono text-slate-500">
            {goals.length} total
          </span>
        </div>

        {/* Status (shown, not spoken) */}
        <div className="flex items-center gap-2 pl-7">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[10px] text-slate-400 tracking-tight">
            Ready for today’s priorities
          </span>
        </div>
      </div>

      {/* ---------- Input ---------- */}
      <div className="relative">
        <Input
          placeholder="Define today’s priority"
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          className="h-12 rounded-xl bg-slate-950/60 border-slate-800 pr-12"
        />
        <Button
          onClick={addGoal}
          disabled={loading || !goalText.trim()}
          size="icon"
          className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg bg-rose-600 hover:bg-rose-500"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* ---------- Goals List ---------- */}
      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
        {goals.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-500">
            No goals defined for today
          </div>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${
                goal.completed
                  ? "bg-slate-900/30 border-transparent opacity-60"
                  : "bg-slate-900/60 border-slate-800 hover:border-rose-500/40"
              }`}
            >
              <Checkbox
                checked={goal.completed}
                onCheckedChange={(v) =>
                  toggleGoal(goal.id, Boolean(v))
                }
              />

              <span
                className={`flex-1 text-sm ${
                  goal.completed
                    ? "line-through text-slate-500"
                    : "text-slate-200"
                }`}
              >
                {goal.text}
              </span>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => deleteGoal(goal.id)}
                className="opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* ---------- Progress ---------- */}
      {goals.length > 0 && (
        <div className="pt-5 border-t border-slate-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Completion
            </span>
            <span className="text-[10px] font-mono text-rose-400">
              {completionPercent}%
            </span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                completionPercent === 100
                  ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                  : "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
              }`}
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-600">
            {completionPercent === 100
              ? "All objectives completed."
              : `${completedCount} of ${goals.length} completed`}
          </p>
        </div>
      )}
    </div>
  );
}
