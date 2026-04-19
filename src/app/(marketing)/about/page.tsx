import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const principles = [
  {
    title: "Human-first matching",
    description:
      "You choose who you speak with. We do not force a black-box algorithmic match.",
    icon: HeartHandshake,
  },
  {
    title: "Clinical quality",
    description:
      "Every therapist is verified and reviewed before they can take sessions on WarmTalk.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent care path",
    description:
      "Onboarding, insurance checks, and booking are designed to stay simple and explicit.",
    icon: CheckCircle2,
  },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-soft-bg px-6 py-14 md:py-20">
      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6 text-center">
          <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange">
            About WarmTalk
          </Badge>
          <h1 className="text-4xl font-serif font-bold text-brand-green md:text-6xl">
            Built to make mental healthcare feel human again
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-brand-green/80">
            WarmTalk helps clients find the right therapist through real introductions, not opaque
            recommendation engines. Our goal is trust, clarity, and continuity from the very first
            click.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="rounded-full bg-brand-orange px-8 hover:bg-orange-600">
              <Link href="/auth/register">
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-brand-green/10">
                <CardHeader className="space-y-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-brand-green">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-green/75">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
