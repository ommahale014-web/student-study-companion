"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 1️⃣ Initial auth check
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

  // 2️⃣ Listen for auth state changes (logout, expiry, other tab)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        window.location.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3️⃣ Render AFTER hooks
  if (loading) {
    return <p className="p-8">Checking authentication…</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, {user.email}</p>

      <button
        className="mt-4 border p-2"
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
