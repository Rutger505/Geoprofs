"use server";

import { signIn, signOut } from "@/lib/auth";
import axios from "@/lib/axios";
import { ApiResponseError } from "@/lib/errors";
import { redirect } from "next/navigation";

const MIN_PASSWORD_LENGTH = 8;

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

    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}

export async function activateAccount(
  password: string,
  repeatPassword: string,
  token: string,
) {
  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error("Password must be at least 8 characters long");
  }

  try {
    await axios.put(`/auth/register/complete/${token}`, {
      password,
    });
  } catch (e) {
    // do something proper error handling
    console.error(e);
    throw new Error("Something went wrong");
  }

  redirect("/dashboard");
}
