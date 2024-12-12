"use server";

import { signIn, signOut } from "@/lib/auth";

export async function login(email: string, password: string) {
  return signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: "/dashboard",
  });
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}
