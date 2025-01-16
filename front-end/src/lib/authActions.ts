"use server";

import { ApiUser, mapApiUserToUser, signIn, signOut } from "@/lib/auth";
import axios from "@/lib/axios";
import { User } from "@/types/user";
import { AxiosError } from "axios";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

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

export async function getPendingAccount(
  token: string,
): Promise<User | { invalidToken: boolean }> {
  try {
    const response = await axios.get<ApiUser>(
      `/auth/register/pending/${token}`,
    );

    return mapApiUserToUser(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 422) {
      return { invalidToken: true };
    }

    console.error(error);
    return { invalidToken: false };
  }
}

export async function activateAccount(
  password: string,
  repeatPassword: string,
  token: string,
  email: string,
) {
  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
    };
  }

  try {
    await axios.put(`/auth/register/complete/${token}`, {
      password,
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to activate account" };
  }

  try {
    await login(email, password);
  } catch (error) {
    // Error thrown by next redirect. Throw to continue the redirect.
    if (isRedirectError(error)) throw error;

    console.error(error);
    return {
      error:
        "Successfully activated account, but couldn't automatically log in. Try logging in on the home page",
    };
  }
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  dateHired: Date,
  roleId: number,
  contractId: number,
) {
  try {
    await axios.post("/auth/register", {
      firstName,
      lastName,
      email,
      dateHired,
      roleId,
      contractId,
    });
  } catch (error) {
    if (!(error instanceof AxiosError) || error.response?.status !== 409) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        console.error(error.response?.data);
      }

      return { error: "Er is iets misgegaan" };
    }

    return { error: "Email is al in gebruik" };
  }
}
