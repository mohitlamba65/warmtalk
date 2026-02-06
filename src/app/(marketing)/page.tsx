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
      <section className="relative px-6 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-green leading-tight">
                Therapy that <br />
                feels like home
              </h1>
              <p className="text-base md:text-lg text-brand-green/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                No algorithmic matching. Real human connections. Start your journey with a free 5-minute 'Vibe Check' video call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-full px-10 h-14 text-lg shadow-lg hover:shadow-xl transition-all">
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero.png"
                alt="Woman smiling at laptop"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Bar */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <p className="text-sm font-bold text-brand-green/60 tracking-widest uppercase mb-6">TRANSPARENCY BAR</p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-sm border border-white/40">
            <div className="flex items-center gap-4 w-full">
              <div className="bg-green-100 p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-brand-green" />
              </div>
              <span className="font-medium text-brand-green text-lg">1,000+ Verified Therapists</span>
            </div>
            <div className="flex items-center gap-4 w-full border-l border-brand-green/10 pl-0 md:pl-6">
              <div className="bg-blue-100 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium text-brand-green text-lg">Insurance Verified in 60 Seconds</span>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto border-l border-brand-green/10 pl-0 md:pl-6 whitespace-nowrap">
              <DollarSign className="h-5 w-5 text-brand-green/60" />
              <span className="font-medium text-brand-green/80">No Hidden Fees.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">

          {/* Vibe Check Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-brand-green mb-4 flex items-center gap-2">
              <span className="inline-block"><Sparkles className="w-5 h-5 text-brand-green" /></span> The Vibe Check
            </h3>
            <div className="relative w-48 h-48 my-6 rounded-full bg-[#FADCB0] border-4 border-[#FADCB0] overflow-hidden">
              {/* Placeholder for illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">👩‍⚕️</span>
              </div>
              <div className="absolute bottom-6 right-2 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">Hi!</div>
            </div>
            <p className="text-brand-green/70 text-sm">Meet your match before committing.</p>
          </div>

          {/* Transparent Pricing Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-brand-green mb-6 text-center">Transparent Pricing</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                <span className="font-bold text-brand-green">WarmTalk</span>
                <span className="text-red-300 line-through">Competitors</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-green/80">Session</span>
                <div className="flex gap-8">
                  <span className="font-bold text-brand-green">$85</span>
                  <span className="text-gray-300 line-through">$120+</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-green/80">Hidden Fees</span>
                <div className="flex gap-8">
                  <span className="font-bold text-brand-green">$0</span>
                  <span className="text-gray-300 line-through">$30+</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-brand-green/50">Includes insurance processing</p>
            </div>
          </div>

          {/* Crisis Support Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center text-center justify-between hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-brand-green mb-4">24/7 Crisis Support</h3>

            <div className="bg-red-50 rounded-full p-8 my-4 relative">
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <HeartHandshake className="w-12 h-12 text-red-500" />
            </div>

            <div className="space-y-4">
              <p className="text-brand-green font-medium">We're here when you need us.</p>
              <p className="text-xs text-brand-green/60 px-4">Chat with a crisis counselor anytime, day or night.</p>
              <Button variant="link" className="text-brand-orange font-bold hover:text-orange-600">
                Get Help Now
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
