import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t bg-soft-bg/50 py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2">
                    <span className="font-serif text-xl font-bold text-brand-green">WarmTalk</span>
                    <p className="text-sm text-muted-foreground">
                        Connecting you with the right support, warmly and securely.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-brand-green">Platform</h3>
                    <Link href="/therapists" className="text-sm text-muted-foreground hover:text-brand-orange">Find a Therapist</Link>
                    <Link href="/auth/register" className="text-sm text-muted-foreground hover:text-brand-orange">Join as Provider</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-brand-green">Resources</h3>
                    <Link href="/blog" className="text-sm text-muted-foreground hover:text-brand-orange">Blog</Link>
                    <Link href="/faq" className="text-sm text-muted-foreground hover:text-brand-orange">FAQ</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-brand-green">Legal</h3>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-brand-orange">Privacy Policy</Link>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-brand-orange">Terms of Service</Link>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} WarmTalk.org. All rights reserved.
            </div>
        </footer>
    );
}
