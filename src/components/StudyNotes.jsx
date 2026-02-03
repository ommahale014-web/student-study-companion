"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function StudyNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadNotes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    const {
      data: { user },
    } = await supabase.auth.getUser();

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
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Study Notes</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Title input */}
        <Input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content input */}
        <Textarea
          placeholder="Write your study notes here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button onClick={handleAddNote} disabled={loading}>
          {loading ? "Saving…" : "Add Note"}
        </Button>

        {/* Notes list */}
        <div className="space-y-3">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-4 space-y-1">
                {note.title && (
                  <h3 className="font-semibold">
                    {note.title}
                  </h3>
                )}
                <p className="whitespace-pre-wrap">
                  {note.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
