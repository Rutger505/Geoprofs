"use server";

import { signIn, signOut } from "@/lib/auth";
import { SignInError } from "@/lib/errors";
import { CallbackRouteError } from "@auth/core/errors";
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

    console.log("error");

    if (
      error instanceof CallbackRouteError &&
      error.cause?.err instanceof SignInError
    ) {
      console.log("errormessage", error.cause.err.message);
    } else {
      console.log("not error");
    }
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}
