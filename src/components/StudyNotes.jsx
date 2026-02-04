"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, StickyNote, Clock, Sparkles } from "lucide-react";

export default function StudyNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadNotes() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setNotes(data ?? []);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleAddNote() {
    if (!content.trim()) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Not logged in");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("notes").insert({
      user_id: user.id,
      title: title.trim() || null,
      content,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setTitle("");
    setContent("");
    await loadNotes();
    setLoading(false);
  }

  return (
    <div className="space-y-10">
      {/* Input Section - Styled as a floating Glass Panel */}
      <div className="relative group p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-700/50 to-transparent shadow-2xl">
        <div className="bg-[#0f172a]/90 backdrop-blur-xl p-8 rounded-[calc(2rem-1px)] space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/80">New Entry</span>
          </div>

          <Input
            placeholder="Note Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-900/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/10 text-slate-100 placeholder:text-slate-600 h-12 rounded-xl transition-all"
          />

          <Textarea
            placeholder="Type your study insights here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-slate-900/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/10 text-slate-200 placeholder:text-slate-600 min-h-[140px] rounded-xl resize-none leading-relaxed transition-all"
          />

          <Button 
            onClick={handleAddNote} 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Syncing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Add to Knowledge Base</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Notes Display Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Notes</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-600 bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-700/50">
            {notes.length} Total
          </span>
        </div>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800/50 rounded-[2rem] bg-slate-900/20">
            <StickyNote className="w-12 h-12 text-slate-800 mb-4" />
            <p className="text-slate-500 font-medium tracking-tight">Your digital brain is empty.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <Card 
                key={note.id} 
                className="border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/40 transition-all duration-300 rounded-[1.5rem] group overflow-hidden"
              >
                <CardContent className="p-6">
                  {note.title && (
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-slate-100 text-lg leading-tight group-hover:text-emerald-400 transition-colors">
                        {note.title}
                      </h4>
                    </div>
                  )}
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/20">
                    {note.content}
                  </p>
                  
                  <div className="mt-5 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                     <div className="w-2 h-2 rounded-full bg-emerald-500/30 group-hover:bg-emerald-500 transition-all duration-500" />
                     <span className="text-[10px] font-medium text-slate-600 uppercase tracking-tighter">
                       {new Date(note.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                     </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}