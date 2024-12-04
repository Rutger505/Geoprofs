"use server";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
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
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateHired: Date;
  roleId: number;
}

const csrf = () => axios.get("/auth/csrf-cookie");

export async function authentication(): Promise<User | null> {
  await csrf();

  try {
    const userResponse = await axios.get<ApiUser>("/auth/user");
    const apiUser = userResponse.data;

    return {
      id: apiUser.UserID,
      firstName: apiUser.UserFirstName,
      lastName: apiUser.UserLastName,
      email: apiUser.email,
      dateHired: new Date(apiUser.DateHired),
      roleId: apiUser.UserRoleID,
    };
  } catch (error) {
    if (!(error instanceof AxiosError) || error.response?.status !== 401)
      throw error;

    return null;
  }
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export async function login(
  email: string,
  password: string,
): Promise<null | LoginErrors> {
  await csrf();

  try {
    await axios.post("/auth/login", { email, password });

    return null;
  } catch (error) {
    if (!(error instanceof AxiosError) || error.response?.status !== 422) {
      throw error;
    }

    return error.response.data.errors as LoginErrors;
  }
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
