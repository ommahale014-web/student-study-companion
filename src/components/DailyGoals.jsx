"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Target, CheckCircle2, Circle } from "lucide-react";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyGoals() {
  const [goalText, setGoalText] = useState("");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadGoals() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("daily_goals")
      .select("*")
      .eq("goal_date", todayISO())
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setGoals(data ?? []);
  }

  useEffect(() => {
    loadGoals();
  }, []);

  async function addGoal() {
    if (!goalText.trim()) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("daily_goals").insert({
      user_id: user.id,
      text: goalText,
      goal_date: todayISO(),
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setGoalText("");
    await loadGoals();
    setLoading(false);
  }

  async function toggleGoal(id, completed) {
    const { error } = await supabase
      .from("daily_goals")
      .update({ completed })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed } : g))
    );
  }

  return (
    <div className="space-y-6">
      {/* Goal Input Area */}
      <div className="flex flex-col gap-3">
        <div className="relative group">
          <Input
            placeholder="What's the main objective?"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            className="bg-slate-900/50 border-slate-800 text-slate-100 placeholder:text-slate-600 rounded-xl h-12 pr-12 focus:border-rose-500/50 focus:ring-rose-500/10 transition-all"
          />
          <Button 
            onClick={addGoal} 
            disabled={loading || !goalText.trim()}
            size="icon"
            className="absolute right-1.5 top-1.5 h-9 w-9 bg-rose-600 hover:bg-rose-500 rounded-lg shadow-lg shadow-rose-900/20"
          >
            <Plus className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {goals.length === 0 ? (
          <div className="text-center py-8 rounded-2xl border border-slate-800/50 bg-slate-900/20">
            <Target className="w-8 h-8 text-slate-700 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">No goals set for today</p>
          </div>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                goal.completed 
                ? "bg-slate-900/20 border-transparent opacity-60" 
                : "bg-slate-800/40 border-slate-700/50 hover:border-rose-500/30 hover:bg-slate-800/60 shadow-sm"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={goal.completed}
                  onCheckedChange={(v) => toggleGoal(goal.id, Boolean(v))}
                  className="w-5 h-5 border-2 border-slate-700 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500 rounded-md transition-all"
                />
              </div>
              
              <label
                htmlFor={`goal-${goal.id}`}
                className={`text-sm font-medium leading-none cursor-pointer select-none transition-all duration-300 ${
                  goal.completed 
                  ? "line-through text-slate-500" 
                  : "text-slate-200"
                }`}
              >
                {goal.text}
              </label>
            </div>
          ))
        )}
      </div>

      {/* Progress Footer */}
      {goals.length > 0 && (
        <div className="pt-4 border-t border-slate-800/60">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Daily Progress</span>
            <span className="text-[10px] font-mono text-rose-400">
              {Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(244,63,94,0.4)]"
              style={{ width: `${(goals.filter(g => g.completed).length / goals.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}