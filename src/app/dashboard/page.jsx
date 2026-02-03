"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import PomodoroTimer from "@/components/PomodoroTimer";
import StudyNotes from "@/components/StudyNotes";
import DailyGoals from "@/components/DailyGoals";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
    return <p className="p-8">Checking authentication…</p>;
  }

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.email}
      </h1>

      <PomodoroTimer />
      <StudyNotes />
      <DailyGoals />

      <button
        className="border px-4 py-2"
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.replace("/login");
        }}
      >
        Logout
      </button>
    </main>
  );
}
