"use server";

import { signIn, signOut } from "@/lib/auth";

export async function login(email: string, password: string) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result.error) console.log(result.error);
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}
