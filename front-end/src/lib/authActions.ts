"use server";

import { signIn, signOut } from "@/lib/auth";
import axios from "@/lib/axios";
import { ApiResponseError } from "@/lib/errors";
import { ApiUser } from "@/lib/signInApi";
import { User } from "@/types/user";
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
    if (error instanceof ApiResponseError) {
      return { error: error.message };
    }

    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirect: true, redirectTo: "/" });
}

export async function getPendingAccount(token: string): Promise<User> {
  try {
    const response = await axios.get<ApiUser>(
      `/auth/register/pending/${token}`,
    );
    const apiUser = response.data;
    return {
      id: apiUser.UserID.toString(),
      email: apiUser.email,
      firstName: apiUser.UserFirstName,
      lastName: apiUser.UserLastName,
      dateHired: apiUser.DateHired,
      roleId: apiUser.UserRoleID,
      roleName: apiUser.RoleName,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Invalid token");
  }
}

export async function activateAccount(
  password: string,
  repeatPassword: string,
  token: string,
  email: string,
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

    await login(email, password);
  } catch (e) {
    // Error thrown by next redirect. Throw to continue the redirect.
    if (isRedirectError(e)) throw e;

    console.error(e);
    throw new Error("Something went wrong");
  }
}
