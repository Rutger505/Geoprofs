"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

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

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  dateHired: Date,
  roleId: number,
) {
  try {
    await axios.post("/auth/register", {
      firstName,
      lastName,
      email,
      dateHired,
      roleId,
    });
  } catch (error) {
    if (!(error instanceof AxiosError) || error.response?.status !== 409) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        console.error(error.response?.data);
      }

      throw new Error("Er is iets misgegaan");
    }

    throw new Error("Email is al in gebruik");
  }
}
