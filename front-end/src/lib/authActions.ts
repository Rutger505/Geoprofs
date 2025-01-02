"use server";

import { signIn, signOut } from "@/lib/auth";
import axios from "@/lib/axios";
import { ApiResponseError } from "@/lib/errors";
import { ApiUser } from "@/lib/signInApi";
import { User } from "@/types/user";
import { AxiosError } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect";

const MIN_PASSWORD_LENGTH = 8;

interface ErrorResponse {
  error: string;
}

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

    console.error(error);
    return { error: "Failed to login" };
  }
}

export async function logout() {
  await signOut({ redirect: true, redirectTo: "/" });
}

export async function getPendingAccount(
  token: string,
): Promise<User | { invalidToken: boolean }> {
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
