import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CheckCircle, DollarSign, HeartHandshake, Sparkles, UserCheck, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 lg:py-32 overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left z-10">
              <Badge variant="secondary" className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
                <Sparkles className="w-4 h-4 mr-2" />
                Now accepting new clients in all 50 states
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-green leading-[1.1] tracking-tight">
                Therapy that <br className="hidden md:block" />
                feels like <span className="text-brand-orange relative">
                  home
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-brand-green/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                No algorithmic matching. Real human connections. Start your journey with a free 5-minute 'Vibe Check' video call with verified professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-full px-8 h-14 text-lg shadow-[0_8px_30px_rgb(234,67,53,0.3)] hover:shadow-[0_8px_30px_rgb(234,67,53,0.5)] hover:-translate-y-1 transition-all duration-300">
                  <Link href="/auth/register">
                    Find Your Therapist <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg font-bold border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white transition-colors duration-300">
                  <Link href="/about">Learn How It Works</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image / Video Placeholder */}
            <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl lg:ml-auto group">
              <div className="absolute inset-0 bg-brand-green/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <Image
                src="/images/hero.png" // Update this path if you change assets
                alt="A warm conversation with a therapist"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                // Placeholder to prevent crashing if /images/hero.png doesn't exist locally yet
                unoptimized
              />
              {/* Floating badges on image */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center gap-3 z-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="bg-brand-green/10 p-2 rounded-full">
                  <Star className="w-5 h-5 text-brand-green fill-brand-green" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-green">4.9/5 Average</p>
                  <p className="text-xs text-brand-green/60">Based on 10k+ sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Bar */}
      <section className="py-10 bg-brand-green/5 border-y border-brand-green/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <ShieldCheck className="h-6 w-6 text-brand-green" />
              </div>
              <div>
                <h4 className="font-bold text-brand-green">Verified Professionals</h4>
                <p className="text-sm text-brand-green/70">Top 5% of licensed therapists</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-brand-green/10"></div>
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <CheckCircle className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h4 className="font-bold text-brand-green">Instant Insurance Check</h4>
                <p className="text-sm text-brand-green/70">Know your cost upfront in seconds</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-brand-green/10"></div>
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold text-brand-green">No Hidden Fees</h4>
                <p className="text-sm text-brand-green/70">Pay exactly what's quoted. Always.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section using Shadcn Cards */}
      <section className="py-24 px-6 bg-white relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green mb-4">Why WarmTalk is different</h2>
            <p className="text-lg text-brand-green/70">We built the platform we wished existed when we were looking for help.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 cursor-pointer">
            
            <Card className="bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-gray-100 transition-all duration-300 hover:-translate-y-1 rounded-[2rem] overflow-hidden group">
              <CardHeader className="text-center pb-2 pt-8">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-8 h-8 text-brand-orange" />
                </div>
                <CardTitle className="text-2xl font-bold text-brand-green font-serif">The Vibe Check</CardTitle>
                <CardDescription className="text-brand-green/70 text-base">Meet your match before committing.</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-center text-brand-green/80 mt-2">
                  Stop paying for first sessions with therapists who aren't a fit. Schedule free 5-minute video intro calls with multiple providers until you find "the one."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-gray-100 transition-all duration-300 hover:-translate-y-1 rounded-[2rem] overflow-hidden group">
              <CardHeader className="text-center pb-2 pt-8">
                <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 text-brand-green" />
                </div>
                <CardTitle className="text-2xl font-bold text-brand-green font-serif">Transparent Pricing</CardTitle>
                <CardDescription className="text-brand-green/70 text-base">No subscriptions. No surprises.</CardDescription>
              </CardHeader>
              <CardContent className="pb-8 space-y-4">
                 <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 mt-4">
                  <span className="font-bold text-brand-green">Standard Session</span>
                  <div className="flex items-center gap-4">
                    <span className="text-brand-orange/60 line-through text-xs font-medium">Industry: $150+</span>
                    <span className="font-bold text-brand-green text-lg bg-green-50 px-3 py-1 rounded-full">$85</span>
                  </div>
                </div>
                <p className="text-center text-brand-green/70 text-sm mt-4">
                  We handle the insurance paperwork for you and bill your out-of-network benefits automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-red-100 transition-all duration-300 hover:-translate-y-1 rounded-[2rem] overflow-hidden group">
              <CardHeader className="text-center pb-2 pt-8 relative">
                <div className="absolute top-6 right-6 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-100 transition-colors duration-300">
                  <HeartHandshake className="w-8 h-8 text-red-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-brand-green font-serif">Crisis Support</CardTitle>
                <CardDescription className="text-brand-green/70 text-base">We're here when you need us.</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-center text-brand-green/80 mt-2 mb-6">
                  Mental health doesn't operate on a 9-to-5 schedule. Access our trained crisis response team 24/7 if you need immediate assistance between sessions.
                </p>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 font-bold rounded-xl h-12">
                  Get Help Now
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 px-6 bg-brand-green/5">
        <div className="container mx-auto max-w-7xl px-4 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="border-brand-green/20 text-brand-green mb-4">Patient Stories</Badge>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green">Don't take our word for it</h2>
            </div>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {[
                {
                  quote: "The free intro calls completely changed how I look for therapists. I met three people who were all qualified, but one just 'clicked'. I've been with her for 6 months now.",
                  author: "Sarah J.",
                  role: "Found her therapist in 3 days",
                  initials: "SJ"
                },
                {
                  quote: "Other platforms matched me with an algorithm, and the therapists always felt robotic. WarmTalk let me choose who I wanted to speak to, and the difference in quality is night and day.",
                  author: "Michael T.",
                  role: "Switched from BetterHelp",
                  initials: "MT"
                },
                {
                  quote: "I was intimidated by the insurance billing, but the team here sorted out my out-of-network benefits instantly. I actually pay less per session here than I did at my old clinic.",
                  author: "Elena R.",
                  role: "Using BlueCross benefits",
                  initials: "ER"
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-sm hover:shadow-md transition-shadow h-full rounded-3xl">
                      <CardContent className="p-8 flex flex-col h-full justify-between">
                        <div>
                          <Star className="w-6 h-6 text-brand-orange fill-brand-orange mb-6" />
                          <p className="text-lg text-brand-green/80 italic leading-relaxed mb-8">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-brand-orange/20">
                            <AvatarFallback className="bg-brand-orange/10 text-brand-orange font-bold">
                              {testimonial.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-brand-green">{testimonial.author}</p>
                            <p className="text-sm text-brand-green/60">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 h-12 w-12 bg-white border-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-colors" />
              <CarouselNext className="relative inset-0 translate-y-0 h-12 w-12 bg-white border-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green mb-4">Common Questions</h2>
            <p className="text-lg text-brand-green/70">Everything you need to know about the platform.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-brand-green/10 py-2">
              <AccordionTrigger className="text-lg font-bold text-brand-green hover:text-brand-orange hover:no-underline transition-colors">
                How does the 5-minute Vibe Check work?
              </AccordionTrigger>
              <AccordionContent className="text-brand-green/70 text-base leading-relaxed">
                A Vibe Check is a free, 5-minute intro video call. You can schedule up to 3 of these with different therapists before committing to a full session. It's meant to help you ask basic questions, gauge their personality, and see if you feel comfortable talking to them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b-brand-green/10 py-2">
              <AccordionTrigger className="text-lg font-bold text-brand-green hover:text-brand-orange hover:no-underline transition-colors">
                Do you take my insurance?
              </AccordionTrigger>
              <AccordionContent className="text-brand-green/70 text-base leading-relaxed">
                We accept most major PPO insurance plans using your out-of-network benefits. During sign up, simply enter your insurance info and our system will instantly calculate exactly what you owe per session. We submit all claims on your behalf.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b-brand-green/10 py-2">
              <AccordionTrigger className="text-lg font-bold text-brand-green hover:text-brand-orange hover:no-underline transition-colors">
                Are your therapists licensed?
              </AccordionTrigger>
              <AccordionContent className="text-brand-green/70 text-base leading-relaxed">
                Yes. 100% of the providers on our platform are fully licensed, vetted professionals in your state with a minimum of 3 years of clinical experience. We verify all credentials extensively before they are allowed to accept clients.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* Ready CTA */}
      <section className="py-24 px-6 bg-brand-green relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Ready to find your match?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of others who have found therapy that finally clicks. Your first 5-minute intro is completely free.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-brand-green font-bold rounded-full px-10 h-16 text-xl shadow-xl hover:scale-105 transition-all duration-300">
            <Link href="/auth/register">
              Start Your Journey
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
