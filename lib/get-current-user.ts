// lib/get-current-user.ts
import "server-only";
import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  // if you've added `id` to the session.user in callbacks, it'll be here too
  return session.user;
}
