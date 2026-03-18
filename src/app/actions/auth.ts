export async function signInWithGoogle() {
    throw new Error("Use client-side signIn.social({ provider: 'google' }) instead.");
}

export async function handleSignOut() {
    throw new Error("Use authClient.signOut() instead.");
}
