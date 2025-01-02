"use server";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

interface AuthorizeCredentials {
  email: unknown;
  password: unknown;
}

export interface ApiUser {
  UserID: number;
  UserFirstName: string;
  UserLastName: string;
  email: string;
  DateHired: Date;
  UserRoleID: number;
  RoleName: string;
  created_at: string | null;
  updated_at: string | null;
}

export async function authorize(credentials: Partial<AuthorizeCredentials>) {
  try {
    const response = await axios.post<ApiUser>("/auth/login", credentials);
    const apiUser = response.data;

    return {
      id: apiUser.UserID.toString(),
      firstName: apiUser.UserFirstName,
      lastName: apiUser.UserLastName,
      email: apiUser.email,
      dateHired: new Date(apiUser.DateHired),
      roleId: apiUser.UserRoleID,
      roleName: apiUser.RoleName,
    };
  } catch (error) {
    if (!(error instanceof AxiosError) || error.response?.status !== 401) {
      console.error(error);
    }

    return null;
  }
}
