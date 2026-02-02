"use client";

import { useState } from "react";
import { supabase } from "@/lib/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ browser session exists immediately
    window.location.replace("/dashboard");
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful. Check your email.");
  }


useEffect(() => {
  async function redirectIfLoggedIn() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      window.location.replace("/dashboard");
    }
  }

  redirectIfLoggedIn();
}, []);



  return (
    <main className="min-h-screen flex items-center justify-center">
      <form className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="bg-black text-white p-2"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          type="button"
          className="border p-2"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
