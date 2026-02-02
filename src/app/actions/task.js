"use server";

import { supabase } from "@/lib/client";

export async function addTask(title) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Not authenticated" };
  }

  const { error } = await supabase.from("tasks").insert({
    title,
    user_id: user.id,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function getTasks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function completeTask(id) {
  await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("id", id);
}
