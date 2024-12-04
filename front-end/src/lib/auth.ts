"use server";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

interface ApiUser {
  UserID: number;
  UserFirstName: string;
  UserLastName: string;
  email: string;
  DateHired: Date;
  UserRoleID: number;
  created_at: string | null;
  updated_at: string | null;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateHired: Date;
  roleId: number;
}

const csrf = () => axios.get("/auth/csrf-cookie");

export async function user() {
  return async (): Promise<User | null> => {
    await csrf();

    try {
      const apiUser: ApiUser = await axios.get("/auth/user");

      return {
        id: apiUser.UserID,
        firstName: apiUser.UserFirstName,
        lastName: apiUser.UserLastName,
        email: apiUser.email,
        dateHired: new Date(apiUser.DateHired),
        roleId: apiUser.UserRoleID,
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status !== 401)
        throw error;

      return null;
    }
  };
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export async function login(
  email: string,
  password: string,
  setErrors: (errors: LoginErrors) => void,
) {
  await csrf();

  try {
    await axios.post("/auth/login", { email, password });
  } catch (error) {
    if (!(error instanceof AxiosError) || error.response?.status !== 422) {
      throw error;
    }

    const data = error.response.data;
    setErrors(data.errors);
  }
}

export async function logout() {
  await axios.post("/auth/logout");

  redirect("/login");
}
