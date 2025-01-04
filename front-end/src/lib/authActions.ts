"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (!(error instanceof AuthError) || error.type !== "CredentialsSignin") {
      console.error(error);
      return { error: "Something went wrong." };
    }

    return { error: "Invalid credentials." };
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}
