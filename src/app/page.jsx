import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Student Study Companion
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          A simple and focused study dashboard with Pomodoro sessions,
          daily goals, and organized notes.
        </p>

        <div className="mt-8">
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Pomodoro Focus</h3>
            <p className="mt-2 text-muted-foreground">
              Stay focused with structured Pomodoro study sessions.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Daily Goals</h3>
            <p className="mt-2 text-muted-foreground">
              Plan your day and track what matters most.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Study Notes</h3>
            <p className="mt-2 text-muted-foreground">
              Save notes securely and revise anytime.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold">
          Ready to start studying smarter?
        </h2>

        <div className="mt-6">
          <Link href="/login">
            <Button variant="outline" size="lg">
              Login / Sign Up
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
