"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit3, Save } from "lucide-react";

export default function StudyNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadNotes() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    setNotes(data ?? []);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addNote() {
    if (!content.trim()) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setLoading(false);

    await supabase.from("notes").insert({
      user_id: user.id,
      title: title || null,
      content,
    });

    setTitle("");
    setContent("");
    setLoading(false);
    loadNotes();
  }

  async function updateNote(id, newTitle, newContent) {
    await supabase
      .from("notes")
      .update({ title: newTitle || null, content: newContent })
      .eq("id", id);

    setEditingId(null);
    loadNotes();
  }

  async function deleteNote(id) {
    await supabase.from("notes").delete().eq("id", id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="space-y-10">

      {/* ---------- Editor ---------- */}
      <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl p-6 space-y-4">
        <Input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-11 rounded-xl bg-slate-950/60 border-slate-800"
        />

        <Textarea
          placeholder="Write your study notes here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[140px] rounded-xl bg-slate-950/60 border-slate-800"
        />

        <Button
          onClick={addNote}
          disabled={loading}
          className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold shadow-lg shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Knowledge Base
        </Button>
      </div>

      {/* ---------- Notes ---------- */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-sm">
            Your knowledge base is empty.
          </div>
        ) : (
          notes.map((note) => (
            <Card
              key={note.id}
              className="group rounded-2xl border border-slate-800/60 bg-slate-900/40 transition-all hover:border-slate-700"
            >
              <CardContent className="p-6 space-y-4">
                {editingId === note.id ? (
                  <>
                    <Input
                      defaultValue={note.title ?? ""}
                      onChange={(e) => (note.title = e.target.value)}
                      className="bg-slate-950/60 border-slate-800"
                    />

                    <Textarea
                      defaultValue={note.content}
                      onChange={(e) => (note.content = e.target.value)}
                      className="bg-slate-950/60 border-slate-800"
                    />

                    <Button
                      onClick={() =>
                        updateNote(note.id, note.title, note.content)
                      }
                      className="h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    {note.title && (
                      <h4 className="text-lg font-bold text-slate-100">
                        {note.title}
                      </h4>
                    )}

                    <p className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>

                    {/* ---------- Actions (Subtle, on Hover) ---------- */}
                    <div className="flex items-center gap-3 pt-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => setEditingId(note.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteNote(note.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
