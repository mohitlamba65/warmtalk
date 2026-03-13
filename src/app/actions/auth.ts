
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function signInWithGoogle() {
    await signIn("google");
}

export async function handleSignOut() {
    await signOut();
}
