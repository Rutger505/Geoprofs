"use server";

import { signIn } from "@/auth";
import axios from "@/lib/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ApiUser {
  UserID: number;
  UserFirstName: string;
  UserLastName: string;
  email: string;
  DateHired: Date;
  UserRoleID: number;
  created_at: string | null;
  updated_at: string | null;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateHired: Date;
  roleId: number;
}

export const csrf = async (): Promise<void> => {
  await axios.get("/auth/csrf-cookie");
};

export interface LoginErrors {
  email?: string;
  password?: string;
}

export async function login(
  email: string,
  password: string,
): Promise<null | LoginErrors> {
  return signIn("credentials", { email, password });
}

export async function logout() {
  const cookiesList = await cookies();
  const cookie = cookiesList.get("geoprofs_back_end_session");

  await axios.post("/auth/logout", null, {
    headers: {
      Cookie: `geoprofs_back_end_session=${cookie?.value}`,
    },
  });

  redirect("/");
}
