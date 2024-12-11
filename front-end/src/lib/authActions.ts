"use server";

import { LoginErrors, signIn, signOut } from "@/lib/auth";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateHired: Date;
  roleId: number;
}

export async function login(
  email: string,
  password: string,
): Promise<null | LoginErrors> {
  return signIn("credentials", { email, password, redirect: false });
}

export async function logout(): Promise<void> {
  await signOut({ redirect: false });
}
