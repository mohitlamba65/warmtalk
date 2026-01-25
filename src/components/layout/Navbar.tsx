import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full bg-transparent pt-6 pb-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-60 h-50">
            <Image
              src="/logo.svg"
              alt="WarmTalk"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-brand-green font-medium">
          <Link href="/how-it-works" className="hover:text-brand-orange transition-colors">How It Works</Link>
          <Link href="/therapists" className="hover:text-brand-orange transition-colors">Therapists</Link>
          <Link href="/pricing" className="hover:text-brand-orange transition-colors">Pricing</Link>
          <Link href="/faq" className="hover:text-brand-orange transition-colors">FAQ</Link>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4">
          <Button asChild className="rounded-full bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 h-10 shadow-md">
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
