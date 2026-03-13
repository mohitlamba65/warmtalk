import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Prevent Next.js from statically rendering this route
export const dynamic = "force-dynamic";
