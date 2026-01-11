import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CheckCircle, DollarSign, HeartHandshake, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-12 md:py-24 lg:py-32 bg-soft-bg overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-green leading-tight">
              Therapy that feels like <span className="text-brand-orange">coming home</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Find a therapist who truly gets you. Our matching algorithm connects you with professionals who align with your needs and your vibe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all">
                <Link href="/auth/register">Get Matched Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg border-brand-green text-brand-green hover:bg-brand-green/10">
                <Link href="/therapists">Browse Therapists</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero.png"
              alt="Comfortable therapy session at home"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Transparency Bar */}
      <section className="bg-brand-green text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-brand-orange" />
            <span className="font-medium">Hipaa Secure & Confidential</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-brand-orange" />
            <span className="font-medium">Verified Professionals</span>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-brand-orange" />
            <span className="font-medium">Transparent Pricing</span>
          </div>
        </div>
      </section>

      {/* The Vibe Check Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <SectionHeader
            title="How the Vibe Check Works"
            subtitle="Finding the right therapist shouldn't be a guessing game. Our process ensures a great match from day one."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={Sparkles}
              title="1. Take the Vibe Check"
              description="Answer a few questions about your needs, preferences, and what you're looking for in a therapist."
            />
            <FeatureCard
              icon={HeartHandshake}
              title="2. Review Your Matches"
              description="We'll show you therapists who align with your profile, complete with compatibility scores."
            />
            <FeatureCard
              icon={Calendar}
              title="3. Book a Connection"
              description="Schedule a free 15-minute intro call to ensure the chemistry is right before you commit."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
