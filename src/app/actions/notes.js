"use server";

import { supabase } from "@/lib/client";

export async function addNote(content, title = "") {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Not authenticated" };
  }

  const { error } = await supabase.from("notes").insert({
    user_id: user.id,
    title,
    content,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function getNotes() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}
