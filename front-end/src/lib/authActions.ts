"use server";

import { signIn, signOut } from "@/lib/auth";
import { ApiResponseError } from "@/lib/errors";

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof ApiResponseError) {
      return { error: error.message };
    }

    // throw error; TODO
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}
