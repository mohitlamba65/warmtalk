import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
           <span className="font-serif text-2xl font-bold text-brand-green">WarmTalk</span>
        </Link>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4">
          {/* Client/Provider Toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 text-sm font-medium">
            <Link 
              href="/auth/login?role=client" 
              className="px-4 py-1.5 bg-white dark:bg-brand-green dark:text-white shadow-sm rounded-full text-brand-green transition-all"
            >
              Client
            </Link>
            <Link 
              href="/auth/login?role=provider" 
              className="px-4 py-1.5 text-muted-foreground hover:text-brand-green transition-all"
            >
              Provider
            </Link>
          </div>

          <Button asChild className="rounded-full bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6">
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
