"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyGoals() {
  const [goalText, setGoalText] = useState("");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadGoals() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    const {
      data: { user },
    } = await supabase.auth.getUser();

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
      prev.map((g) =>
        g.id === id ? { ...g, completed } : g
      )
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Today’s Goals</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a goal for today…"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
          />
          <Button onClick={addGoal} disabled={loading}>
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center gap-3"
            >
              <Checkbox
                checked={goal.completed}
                onCheckedChange={(v) =>
                  toggleGoal(goal.id, Boolean(v))
                }
              />
              <span
                className={
                  goal.completed
                    ? "line-through text-muted-foreground"
                    : ""
                }
              >
                {goal.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
