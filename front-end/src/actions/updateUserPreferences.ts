"use server";

import { env } from "@/env";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";

const JWT_COOKIE_NAME = "__Secure-authjs.session-token";
const JWT_SALT = "__Secure-authjs.session-token";
const JWT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function updateUserPreferences(
  newPreferences: Partial<Session["preferences"]>,
) {
  const session = await auth();
  if (!session) {
    return { error: "User is not signed in" };
  }

  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(JWT_COOKIE_NAME);

    if (!tokenCookie?.value) {
      throw new Error("Token cookie not found");
    }

    const token = await decode({
      token: tokenCookie.value,
      secret: env.AUTH_SECRET,
      salt: JWT_SALT,
    });

    if (!token) {
      throw new Error("Failed to decode token");
    }

    const updatedToken = {
      ...token,
      preferences: {
        ...(token.preferences as object),
        ...newPreferences,
      },
    };

    const newToken = await encode({
      token: updatedToken,
      salt: JWT_SALT,
      secret: env.AUTH_SECRET,
      maxAge: JWT_MAX_AGE,
    });

    cookieStore.set(JWT_COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: JWT_MAX_AGE,
    });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return { error: "Failed to update preferences" };
  }
}
