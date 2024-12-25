"use server";

import { signIn, signOut } from "@/lib/auth";
import { ApiResponseError } from "@/lib/errors";
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
    // Expected behavior. Throw to continue the redirect.
    if (isRedirectError(error)) throw error;

    if (error instanceof ApiResponseError) {
      console.log("error message2", error.message);
    }
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}
