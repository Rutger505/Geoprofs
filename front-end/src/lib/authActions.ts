"use server";

import { LoginErrors, signIn, signOut } from "@/lib/auth";

export async function login(
  email: string,
  password: string,
): Promise<null | LoginErrors> {
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
